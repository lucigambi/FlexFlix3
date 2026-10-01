'use strict';

// Original composition and playback segment from FlexFlix2/shared/chrome.js.
if (window.lottie) {
  document.querySelectorAll('.brand-animation').forEach(container => {
    const animation = window.lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      initialSegment: [0, 117],
      path: 'assets/logo/FondoOscuro/data.json',
      assetsPath: 'assets/logo/FondoOscuro/images/',
      rendererSettings: { preserveAspectRatio: 'xMinYMid meet' },
    });
    animation.addEventListener('DOMLoaded', () => {
      animation.playSegments([0, 117], true);
    });
  });
}
