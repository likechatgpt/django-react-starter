# Deployment Documentation

This directory contains everything you need to deploy your Django + React application to Tencent Cloud (or any cloud provider).

## 📚 Available Documentation

### Quick Start
- **[DEPLOYMENT_QUICKSTART.md](./DEPLOYMENT_QUICKSTART.md)** - Fast deployment guide with essential commands
  - Use this for a quick reference
  - Best for experienced users who just need command reminders

### Detailed Guide
- **[TENCENT_CLOUD_DEPLOYMENT.md](./TENCENT_CLOUD_DEPLOYMENT.md)** - Complete step-by-step deployment guide
  - Use this for your first deployment
  - Includes troubleshooting and detailed explanations
  - Covers SSL setup, monitoring, backups, etc.

## 🛠️ Deployment Tools

### Interactive Setup
```bash
./tencent-cloud-setup.sh
```
Interactive script that:
- Creates and configures `backend/.env.prod`
- Generates secure passwords and keys
- Updates configuration files
- Provides step-by-step guidance

### Deployment Script
```bash
./deploy.sh [command]
```
Main deployment script with commands:
- `init` - Initialize deployment
- `start` - Start application
- `stop` - Stop all services
- `restart` - Restart services
- `update` - Pull code and update
- `logs` - View logs
- `status` - Check status
- `backup` - Backup database
- `ssl` - Setup SSL certificate

Run `./deploy.sh help` for all commands.

### Diagnostics
```bash
./diagnose.sh
```
Comprehensive diagnostics script that checks:
- Docker installation and status
- Environment configuration
- Disk space and memory
- Running containers
- Frontend build files
- Nginx configuration
- Application health
- Network connectivity

## 🚀 Quick Deployment Steps

### 1. Prerequisites
- Tencent Cloud Lighthouse or CVM instance
- Ubuntu 22.04/24.04 LTS
- Minimum 2 Core, 4GB RAM, 80GB SSD

### 2. Server Setup
```bash
# On your server
curl -fsSL https://get.docker.com | sh
apt install -y docker-compose-plugin
git clone YOUR_REPO_URL
cd django-react-starter
```

### 3. Configure
```bash
# Interactive setup (recommended)
./tencent-cloud-setup.sh

# Or manual setup
cp backend/.env.prod.example backend/.env.prod
nano backend/.env.prod  # Edit configuration
```

### 4. Deploy
```bash
./deploy.sh init
./deploy.sh start
```

### 5. Verify
```bash
# Check status
./deploy.sh status

# Run diagnostics
./diagnose.sh

# Access application
http://YOUR_SERVER_IP/
http://YOUR_SERVER_IP/admin/
```

## 📋 File Structure

```
django-react-starter/
├── DEPLOYMENT_QUICKSTART.md       # Quick reference guide
├── TENCENT_CLOUD_DEPLOYMENT.md    # Detailed deployment guide
├── DEPLOYMENT_README.md            # This file
├── deploy.sh                       # Main deployment script
├── tencent-cloud-setup.sh          # Interactive setup script
├── diagnose.sh                     # Diagnostics script
├── extract-frontend.sh             # Frontend extraction script
├── docker-compose.prod.yml         # Production Docker Compose
├── docker/
│   ├── Dockerfile.prod.china       # Production Dockerfile (China optimized)
│   └── entrypoint-prod.sh          # Production entrypoint
├── nginx/
│   └── conf.d/default.conf         # Nginx configuration
└── backend/
    ├── .env.prod.example           # Environment template
    └── .env.prod                   # Your configuration (create this)
```

## 🔧 Common Tasks

### View Logs
```bash
./deploy.sh logs           # All services
./deploy.sh logs api       # Just API
./deploy.sh logs nginx     # Just Nginx
```

### Update Application
```bash
git pull
./deploy.sh update
```

### Backup Database
```bash
./deploy.sh backup
```

### Restart Services
```bash
./deploy.sh restart
```

### Open Django Shell
```bash
./deploy.sh shell
```

### Access Container
```bash
./deploy.sh bash api
```

## 🆘 Troubleshooting

### Step 1: Run Diagnostics
```bash
./diagnose.sh
```
This will check all common issues and provide fixes.

### Step 2: Check Logs
```bash
./deploy.sh logs
```

### Step 3: Check Specific Service
```bash
./deploy.sh logs api
./deploy.sh logs nginx
./deploy.sh logs postgres
```

### Step 4: Consult Documentation
See [TENCENT_CLOUD_DEPLOYMENT.md](./TENCENT_CLOUD_DEPLOYMENT.md) troubleshooting section.

## 🔐 Security Checklist

Before going to production:
- [ ] Changed all passwords in `backend/.env.prod`
- [ ] Set strong `SECRET_KEY`
- [ ] Configured firewall (ports 80, 443, 22 only)
- [ ] Set `DEBUG=0`
- [ ] SSL certificate installed
- [ ] Regular backups configured
- [ ] Updated `ALLOWED_HOSTS`
- [ ] Updated `CORS_ALLOWED_ORIGINS`

## 📊 Monitoring

### Check Application Health
```bash
curl http://YOUR_SERVER_IP/health/
```

### Monitor Resources
```bash
docker stats              # Container resources
free -h                  # Memory
df -h                    # Disk space
./deploy.sh status       # Service status
```

### Setup Automated Monitoring
Add to crontab for daily checks:
```bash
# Daily backup at 3am
0 3 * * * cd ~/django-react-starter && ./deploy.sh backup

# SSL renewal at 2am (if using SSL)
0 2 * * * cd ~/django-react-starter && docker run --rm -v "$(pwd)/certbot/conf:/etc/letsencrypt" -v "$(pwd)/certbot/www:/var/www/certbot" certbot/certbot renew && docker compose -f docker-compose.prod.yml restart nginx
```

## 💰 Cost Estimates

### Tencent Cloud Lighthouse
- Basic (2 Core, 4GB RAM): ¥60-80/month (~$8-11 USD)
- Recommended (4 Core, 8GB RAM): ¥120-150/month (~$17-21 USD)

### Tips to Reduce Costs
1. Use managed database services for better performance
2. Configure CDN for static files
3. Use object storage (COS) for media files
4. Optimize Docker images size
5. Monitor and clean up unused resources

## 🎯 Deployment Checklist

### Pre-Deployment
- [ ] Server created and accessible via SSH
- [ ] Docker and Docker Compose installed
- [ ] Repository cloned
- [ ] Environment configured (`.env.prod`)
- [ ] Firewall configured

### Deployment
- [ ] `./deploy.sh init` completed successfully
- [ ] `./deploy.sh start` completed successfully
- [ ] All containers running (`./deploy.sh status`)
- [ ] Application accessible via browser
- [ ] Admin panel accessible
- [ ] API documentation accessible

### Post-Deployment
- [ ] SSL certificate installed (if using domain)
- [ ] Backups configured
- [ ] Monitoring setup
- [ ] DNS configured (if using domain)
- [ ] Error tracking configured (Sentry)
- [ ] Email configured

## 📞 Support

### Documentation
- Main guide: [TENCENT_CLOUD_DEPLOYMENT.md](./TENCENT_CLOUD_DEPLOYMENT.md)
- Quick reference: [DEPLOYMENT_QUICKSTART.md](./DEPLOYMENT_QUICKSTART.md)
- Project setup: [CLAUDE.md](./CLAUDE.md)

### Tools
- Diagnostics: `./diagnose.sh`
- Deployment help: `./deploy.sh help`
- Setup help: `./tencent-cloud-setup.sh`

### Common Issues
See troubleshooting sections in:
- [TENCENT_CLOUD_DEPLOYMENT.md](./TENCENT_CLOUD_DEPLOYMENT.md#troubleshooting)
- Run `./diagnose.sh` for automated diagnostics

## 🔄 Update History

Track your deployments:
```bash
# After each deployment
git log --oneline -10
./deploy.sh status
```

## 📝 Notes

- First deployment takes 10-20 minutes
- Subsequent updates take 2-5 minutes
- Always backup before major updates
- Test in staging environment when possible
- Keep credentials secure and never commit them

---

**Ready to deploy?** Start with [DEPLOYMENT_QUICKSTART.md](./DEPLOYMENT_QUICKSTART.md) for a quick guide or [TENCENT_CLOUD_DEPLOYMENT.md](./TENCENT_CLOUD_DEPLOYMENT.md) for detailed instructions.
