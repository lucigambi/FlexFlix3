'use strict';

// Adapted from Entre Rios Aprende's PixelTexture: fixed mosaic cells,
// a blue-only palette and opacity animation (no scaling or movement).
function HeroPixelTexture(container) {
  if (!container) return;
  const colors = ['#395685', '#456497', '#5275ac', '#6989ba'];
  const fragment = document.createDocumentFragment();
  ['left', 'right'].forEach((side, sideIndex) => {
    const panel = document.createElement('div');
    panel.className = `hero-mosaic-side mosaic-${side}`;
    for (let row = 0; row < 38; row++) {
      for (let column = 0; column < 8; column++) {
        const seed = (row * 37 + column * 19 + sideIndex * 43) % 101;
        if (seed > 54) continue;
        const cell = document.createElement('span');
        cell.className = 'hero-mosaic-cell';
        cell.style.top = `${row * 32}px`;
        cell.style[side] = `${column * 32}px`;
        cell.style.backgroundColor = colors[seed % colors.length];
        cell.style.setProperty('--pixel-opacity', (0.17 + seed / 300).toFixed(3));
        cell.style.setProperty('--pixel-duration', `${5 + seed % 5}s`);
        cell.style.setProperty('--pixel-delay', `${-seed / 10}s`);
        panel.appendChild(cell);
      }
    }
    fragment.appendChild(panel);
  });
  container.appendChild(fragment);
}
HeroPixelTexture(document.querySelector('.hero-mosaic'));

// Preserve the reference sections and labels requested in Eugenia’s feedback.
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

const icons = ['▷', '▤', '✳', '⌘', '◎', '◈', '⌂'];
$('#layer-list').innerHTML = [...LAYERS].reverse().map(layer => {
  const item = layer.es;
  const [name, acronym] = item.name.split(' (');
  return `<details class="layer"><summary><span class="layer-num">${String(layer.n).padStart(2,'0')}</span><span class="layer-icon" aria-hidden="true">${icons[layer.n - 1]}</span><span class="layer-name">${escapeHTML(name)}${acronym ? `<small>${escapeHTML(acronym.replace(')',''))}</small>` : ''}</span><span class="layer-tag">${escapeHTML(item.tag)}</span><span class="layer-plus" aria-hidden="true">+</span></summary><div class="layer-drawer"><div><h3>${escapeHTML(item.role)}</h3><p>${escapeHTML(item.desc)}</p></div><div class="layer-features">${layer.feats.map(feature => `<div><strong>${escapeHTML(feature.es[0])}</strong><p>${escapeHTML(feature.es[1])}</p></div>`).join('')}</div>${layer.note ? `<div class="layer-note"><strong>${escapeHTML(layer.note.es.title)}.</strong> ${escapeHTML(layer.note.es.body)}</div>` : ''}</div></details>`;
}).join('');

// FlexFlix3 layout with the original FlexFlix2 content and images.
$('.phase-tabs').innerHTML = phases.map((phase, index) => `<button class="phase-tab" id="phase-${index}" role="tab" aria-controls="phase-panel" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}"><span>${String(index + 1).padStart(2,'0')}</span>${phase.title}</button>`).join('');
const phaseCaptions = ["Adaptá FlexClass a tu aula", "Contenido curricular propio", "Preguntas antes que respuestas", "De consumir a producir", "Cierra el ciclo pedagógico"];
function selectPhase(index, focus = false) {
  const phase = phases[index];
  $$('.phase-tab').forEach((tab, i) => {
    tab.setAttribute('aria-selected', i === index);
    tab.tabIndex = i === index ? 0 : -1;
  });
  $('#phase-panel').setAttribute('aria-labelledby', `phase-${index}`);
  $('#phase-number').textContent = phase.kicker;
  $('#phase-title').textContent = phase.title;
  $('#phase-caption').textContent = phaseCaptions[index];
  $('#phase-description').textContent = phase.text;
  $('#phase-img').src = phase.img;
  $('#phase-img').alt = phase.alt;
  $('#creation-types').hidden = !phase.crea;
  if (focus) $(`#phase-${index}`).focus();
}
$$('.phase-tab').forEach((tab, index) => {
  tab.addEventListener('click', () => selectPhase(index));
  tab.addEventListener('keydown', event => {
    const next = {ArrowRight: (index + 1) % 5, ArrowLeft: (index + 4) % 5, Home: 0, End: 4}[event.key];
    if (next !== undefined) { event.preventDefault(); selectPhase(next, true); }
  });
});
selectPhase(0);

// Original FF2 award copy.
const awards = [
  {
    "src": "assets/awards/martin-times.png",
    "alt": "TIME World's Top EdTech Companies",
    "institution": "TIME / STATISTA",
    "name": "Top 100 EdTech Companies",
    "description": "Selección mundial de las 100 mejores empresas de tecnología educativa (2026)."
  },
  {
    "src": "assets/awards/premios__youtube.png",
    "alt": "YouTube",
    "institution": "YOUTUBE",
    "name": "Botones de oro",
    "description": "Entregados por YouTube a los canales Aula365 y Educatina."
  },
  {
    "src": "assets/awards/premios__holon.png",
    "alt": "HolonIQ",
    "institution": "HOLONIQ",
    "name": "Top 200",
    "description": "Selección global de 200 empresas de tecnología educativa."
  },
  {
    "src": "assets/awards/premios__Guinness.png",
    "alt": "Guinness World Records",
    "institution": "GUINNESS WORLD RECORDS",
    "name": "Récord mundial",
    "description": "Al cómic colaborativo con la mayor cantidad de autores del mundo."
  },
  {
    "src": "assets/awards/tato.webp",
    "alt": "Premio Tato",
    "institution": "CAPIT",
    "name": "Premio Tato",
    "description": "Mejor programa infantil por la serie Los Creadores (2017)."
  },
  {
    "src": "assets/awards/premios__parents.png",
    "alt": "Parents' Choice",
    "institution": "PARENTS' CHOICE FOUNDATION",
    "name": "Parents' Choice Awards",
    "description": "Sello de calidad otorgado a productos educativos para chicos y familias."
  },
  {
    "src": "assets/awards/premios__Sadosky.png",
    "alt": "Premios Sadosky",
    "institution": "CESSI",
    "name": "Sadosky de Oro",
    "description": "A la trayectoria empresarial y a la mejor solución de innovación tecnológica aplicada a la educación (2015)."
  },
  {
    "src": "assets/awards/premios__wsa.png",
    "alt": "World Summit Award",
    "institution": "WORLD SUMMIT AWARDS",
    "name": "Innovación educativa",
    "description": "Otorgado por la ONU al Programa de Alfabetización Digital (2005)."
  },
  {
    "src": "assets/awards/martin-fierro.jpg",
    "alt": "Premio Martín Fierro",
    "institution": "APTRA",
    "name": "Premio Martín Fierro",
    "description": "Mejor programa infantil por la serie transmedia Los Creadores (2016)."
  }
];
// Equal-width groups include their trailing gap, so the loop joins exactly.
const awardCards = awards.map(award => `<div class="award" role="listitem"><div class="award-logo"><img src="${award.src}" alt="" loading="eager" decoding="async"></div><span class="award-institution">${escapeHTML(award.institution)}</span><h3>${escapeHTML(award.name)}</h3><p>${escapeHTML(award.description)}</p></div>`).join('');
$('#awards-track').innerHTML = `<div class="award-group" role="list">${awardCards}</div><div class="award-group" aria-hidden="true">${awardCards}</div>`;

const nav = $('#navigation');
const menu = $('.menu-toggle');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','Abrir menú'); }
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', open); menu.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});
$$('a',nav).forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) { closeMenu(); $('.language').open = false; }
});
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); $('.language').open = false; } });
matchMedia('(min-width: 961px)').addEventListener('change', closeMenu);
const sections = $$('main section[id]');
let scrollScheduled = false;
function updateActiveSection() {
  const current = sections.filter(section => section.getBoundingClientRect().top <= Math.max(180, innerHeight * .3)).at(-1) || sections[0];
  $$('#navigation a').forEach(link => {
    const active = link.hash === `#${current.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
  });
  scrollScheduled = false;
}
window.addEventListener('scroll', () => { if (!scrollScheduled) { scrollScheduled = true; requestAnimationFrame(updateActiveSection); } }, {passive:true});
window.addEventListener('resize', updateActiveSection);
updateActiveSection();

const conversation = $('#contact-dialog');
const caseDialog = $('#case-dialog');
const form = $('#contact-form');
function openDialog(dialog) { closeMenu(); dialog.showModal(); document.body.classList.add('body-modal'); }
$$('dialog').forEach(dialog => {
  $('.dialog-close',dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => document.body.classList.remove('body-modal'));
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
});
$('#chat-launcher').addEventListener('click', () => openDialog(conversation));
$$('[data-contact]').forEach(button => button.addEventListener('click', () => { form.elements.intent.value = 'Solicitar una demo'; openDialog(conversation); }));
function startContact(profile) {
  if (conversation.open) conversation.close();
  if (caseDialog.open) caseDialog.close();
  form.elements.profile.value = profile;
  $('.contact-box').scrollIntoView({behavior:'smooth',block:'start'});
  form.elements.name.focus({preventScroll:true});
}
$$('[data-profile]').forEach(button => button.addEventListener('click', () => startContact(button.dataset.profile)));
$$('[data-dialog-profile]').forEach(button => button.addEventListener('click', () => startContact(button.dataset.dialogProfile)));
$$('[data-case]').forEach(button => button.addEventListener('click', () => {
  $('#case-title').textContent = button.dataset.case;
  $('#case-description').textContent = button.closest('.province-body').querySelector('p:not(.eyebrow):not(.province-program)').textContent;
  openDialog(caseDialog);
}));
$('#case-contact').addEventListener('click', () => {
  form.elements.message.value = `Quisiera conocer más sobre la implementación en ${$('#case-title').textContent}.`;
  form.elements.intent.value = 'Realizar una consulta';
  startContact('Gobierno');
});

// Until a CRM endpoint is provided, transparently prepare an email. Never claim a submission was stored or sent.
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const values = Object.fromEntries(new FormData(form));
  const body = [`Hola, equipo FlexFlix.`, '', `Me interesa: ${values.intent}`, `Perfil: ${values.profile}`, `Nombre: ${values.name}`, `Email: ${values.email}`, `Institución / provincia: ${values.organization || 'No indicada'}`, '', values.message].join('\r\n');
  const mailto = `mailto:contacto@flexflix.ai?subject=${encodeURIComponent(`FlexFlix — ${values.intent}`)}&body=${encodeURIComponent(body)}`;
  $('#form-status').textContent = 'Tu consulta está preparada. Completá el envío desde tu aplicación de correo. Si no se abre, escribinos a contacto@flexflix.ai.';
  window.location.href = mailto;
});

// Keep the floating launcher from covering fields while a visitor fills the form.
new IntersectionObserver(entries => {
  $('#chat-launcher').classList.toggle('is-hidden', entries[0].isIntersecting);
}, {threshold:0.08}).observe($('.contact-box'));

// Add approved videos by editing media.json. No player or testimonial is invented.
function safeMediaURL(value) {
  if (!value) return null;
  try { const url = new URL(value, location.href); return url.protocol === 'https:' || (url.origin === location.origin && url.pathname.startsWith('/assets/')) ? url.href : null; } catch { return null; }
}
fetch('media.json?v=province-testimonials-2').then(response => response.ok ? response.json() : null).then(media => {
  if (!media) return;
  const intro = safeMediaURL(media.intro?.url);
  if (intro) {
    const link = document.createElement('a');
    link.href = intro; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.className = 'intro-video-link';
    link.setAttribute('aria-label','Ver video de presentación de FlexFlix');
    link.innerHTML = '<span class="video-play" aria-hidden="true">▷</span><span>Ver presentación de FlexFlix ↗</span>';
    $('.intro-visual').append(link); $('.intro-visual .coming').hidden = true;
    const poster = safeMediaURL(media.intro.poster);
    if (poster) { const img = document.createElement('img'); img.src = poster; img.alt = ''; img.className = 'intro-poster'; $('.intro-visual').prepend(img); }
  }
  const testimonials = Array.isArray(media.testimonials) ? media.testimonials.filter(item => safeMediaURL(item.url) && item.name).slice(0,4) : [];
  if (testimonials.length) {
    const grid = document.createElement('div'); grid.className = 'testimonial-grid';
    testimonials.forEach(item => {
      if (item.type === 'video') {
        const card = document.createElement('article');
        card.className = 'testimonial testimonial-video-card';
        const video = document.createElement('video');
        video.src = safeMediaURL(item.url);
        video.controls = true; video.playsInline = true; video.preload = 'metadata';
        video.setAttribute('aria-label', `Testimonio de ${item.name} · ${item.province}`);
        const poster = safeMediaURL(item.poster);
        if (poster) video.poster = poster;
        else if (item.posterTime) video.addEventListener('loadedmetadata', () => {
          if (video.duration > item.posterTime) video.currentTime = item.posterTime;
        }, {once:true});
        if (!poster && item.posterTime) video.addEventListener('play', () => {
          video.currentTime = 0;
        }, {once:true});
        video.addEventListener('play', () => {
          grid.querySelectorAll('video').forEach(other => { if (other !== video) other.pause(); });
        });
        card.append(video);
        const copy = document.createElement('div'); copy.className = 'testimonial-copy';
        copy.innerHTML = `<span class="testimonial-province">${escapeHTML(item.province)}</span><h3>${escapeHTML(item.name)}</h3><p class="testimonial-role">${escapeHTML(item.role)}</p><p class="testimonial-description">${escapeHTML(item.description)}</p>`;
        card.append(copy); grid.append(card);
        return;
      }
      const link = document.createElement('a'); link.className = 'testimonial'; link.href = safeMediaURL(item.url); link.target = '_blank'; link.rel = 'noopener noreferrer';
      const poster = safeMediaURL(item.poster);
      link.innerHTML = `<div class="testimonial-image">${poster ? `<img src="${escapeHTML(poster)}" alt="" loading="lazy">` : ''}<span aria-hidden="true">▷</span></div><h3>${escapeHTML(item.name)}</h3><p>${escapeHTML(item.role || '')}</p><span class="inline-link">Ver testimonio ↗</span>`;
      grid.append(link);
    });
    $('.testimonials-pending').replaceWith(grid);
  }
}).catch(() => { /* The honest upcoming state remains available offline. */ });
