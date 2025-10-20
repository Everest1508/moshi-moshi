# Pre-Publication Testing Checklist

## ✅ Extension Functionality
- [ ] Extension loads without errors
- [ ] Popup interface works correctly
- [ ] Chat window appears on webpages
- [ ] WebSocket connection establishes
- [ ] Messages send and receive properly
- [ ] Stream popup messages work
- [ ] Floating toggle icon functions
- [ ] Chat resizing works (double-click header)
- [ ] Emoji reactions work
- [ ] Connection status updates correctly

## ✅ Cross-Browser Testing
- [ ] Chrome (latest version)
- [ ] Chrome (older versions - test with Chrome 88+)
- [ ] Edge (Chromium-based)

## ✅ Different Website Testing
- [ ] YouTube
- [ ] Netflix
- [ ] Amazon Prime Video
- [ ] Hulu
- [ ] Disney+
- [ ] Regular websites (Google, Facebook, etc.)

## ✅ Error Handling
- [ ] Server offline - shows appropriate error
- [ ] Invalid room ID - handles gracefully
- [ ] Network disconnection - reconnects properly
- [ ] Invalid messages - doesn't crash

## ✅ Performance Testing
- [ ] Extension doesn't slow down browsing
- [ ] Memory usage is reasonable
- [ ] No memory leaks during long sessions
- [ ] Smooth animations and transitions

## ✅ Security Testing
- [ ] No XSS vulnerabilities in message display
- [ ] Input sanitization works
- [ ] No sensitive data exposure
- [ ] Proper permission usage

## ✅ User Experience
- [ ] Intuitive interface
- [ ] Clear error messages
- [ ] Smooth animations
- [ ] Responsive design
- [ ] Keyboard shortcuts work (Enter to send)

## ✅ Store Requirements
- [ ] All required icons present (16x16, 48x48, 128x128)
- [ ] Privacy policy created
- [ ] Store description written
- [ ] Screenshots prepared
- [ ] Manifest properly configured
- [ ] No policy violations

## ✅ Documentation
- [ ] README.md complete
- [ ] Installation instructions clear
- [ ] Troubleshooting guide included
- [ ] Privacy policy accessible
