async function ensureOffscreenDocument() {
  if (!chrome.offscreen || !chrome.offscreen.createDocument) return false;

  const url = chrome.runtime.getURL('offscreen.html');
  const hasDoc =
    chrome.offscreen.hasDocument ? await chrome.offscreen.hasDocument() : false;
  if (hasDoc) return true;

  await chrome.offscreen.createDocument({
    url,
    reasons: [chrome.offscreen.Reason.AUDIO_PLAYBACK],
    justification: 'Play notification sound for incoming Moshi Moshi messages.',
  });

  return true;
}

async function getSoundEnabled() {
  const data = await chrome.storage.local.get(['soundEnabled', 'soundVolume']);
  const enabled = typeof data.soundEnabled === 'boolean' ? data.soundEnabled : true;
  const volumeRaw = typeof data.soundVolume === 'number' ? data.soundVolume : 1.0;
  const volume = Math.min(1, Math.max(0, volumeRaw));
  return { enabled, volume };
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || !msg.action) return;

  if (msg.action === 'playIncomingSound') {
    (async () => {
      const { enabled, volume } = await getSoundEnabled();
      if (!enabled) return;

      const ok = await ensureOffscreenDocument();
      if (!ok) return;

      chrome.runtime.sendMessage({ action: 'playSound', volume });
    })();
  }
});
