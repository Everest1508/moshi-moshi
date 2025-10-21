#!/bin/bash

# Movie Chat Companion - Development Setup Script
# This script switches the extension back to development mode

echo "🎬 Movie Chat Companion - Development Setup"
echo "==========================================="

# Update config.js to development
echo "📝 Updating configuration to development..."
sed -i "s/const CURRENT_ENV = 'production'/const CURRENT_ENV = 'development'/g" config.js

echo "✅ Configuration updated!"
echo ""
echo "🔗 Development URLs:"
echo "   WebSocket: ws://localhost:3000"
echo "   HTTP: http://localhost:3000"
echo ""
echo "📦 Next steps:"
echo "1. Start local server: npm start"
echo "2. Or use Docker: docker-compose up --build"
echo "3. Test extension with local server"
echo ""
echo "🚀 To start local server:"
echo "   npm start"
echo ""
echo "🐳 To start with Docker:"
echo "   docker-compose up --build"
echo ""
echo "🔄 To switch to production:"
echo "   ./switch-to-prod.sh"
