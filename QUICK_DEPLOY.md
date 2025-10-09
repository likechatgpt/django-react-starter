# Quick Deployment Guide

## For Tencent Cloud (or any Ubuntu server)

### Step 1: Login to Your Server

```bash
ssh root@your-server-ip
```

### Step 2: Upload Setup Script

From your local machine:
```bash
scp server-setup.sh root@your-server-ip:/root/
```

Or copy-paste the content of `server-setup.sh` into a new file on the server.

### Step 3: Run Setup Script

```bash
chmod +x server-setup.sh
sudo ./server-setup.sh
```

This will install Docker, configure firewall, and setup the server (takes ~5 minutes).

### Step 4: Upload Your Code

**Option A: Using Git (Recommended)**
```bash
sudo su - appuser
cd /opt
git clone https://github.com/yourusername/your-repo.git django-react-starter
cd django-react-starter
```

**Option B: Using SCP**
```bash
# From your local machine
tar -czf project.tar.gz --exclude='node_modules' --exclude='data' --exclude='.git' .
scp project.tar.gz appuser@your-server-ip:/opt/
```

```bash
# On server
sudo su - appuser
cd /opt
tar -xzf project.tar.gz -C django-react-starter
cd django-react-starter
```

### Step 5: Configure Environment

```bash
# Copy and edit production environment file
cp backend/.env.prod.example backend/.env.prod
nano backend/.env.prod
```

**Minimum required changes:**
```bash
SECRET_KEY=<run: openssl rand -base64 48>
ALLOWED_HOSTS=your-server-ip,yourdomain.com
POSTGRES_PASSWORD=<strong-password>
RABBITMQ_PASSWORD=<strong-password>
REDIS_PASSWORD=<strong-password>
MEILI_MASTER_KEY=<strong-password>
```

### Step 6: Deploy!

```bash
./deploy.sh init
./deploy.sh start
```

Wait 2-3 minutes for everything to start up.

### Step 7: Verify

Open in your browser:
- Application: `http://your-server-ip`
- Admin panel: `http://your-server-ip/admin`
- Health check: `http://your-server-ip/health`

## Add SSL (Optional but Recommended)

### If you have a domain:

1. Point DNS to your server IP
2. Wait for DNS propagation (~5-30 minutes)
3. Run:

```bash
./deploy.sh ssl yourdomain.com admin@yourdomain.com
```

4. Edit nginx config:
```bash
nano nginx/conf.d/default.conf
# Uncomment the HTTPS server block
# Update 'yourdomain.com' placeholders
```

5. Restart:
```bash
docker compose -f docker-compose.prod.yml restart nginx
```

## Troubleshooting

### Can't access the website?
```bash
# Check if containers are running
./deploy.sh status

# Check logs
./deploy.sh logs api
./deploy.sh logs nginx

# Check firewall
sudo ufw status
```

### Out of memory?
```bash
# Check memory
free -h

# Check swap
swapon --show

# Restart services
./deploy.sh restart
```

### Database errors?
```bash
# Check database logs
./deploy.sh logs postgres

# Re-run migrations
docker compose -f docker-compose.prod.yml exec api bash -c "cd backend && python manage.py migrate"
```

## Daily Operations

```bash
# View logs
./deploy.sh logs

# Restart application
./deploy.sh restart

# Update application
git pull
./deploy.sh update

# Backup database
./deploy.sh backup

# Check status
./deploy.sh status
```

## Resource Monitoring

```bash
# Container resource usage
docker stats

# System resources
free -h              # Memory
df -h                # Disk
htop                 # Overall system
```

## Support

For detailed documentation, see `DEPLOYMENT.md`.

For issues, check:
1. Container logs: `./deploy.sh logs [service]`
2. System resources: `docker stats` and `free -h`
3. Configuration: `cat backend/.env.prod`
