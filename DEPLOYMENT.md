# Deployment Guide

## Pre-Deployment Checklist

### Environment Configuration
- [ ] Set strong `JWT_SECRET` in production
- [ ] Configure production database
- [ ] Set up SSL certificates
- [ ] Configure CORS settings
- [ ] Set production URLs

### Security Hardening
- [ ] Change default passwords
- [ ] Enable HTTPS
- [ ] Configure security headers
- [ ] Set up rate limiting
- [ ] Enable database backups

### Performance Optimization
- [ ] Enable caching
- [ ] Optimize images
- [ ] Minify assets
- [ ] Configure CDN
- [ ] Set up database indexing

## Deployment Options

### Option 1: Vercel (Recommended)

#### Step 1: Prepare Repository
\`\`\`bash
# Ensure code is pushed to GitHub
git add .
git commit -m "Prepare for deployment"
git push origin main
\`\`\`

#### Step 2: Import to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Configure settings:
   - Framework: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`

#### Step 3: Configure Environment Variables
In Vercel Dashboard → Settings → Environment Variables:
\`\`\`env
JWT_SECRET=your-production-secret-key
DATABASE_URL=your-production-database-url
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
\`\`\`

#### Step 4: Deploy
Click "Deploy" - Vercel will build and deploy automatically.

### Option 2: Docker Container

#### Dockerfile
\`\`\`dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
\`\`\`

#### Build and Run
\`\`\`bash
# Build image
docker build -t ucu-innovators-hub .

# Run container
docker run -p 3000:3000 \
  -e JWT_SECRET=your-secret \
  -e DATABASE_URL=your-db-url \
  ucu-innovators-hub
\`\`\`

### Option 3: Manual Server Deployment

#### Prerequisites
- Ubuntu 20.04+ server
- Node.js 18+
- PostgreSQL or MySQL
- Nginx

#### Step 1: Install Dependencies
\`\`\`bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Install Nginx
sudo apt install nginx
\`\`\`

#### Step 2: Clone and Build
\`\`\`bash
# Clone repository
cd /var/www
sudo git clone <repository-url> ucu-innovators-hub
cd ucu-innovators-hub

# Install dependencies
sudo npm ci

# Build production bundle
sudo npm run build
\`\`\`

#### Step 3: Configure Environment
\`\`\`bash
# Create .env file
sudo nano .env.production
\`\`\`

Add:
\`\`\`env
JWT_SECRET=your-production-secret
DATABASE_URL=postgresql://user:password@localhost:5432/ucu_hub
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
\`\`\`

#### Step 4: Set Up Process Manager
\`\`\`bash
# Install PM2
sudo npm install -g pm2

# Start application
pm2 start npm --name "ucu-hub" -- start

# Configure auto-start
pm2 startup
pm2 save
\`\`\`

#### Step 5: Configure Nginx
\`\`\`bash
sudo nano /etc/nginx/sites-available/ucu-hub
\`\`\`

Add:
\`\`\`nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`

Enable site:
\`\`\`bash
sudo ln -s /etc/nginx/sites-available/ucu-hub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
\`\`\`

#### Step 6: Set Up SSL (Let's Encrypt)
\`\`\`bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
\`\`\`

## Database Setup

### PostgreSQL Production Setup

\`\`\`bash
# Connect to PostgreSQL
sudo -u postgres psql

# Create database
CREATE DATABASE ucu_innovators_hub;

# Create user
CREATE USER ucu_admin WITH ENCRYPTED PASSWORD 'secure-password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE ucu_innovators_hub TO ucu_admin;

# Exit
\q
\`\`\`

### Import Schema
\`\`\`bash
psql -U ucu_admin -d ucu_innovators_hub -f lib/db/schema.sql
\`\`\`

## Monitoring and Maintenance

### Health Checks
Create a health check endpoint:
\`\`\`typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({ status: 'ok', timestamp: new Date() })
}
\`\`\`

### Logging
\`\`\`bash
# View PM2 logs
pm2 logs ucu-hub

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
\`\`\`

### Backups
\`\`\`bash
# Database backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -U ucu_admin ucu_innovators_hub > backup_$DATE.sql
\`\`\`

### Updates
\`\`\`bash
# Pull latest changes
cd /var/www/ucu-innovators-hub
git pull origin main

# Rebuild
npm ci
npm run build

# Restart
pm2 restart ucu-hub
\`\`\`

## Rollback Procedure

### Vercel
1. Go to Deployments
2. Find previous working deployment
3. Click "Promote to Production"

### Manual Server
\`\`\`bash
# Revert to previous commit
git revert HEAD
git push origin main

# Rebuild and restart
npm ci
npm run build
pm2 restart ucu-hub
\`\`\`

## Troubleshooting

### Application Won't Start
\`\`\`bash
# Check logs
pm2 logs ucu-hub --lines 100

# Verify environment variables
pm2 env ucu-hub

# Check port availability
sudo netstat -tulpn | grep :3000
\`\`\`

### Database Connection Issues
\`\`\`bash
# Test connection
psql -U ucu_admin -d ucu_innovators_hub -h localhost

# Check PostgreSQL status
sudo systemctl status postgresql
\`\`\`

### High Memory Usage
\`\`\`bash
# Check process memory
pm2 monit

# Restart application
pm2 restart ucu-hub
\`\`\`

## Security Recommendations

1. **Keep dependencies updated**
\`\`\`bash
npm audit
npm update
\`\`\`

2. **Regular security scans**
\`\`\`bash
npm audit fix
\`\`\`

3. **Monitor access logs**
\`\`\`bash
tail -f /var/log/nginx/access.log | grep "POST /api"
\`\`\`

4. **Set up firewall**
\`\`\`bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw enable
\`\`\`

5. **Enable fail2ban**
\`\`\`bash
sudo apt install fail2ban
sudo systemctl enable fail2ban
