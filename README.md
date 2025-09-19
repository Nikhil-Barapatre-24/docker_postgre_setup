# Next.js Docker PostgreSQL Setup

A complete Next.js application with PostgreSQL database using Docker containerization. This project provides a production-ready setup with environment-based configuration and multi-stage Docker builds.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Environment Configuration](#environment-configuration)
- [Docker Setup](#docker-setup)
- [Database Setup](#database-setup)
- [Development](#development)
- [Production](#production)
- [Troubleshooting](#troubleshooting)
- [Learn More](#learn-more)

## 🔧 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Docker** (version 20.10 or higher)
- **Docker Compose** (version 2.0 or higher)
- **Node.js** (version 24 or higher) - for local development
- **Git** - for version control

### Installing Prerequisites

#### Docker & Docker Compose
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install docker.io docker-compose-plugin

# macOS (using Homebrew)
brew install docker docker-compose

# Windows
# Download Docker Desktop from https://www.docker.com/products/docker-desktop
```

#### Node.js
```bash
# Using Node Version Manager (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 24
nvm use 24
```

## 📁 Project Structure

```
docker_postgre_setup/
├── prisma/                 # Database schema and migrations
│   ├── migrations/         # Database migration files
│   └── schema.prisma       # Prisma schema definition
├── src/                    # Application source code
│   └── app/                # Next.js app directory
├── public/                 # Static assets
├── .env                    # Environment variables (not in git)
├── .gitignore             # Git ignore rules
├── .dockerignore          # Docker ignore rules
├── docker-compose.yml     # Docker services configuration
├── Dockerfile             # Docker image definition
├── package.json           # Node.js dependencies
└── README.md              # This file
```

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd docker_postgre_setup
```

### 2. Set Up Environment Variables
```bash
# Copy the environment template (if it exists)
cp .env.example .env

# Or create .env file manually with the following content:
cat > .env << EOF
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=mydatabase
DATABASE_URL=postgresql://myuser:mypassword@db:5432/mydatabase
EOF
```

### 3. Start the Application
```bash
# Build and start all services
docker compose up --build

# Or run in detached mode (background)
docker compose up --build -d
```

### 4. Access the Application
- **Web Application**: http://localhost:3000
- **Database**: localhost:5432 (accessible with the credentials from .env)

## ⚙️ Environment Configuration

The application uses environment variables for configuration. Create a `.env` file in the root directory:

```env
# Database Configuration
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=mydatabase

# Application Database URL
DATABASE_URL=postgresql://myuser:mypassword@db:5432/mydatabase
```

### Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `POSTGRES_USER` | PostgreSQL username | `myuser` |
| `POSTGRES_PASSWORD` | PostgreSQL password | `mypassword` |
| `POSTGRES_DB` | PostgreSQL database name | `mydatabase` |
| `DATABASE_URL` | Complete database connection string | `postgresql://user:pass@host:port/db` |

## 🐳 Docker Setup

### Services Overview

The application consists of two main services:

#### 1. Database Service (`db`)
- **Image**: `postgres:latest`
- **Port**: `5432`
- **Volume**: Persistent data storage
- **Environment**: Uses variables from `.env`

#### 2. Application Service (`app`)
- **Build**: Custom Dockerfile
- **Port**: `3000`
- **Dependencies**: Waits for database to be ready
- **Environment**: Uses `DATABASE_URL` from `.env`

### Docker Commands

```bash
# Build images
docker compose build

# Start services
docker compose up

# Start in background
docker compose up -d

# View logs
docker compose logs

# Stop services
docker compose down

# Remove volumes 
docker compose down -v

# Rebuild and start
docker compose up --build
```

## 🗄️ Database Setup

### Prisma Integration

This project uses Prisma as the database ORM. The database schema is defined in `prisma/schema.prisma`.

#### Running Migrations

```bash
# Generate Prisma client
docker compose exec app npx prisma generate

# Run database migrations
docker compose exec app npx prisma migrate dev

# View database in Prisma Studio
docker compose exec app npx prisma studio
```

#### Database Access

You can connect to the PostgreSQL database using any PostgreSQL client:

- **Host**: `localhost`
- **Port**: `5432`
- **Username**: Value from `POSTGRES_USER` in `.env`
- **Password**: Value from `POSTGRES_PASSWORD` in `.env`
- **Database**: Value from `POSTGRES_DB` in `.env`

## 💻 Development

### Local Development (without Docker)

If you prefer to run the application locally:

```bash
# Install dependencies
npm install

# Start PostgreSQL with Docker only
docker compose up db -d

# Run the development server
npm run dev
```

### Making Changes

1. **Code Changes**: Edit files in `src/` directory
2. **Database Changes**: Modify `prisma/schema.prisma` and run migrations
3. **Environment Changes**: Update `.env` file and restart containers

### Development Commands

```bash
# Install new packages
docker compose exec app npm install <package-name>

# Run tests (if configured)
docker compose exec app npm test

# Access container shell
docker compose exec app sh
docker compose exec db psql -U myuser -d mydatabase
```

## 🚀 Production

### Production Build

```bash
# Build production images
docker compose -f docker-compose.prod.yml build

# Start production services
docker compose -f docker-compose.prod.yml up -d
```

### Production Considerations

1. **Environment Variables**: Use secure passwords and proper secrets management
2. **SSL/TLS**: Configure HTTPS for production
3. **Database Backups**: Set up regular database backups
4. **Monitoring**: Implement logging and monitoring solutions
5. **Security**: Review and harden security settings

## 🔍 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Check what's using the port
sudo lsof -i :3000
sudo lsof -i :5432

# Kill the process or change ports in docker-compose.yml
```

#### 2. Database Connection Issues
```bash
# Check if database is running
docker compose ps

# View database logs
docker compose logs db

# Verify environment variables
docker compose exec app env | grep DATABASE_URL
```

#### 3. Permission Issues
```bash
# Fix Docker permissions (Linux)
sudo usermod -aG docker $USER
# Log out and log back in
```

#### 4. Build Failures
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker compose build --no-cache
```

### Useful Commands

```bash
# View container status
docker compose ps

# Check container resource usage
docker stats

# View all logs
docker compose logs -f

# Restart specific service
docker compose restart app

# Execute commands in running container
docker compose exec app <command>
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Need Help?** If you encounter any issues or have questions, please check the troubleshooting section above or create an issue in the repository.
