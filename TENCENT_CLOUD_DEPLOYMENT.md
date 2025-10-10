# Tencent Cloud Deployment Guide

This guide will help you deploy your Django + React application to Tencent Cloud using a Lighthouse VM or Cloud Virtual Machine (CVM).

## Prerequisites

- Tencent Cloud account
- Domain name (optional, but recommended for production)
- SSH access to your local machine
- Git installed on your local machine

## Table of Contents

1. [Server Setup on Tencent Cloud](#1-server-setup-on-tencent-cloud)
2. [Initial Server Configuration](#2-initial-server-configuration)
3. [Install Required Software](#3-install-required-software)
4. [Deploy Application](#4-deploy-application)
5. [Configure Domain and SSL](#5-configure-domain-and-ssl)
6. [Post-Deployment](#6-post-deployment)
7. [Maintenance and Updates](#7-maintenance-and-updates)

---

## 1. Server Setup on Tencent Cloud

### Option A: Lighthouse (Recommended for Beginners)

1. Go to [Tencent Cloud Lighthouse Console](https://console.cloud.tencent.com/lighthouse)
2. Click "Create Instance"
3. **Configuration Recommendations**:
   - **Region**: Choose closest to your users (e.g., Shanghai, Beijing, Guangzhou)
   - **Image**: Ubuntu 22.04 LTS or Ubuntu 24.04 LTS
   - **Instance Plan**:
     - Minimum: 2 Core, 4GB RAM, 80GB SSD
     - Recommended: 4 Core, 8GB RAM, 120GB SSD
   - **Network**:
     - Bandwidth: 5Mbps+ (10Mbps recommended)
4. Set root password or SSH key
5. Complete purchase

### Option B: Cloud Virtual Machine (CVM)

1. Go to [CVM Console](https://console.cloud.tencent.com/cvm)
2. Click "Create Instance"
3. Select similar specifications as above
4. Choose "Pay-as-you-go" or "Monthly subscription"

### Get Your Server IP

After instance creation, note down:
- **Public IP address** (e.g., 123.45.67.89)
- **Root password** or **SSH private key**

---

## 2. Initial Server Configuration

### Connect to Your Server

```bash
# From your local machine
ssh root@YOUR_SERVER_IP

# If using SSH key
ssh -i /path/to/your-key.pem root@YOUR_SERVER_IP
```

### Update System Packages

```bash
# Update package list
apt update

# Upgrade all packages
apt upgrade -y

# Install essential tools
apt install -y curl wget git vim ufw
```

### Configure Firewall

```bash
# Enable UFW firewall
ufw allow OpenSSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw enable

# Check firewall status
ufw status
```

### Create Application User (Security Best Practice)

```bash
# Create deploy user
adduser deploy
usermod -aG sudo deploy

# Switch to deploy user
su - deploy
```

---

## 3. Install Required Software

### Install Docker

```bash
# Install Docker using official script
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add current user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose V2
sudo apt install -y docker-compose-plugin

# Verify installation
docker --version
docker compose version

# Start Docker service
sudo systemctl enable docker
sudo systemctl start docker
```

### Configure Docker for China (Speed up image pulling)

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<EOF
{
  "registry-mirrors": [
    "https://mirror.ccs.tencentyun.com",
    "https://docker.mirrors.ustc.edu.cn"
  ],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
EOF

sudo systemctl daemon-reload
sudo systemctl restart docker
```

### Log out and back in
```bash
# Log out to apply docker group changes
exit
# Log back in
ssh root@YOUR_SERVER_IP
su - deploy
```

---

## 4. Deploy Application

### Clone Repository

```bash
# Create application directory
mkdir -p ~/apps
cd ~/apps

# Clone your repository
git clone https://github.com/YOUR_USERNAME/django-react-starter.git
cd django-react-starter

# Or if using private repo
git clone https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/django-react-starter.git
```

### Configure Environment Variables

```bash
# Copy environment template
cp backend/.env.prod.example backend/.env.prod

# Edit configuration
nano backend/.env.prod
```

**IMPORTANT: Update these values in `backend/.env.prod`**:

```bash
# Generate a strong SECRET_KEY
SECRET_KEY=$(openssl rand -base64 48)
# Then paste it in the file

# Update with your domain/IP
ALLOWED_HOSTS=YOUR_DOMAIN.com,www.YOUR_DOMAIN.com,YOUR_SERVER_IP

# Update CORS origins
CORS_ALLOWED_ORIGINS=https://YOUR_DOMAIN.com,https://www.YOUR_DOMAIN.com

# Generate strong passwords for services
POSTGRES_PASSWORD=$(openssl rand -base64 32)
RABBITMQ_PASSWORD=$(openssl rand -base64 32)
REDIS_PASSWORD=$(openssl rand -base64 32)
MEILI_MASTER_KEY=$(openssl rand -base64 32)

# Update superuser credentials
DJANGO_SUPERUSER_EMAIL=your-email@example.com
DJANGO_SUPERUSER_PASSWORD=your-secure-password

# If not using HTTPS yet, set these to 0
SECURE_SSL_REDIRECT=0
SESSION_COOKIE_SECURE=0
CSRF_COOKIE_SECURE=0
```

### Initialize Deployment

```bash
# Make deploy script executable
chmod +x deploy.sh

# Initialize deployment (creates directories, checks config)
./deploy.sh init
```

### Start Application

```bash
# Build and start all services
./deploy.sh start
```

This will:
- Build Docker images (backend + frontend)
- Start all services (Nginx, API, Celery, PostgreSQL, RabbitMQ, Redis, Meilisearch)
- Run database migrations
- Collect static files
- Create superuser

**First deployment takes 10-20 minutes** due to:
- Downloading base images
- Building React frontend
- Installing Python dependencies

### Verify Deployment

```bash
# Check all containers are running
docker compose -f docker-compose.prod.yml ps

# Expected output: all services should be "Up"
# - nginx (port 80, 443)
# - api (port 8000)
# - celery_worker
# - postgres (port 5432)
# - rabbitmq (port 5672, 15672)
# - redis (port 6379)
# - meilisearch (port 7700)

# Check application logs
./deploy.sh logs api
./deploy.sh logs nginx

# Test health endpoint
curl http://localhost/health/
```

### Access Your Application

**Via IP Address** (temporary):
```
http://YOUR_SERVER_IP/
http://YOUR_SERVER_IP/admin/
http://YOUR_SERVER_IP/api/v1/docs/
```

---

## 5. Configure Domain and SSL

### Configure Domain (if you have one)

1. **Add DNS A Record**:
   - Go to your domain registrar's DNS settings
   - Add A record: `@` → `YOUR_SERVER_IP`
   - Add A record: `www` → `YOUR_SERVER_IP`
   - Wait 5-60 minutes for DNS propagation

2. **Update Nginx Configuration**:

```bash
nano nginx/conf.d/default.conf
```

Replace `server_name _;` with:
```nginx
server_name yourdomain.com www.yourdomain.com;
```

```bash
# Restart nginx
docker compose -f docker-compose.prod.yml restart nginx
```

### Setup SSL Certificate (HTTPS)

```bash
# Generate SSL certificate using Let's Encrypt
./deploy.sh ssl yourdomain.com your@email.com

# This will:
# 1. Run certbot to obtain SSL certificate
# 2. Certificates will be saved in certbot/conf/
```

After SSL certificate is obtained:

```bash
# Edit nginx config
nano nginx/conf.d/default.conf

# Uncomment the HTTPS server block (lines 109-189)
# Update 'your-domain.com' with your actual domain

# Also uncomment HTTP redirect block (lines 6-17)

# Restart nginx
docker compose -f docker-compose.prod.yml restart nginx
```

**Update `.env.prod` for HTTPS**:

```bash
nano backend/.env.prod

# Set to 1 (enable HTTPS security)
SECURE_SSL_REDIRECT=1
SESSION_COOKIE_SECURE=1
CSRF_COOKIE_SECURE=1
```

```bash
# Restart API
docker compose -f docker-compose.prod.yml restart api
```

### SSL Auto-Renewal

Add to crontab for automatic renewal:

```bash
crontab -e

# Add this line (renew every day at 2am)
0 2 * * * cd /home/deploy/apps/django-react-starter && docker run --rm -v "$(pwd)/certbot/conf:/etc/letsencrypt" -v "$(pwd)/certbot/www:/var/www/certbot" certbot/certbot renew && docker compose -f docker-compose.prod.yml restart nginx
```

---

## 6. Post-Deployment

### Access Admin Panel

1. Navigate to `https://yourdomain.com/admin/`
2. Login with credentials from `DJANGO_SUPERUSER_EMAIL` and `DJANGO_SUPERUSER_PASSWORD`

### Setup Monitoring

```bash
# View real-time logs
./deploy.sh logs

# View specific service logs
./deploy.sh logs api
./deploy.sh logs nginx
./deploy.sh logs celery_worker

# Check container status
./deploy.sh status
```

### Configure Backups

```bash
# Create backup directory
mkdir -p ~/backups

# Manual backup
./deploy.sh backup

# Automated daily backups (add to crontab)
crontab -e

# Add this line (backup every day at 3am)
0 3 * * * cd /home/deploy/apps/django-react-starter && mkdir -p ~/backups && ./deploy.sh backup
```

### Performance Optimization

```bash
# For production, configure Docker resource limits
nano docker-compose.prod.yml

# Add to services that need limits:
# deploy:
#   resources:
#     limits:
#       cpus: '2'
#       memory: 2G
#     reservations:
#       cpus: '1'
#       memory: 1G
```

---

## 7. Maintenance and Updates

### Deploy Updates

```bash
cd ~/apps/django-react-starter

# Pull latest code
git pull origin main

# Update and restart
./deploy.sh update
```

This will:
- Pull latest code changes
- Rebuild Docker images
- Restart services
- Run migrations
- Collect static files

### Common Management Commands

```bash
# Restart all services
./deploy.sh restart

# Stop all services
./deploy.sh stop

# Start services
./deploy.sh start

# Open Django shell
./deploy.sh shell

# Open bash in API container
./deploy.sh bash api

# View logs
./deploy.sh logs

# Check status
./deploy.sh status

# Create database backup
./deploy.sh backup

# Full cleanup (removes all data!)
./deploy.sh clean
```

### Monitoring Resources

```bash
# Check disk usage
df -h

# Check memory usage
free -h

# Check Docker resource usage
docker stats

# Clean up unused Docker resources
docker system prune -a
```

---

## Troubleshooting

### Container Won't Start

```bash
# Check logs for specific service
./deploy.sh logs api

# Check Docker daemon
sudo systemctl status docker

# Restart Docker
sudo systemctl restart docker
```

### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker compose -f docker-compose.prod.yml ps postgres

# Check database logs
./deploy.sh logs postgres

# Reset database (WARNING: deletes all data)
./deploy.sh stop
docker volume rm django-react-starter_postgres_data
./deploy.sh start
```

### Static Files Not Loading

```bash
# Recollect static files
docker compose -f docker-compose.prod.yml exec api bash -c "cd backend && python manage.py collectstatic --noinput"

# Re-extract frontend files
./extract-frontend.sh

# Restart nginx
docker compose -f docker-compose.prod.yml restart nginx
```

### Out of Disk Space

```bash
# Clean up Docker
docker system prune -a --volumes

# Clean up old logs
sudo journalctl --vacuum-time=7d
```

---

## Security Checklist

- [ ] Changed all default passwords in `.env.prod`
- [ ] Configured firewall (UFW) to only allow ports 80, 443, 22
- [ ] SSL certificate installed and auto-renewal configured
- [ ] `DEBUG=0` in production environment
- [ ] Strong `SECRET_KEY` generated
- [ ] Database backups configured
- [ ] Server monitoring setup
- [ ] Regular security updates (`apt update && apt upgrade`)

---

## Cost Optimization

### Tencent Cloud Lighthouse Pricing (Example)

- **2 Core, 4GB RAM, 80GB SSD**: ~¥60-80/month
- **4 Core, 8GB RAM, 120GB SSD**: ~¥120-150/month

### Reduce Costs:

1. **Use Lite Mode** (if you have external database):
   ```bash
   # Only run app, use managed services for DB
   docker compose -f docker-compose.prod.yml up -d nginx api celery_worker
   ```

2. **Configure CDN** for static files (Tencent Cloud CDN)

3. **Use Object Storage (COS)** for media files

---

## Next Steps

1. **Configure CI/CD**: Setup GitHub Actions for automated deployments
2. **Setup Monitoring**: Use Sentry for error tracking (configure `SENTRY_DSN`)
3. **Configure Email**: Update email settings for notifications
4. **Setup CDN**: Configure Tencent Cloud CDN for static assets
5. **Database Optimization**: Configure PostgreSQL connection pooling

---

## Support

For issues with deployment:
1. Check logs: `./deploy.sh logs`
2. Review configuration files
3. Check Tencent Cloud documentation
4. Review project documentation in `CLAUDE.md`

---

## Quick Reference

```bash
# One-time setup
git clone <repo>
cp backend/.env.prod.example backend/.env.prod
nano backend/.env.prod  # Configure
./deploy.sh init
./deploy.sh start

# Regular updates
git pull
./deploy.sh update

# Monitoring
./deploy.sh logs
./deploy.sh status

# Backup
./deploy.sh backup
```
