let audioEl = null;

function ensureAudioElement() {
  if (!audioEl) {
    audioEl = new Audio(chrome.runtime.getURL('notification.mp3'));
    audioEl.preload = 'auto';
    audioEl.volume = 1.0;
  }
  return audioEl;
}

async function playNotification() {
  try {
    const audio = ensureAudioElement();
    if (typeof playNotification.volume === 'number') {
      audio.volume = Math.min(1, Math.max(0, playNotification.volume));
    }
    audio.pause();
    audio.currentTime = 0;
    await audio.play();
  } catch (_) {
    // If audio playback fails for any reason, fail silently.
  }
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg && msg.action === 'playSound') {
    playNotification.volume = typeof msg.volume === 'number' ? msg.volume : 1.0;
    playNotification();
  }
});
