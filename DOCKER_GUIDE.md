# Docker Setup for Movie Chat Companion

## 🐳 Quick Start

### Development (Simple)
```bash
# Build and run the server
docker-compose up --build

# Run in background
docker-compose up -d --build

# View logs
docker-compose logs -f movie-chat-server

# Stop
docker-compose down
```

### Production (With Nginx + Redis)
```bash
# Run production setup
docker-compose -f docker-compose.prod.yml up -d --build

# View all logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop production
docker-compose -f docker-compose.prod.yml down
```

## 📋 Available Commands

### Basic Operations
```bash
# Build only
docker-compose build

# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs

# Follow logs
docker-compose logs -f

# Restart a service
docker-compose restart movie-chat-server

# Scale services (if needed)
docker-compose up --scale movie-chat-server=2
```

### Development Commands
```bash
# Rebuild and restart
docker-compose up --build --force-recreate

# Remove containers and volumes
docker-compose down -v

# Remove images
docker-compose down --rmi all

# Clean everything
docker-compose down -v --rmi all
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file for custom configuration:
```bash
# .env
NODE_ENV=production
PORT=3000
REDIS_URL=redis://redis:6379
```

### Port Configuration
- **Server**: `3000` (WebSocket + HTTP)
- **Redis**: `6379` (if using Redis)
- **Nginx**: `80` (HTTP), `443` (HTTPS)

## 🚀 Production Deployment

### 1. SSL Certificates
Place your SSL certificates in the `ssl/` directory:
```bash
mkdir ssl
# Copy your cert.pem and key.pem files
```

### 2. Update Nginx Configuration
Edit `nginx.conf` and update:
- `server_name your-domain.com` with your actual domain
- SSL certificate paths if different

### 3. Deploy
```bash
# Production deployment
docker-compose -f docker-compose.prod.yml up -d --build

# Check status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

## 🔍 Monitoring

### Health Checks
```bash
# Check server health
curl http://localhost:3000

# Check container health
docker-compose ps
```

### Logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs movie-chat-server

# Follow logs
docker-compose logs -f movie-chat-server
```

## 🛠️ Troubleshooting

### Common Issues
1. **Port already in use**: Change ports in docker-compose.yml
2. **Permission issues**: Check file permissions
3. **Build failures**: Clear Docker cache with `docker system prune`

### Debug Commands
```bash
# Enter container
docker-compose exec movie-chat-server sh

# Check container resources
docker stats

# Inspect container
docker inspect movie-chat-server
```

## 📊 Services Included

### Development (`docker-compose.yml`)
- **movie-chat-server**: WebSocket server
- **Optional Redis**: For future message persistence

### Production (`docker-compose.prod.yml`)
- **movie-chat-server**: WebSocket server
- **Redis**: Message persistence and session management
- **Nginx**: Reverse proxy with SSL termination

## 🔒 Security Features
- Non-root user in container
- Health checks
- Rate limiting (in Nginx)
- Security headers
- SSL/TLS termination
- CORS configuration

## 📈 Scaling
```bash
# Scale server instances
docker-compose up --scale movie-chat-server=3

# Use load balancer
# Update nginx.conf upstream configuration
```
