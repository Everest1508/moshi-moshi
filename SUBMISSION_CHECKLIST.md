# 🚀 Chrome Web Store Submission Checklist

## ✅ Pre-Submission Requirements

### 1. **Chrome Web Store Developer Account**
- [ ] Pay $5 one-time registration fee
- [ ] Verify your identity
- [ ] Complete developer profile

### 2. **Extension Package**
- [ ] Run `./package-for-store.sh` to create submission package
- [ ] Verify `movie-chat-extension.zip` is created
- [ ] Test the packaged extension locally

### 3. **Server Deployment**
- [ ] Deploy server to `api.moshi-moshi.encryptedbar.com`
- [ ] Test WebSocket connection: `wss://api.moshi-moshi.encryptedbar.com`
- [ ] Verify HTTPS is working
- [ ] Test with multiple users

### 4. **Privacy Policy**
- [ ] Host privacy policy at: `https://api.moshi-moshi.encryptedbar.com/privacy`
- [ ] Update privacy policy with production server details
- [ ] Ensure policy covers all data collection

## 📋 Store Listing Requirements

### 5. **Store Information**
- [ ] **Name**: Movie Chat Companion
- [ ] **Short Description**: "Chat with friends while watching movies! Real-time messaging with stream-style popup notifications."
- [ ] **Detailed Description**: Use content from `CHROME_STORE_LISTING.md`
- [ ] **Category**: Social & Communication
- [ ] **Keywords**: movie chat, real-time chat, streaming chat, movie night, long distance

### 6. **Visual Assets**
- [ ] **Icons**: 16x16, 48x48, 128x128 PNG files
- [ ] **Screenshots**: 5 screenshots showing:
  - Extension popup interface
  - Chat window open on webpage
  - Stream popup messages
  - Floating toggle icon
  - Small vs big chat sizes
- [ ] **Promotional Images**: 1280x800, 440x280, 920x680

### 7. **URLs**
- [ ] **Privacy Policy URL**: `https://api.moshi-moshi.encryptedbar.com/privacy`
- [ ] **Support URL**: `https://api.moshi-moshi.encryptedbar.com/support`
- [ ] **Homepage URL**: `https://api.moshi-moshi.encryptedbar.com`

## 🔍 Final Testing

### 8. **Extension Testing**
- [ ] Install packaged extension in Chrome
- [ ] Test connection to production server
- [ ] Verify all features work:
  - [ ] Chat window appears
  - [ ] Messages send/receive
  - [ ] Stream popups work
  - [ ] Floating toggle functions
  - [ ] Chat resizing works
  - [ ] Emoji reactions work
- [ ] Test on different websites (YouTube, Netflix, etc.)
- [ ] Test with multiple users in same room

### 9. **Cross-Browser Testing**
- [ ] Chrome (latest version)
- [ ] Chrome (version 88+)
- [ ] Edge (Chromium-based)

## 📤 Submission Process

### 10. **Upload to Chrome Web Store**
- [ ] Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
- [ ] Click "Add new item"
- [ ] Upload `movie-chat-extension.zip`
- [ ] Fill in all store listing information
- [ ] Upload screenshots and promotional images
- [ ] Add privacy policy URL
- [ ] Review all information
- [ ] Submit for review

### 11. **Post-Submission**
- [ ] Monitor review status
- [ ] Respond to any review feedback
- [ ] Keep server running reliably
- [ ] Monitor user reviews after approval

## ⚠️ Common Rejection Reasons to Avoid

- [ ] Missing or inadequate privacy policy
- [ ] Poor quality screenshots
- [ ] Unclear functionality description
- [ ] Policy violations (spam, misleading)
- [ ] Technical issues (server not accessible)
- [ ] Missing required permissions justification
- [ ] Poor user experience

## 🎯 Success Tips

- [ ] **Clear Description**: Explain exactly what the extension does
- [ ] **Good Screenshots**: Show the extension in action
- [ ] **Reliable Server**: Ensure server is always accessible
- [ ] **Privacy Compliance**: Be transparent about data usage
- [ ] **User-Friendly**: Make it easy to understand and use

## 📞 Support Preparation

- [ ] Create support documentation
- [ ] Set up user feedback collection
- [ ] Prepare FAQ for common issues
- [ ] Monitor server performance

---

**Ready to submit?** ✅ All items checked above!

**Estimated Review Time**: 1-3 business days
**Success Rate**: High if all requirements are met
