#!/bin/bash

# Server Setup Script for Ubuntu 20.04/22.04
# Run this script on your fresh cloud server to install all dependencies

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_error "Please run as root (use sudo)"
    exit 1
fi

print_info "Starting server setup..."

# Update system
print_info "Updating system packages..."
apt-get update
apt-get upgrade -y

# Install basic tools
print_info "Installing basic tools..."
apt-get install -y \
    curl \
    wget \
    git \
    vim \
    htop \
    ufw \
    fail2ban \
    unzip \
    ca-certificates \
    gnupg \
    lsb-release

# Install Docker
print_info "Installing Docker..."
if ! command -v docker &> /dev/null; then
    # Add Docker's official GPG key
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    chmod a+r /etc/apt/keyrings/docker.gpg

    # Add Docker repository
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

    # Install Docker Engine
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    # Start and enable Docker
    systemctl start docker
    systemctl enable docker

    print_info "Docker installed successfully!"
else
    print_info "Docker is already installed"
fi

# Create app user (if not exists)
if ! id "appuser" &>/dev/null; then
    print_info "Creating application user..."
    useradd -m -s /bin/bash appuser
    usermod -aG docker appuser
    print_info "User 'appuser' created and added to docker group"
else
    print_info "User 'appuser' already exists"
fi

# Setup firewall
print_info "Configuring firewall..."
ufw --force enable
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw --force reload

print_info "Firewall configured!"

# Configure fail2ban
print_info "Configuring fail2ban..."
systemctl enable fail2ban
systemctl start fail2ban

# Setup swap (recommended for servers with 4GB or less RAM)
if [ $(free -m | awk '/^Swap:/ {print $2}') -eq 0 ]; then
    print_info "Creating 2GB swap file..."
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
    print_info "Swap file created!"
else
    print_info "Swap already configured"
fi

# Create application directory
print_info "Creating application directory..."
mkdir -p /opt/django-react-starter
chown appuser:appuser /opt/django-react-starter

# Create backup directory
mkdir -p /opt/django-react-starter/backups
chown appuser:appuser /opt/django-react-starter/backups

# Setup log rotation
print_info "Setting up log rotation..."
cat > /etc/logrotate.d/django-react-starter << 'EOF'
/opt/django-react-starter/logs/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 appuser appuser
    sharedscripts
    postrotate
        docker compose -f /opt/django-react-starter/docker-compose.prod.yml restart api > /dev/null 2>&1 || true
    endscript
}
EOF

# Optimize Docker for production
print_info "Optimizing Docker settings..."
cat > /etc/docker/daemon.json << 'EOF'
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
EOF

systemctl restart docker

# Setup automatic security updates
print_info "Enabling automatic security updates..."
apt-get install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades

# Display system information
print_info "Server setup complete!"
echo ""
print_info "System Information:"
echo "  OS: $(lsb_release -d | cut -f2)"
echo "  Kernel: $(uname -r)"
echo "  Docker: $(docker --version)"
echo "  Docker Compose: $(docker compose version)"
echo "  Memory: $(free -h | awk '/^Mem:/ {print $2}')"
echo "  Disk: $(df -h / | awk 'NR==2 {print $4 " available"}')"
echo ""
print_info "Next steps:"
echo "1. Switch to appuser: sudo su - appuser"
echo "2. Clone your repository: git clone <your-repo-url> /opt/django-react-starter"
echo "3. Configure environment: cd /opt/django-react-starter && cp backend/.env.prod.example backend/.env.prod"
echo "4. Edit backend/.env.prod with your settings"
echo "5. Deploy: ./deploy.sh init && ./deploy.sh start"
echo ""
print_warning "Security recommendations:"
echo "- Change SSH port from default 22"
echo "- Use SSH key authentication only (disable password auth)"
echo "- Setup a domain name and configure SSL"
echo "- Configure regular backups"
echo "- Monitor application logs regularly"
