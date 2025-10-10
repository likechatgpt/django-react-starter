#!/bin/bash

# Deployment Diagnostics Script
# This script helps diagnose common deployment issues

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}=== Deployment Diagnostics ===${NC}\n"

# Check if running on server or locally
if [ -f "/etc/hostname" ]; then
    HOSTNAME=$(cat /etc/hostname)
    echo -e "${GREEN}Server Hostname:${NC} $HOSTNAME"
fi

# 1. Check Docker
echo -e "\n${BLUE}[1/10] Checking Docker...${NC}"
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version)
    echo -e "${GREEN}✓ Docker installed:${NC} $DOCKER_VERSION"

    if docker ps &> /dev/null; then
        echo -e "${GREEN}✓ Docker daemon running${NC}"
    else
        echo -e "${RED}✗ Docker daemon not running${NC}"
        echo -e "${YELLOW}Fix: sudo systemctl start docker${NC}"
    fi
else
    echo -e "${RED}✗ Docker not installed${NC}"
    echo -e "${YELLOW}Fix: curl -fsSL https://get.docker.com | sh${NC}"
fi

# 2. Check Docker Compose
echo -e "\n${BLUE}[2/10] Checking Docker Compose...${NC}"
if docker compose version &> /dev/null; then
    COMPOSE_VERSION=$(docker compose version)
    echo -e "${GREEN}✓ Docker Compose installed:${NC} $COMPOSE_VERSION"
else
    echo -e "${RED}✗ Docker Compose not installed${NC}"
    echo -e "${YELLOW}Fix: sudo apt install docker-compose-plugin${NC}"
fi

# 3. Check .env.prod
echo -e "\n${BLUE}[3/10] Checking environment configuration...${NC}"
if [ -f "backend/.env.prod" ]; then
    echo -e "${GREEN}✓ backend/.env.prod exists${NC}"

    # Check for default values
    if grep -q "your-super-secret-key-here" backend/.env.prod; then
        echo -e "${RED}✗ SECRET_KEY not changed from default${NC}"
        echo -e "${YELLOW}Fix: Generate new key with: openssl rand -base64 48${NC}"
    else
        echo -e "${GREEN}✓ SECRET_KEY configured${NC}"
    fi

    if grep -q "change-me-in-production" backend/.env.prod; then
        echo -e "${RED}✗ Some passwords still set to default${NC}"
        echo -e "${YELLOW}Fix: Update passwords in backend/.env.prod${NC}"
    else
        echo -e "${GREEN}✓ Passwords configured${NC}"
    fi

    # Check DEBUG setting
    if grep -q "DEBUG=1" backend/.env.prod; then
        echo -e "${YELLOW}⚠ DEBUG=1 (should be 0 in production)${NC}"
    else
        echo -e "${GREEN}✓ DEBUG=0${NC}"
    fi
else
    echo -e "${RED}✗ backend/.env.prod not found${NC}"
    echo -e "${YELLOW}Fix: cp backend/.env.prod.example backend/.env.prod${NC}"
fi

# 4. Check disk space
echo -e "\n${BLUE}[4/10] Checking disk space...${NC}"
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -lt 80 ]; then
    echo -e "${GREEN}✓ Disk usage: ${DISK_USAGE}%${NC}"
else
    echo -e "${YELLOW}⚠ Disk usage: ${DISK_USAGE}% (getting high)${NC}"
    if [ "$DISK_USAGE" -gt 90 ]; then
        echo -e "${RED}✗ Disk usage critical!${NC}"
        echo -e "${YELLOW}Fix: docker system prune -a --volumes${NC}"
    fi
fi

# 5. Check memory
echo -e "\n${BLUE}[5/10] Checking memory...${NC}"
if command -v free &> /dev/null; then
    TOTAL_MEM=$(free -m | awk 'NR==2 {print $2}')
    USED_MEM=$(free -m | awk 'NR==2 {print $3}')
    MEM_PERCENT=$((USED_MEM * 100 / TOTAL_MEM))

    echo -e "${GREEN}Total Memory:${NC} ${TOTAL_MEM}MB"
    echo -e "${GREEN}Used Memory:${NC} ${USED_MEM}MB (${MEM_PERCENT}%)"

    if [ "$MEM_PERCENT" -gt 90 ]; then
        echo -e "${RED}✗ Memory usage critical!${NC}"
    elif [ "$MEM_PERCENT" -gt 80 ]; then
        echo -e "${YELLOW}⚠ Memory usage high${NC}"
    else
        echo -e "${GREEN}✓ Memory OK${NC}"
    fi
fi

# 6. Check firewall
echo -e "\n${BLUE}[6/10] Checking firewall...${NC}"
if command -v ufw &> /dev/null; then
    if sudo ufw status 2>/dev/null | grep -q "Status: active"; then
        echo -e "${GREEN}✓ UFW firewall active${NC}"

        # Check required ports
        if sudo ufw status | grep -q "80/tcp"; then
            echo -e "${GREEN}✓ Port 80 open${NC}"
        else
            echo -e "${YELLOW}⚠ Port 80 not open${NC}"
            echo -e "${YELLOW}Fix: sudo ufw allow 80/tcp${NC}"
        fi

        if sudo ufw status | grep -q "443/tcp"; then
            echo -e "${GREEN}✓ Port 443 open${NC}"
        else
            echo -e "${YELLOW}⚠ Port 443 not open (needed for HTTPS)${NC}"
            echo -e "${YELLOW}Fix: sudo ufw allow 443/tcp${NC}"
        fi
    else
        echo -e "${YELLOW}⚠ UFW firewall not active${NC}"
    fi
else
    echo -e "${YELLOW}⚠ UFW not installed${NC}"
fi

# 7. Check containers
echo -e "\n${BLUE}[7/10] Checking containers...${NC}"
if [ -f "docker-compose.prod.yml" ]; then
    RUNNING_CONTAINERS=$(docker compose -f docker-compose.prod.yml ps --services --filter "status=running" 2>/dev/null | wc -l)
    TOTAL_SERVICES=7  # nginx, api, celery_worker, postgres, rabbitmq, redis, meilisearch

    echo -e "${GREEN}Running containers:${NC} $RUNNING_CONTAINERS / $TOTAL_SERVICES"

    if [ "$RUNNING_CONTAINERS" -eq "$TOTAL_SERVICES" ]; then
        echo -e "${GREEN}✓ All containers running${NC}"
    else
        echo -e "${YELLOW}⚠ Some containers not running${NC}"
        echo -e "${YELLOW}Details:${NC}"
        docker compose -f docker-compose.prod.yml ps
        echo -e "${YELLOW}Fix: ./deploy.sh logs <service-name>${NC}"
    fi

    # Check specific critical services
    for service in nginx api postgres; do
        if docker compose -f docker-compose.prod.yml ps 2>/dev/null | grep -q "$service.*Up"; then
            echo -e "${GREEN}✓ $service running${NC}"
        else
            echo -e "${RED}✗ $service not running${NC}"
            echo -e "${YELLOW}Fix: docker compose -f docker-compose.prod.yml logs $service${NC}"
        fi
    done
else
    echo -e "${YELLOW}⚠ docker-compose.prod.yml not found${NC}"
fi

# 8. Check frontend files
echo -e "\n${BLUE}[8/10] Checking frontend build...${NC}"
if [ -d "frontend/dist" ]; then
    FILE_COUNT=$(find frontend/dist -type f 2>/dev/null | wc -l)
    if [ "$FILE_COUNT" -gt 0 ]; then
        echo -e "${GREEN}✓ Frontend dist exists ($FILE_COUNT files)${NC}"

        if [ -f "frontend/dist/index.html" ]; then
            echo -e "${GREEN}✓ index.html found${NC}"
        else
            echo -e "${RED}✗ index.html not found${NC}"
            echo -e "${YELLOW}Fix: ./extract-frontend.sh${NC}"
        fi

        # Check static directory
        if [ -d "frontend/dist/static" ]; then
            STATIC_FILES=$(find frontend/dist/static -type f 2>/dev/null | wc -l)
            echo -e "${GREEN}✓ static directory exists ($STATIC_FILES files)${NC}"
        else
            echo -e "${YELLOW}⚠ static directory not found${NC}"
        fi
    else
        echo -e "${RED}✗ Frontend dist is empty${NC}"
        echo -e "${YELLOW}Fix: ./extract-frontend.sh${NC}"
    fi
else
    echo -e "${RED}✗ frontend/dist directory not found${NC}"
    echo -e "${YELLOW}Fix: ./extract-frontend.sh${NC}"
fi

# 9. Check nginx config
echo -e "\n${BLUE}[9/10] Checking nginx configuration...${NC}"
if [ -f "nginx/conf.d/default.conf" ]; then
    echo -e "${GREEN}✓ nginx config exists${NC}"

    # Test nginx config if container is running
    if docker compose -f docker-compose.prod.yml ps 2>/dev/null | grep -q "nginx.*Up"; then
        if docker compose -f docker-compose.prod.yml exec -T nginx nginx -t &> /dev/null; then
            echo -e "${GREEN}✓ nginx config valid${NC}"
        else
            echo -e "${RED}✗ nginx config has errors${NC}"
            docker compose -f docker-compose.prod.yml exec -T nginx nginx -t
        fi

        # Check if files are accessible in nginx container
        echo -e "${BLUE}  Checking file mounts in nginx:${NC}"
        if docker compose -f docker-compose.prod.yml exec -T nginx test -f /home/app/backend/frontend/dist/index.html 2>/dev/null; then
            echo -e "${GREEN}  ✓ Frontend files accessible in nginx${NC}"
        else
            echo -e "${RED}  ✗ Frontend files not accessible in nginx${NC}"
            echo -e "${YELLOW}  Fix: Check volume mounts in docker-compose.prod.yml${NC}"
        fi
    fi
else
    echo -e "${RED}✗ nginx config not found${NC}"
fi

# 10. Check application health
echo -e "\n${BLUE}[10/10] Checking application health...${NC}"
if docker compose -f docker-compose.prod.yml ps 2>/dev/null | grep -q "api.*Up"; then
    # Wait a moment for services to be ready
    sleep 2

    # Check health endpoint
    HEALTH_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/health/ 2>/dev/null || echo "000")
    if echo "$HEALTH_CODE" | grep -q "200\|301\|302"; then
        echo -e "${GREEN}✓ Application responding (HTTP $HEALTH_CODE)${NC}"
    else
        echo -e "${YELLOW}⚠ Application not responding on /health/ (HTTP $HEALTH_CODE)${NC}"
        echo -e "${YELLOW}Check: curl -v http://localhost/health/${NC}"
    fi

    # Check if API is accessible
    API_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/api/v1/ 2>/dev/null || echo "000")
    if echo "$API_CODE" | grep -q "200\|301\|302\|404"; then
        echo -e "${GREEN}✓ API endpoint accessible (HTTP $API_CODE)${NC}"
    else
        echo -e "${YELLOW}⚠ API endpoint not accessible (HTTP $API_CODE)${NC}"
    fi

    # Check static files
    STATIC_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/ 2>/dev/null || echo "000")
    if echo "$STATIC_CODE" | grep -q "200"; then
        echo -e "${GREEN}✓ Frontend accessible (HTTP $STATIC_CODE)${NC}"
    else
        echo -e "${YELLOW}⚠ Frontend not accessible (HTTP $STATIC_CODE)${NC}"
    fi
else
    echo -e "${YELLOW}⚠ API container not running, skipping health check${NC}"
fi

# Summary
echo -e "\n${BLUE}=== Diagnostic Summary ===${NC}"

# Check if there were any errors
ERRORS=0

if ! command -v docker &> /dev/null; then ((ERRORS++)); fi
if ! docker ps &> /dev/null 2>&1; then ((ERRORS++)); fi
if ! docker compose version &> /dev/null 2>&1; then ((ERRORS++)); fi
if [ ! -f "backend/.env.prod" ]; then ((ERRORS++)); fi
if [ "$DISK_USAGE" -gt 90 ] 2>/dev/null; then ((ERRORS++)); fi

if [ "$ERRORS" -eq 0 ]; then
    echo -e "${GREEN}✓ No critical errors found${NC}"
else
    echo -e "${RED}✗ Found $ERRORS critical error(s)${NC}"
    echo -e "${YELLOW}Please fix the errors above before deploying${NC}"
fi

# Helpful commands
echo -e "\n${BLUE}=== Helpful Commands ===${NC}"
echo -e "View logs:        ${YELLOW}./deploy.sh logs${NC}"
echo -e "Check status:     ${YELLOW}./deploy.sh status${NC}"
echo -e "Restart services: ${YELLOW}./deploy.sh restart${NC}"
echo -e "View this again:  ${YELLOW}./diagnose.sh${NC}"

echo -e "\n${BLUE}For detailed troubleshooting, see: TENCENT_CLOUD_DEPLOYMENT.md${NC}"
