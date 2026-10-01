# FlexFlix3

Landing institucional estática, desarrollada en paralelo a [FlexFlix2](https://flex-flix2.vercel.app/) a partir del feedback de Eugenia. La versión anterior no fue modificada.

## Referencia editorial

Conservar los títulos y contenidos originales donde el feedback dice «completo». Reformular solo Metodología (simplificar sin quitar información), título/subtítulo de Audiencias y las fusiones o resúmenes indicados. No reemplazar los conectores por nuevos conceptos o eslóganes.

Orden: Arquitectura; #24 Reconocimientos; Metodología #09; #03 El problema; Modelos #21; #04 El principio; Gobiernos #18; #12 Conducción humana; Audiencias #02; #11 FlexGPT; Evidencia con #16 IDCA; #14 Arquitectura global; Impacto #15; #22 Trayectoria; Contacto #25 con Implementación #13. Los números visibles corresponden a la referencia original, no a una nueva numeración.

## Desarrollo

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Abrir http://127.0.0.1:4173. No requiere instalación de dependencias ni compilación.

## Estructura

- `index.html`: ocho secciones y siete conectores, contenido y formularios.
- `styles.css`: paleta azul noche/coral/lavanda, Manrope y DM Sans, diseño adaptable y movimiento reducido.
- `data.js`: siete capas y método PACCC, derivados del código de FlexFlix2.
- `script.js`: capas, pestañas accesibles, menú móvil, conversaciones, casos y carga de videos.
- `media.json`: video de presentación y hasta cuatro testimonios aprobados.
- `assets/`: logos y reconocimientos recuperados del proyecto original.

## Videos

Mientras no haya material aprobado, la web muestra «Próximamente». Para habilitarlo, editar `media.json`:

```json
{
  "intro": { "url": "https://www.youtube.com/watch?v=ID_REAL", "poster": "assets/presentacion.jpg" },
  "testimonials": [
    { "name": "Nombre aprobado", "role": "Docente · Institución", "url": "https://www.youtube.com/watch?v=ID_REAL", "poster": "assets/testimonio.jpg" }
  ]
}
```

Los videos abren el enlace externo y no cargan reproductores ni cookies de terceros al visitar la landing. Los posters son opcionales. No publicar identidades, testimonios o fotografías ficticias. Las escenas fotográficas del sitio previo no se reutilizan: PACCC incluye un esquema didáctico identificado como ilustrativo.

## Contacto

El formulario valida perfil, nombre y email, y prepara un correo dirigido a `contacto@flexflix.ai`. La persona revisa y envía desde su aplicación de correo. **No hay envío automático ni registro en base de datos.** Para habilitarlo falta definir el CRM o servicio de recepción y su aviso de privacidad; no incluir claves en código del navegador.

## Contenido pendiente

- Video introductorio, máximo cuatro testimonios y fotografías reales aprobadas.
- Traducciones EN/PT: el selector compacto informa que todavía no están disponibles.
- Perfiles oficiales adicionales de redes: solo LinkedIn fue verificado.
- Adjuntos del mail y posibles cambios locales que no estén en el repositorio FlexFlix2.
- Textos legales definitivos y conexión a la base de consultas.

La referencia al reconocimiento WSA enlaza a [PAD 2005](https://wsa-global.org/winner/digital-literacy-program-pad/) y explica su [contexto en la ONU](https://wsa-global.org/un-context/), sin atribuir una certificación de la ONU al producto actual.

## Verificación

```powershell
python scripts/check_site.py
node --check script.js
node --check data.js
```

Además, revisar en navegador: menú móvil, las siete capas, pestañas PACCC con teclado, perfiles y modal de casos, formulario y ausencia de desbordamiento horizontal.

## Publicación

- GitHub: https://github.com/lucigambi/FlexFlix3
- Producción: https://flexflix3.vercel.app
- Vercel: `lucigambis-projects/flexflix3`, rama `main`, framework Other, directorio raíz `.`.
- `.reference/` es una copia local ignorada; `.vercelignore` evita publicarla.

### Logo original

Animaci?n Lottie recuperada de FlexFlix2, sin modificar sus archivos: `assets/logo/FondoOscuro/` y `assets/logo/FondoBlanco/` (JSON e im?genes). El reproductor original est? en `assets/vendor/lottie.min.js`. `logo.js` reproduce el mismo segmento de fotogramas 0?117 en cabecera y pie; con movimiento reducido muestra un fotograma fijo.
