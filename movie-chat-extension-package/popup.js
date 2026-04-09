// Popup script for Chrome extension
document.addEventListener('DOMContentLoaded', function() {
  const usernameInput = document.getElementById('username');
  const roomIdInput = document.getElementById('roomId');
  const connectBtn = document.getElementById('connectBtn');
  const disconnectBtn = document.getElementById('disconnectBtn');
  const toggleBtn = document.getElementById('toggleChat');
  const openChatBtn = document.getElementById('openChat');
  const statusDiv = document.getElementById('status');
  const soundToggle = document.getElementById('soundToggle');
  const volumeSlider = document.getElementById('volumeSlider');
  const volumeValue = document.getElementById('volumeValue');

  // Load saved data
  chrome.storage.local.get(['username', 'roomId', 'isConnected', 'soundEnabled', 'soundVolume'], function(data) {
    if (data.username) usernameInput.value = data.username;
    if (data.roomId) roomIdInput.value = data.roomId;
    if (data.isConnected) {
      updateStatus(true);
      toggleBtn.style.display = 'block';
      disconnectBtn.style.display = 'block';
    }
    const enabled = typeof data.soundEnabled === 'boolean' ? data.soundEnabled : true;
    if (soundToggle) soundToggle.checked = enabled;

    const vol = typeof data.soundVolume === 'number' ? data.soundVolume : 1.0;
    const pct = Math.round(Math.min(1, Math.max(0, vol)) * 100);
    if (volumeSlider) volumeSlider.value = String(pct);
    if (volumeValue) volumeValue.textContent = `${pct}%`;
    if (volumeSlider) volumeSlider.disabled = !enabled;
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
    sendToActiveTab({
      action: 'connect',
      username: username,
      roomId: roomId
    });

    updateStatus(true);
    toggleBtn.style.display = 'block';
    disconnectBtn.style.display = 'block';
  });

  toggleBtn.addEventListener('click', function() {
    sendToActiveTab({ action: 'toggleChat' });
  });

  openChatBtn.addEventListener('click', function() {
    sendToActiveTab({ action: 'showChat' });
  });

  disconnectBtn.addEventListener('click', function() {
    chrome.storage.local.set({ isConnected: false });
    sendToActiveTab({ action: 'disconnect' });
    updateStatus(false);
    toggleBtn.style.display = 'none';
    disconnectBtn.style.display = 'none';
  });

  if (soundToggle) {
    soundToggle.addEventListener('change', function() {
      const enabled = !!soundToggle.checked;
      chrome.storage.local.set({ soundEnabled: enabled });
      sendToActiveTab({ action: 'setSoundEnabled', enabled });
      if (volumeSlider) volumeSlider.disabled = !enabled;
    });
  }

  if (volumeSlider) {
    volumeSlider.addEventListener('input', function() {
      const pct = Number(volumeSlider.value);
      if (volumeValue) volumeValue.textContent = `${pct}%`;
    });

    volumeSlider.addEventListener('change', function() {
      const pct = Number(volumeSlider.value);
      const vol = Math.min(1, Math.max(0, pct / 100));
      chrome.storage.local.set({ soundVolume: vol });
    });
  }

  function sendToActiveTab(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (!tabs || !tabs[0] || !tabs[0].id) return;
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  }

  function updateStatus(connected) {
    if (connected) {
      statusDiv.textContent = 'Connected';
      statusDiv.className = 'status-pill connected';
    } else {
      statusDiv.textContent = 'Disconnected';
      statusDiv.className = 'status-pill disconnected';
    }
  }
});
