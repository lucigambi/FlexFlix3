'use strict';

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

// Original PACCC content and photography from FlexFlix2.
function selectPhase(index, focus = false) {
  const phase = phases[index];
  $$('#metodologia .phase').forEach((tab, i) => {
    tab.classList.toggle('active', i === index);
    tab.setAttribute('aria-selected', i === index);
    tab.tabIndex = i === index ? 0 : -1;
  });
  $('#phase-panel').setAttribute('aria-labelledby', `phase-${index}`);
  $('#phase-kicker').textContent = phase.kicker;
  $('#phase-title').textContent = phase.title;
  $('#phase-text').textContent = phase.text;
  $('#phase-img').src = phase.img;
  $('#phase-img').alt = phase.alt;
  $('#phase-crea').hidden = !phase.crea;
  if (focus) $(`#phase-${index}`).focus();
}
$$('#metodologia .phase').forEach((tab, index) => {
  tab.id = `phase-${index}`;
  tab.setAttribute('role', 'tab');
  tab.setAttribute('aria-controls', 'phase-panel');
  tab.addEventListener('click', () => selectPhase(index));
  tab.addEventListener('keydown', event => {
    const next = {ArrowRight: (index + 1) % 5, ArrowLeft: (index + 4) % 5, Home: 0, End: 4}[event.key];
    if (next !== undefined) { event.preventDefault(); selectPhase(next, true); }
  });
});
selectPhase(0);

const awards = [
  ['martin-times.png','TIME / Statista'],['premios__youtube.png','YouTube'],['premios__holon.png','HolonIQ'],
  ['premios__Guinness.png','Guinness World Records'],['tato.webp','Premio Tato'],['premios__parents.png',"Parents’ Choice"],
  ['premios__Sadosky.png','Premios Sadosky'],['premios__wsa.png','World Summit Award'],['martin-fierro.jpg','Premio Martín Fierro']
];
$('#awards-track').innerHTML = [false,true].map(duplicate => awards.map(([file,name]) => `<div class="award ${duplicate ? 'duplicate' : ''}" ${duplicate ? 'aria-hidden="true"' : ''}><img src="assets/awards/${file}" alt="${duplicate ? '' : escapeHTML(name)}" loading="lazy"></div>`).join('')).join('');
$('#marquee-toggle').addEventListener('click', event => {
  const paused = $('.marquee').classList.toggle('paused');
  event.currentTarget.setAttribute('aria-pressed', paused);
  event.currentTarget.setAttribute('aria-label', paused ? 'Reanudar movimiento de reconocimientos' : 'Pausar movimiento de reconocimientos');
  event.currentTarget.textContent = paused ? '▷' : 'Ⅱ';
});

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
  $('.contact-box').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',block:'start'});
  form.elements.name.focus({preventScroll:true});
}
$$('[data-profile]').forEach(button => button.addEventListener('click', () => startContact(button.dataset.profile)));
$$('[data-dialog-profile]').forEach(button => button.addEventListener('click', () => startContact(button.dataset.dialogProfile)));
$$('[data-case]').forEach(button => button.addEventListener('click', () => {
  $('#case-title').textContent = button.dataset.case;
  $('#case-description').textContent = button.closest('.province-body').querySelector('p:not(.eyebrow)').textContent;
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
fetch('media.json').then(response => response.ok ? response.json() : null).then(media => {
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
      const link = document.createElement('a'); link.className = 'testimonial'; link.href = safeMediaURL(item.url); link.target = '_blank'; link.rel = 'noopener noreferrer';
      const poster = safeMediaURL(item.poster);
      link.innerHTML = `<div class="testimonial-image">${poster ? `<img src="${escapeHTML(poster)}" alt="" loading="lazy">` : ''}<span aria-hidden="true">▷</span></div><h3>${escapeHTML(item.name)}</h3><p>${escapeHTML(item.role || '')}</p><span class="inline-link">Ver testimonio ↗</span>`;
      grid.append(link);
    });
    $('.testimonials-pending').replaceWith(grid);
  }
}).catch(() => { /* The honest upcoming state remains available offline. */ });
