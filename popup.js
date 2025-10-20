// Popup script for Chrome extension
document.addEventListener('DOMContentLoaded', function() {
  const usernameInput = document.getElementById('username');
  const roomIdInput = document.getElementById('roomId');
  const connectBtn = document.getElementById('connectBtn');
  const toggleBtn = document.getElementById('toggleChat');
  const statusDiv = document.getElementById('status');

  // Load saved data
  chrome.storage.local.get(['username', 'roomId', 'isConnected'], function(data) {
    if (data.username) usernameInput.value = data.username;
    if (data.roomId) roomIdInput.value = data.roomId;
    if (data.isConnected) {
      updateStatus(true);
      toggleBtn.style.display = 'block';
    }
  });

  connectBtn.addEventListener('click', function() {
    const username = usernameInput.value.trim();
    const roomId = roomIdInput.value.trim();

    if (!username || !roomId) {
      alert('Please enter both username and room ID');
      return;
    }

    // Save to storage
    chrome.storage.local.set({
      username: username,
      roomId: roomId,
      isConnected: true
    });

    // Send message to content script
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'connect',
        username: username,
        roomId: roomId
      });
    });

    updateStatus(true);
    toggleBtn.style.display = 'block';
  });

  toggleBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'toggleChat'
      });
    });
  });

  function updateStatus(connected) {
    if (connected) {
      statusDiv.textContent = 'Connected to room';
      statusDiv.className = 'status connected';
    } else {
      statusDiv.textContent = 'Disconnected';
      statusDiv.className = 'status disconnected';
    }
  }
});
