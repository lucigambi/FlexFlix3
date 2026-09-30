'use strict';

// All editorial data and screenshots come from the original FlexFlix2 project.
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

const icons = ['▷', '▤', '✳', '⌘', '◎', '◈', '⌂'];
$('#layer-list').innerHTML = [...LAYERS].reverse().map(layer => {
  const item = layer.es;
  const [name, acronym] = item.name.split(' (');
  return `<details class="layer"><summary><span class="layer-num">${String(layer.n).padStart(2,'0')}</span><span class="layer-icon" aria-hidden="true">${icons[layer.n - 1]}</span><span class="layer-name">${escapeHTML(name)}${acronym ? `<small>${escapeHTML(acronym.replace(')',''))}</small>` : ''}</span><span class="layer-tag">${escapeHTML(item.tag)}</span><span class="layer-plus" aria-hidden="true">+</span></summary><div class="layer-drawer"><div><h3>${escapeHTML(item.role)}</h3><p>${escapeHTML(item.desc)}</p></div><div class="layer-features">${layer.feats.map(feature => `<div><strong>${escapeHTML(feature.es[0])}</strong><p>${escapeHTML(feature.es[1])}</p></div>`).join('')}</div>${layer.note ? `<div class="layer-note"><strong>${escapeHTML(layer.note.es.title)}.</strong> ${escapeHTML(layer.note.es.body)}</div>` : ''}</div></details>`;
}).join('');

// Explain the full original method. The visual is an explicitly illustrative
// lesson walkthrough, not a claim to be an actual product screenshot.
const phaseVisuals = [
  {title:'Una clase con propósito', tag:'DISEÑO DOCENTE', rows:[['Tema curricular','El agua y sus transformaciones'],['Pregunta inicial','¿A dónde va el agua cuando se evapora?'],['Recorrido','Comprender, conversar y crear']],foot:'El docente define el contexto, las preguntas y los tiempos.'},
  {title:'Primero, comprender',tag:'BASE COMPARTIDA',rows:[['Exploramos','Observamos los estados del agua.'],['Conectamos','Relacionamos el tema con situaciones cotidianas.'],['Preguntamos','Anotamos lo que todavía queremos entender.']],foot:'Una base curricular común antes de conversar con IA.'},
  {title:'Una pregunta abre otra',tag:'DIÁLOGO CON CRITERIO',rows:[['Estudiante','Creo que el agua desaparece.'],['Una nueva pregunta','¿Qué cambia cuando el vapor se enfría?'],['Pensamiento propio','Busco un ejemplo para explicar mi idea.']],foot:'La conversación invita a justificar y profundizar.'},
  {title:'De la idea a la creación',tag:'PRODUCCIÓN PROPIA',rows:[['La consigna','Explicá el ciclo del agua con tus palabras.'],['El formato','Una historia, un video o una infografía.'],['El criterio','Revisá que tu producción explique lo aprendido.']],foot:'La IA acompaña. La intención y las decisiones son humanas.'},
  {title:'Compartir para aprender',tag:'DEVOLUCIÓN DOCENTE',rows:[['Producción','Presento mi trabajo al curso.'],['Explicación','Cuento cómo lo hice y por qué.'],['Retroalimentación','Reviso la devolución y mejoro mi trabajo.']],foot:'La evidencia cierra el ciclo y abre nuevos aprendizajes.'}
];
const productFigure = $('.product-shot');
productFigure.innerHTML = '<div class="window-bar" aria-hidden="true"><i></i><i></i><i></i><span>Una clase, paso a paso</span></div><div id="lesson-preview" class="lesson-preview"></div><figcaption>Esquema ilustrativo del método PACCC™.</figcaption>';
phases[0].text = 'Elegí preguntas del reservorio curricular o sumá las tuyas. Definí las herramientas de IA, los tiempos y el recorrido que necesita tu aula.';
phases[1].text = 'El tema se presenta con una narrativa alineada al currículo de tu jurisdicción. Esa base común permite comprender antes de conversar y crear.';
phases[2].text = 'FlexGPT acompaña con preguntas centradas en el tema de la clase. El estudiante dialoga, justifica y profundiza a partir de preguntas curadas. La IA abre la conversación.';
phases[3].text = 'Cada tema propone una consigna y una herramienta de IA, con pasos y tutoriales. El estudiante transforma lo aprendido en una producción propia.';
phases[4].text = 'El estudiante entrega su trabajo en el espacio del curso. El docente revisa la producción y ofrece una devolución concreta que cierra el ciclo pedagógico.';
$('.phase-tabs').innerHTML = phases.map((phase, index) => `<button class="phase-tab" id="phase-${index}" role="tab" aria-controls="phase-panel" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}"><span>${String(index + 1).padStart(2,'0')}</span>${phase.title}</button>`).join('');
function selectPhase(index, focus = false) {
  const phase = phases[index];
  $$('.phase-tab').forEach((tab, i) => { tab.setAttribute('aria-selected', i === index); tab.tabIndex = i === index ? 0 : -1; });
  $('#phase-panel').setAttribute('aria-labelledby', `phase-${index}`);
  $('#phase-number').textContent = `${String(index + 1).padStart(2,'0')} / EL MÉTODO EN ACCIÓN`;
  $('#phase-title').textContent = phase.title;
  $('#phase-description').textContent = phase.text;
  const visual = phaseVisuals[index];
  $('#lesson-preview').innerHTML = `<span class="lesson-tag">${visual.tag}</span><h4>${visual.title}</h4><div class="lesson-rows">${visual.rows.map(([label,text], i) => `<div><span>${String(i + 1).padStart(2,'0')}</span><p><strong>${label}</strong>${text}</p></div>`).join('')}</div><p class="lesson-footer">${visual.foot}</p>`;
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
const caseCopy = {
  'Mendoza': 'Arquitectura sistémica, múltiples programas y despliegue provincial, con foco en educación secundaria. La propuesta conecta la estrategia educativa con el trabajo del aula y el desarrollo de capacidades observables.',
  'Entre Ríos': 'Aprendizajes fundamentales, IA curricular e identidad territorial, con foco en educación primaria. Una propuesta que integra el contexto de la jurisdicción y la conducción docente.',
  'Neuquén': 'Trayectoria educativa, Operador IA y capacidades productivas. Una implementación pública que vincula aprendizaje, criterio propio y uso de inteligencia artificial con propósito.'
};
$$('[data-case]').forEach(button => button.addEventListener('click', () => {
  $('#case-title').textContent = button.dataset.case;
  $('#case-description').textContent = caseCopy[button.dataset.case];
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
