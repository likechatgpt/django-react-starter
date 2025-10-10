#!/bin/bash

# Tencent Cloud Quick Setup Script
# This script helps configure your application for Tencent Cloud deployment

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Tencent Cloud Deployment Setup ===${NC}\n"

# Check if .env.prod exists
if [ -f "backend/.env.prod" ]; then
    echo -e "${YELLOW}Warning: backend/.env.prod already exists.${NC}"
    echo -n "Do you want to overwrite it? (y/N): "
    read -r response
    if [[ ! "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        echo "Keeping existing backend/.env.prod"
        ENV_EXISTS=true
    else
        ENV_EXISTS=false
    fi
else
    ENV_EXISTS=false
fi

if [ "$ENV_EXISTS" = false ]; then
    echo -e "${GREEN}Creating backend/.env.prod from template...${NC}"
    cp backend/.env.prod.example backend/.env.prod
fi

# Generate secure passwords and keys
echo -e "\n${GREEN}Generating secure passwords and keys...${NC}"
SECRET_KEY=$(openssl rand -base64 48)
POSTGRES_PASSWORD=$(openssl rand -base64 32)
RABBITMQ_PASSWORD=$(openssl rand -base64 32)
REDIS_PASSWORD=$(openssl rand -base64 32)
MEILI_MASTER_KEY=$(openssl rand -base64 32)

echo -e "SECRET_KEY: ${YELLOW}[Generated]${NC}"
echo -e "POSTGRES_PASSWORD: ${YELLOW}[Generated]${NC}"
echo -e "RABBITMQ_PASSWORD: ${YELLOW}[Generated]${NC}"
echo -e "REDIS_PASSWORD: ${YELLOW}[Generated]${NC}"
echo -e "MEILI_MASTER_KEY: ${YELLOW}[Generated]${NC}"

# Get user inputs
echo -e "\n${GREEN}Please provide the following information:${NC}"

echo -n "Server IP address: "
read -r SERVER_IP

echo -n "Domain name (optional, press Enter to skip): "
read -r DOMAIN

echo -n "Admin email address: "
read -r ADMIN_EMAIL

echo -n "Admin password: "
read -rs ADMIN_PASSWORD
echo

# Configure .env.prod
echo -e "\n${GREEN}Configuring backend/.env.prod...${NC}"

# Update SECRET_KEY
sed -i.bak "s|SECRET_KEY=.*|SECRET_KEY=$SECRET_KEY|" backend/.env.prod

# Update database passwords
sed -i.bak "s|POSTGRES_PASSWORD=.*|POSTGRES_PASSWORD=$POSTGRES_PASSWORD|" backend/.env.prod
sed -i.bak "s|RABBITMQ_PASSWORD=.*|RABBITMQ_PASSWORD=$RABBITMQ_PASSWORD|" backend/.env.prod
sed -i.bak "s|REDIS_PASSWORD=.*|REDIS_PASSWORD=$REDIS_PASSWORD|" backend/.env.prod
sed -i.bak "s|MEILI_MASTER_KEY=.*|MEILI_MASTER_KEY=$MEILI_MASTER_KEY|" backend/.env.prod
sed -i.bak "s|MEILISEARCH_API_KEY=.*|MEILISEARCH_API_KEY=$MEILI_MASTER_KEY|" backend/.env.prod

# Update admin credentials
sed -i.bak "s|DJANGO_SUPERUSER_EMAIL=.*|DJANGO_SUPERUSER_EMAIL=$ADMIN_EMAIL|" backend/.env.prod
sed -i.bak "s|DJANGO_SUPERUSER_PASSWORD=.*|DJANGO_SUPERUSER_PASSWORD=$ADMIN_PASSWORD|" backend/.env.prod

# Update allowed hosts
if [ -n "$DOMAIN" ]; then
    ALLOWED_HOSTS="$DOMAIN,www.$DOMAIN,$SERVER_IP"
    CORS_ORIGINS="https://$DOMAIN,https://www.$DOMAIN"
else
    ALLOWED_HOSTS="$SERVER_IP"
    CORS_ORIGINS="http://$SERVER_IP"
fi

sed -i.bak "s|ALLOWED_HOSTS=.*|ALLOWED_HOSTS=$ALLOWED_HOSTS|" backend/.env.prod
sed -i.bak "s|CORS_ALLOWED_ORIGINS=.*|CORS_ALLOWED_ORIGINS=$CORS_ORIGINS|" backend/.env.prod

# If no domain, disable HTTPS requirements
if [ -z "$DOMAIN" ]; then
    sed -i.bak "s|SECURE_SSL_REDIRECT=.*|SECURE_SSL_REDIRECT=0|" backend/.env.prod
    sed -i.bak "s|SESSION_COOKIE_SECURE=.*|SESSION_COOKIE_SECURE=0|" backend/.env.prod
    sed -i.bak "s|CSRF_COOKIE_SECURE=.*|CSRF_COOKIE_SECURE=0|" backend/.env.prod
fi

# Remove backup file
rm -f backend/.env.prod.bak

echo -e "${GREEN}Configuration complete!${NC}"

# Save credentials to a secure file
CREDS_FILE="tencent-cloud-credentials.txt"
cat > "$CREDS_FILE" <<EOF
=== Tencent Cloud Deployment Credentials ===
Generated: $(date)

Server IP: $SERVER_IP
Domain: ${DOMAIN:-N/A}

Admin Email: $ADMIN_EMAIL
Admin Password: $ADMIN_PASSWORD

Database Passwords (stored in backend/.env.prod):
- PostgreSQL: $POSTGRES_PASSWORD
- RabbitMQ: $RABBITMQ_PASSWORD
- Redis: $REDIS_PASSWORD
- Meilisearch: $MEILI_MASTER_KEY

Django SECRET_KEY: $SECRET_KEY

IMPORTANT: Keep this file secure and delete it after saving the credentials!
You can delete it with: rm $CREDS_FILE
EOF

echo -e "\n${YELLOW}IMPORTANT: Credentials saved to ${CREDS_FILE}${NC}"
echo -e "${YELLOW}Please save these credentials securely and delete the file!${NC}"

# Update docker-compose.prod.yml environment variables
echo -e "\n${GREEN}Updating docker-compose.prod.yml...${NC}"

# Create backup
cp docker-compose.prod.yml docker-compose.prod.yml.bak

# Update environment variables in docker-compose.prod.yml
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s|POSTGRES_PASSWORD:-.*}|POSTGRES_PASSWORD:-$POSTGRES_PASSWORD}|" docker-compose.prod.yml
    sed -i '' "s|RABBITMQ_PASSWORD:-.*}|RABBITMQ_PASSWORD:-$RABBITMQ_PASSWORD}|" docker-compose.prod.yml
    sed -i '' "s|REDIS_PASSWORD:-.*}|REDIS_PASSWORD:-$REDIS_PASSWORD}|" docker-compose.prod.yml
    sed -i '' "s|MEILI_MASTER_KEY:-.*}|MEILI_MASTER_KEY:-$MEILI_MASTER_KEY}|" docker-compose.prod.yml
else
    # Linux
    sed -i "s|POSTGRES_PASSWORD:-.*}|POSTGRES_PASSWORD:-$POSTGRES_PASSWORD}|" docker-compose.prod.yml
    sed -i "s|RABBITMQ_PASSWORD:-.*}|RABBITMQ_PASSWORD:-$RABBITMQ_PASSWORD}|" docker-compose.prod.yml
    sed -i "s|REDIS_PASSWORD:-.*}|REDIS_PASSWORD:-$REDIS_PASSWORD}|" docker-compose.prod.yml
    sed -i "s|MEILI_MASTER_KEY:-.*}|MEILI_MASTER_KEY:-$MEILI_MASTER_KEY}|" docker-compose.prod.yml
fi

# Summary
echo -e "\n${GREEN}=== Setup Summary ===${NC}"
echo -e "✓ Generated secure passwords and keys"
echo -e "✓ Configured backend/.env.prod"
echo -e "✓ Updated docker-compose.prod.yml"
echo -e "✓ Saved credentials to $CREDS_FILE"

echo -e "\n${GREEN}Next Steps:${NC}"
echo -e "1. Review and save credentials from ${YELLOW}$CREDS_FILE${NC}"
echo -e "2. Delete credentials file: ${YELLOW}rm $CREDS_FILE${NC}"
if [ -z "$DOMAIN" ]; then
    echo -e "3. Deploy: ${YELLOW}./deploy.sh init && ./deploy.sh start${NC}"
    echo -e "4. Access at: ${YELLOW}http://$SERVER_IP${NC}"
else
    echo -e "3. Configure DNS A records for $DOMAIN → $SERVER_IP"
    echo -e "4. Deploy: ${YELLOW}./deploy.sh init && ./deploy.sh start${NC}"
    echo -e "5. Setup SSL: ${YELLOW}./deploy.sh ssl $DOMAIN $ADMIN_EMAIL${NC}"
    echo -e "6. Access at: ${YELLOW}https://$DOMAIN${NC}"
fi

echo -e "\n${GREEN}For detailed instructions, see: TENCENT_CLOUD_DEPLOYMENT.md${NC}"
