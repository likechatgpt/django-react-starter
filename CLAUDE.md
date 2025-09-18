# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Django + React full-stack starter project with Docker support. The architecture consists of:

- **Backend**: Django 5.2+ with DRF, Celery, and PostgreSQL/PostGIS
- **Frontend**: Vite + React + TypeScript with DaisyUI styling
- **Supporting Services**: RabbitMQ (messaging), Meilisearch (search engine)
- **Development**: Docker Compose with separate profiles for full/lite modes

## Development Commands

### Docker Operations
- `make start` - Start all containers (full development environment)  
- `make start.lite` - Start only infrastructure services (postgres, rabbitmq, meilisearch)
- `make stop` - Stop all containers
- `docker compose up --build` - Alternative to make start

### Backend (Django)
All backend commands run inside the Docker container:

- `make backend.test` - Run Django tests with parallel execution
- `make backend.test.coverage` - Run tests with coverage report
- `make backend.quality` - Run ruff linting/formatting and ty type checking
- `make backend.migrate` - Apply database migrations (both dev and test DBs)
- `make backend.makemigrations` - Generate new migrations
- `make backend.shell` - Open Django shell
- `make backend.bash` - Open bash session in backend container

### Frontend (React)
Commands run in the frontend container via yarn:

- `make frontend.test` - Run Vitest tests
- `make frontend.test.coverage` - Run tests with coverage
- `make frontend.quality` - Run biome linting/formatting and TypeScript checks
- `make frontend.i18n` - Generate i18n translations
- `make frontend.bash` - Open bash session in frontend container

Direct yarn commands (if working inside container):
- `yarn dev` - Start Vite dev server
- `yarn build` - Build for production
- `yarn quality` - Quality checks (biome + tsc + i18n validation)

## Code Architecture

### Backend Structure
- **`backend/django_react_starter/`** - Django project settings and main configuration
- **`backend/[app_name]/`** - Django apps (authentication, user, health, core, etc.)
- **`backend/manage.py`** - Django management script
- **Docker profiles**: `all` (full stack) and `lite` (infrastructure only)

### Frontend Structure  
- **`frontend/src/`** - React application source
- **`frontend/package.json`** - Contains all build scripts and dependencies
- **Vite configuration** with React, TypeScript, and million.js optimization
- **Styling**: DaisyUI (Tailwind CSS framework)
- **State management**: React Query for server state
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation
- **i18n**: i18next with browser language detection

### Quality Tools
- **Backend**: ruff (linting/formatting), ty (type checking), coverage
- **Frontend**: biome (linting/formatting), TypeScript, Vitest (testing)
- **Docker**: Development and production Dockerfiles in `docker/` directory

### Environment Configuration
- Backend environment variables in `backend/.env` (and `.env.test` for testing)
- Database: PostgreSQL with PostGIS extension
- Message broker: RabbitMQ with management interface at http://localhost:15672
- Search: Meilisearch at http://localhost:7700 with UI at http://localhost:24900

### API Structure
All API endpoints are prefixed with `/api/v1/`:
- `/api/v1/auth/` - Authentication endpoints
- `/api/v1/self/` - User profile management  
- `/api/v1/health/` - Health check endpoints
- `/api/v1/docs/` - Swagger API documentation
- `/api/v1/schema/` - OpenAPI schema

### Key Development Notes
- Use `make help` to see all available commands
- Frontend runs on port 3000, backend API on port 8000
- The project supports both full development (with containers) and lite mode (infrastructure only)
- Pre-commit hooks can be set up with `make setup_hooks`
- Uses UV for Python package management in the backend
- Type checking with `ty` (configured in `ty.toml` and `backend/pyproject.toml`)