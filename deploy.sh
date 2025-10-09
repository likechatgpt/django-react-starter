#!/bin/bash

# Django React Starter - Production Deployment Script
# This script helps deploy the application to a production server

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env.prod exists
if [ ! -f "backend/.env.prod" ]; then
    print_error "backend/.env.prod file not found!"
    print_info "Please copy backend/.env.prod.example to backend/.env.prod and configure it"
    exit 1
fi

# Parse command line arguments
COMMAND=${1:-help}

case $COMMAND in
    "init")
        print_info "Initializing production deployment..."

        # Create necessary directories
        print_info "Creating directories..."
        mkdir -p backend/staticfiles backend/mediafiles
        mkdir -p certbot/conf certbot/www
        mkdir -p nginx/conf.d

        # Generate Django secret key if not set
        print_info "Checking Django SECRET_KEY..."
        if grep -q "your-super-secret-key-here" backend/.env.prod; then
            print_warning "Please update SECRET_KEY in backend/.env.prod"
            RANDOM_KEY=$(openssl rand -base64 48)
            print_info "You can use this randomly generated key: $RANDOM_KEY"
        fi

        print_info "Initialization complete!"
        print_info "Next steps:"
        print_info "1. Update backend/.env.prod with your configuration"
        print_info "2. Update nginx/conf.d/default.conf with your domain name"
        print_info "3. Run './deploy.sh start' to start the application"
        ;;

    "build")
        print_info "Building production images..."
        docker compose -f docker-compose.prod.yml build --no-cache
        print_info "Build complete!"
        ;;

    "start")
        print_info "Starting production containers..."

        # Pull latest images
        print_info "Pulling latest base images..."
        docker compose -f docker-compose.prod.yml pull postgres rabbitmq redis meilisearch nginx

        # Build application image
        print_info "Building application..."
        docker compose -f docker-compose.prod.yml build

        # Start services
        print_info "Starting services..."
        docker compose -f docker-compose.prod.yml up -d

        # Wait for database
        print_info "Waiting for database to be ready..."
        sleep 10

        # Run migrations
        print_info "Running database migrations..."
        docker compose -f docker-compose.prod.yml exec -T api bash -c "cd backend && python manage.py migrate"

        # Collect static files
        print_info "Collecting static files..."
        docker compose -f docker-compose.prod.yml exec -T api bash -c "cd backend && python manage.py collectstatic --noinput"

        # Create superuser (if not exists)
        print_info "Creating superuser (if needed)..."
        docker compose -f docker-compose.prod.yml exec -T api bash -c "cd backend && python manage.py createsuperuser --noinput" || true

        print_info "Deployment complete!"
        print_info "Application is running at http://localhost"
        print_info "Admin panel: http://localhost/admin/"
        ;;

    "stop")
        print_info "Stopping production containers..."
        docker compose -f docker-compose.prod.yml down
        print_info "Containers stopped!"
        ;;

    "restart")
        print_info "Restarting production containers..."
        docker compose -f docker-compose.prod.yml restart
        print_info "Containers restarted!"
        ;;

    "logs")
        SERVICE=${2:-}
        if [ -z "$SERVICE" ]; then
            docker compose -f docker-compose.prod.yml logs -f
        else
            docker compose -f docker-compose.prod.yml logs -f $SERVICE
        fi
        ;;

    "status")
        print_info "Container status:"
        docker compose -f docker-compose.prod.yml ps
        ;;

    "update")
        print_info "Updating application..."

        # Pull latest code (if using git)
        if [ -d ".git" ]; then
            print_info "Pulling latest code..."
            git pull
        fi

        # Rebuild and restart
        print_info "Rebuilding application..."
        docker compose -f docker-compose.prod.yml build api celery_worker

        print_info "Restarting services..."
        docker compose -f docker-compose.prod.yml up -d --no-deps api celery_worker

        # Run migrations
        print_info "Running migrations..."
        docker compose -f docker-compose.prod.yml exec -T api bash -c "cd backend && python manage.py migrate"

        # Collect static files
        print_info "Collecting static files..."
        docker compose -f docker-compose.prod.yml exec -T api bash -c "cd backend && python manage.py collectstatic --noinput"

        print_info "Update complete!"
        ;;

    "backup")
        print_info "Creating database backup..."
        BACKUP_FILE="backup_$(date +%Y%m%d_%H%M%S).sql"
        docker compose -f docker-compose.prod.yml exec -T postgres pg_dump -U postgres django_react_starter > "backups/$BACKUP_FILE"
        print_info "Backup created: backups/$BACKUP_FILE"
        ;;

    "ssl")
        DOMAIN=${2:-}
        EMAIL=${3:-}

        if [ -z "$DOMAIN" ] || [ -z "$EMAIL" ]; then
            print_error "Usage: ./deploy.sh ssl yourdomain.com your@email.com"
            exit 1
        fi

        print_info "Setting up SSL certificate for $DOMAIN..."

        # Install certbot if not present
        docker run -it --rm \
            -v "$(pwd)/certbot/conf:/etc/letsencrypt" \
            -v "$(pwd)/certbot/www:/var/www/certbot" \
            certbot/certbot certonly \
            --webroot \
            --webroot-path=/var/www/certbot \
            --email $EMAIL \
            --agree-tos \
            --no-eff-email \
            -d $DOMAIN -d www.$DOMAIN

        print_info "SSL certificate obtained!"
        print_info "Now uncomment the HTTPS server block in nginx/conf.d/default.conf"
        print_info "And restart nginx: docker compose -f docker-compose.prod.yml restart nginx"
        ;;

    "shell")
        print_info "Opening Django shell..."
        docker compose -f docker-compose.prod.yml exec api bash -c "cd backend && python manage.py shell"
        ;;

    "bash")
        SERVICE=${2:-api}
        print_info "Opening bash shell in $SERVICE..."
        docker compose -f docker-compose.prod.yml exec $SERVICE bash
        ;;

    "clean")
        print_warning "This will remove all containers and volumes. Are you sure? (y/N)"
        read -r response
        if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
            print_info "Cleaning up..."
            docker compose -f docker-compose.prod.yml down -v
            print_info "Cleanup complete!"
        else
            print_info "Cancelled."
        fi
        ;;

    "help"|*)
        echo "Django React Starter - Production Deployment Script"
        echo ""
        echo "Usage: ./deploy.sh [COMMAND]"
        echo ""
        echo "Commands:"
        echo "  init              Initialize deployment (first time setup)"
        echo "  build             Build production Docker images"
        echo "  start             Start the application"
        echo "  stop              Stop all containers"
        echo "  restart           Restart all containers"
        echo "  logs [service]    Show logs (optionally for specific service)"
        echo "  status            Show container status"
        echo "  update            Update application (pull code, rebuild, migrate)"
        echo "  backup            Create database backup"
        echo "  ssl DOMAIN EMAIL  Setup SSL certificate with Let's Encrypt"
        echo "  shell             Open Django shell"
        echo "  bash [service]    Open bash shell in container (default: api)"
        echo "  clean             Remove all containers and volumes"
        echo "  help              Show this help message"
        echo ""
        echo "Examples:"
        echo "  ./deploy.sh init"
        echo "  ./deploy.sh start"
        echo "  ./deploy.sh logs api"
        echo "  ./deploy.sh ssl yourdomain.com admin@yourdomain.com"
        ;;
esac
