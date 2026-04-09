# Server Deployment Guide

## 🚀 Hosting Options

### 1. **Heroku** (Recommended for beginners)
```bash
# Install Heroku CLI
# Create Procfile
echo "web: node server.js" > Procfile

# Add to package.json scripts
"scripts": {
  "start": "node server.js",
  "heroku-postbuild": "echo 'No build step required'"
}

# Deploy
heroku create your-app-name
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

### 2. **Railway** (Easy alternative)
```bash
# Connect GitHub repo
# Railway will auto-detect Node.js
# Set PORT environment variable
```

### 3. **DigitalOcean App Platform**
- Connect GitHub repo
- Select Node.js
- Set start command: `node server.js`

### 4. **Cloudflare Workers + Durable Objects** (Best for WebSockets)

This repo includes a Workers-compatible WebSocket API that matches the current extension protocol (send `{"type":"join","username":"...","roomId":"..."}` after connecting).

```bash
cd cloudflare-worker
npm install

# First time only:
npx wrangler login

# Local dev
npm run dev

# Deploy
npm run deploy
```

Notes:
- Your extension should point to your deployed Worker URL with `wss://...` (e.g. `wss://api.yourdomain.com`).
- The Worker also serves:
  - `/updates/update.xml`
  - `/privacy`
  - `/support`

## 🔧 Server Updates Needed

### Update server.js for production:
```javascript
const port = process.env.PORT || 3000;

// Add CORS for production
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }
  
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Movie Chat Server Running');
});
```

## 📝 Steps to Deploy:

### 1. **Prepare Server**
- Update `server.js` with production settings
- Add environment variable support
- Test locally first

### 2. **Deploy Server**
- Choose hosting platform
- Deploy your server
- Get your server URL (e.g., `https://your-app.herokuapp.com`)

### 3. **Update Extension**
- Change `CURRENT_ENV` to `'production'` in `config.js`
- Update `production.websocketUrl` with your server URL
- Update `production.serverUrl` with your server URL

### 4. **Update Manifest**
- Add your server domain to `host_permissions`
- Remove localhost permissions for production

### 5. **Test**
- Test extension with hosted server
- Verify WebSocket connection works
- Test on different devices/networks

## 🔒 Important Notes:

- **HTTPS Required**: Chrome extensions require HTTPS for production
- **WebSocket Security**: Use `wss://` not `ws://` for production
- **CORS**: Configure CORS properly on your server
- **Environment Variables**: Use `process.env.PORT` for port
- **Keep-Alive**: Configure server to handle WebSocket connections properly

## 📋 Checklist:
- [ ] Server deployed and accessible
- [ ] WebSocket connection works (`wss://your-domain.com`)
- [ ] Extension config updated
- [ ] Manifest permissions updated
- [ ] Tested on multiple devices
- [ ] HTTPS certificate working
- [ ] Server handles multiple connections
