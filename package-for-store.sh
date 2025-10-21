#!/bin/bash

# Chrome Web Store Packaging Script
# This script creates a clean package for Chrome Web Store submission

echo "📞 Moshi Moshi - Chrome Web Store Packaging"
echo "====================================================="

# Create package directory
PACKAGE_DIR="movie-chat-extension-package"
echo "📦 Creating package directory: $PACKAGE_DIR"

# Remove old package if exists
rm -rf $PACKAGE_DIR
mkdir $PACKAGE_DIR

# Copy required files
echo "📋 Copying extension files..."
cp manifest.json $PACKAGE_DIR/
cp popup.html $PACKAGE_DIR/
cp popup.js $PACKAGE_DIR/
cp content.js $PACKAGE_DIR/
cp styles.css $PACKAGE_DIR/
cp config.js $PACKAGE_DIR/

# Copy icons directory
echo "🎨 Copying icons..."
cp -r icons/ $PACKAGE_DIR/

# Create package info file
echo "📝 Creating package info..."
cat > $PACKAGE_DIR/PACKAGE_INFO.txt << EOF
Moshi Moshi - Chrome Extension Package
=====================================

Package created: $(date)
Version: 1.0.0
Production Server: api.moshi-moshi.encryptedbar.com

Files included:
- manifest.json (Extension manifest)
- popup.html (Extension popup interface)
- popup.js (Popup functionality)
- content.js (Content script for chat window)
- styles.css (Chat window styles)
- config.js (Configuration - set to production)
- icons/ (Extension icons)

Instructions:
1. Go to Chrome Web Store Developer Dashboard
2. Click "Add new item"
3. Upload the ZIP file of this directory
4. Fill in store listing details from CHROME_STORE_LISTING.md
5. Submit for review

Note: Make sure your server is running at api.moshi-moshi.encryptedbar.com
EOF

# Create ZIP file
echo "🗜️ Creating ZIP package..."
cd $PACKAGE_DIR
zip -r ../movie-chat-extension.zip . -x "*.DS_Store" "*.git*" "PACKAGE_INFO.txt"
cd ..

echo ""
echo "✅ Package created successfully!"
echo ""
echo "📁 Package location: movie-chat-extension.zip"
echo "📁 Package directory: $PACKAGE_DIR/"
echo ""
echo "🚀 Next steps:"
echo "1. Go to Chrome Web Store Developer Dashboard"
echo "2. Click 'Add new item'"
echo "3. Upload movie-chat-extension.zip"
echo "4. Use details from CHROME_STORE_LISTING.md"
echo "5. Submit for review"
echo ""
echo "⚠️ Important: Make sure your server is running at api.moshi-moshi.encryptedbar.com"
