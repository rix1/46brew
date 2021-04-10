const canRequest =
  typeof document !== 'undefined' &&
  typeof navigator !== 'undefined' &&
  typeof navigator.wakeLock !== 'undefined' &&
  typeof navigator.wakeLock.request === 'function';

let wakeLock = null;
let handleVisibilityChange;

function request() {
  if (!canRequest || wakeLock) {
    return;
  }

  document.addEventListener('visibilitychange', handleVisibilityChange);
  document.addEventListener('fullscreenchange', handleVisibilityChange);

  navigator.wakeLock
    .request('screen')
    .then((lock) => {
      wakeLock = lock;
    })
    .catch(() => {
      // That's fine. Let's just dim the screen, then.
    });
}

handleVisibilityChange = () => {
  if (wakeLock !== null && document.visibilityState === 'visible') {
    // We were previously active, but we are no longer
    wakeLock = null;
    request();
  }
};

function release() {
  if (!wakeLock) {
    return;
  }

  wakeLock.release();
  wakeLock = null;
}

const hasLock = () => wakeLock !== null;

export default {
  hasLock,
  request,
  release,
};
