'use strict';

// Original composition and playback segment from FlexFlix2/shared/chrome.js.
if (window.lottie) {
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.brand-animation').forEach(container => {
    const animation = window.lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: 'assets/logo/FondoOscuro/data.json',
      assetsPath: 'assets/logo/FondoOscuro/images/',
      rendererSettings: { preserveAspectRatio: 'xMinYMid meet' },
    });
    const updateMotion = () => {
      if (motionPreference.matches) animation.goToAndStop(116, true);
      else animation.playSegments([0, 117], true);
    };
    animation.addEventListener('DOMLoaded', updateMotion);
    motionPreference.addEventListener('change', updateMotion);
  });
}
