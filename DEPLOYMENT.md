# Production Deployment Guide

This guide will help you deploy your Django + React application to a production server (specifically tested on Tencent Cloud with Ubuntu).

## Server Requirements

**Minimum (for light traffic):**
- 2 CPU cores
- 4GB RAM
- 70GB SSD storage
- Ubuntu 20.04 or 22.04

**Recommended (for production):**
- 4 CPU cores
- 8GB RAM
- 100GB+ SSD storage

## Quick Start

### Step 1: Prepare Your Server

SSH into your cloud server:
```bash
ssh root@your-server-ip
```

Download and run the server setup script:
```bash
# Upload server-setup.sh to your server, then:
chmod +x server-setup.sh
sudo ./server-setup.sh
```

This script will:
- Install Docker and Docker Compose
- Configure firewall (UFW)
- Setup fail2ban for security
- Create swap space (for 4GB RAM servers)
- Create application user
- Optimize system for production

### Step 2: Deploy Your Application

Switch to the application user:
```bash
sudo su - appuser
```

Clone your repository:
```bash
cd /opt
git clone <your-repository-url> django-react-starter
cd django-react-starter
```

Configure environment variables:
```bash
cp backend/.env.prod.example backend/.env.prod
nano backend/.env.prod  # Edit with your settings
```

**Important settings to change:**
```bash
# Generate a strong secret key
SECRET_KEY=<generate-with-openssl-rand-base64-48>

# Your domain
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com,your-server-ip

# Database password
POSTGRES_PASSWORD=<strong-password>

# RabbitMQ password
RABBITMQ_PASSWORD=<strong-password>

# Redis password
REDIS_PASSWORD=<strong-password>

# Meilisearch key
MEILI_MASTER_KEY=<strong-password>

# Email settings (for password reset, etc.)
EMAIL_HOST=smtp.gmail.com
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

Initialize and start the application:
```bash
./deploy.sh init
./deploy.sh start
```

### Step 3: Configure Domain (Optional but Recommended)

If you have a domain name, point your DNS A records to your server IP:
```
A    @      your-server-ip
A    www    your-server-ip
```

Update nginx configuration:
```bash
nano nginx/conf.d/default.conf
# Replace 'server_name _;' with 'server_name yourdomain.com www.yourdomain.com;'
```

Restart nginx:
```bash
./deploy.sh restart
```

### Step 4: Setup SSL Certificate (HTTPS)

Once your domain is pointing to your server:

```bash
./deploy.sh ssl yourdomain.com your-email@yourdomain.com
```

After SSL is obtained, uncomment the HTTPS server block in `nginx/conf.d/default.conf`:
```bash
nano nginx/conf.d/default.conf
# Uncomment the HTTPS server block and update domain names
```

Restart nginx:
```bash
docker compose -f docker-compose.prod.yml restart nginx
```

## Deployment Script Commands

The `deploy.sh` script provides various commands:

```bash
# First-time initialization
./deploy.sh init

# Start all services
./deploy.sh start

# Stop all services
./deploy.sh stop

# Restart services
./deploy.sh restart

# View logs (all services)
./deploy.sh logs

# View logs for specific service
./deploy.sh logs api
./deploy.sh logs nginx

# Check container status
./deploy.sh status

# Update application (pull code, rebuild, migrate)
./deploy.sh update

# Create database backup
./deploy.sh backup

# Setup SSL certificate
./deploy.sh ssl yourdomain.com admin@yourdomain.com

# Open Django shell
./deploy.sh shell

# Open bash in container
./deploy.sh bash api

# Clean up (removes containers and volumes)
./deploy.sh clean
```

## Memory Optimization for 4GB Servers

If running on a 4GB server, apply these optimizations:

### 1. Limit Container Memory

Add to `docker-compose.prod.yml`:
```yaml
services:
  postgres:
    mem_limit: 512m
    mem_reservation: 256m

  rabbitmq:
    mem_limit: 512m
    mem_reservation: 256m

  redis:
    mem_limit: 256m
    mem_reservation: 128m

  meilisearch:
    mem_limit: 1g
    mem_reservation: 512m

  api:
    mem_limit: 1g
    mem_reservation: 512m

  celery_worker:
    mem_limit: 512m
    mem_reservation: 256m
```

### 2. Optimize PostgreSQL

Create `postgresql.conf` optimizations:
```bash
# In docker-compose.prod.yml, add command to postgres:
command: postgres -c shared_buffers=128MB -c max_connections=50
```

### 3. Monitor Resources

```bash
# Check memory usage
docker stats

# System memory
free -h

# Disk usage
df -h
```

## Security Checklist

- [ ] Changed all default passwords in `.env.prod`
- [ ] Generated strong SECRET_KEY
- [ ] Configured firewall (ports 22, 80, 443 only)
- [ ] Setup fail2ban
- [ ] Disabled root SSH login
- [ ] Using SSH keys instead of passwords
- [ ] Configured SSL certificate
- [ ] Set SECURE_SSL_REDIRECT=1 in `.env.prod`
- [ ] Regular backups configured
- [ ] Monitoring setup (Sentry, logs)

## Backup and Restore

### Create Backup

```bash
# Database backup
./deploy.sh backup

# Manual backup
docker compose -f docker-compose.prod.yml exec postgres pg_dump -U postgres django_react_starter > backup.sql

# Full data backup (includes media files)
tar -czf backup-$(date +%Y%m%d).tar.gz backend/mediafiles backups/
```

### Restore from Backup

```bash
# Restore database
cat backup.sql | docker compose -f docker-compose.prod.yml exec -T postgres psql -U postgres django_react_starter

# Or
docker compose -f docker-compose.prod.yml exec -T postgres psql -U postgres django_react_starter < backup.sql
```

## Monitoring

### Application Logs

```bash
# View all logs
./deploy.sh logs

# View specific service
./deploy.sh logs api
./deploy.sh logs nginx
./deploy.sh logs celery_worker

# Follow logs in real-time
docker compose -f docker-compose.prod.yml logs -f api
```

### System Monitoring

```bash
# Container resource usage
docker stats

# System resources
htop

# Disk usage
df -h
du -sh /opt/django-react-starter/*

# Network connections
netstat -tuln
```

## Troubleshooting

### Application won't start

```bash
# Check logs
./deploy.sh logs api

# Check if database is ready
./deploy.sh bash postgres
psql -U postgres -l

# Verify environment variables
./deploy.sh bash api
cat /home/app/backend/.env
```

### Out of Memory

```bash
# Check memory usage
free -h
docker stats

# Restart services
./deploy.sh restart

# Enable swap if not done
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Database Connection Issues

```bash
# Check if postgres is running
docker compose -f docker-compose.prod.yml ps postgres

# Check postgres logs
./deploy.sh logs postgres

# Test connection
./deploy.sh bash api
cd backend && python manage.py dbshell
```

### Static Files Not Loading

```bash
# Collect static files
docker compose -f docker-compose.prod.yml exec api bash -c "cd backend && python manage.py collectstatic --noinput"

# Check nginx logs
./deploy.sh logs nginx

# Verify file permissions
ls -la backend/staticfiles/
```

## Updating Your Application

### Regular Updates

```bash
# Pull latest code
git pull origin main

# Update and restart
./deploy.sh update
```

### Zero-Downtime Updates (Advanced)

For production with high traffic, consider:
1. Using a load balancer with multiple app instances
2. Blue-green deployment strategy
3. Database migration strategy (backwards compatible migrations)

## Performance Tuning

### Django Settings

In `backend/django_react_starter/settings/production.py`:

```python
# Database connection pooling
DATABASES = {
    'default': {
        'CONN_MAX_AGE': 600,  # Keep connections open for 10 minutes
    }
}

# Cache configuration
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': 'redis://redis:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        },
        'KEY_PREFIX': 'django_cache',
        'TIMEOUT': 300,
    }
}
```

### Nginx Tuning

For high traffic, adjust nginx worker processes in `nginx/nginx.conf`:

```nginx
worker_processes auto;
worker_connections 2048;
```

## Cost Optimization

### For Low-Traffic Sites (< 1000 daily users)

You can run a lighter configuration:

```bash
# In docker-compose.prod.yml, remove/disable:
# - celery_worker (if not using background tasks)
# - meilisearch (if not using search)
```

### Monitoring Costs

- Database size: `./deploy.sh bash postgres` → `psql -U postgres -c "\l+"`
- Log rotation: Already configured in `server-setup.sh`
- Old Docker images: `docker system prune -a` (be careful!)

## Support and Resources

- Project documentation: Check your repository's README
- Docker logs: `./deploy.sh logs [service]`
- Django admin: `https://yourdomain.com/admin/`
- Health check: `https://yourdomain.com/health/`

## Maintenance Schedule

**Daily:**
- Monitor error logs
- Check disk space

**Weekly:**
- Review application performance
- Check security updates
- Verify backups are working

**Monthly:**
- Update dependencies
- Review and rotate logs
- Performance optimization review
- Security audit

---

## Quick Reference Card

```bash
# Common operations
./deploy.sh start        # Start application
./deploy.sh stop         # Stop application
./deploy.sh restart      # Restart application
./deploy.sh logs api     # View API logs
./deploy.sh status       # Check status
./deploy.sh update       # Update application
./deploy.sh backup       # Backup database

# Emergency commands
docker compose -f docker-compose.prod.yml restart api    # Restart API only
docker compose -f docker-compose.prod.yml down           # Stop everything
docker system prune                                      # Clean up Docker
free -h                                                  # Check memory
df -h                                                    # Check disk
htop                                                     # Monitor system
```
