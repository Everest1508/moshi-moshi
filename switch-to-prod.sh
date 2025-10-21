#!/bin/bash

# Movie Chat Companion - Production Deployment Script
# This script switches the extension to production mode

echo "🎬 Movie Chat Companion - Production Setup"
echo "=========================================="

# Update config.js to production
echo "📝 Updating configuration to production..."
sed -i "s/const CURRENT_ENV = 'development'/const CURRENT_ENV = 'production'/g" config.js

echo "✅ Configuration updated!"
echo ""
echo "🔗 Production URLs:"
echo "   WebSocket: wss://api.moshi-moshi.encryptedbar.com"
echo "   HTTP: https://api.moshi-moshi.encryptedbar.com"
echo ""
echo "📦 Next steps:"
echo "1. Deploy your server to api.moshi-moshi.encryptedbar.com"
echo "2. Test the extension with production server"
echo "3. Package extension for Chrome Web Store"
echo ""
echo "🚀 To deploy server:"
echo "   docker-compose -f docker-compose.prod.yml up -d --build"
echo ""
echo "🔄 To switch back to development:"
echo "   ./switch-to-dev.sh"
