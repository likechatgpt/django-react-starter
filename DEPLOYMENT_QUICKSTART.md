# Tencent Cloud Deployment - Quick Start

This is a condensed guide for deploying to Tencent Cloud. For detailed instructions, see [TENCENT_CLOUD_DEPLOYMENT.md](./TENCENT_CLOUD_DEPLOYMENT.md).

## 1️⃣ Create Tencent Cloud Server

1. Go to [Tencent Cloud Lighthouse](https://console.cloud.tencent.com/lighthouse)
2. Create instance:
   - **OS**: Ubuntu 22.04/24.04 LTS
   - **Specs**: Minimum 2 Core, 4GB RAM, 80GB SSD
   - **Bandwidth**: 5Mbps+
3. Note your **Server IP** and **root password**

## 2️⃣ Connect and Setup Server

```bash
# Connect to server
ssh root@YOUR_SERVER_IP

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install -y docker-compose-plugin

# Configure Docker for China (faster)
mkdir -p /etc/docker
cat > /etc/docker/daemon.json <<EOF
{
  "registry-mirrors": [
    "https://mirror.ccs.tencentyun.com",
    "https://docker.mirrors.ustc.edu.cn"
  ]
}
EOF

systemctl daemon-reload
systemctl restart docker

# Setup firewall
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

## 3️⃣ Clone and Configure

```bash
# Clone repository
cd ~
git clone YOUR_REPO_URL
cd django-react-starter

# Quick setup (interactive)
./tencent-cloud-setup.sh

# Or manual setup
cp backend/.env.prod.example backend/.env.prod
nano backend/.env.prod  # Edit configuration
```

**Key settings to update in `.env.prod`:**
```bash
SECRET_KEY=<generate-with-openssl-rand-base64-48>
ALLOWED_HOSTS=your-ip-or-domain
DJANGO_SUPERUSER_EMAIL=admin@example.com
DJANGO_SUPERUSER_PASSWORD=secure-password
POSTGRES_PASSWORD=<strong-password>
RABBITMQ_PASSWORD=<strong-password>
REDIS_PASSWORD=<strong-password>
MEILI_MASTER_KEY=<strong-password>
```

## 4️⃣ Deploy

```bash
# Initialize
./deploy.sh init

# Build and start (takes 10-20 minutes first time)
./deploy.sh start

# Check status
./deploy.sh status
docker compose -f docker-compose.prod.yml ps

# View logs
./deploy.sh logs api
./deploy.sh logs nginx
```

## 5️⃣ Access Application

- **Web App**: `http://YOUR_SERVER_IP/`
- **Admin Panel**: `http://YOUR_SERVER_IP/admin/`
- **API Docs**: `http://YOUR_SERVER_IP/api/v1/docs/`

## 6️⃣ Setup Domain & SSL (Optional)

```bash
# 1. Configure DNS A records
#    yourdomain.com → YOUR_SERVER_IP
#    www.yourdomain.com → YOUR_SERVER_IP

# 2. Update nginx config
nano nginx/conf.d/default.conf
# Change: server_name _;
# To: server_name yourdomain.com www.yourdomain.com;

# 3. Restart nginx
docker compose -f docker-compose.prod.yml restart nginx

# 4. Generate SSL certificate
./deploy.sh ssl yourdomain.com admin@yourdomain.com

# 5. Enable HTTPS in nginx config
nano nginx/conf.d/default.conf
# Uncomment HTTPS server block (lines 109-189)
# Uncomment HTTP redirect (lines 6-17)

# 6. Enable HTTPS in .env.prod
nano backend/.env.prod
# Set: SECURE_SSL_REDIRECT=1
#      SESSION_COOKIE_SECURE=1
#      CSRF_COOKIE_SECURE=1

# 7. Restart services
docker compose -f docker-compose.prod.yml restart nginx api
```

## 📋 Common Commands

```bash
# Deployment
./deploy.sh start          # Start application
./deploy.sh stop           # Stop all services
./deploy.sh restart        # Restart services
./deploy.sh status         # Check status

# Updates
git pull                   # Get latest code
./deploy.sh update         # Update and restart

# Monitoring
./deploy.sh logs           # View all logs
./deploy.sh logs api       # View API logs
./deploy.sh logs nginx     # View nginx logs

# Maintenance
./deploy.sh backup         # Backup database
./deploy.sh shell          # Django shell
./deploy.sh bash api       # Bash in API container

# Cleanup
./deploy.sh clean          # Remove all containers & data
```

## 🔧 Troubleshooting

**Containers won't start:**
```bash
./deploy.sh logs api       # Check error logs
docker system prune -a     # Clean up Docker
./deploy.sh restart        # Try restart
```

**Static files 404:**
```bash
./extract-frontend.sh      # Re-extract frontend
docker compose -f docker-compose.prod.yml exec api bash -c "cd backend && python manage.py collectstatic --noinput"
docker compose -f docker-compose.prod.yml restart nginx
```

**Database issues:**
```bash
./deploy.sh logs postgres  # Check DB logs
./deploy.sh bash api
# Inside container:
cd backend && python manage.py migrate
```

**Out of disk space:**
```bash
docker system prune -a --volumes  # Clean Docker
df -h                             # Check disk usage
```

## 🔐 Security Checklist

- [ ] Changed all passwords in `.env.prod`
- [ ] Set strong `SECRET_KEY`
- [ ] Configured firewall (UFW)
- [ ] Set `DEBUG=0`
- [ ] SSL certificate installed (if using domain)
- [ ] Regular backups configured
- [ ] Updated `ALLOWED_HOSTS`

## 📊 Resource Monitoring

```bash
# System resources
free -h              # Memory usage
df -h                # Disk usage
docker stats         # Container resources

# Application health
curl http://localhost/health/
./deploy.sh status
```

## 🔄 Automated Backups

```bash
# Add to crontab
crontab -e

# Daily backup at 3am
0 3 * * * cd ~/django-react-starter && ./deploy.sh backup

# SSL renewal daily at 2am (if using SSL)
0 2 * * * cd ~/django-react-starter && docker run --rm -v "$(pwd)/certbot/conf:/etc/letsencrypt" -v "$(pwd)/certbot/www:/var/www/certbot" certbot/certbot renew && docker compose -f docker-compose.prod.yml restart nginx
```

## 💰 Estimated Costs (Tencent Cloud Lighthouse)

- **Basic** (2 Core, 4GB RAM): ¥60-80/month (~$8-11 USD)
- **Recommended** (4 Core, 8GB RAM): ¥120-150/month (~$17-21 USD)

## 📚 Documentation

- **Detailed Guide**: [TENCENT_CLOUD_DEPLOYMENT.md](./TENCENT_CLOUD_DEPLOYMENT.md)
- **Project Setup**: [CLAUDE.md](./CLAUDE.md)
- **Deployment Script**: `./deploy.sh help`

## 🆘 Getting Help

1. Check logs: `./deploy.sh logs`
2. Review [TENCENT_CLOUD_DEPLOYMENT.md](./TENCENT_CLOUD_DEPLOYMENT.md)
3. Check service status: `./deploy.sh status`
4. Test health endpoint: `curl http://localhost/health/`

---

**Ready to deploy?** Run: `./tencent-cloud-setup.sh` to get started! 🚀
