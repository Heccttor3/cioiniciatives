# Web de cioiniciatives.cat

Web de una sola página para el **CIO · Centre d'Iniciatives Ocupacionals** (Fabra i Coats, Sant Andreu).
Estructura basada en cosinia.cat: Inici · El CIO · Activitats · Projectes · Notícies · Contacte.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La página, con todos los textos en catalán |
| `css/estil.css` | Colores, tipografía y diseño |
| `js/main.js` | Menú, idiomas, accesibilidad, lectura en voz alta y formulario |
| `js/idiomes.js` | Traducciones al castellano y al inglés |
| `img/` | Fotos, logo e iconos |

Para publicarla basta con subir todo (`index.html` y las carpetas `css/`, `js/` e `img/`) a la raíz del
hosting de `cioiniciatives.cat`. No necesita servidor ni base de datos; solo Google Fonts.

## Idiomas

Botones **CA · ES · EN** en la cabecera. La web **siempre se abre en catalán**: no detecta el idioma del
navegador ni recuerda la elección (al volver a entrar, vuelve a salir en catalán).
El cambio es instantáneo, sin recargar, y también traduce las descripciones de las fotos, los avisos para
lectores de pantalla, el panel de accesibilidad y la lectura en voz alta (usa la voz del idioma elegido).

Los nombres propios se quedan igual (CIO, Centre d'Iniciatives Ocupacionals, Fabra i Coats, La Coctelera…)
y los títulos de los programas de La Coctelera siguen en catalán.

**Cómo cambiar o añadir un texto:**
1. En `index.html`, el texto en catalán lleva una etiqueta, por ejemplo `data-i18n="act.cuina"`.
2. En `js/idiomes.js`, busca esa misma clave (`"act.cuina"`) en `es` y en `en` y cambia la traducción.
3. Si añades un texto nuevo, ponle un `data-i18n="clave-nueva"` y añade `"clave-nueva"` en `es` y en `en`.
   Si falta una traducción, se ve en catalán.

Nota: como la traducción la hace la propia página, Google indexará la versión en catalán.
Si más adelante se quiere que las versiones en castellano e inglés salgan en Google por separado,
habría que crear páginas `/es/` y `/en/`.

## Accesibilidad

Botón **Accessibilitat** en la cabecera (y en el pie). Abre un panel con:

- **Perfil "Ceguesa o baixa visió"**: alto contraste (negro, blanco y amarillo), texto muy grande,
  enlaces subrayados y sin animaciones.
- **Escolta la pàgina**: lee la web en voz alta desde donde estés y marca el párrafo que suena
  (con Pausa / Continua / Atura). Usa la voz catalana del dispositivo si la tiene; si no, una voz en castellano.
- **Perfil "Persona sorda"**: marca con VÍDEO o ÀUDIO lo que tiene sonido (La Coctelera y los reels)
  y explica cómo pedir el texto; recuerda que se puede contactar por escrito sin llamar.
- **Ajustes sueltos**: tamaño de texto (A / A+ / A++), alto contraste, subrayar enlaces,
  más espacio entre líneas y parar animaciones. Se recuerdan en cada navegador.

Además, para lectores de pantalla (NVDA, JAWS, VoiceOver, TalkBack): encabezados ordenados,
textos alternativos en las fotos, enlace "Vés al contingut", aviso de los enlaces que abren pestaña nueva
y todo se puede usar con el teclado.

Para que funcione bien de verdad, el CIO tendría que:

- **Responder** cuando una persona sorda pida el texto de un vídeo o de La Coctelera (la web lo ofrece).
- **Subtitular** los vídeos de Instagram siempre que se pueda.
- **Vídeo en lengua de signos (LSC)**: si se graba una presentación, pon el enlace en `VIDEO_LSC = ""`
  dentro de `js/main.js` y aparecerá en el modo para personas sordas.
- Probar la web con alguna persona usuaria ciega o sorda antes de publicarla.

## Logo e iconos

Colores de la web: blanco y rojo (`#c8102e`). El logo es **CIO** en rojo con **iniciatives** debajo.

| Archivo | Para qué |
|---|---|
| `img/logo.svg` | Logo sin fondo (documentos, carteles…) |
| `img/icono.svg` | Icono cuadrado con fondo blanco, en vectorial |
| `img/icono-512.png` | Icono 512 × 512 (foto de perfil en redes, WhatsApp…) |
| `img/icono-180.png` | Icono para iPhone/iPad (cuando guardan la web en la pantalla de inicio) |
| `img/icono-192.png`, `img/icono-maskable-512.png` | Iconos para Android (pantalla de inicio, con el nombre "CIO Iniciatives") |
| `img/favicon.svg`, `img/favicon.ico`, `img/favicon-32.png` | Iconito de la pestaña del navegador y de los favoritos (solo "CIO", porque en pequeño "iniciatives" no se leería) |
| `site.webmanifest` | Nombre e iconos de la web cuando se guarda como app en el móvil |
| `img/og.png` | Imagen que sale al compartir el enlace (1200 × 630) |

Los PNG llevan la tipografía exacta (Bricolage Grotesque). En los SVG la palabra "iniciatives" es texto:
si el ordenador no tiene esa fuente instalada se ve con Arial; para imprimir, mejor usar los PNG.

## Fotos

Mientras no haya fotos, cada hueco muestra un fondo de color con rayas de "fil" y un título.
Al poner una imagen con el nombre exacto en `img/`, aparece sola (no hay que tocar el HTML).
Formato recomendado: JPG, unos 1600 px de ancho como máximo.

| Archivo | Dónde sale | Estado / foto sugerida |
|---|---|---|
| `img/news-gossos.jpg` | Portada + Notícies | ✅ Puesta (Instagram, 23/10/2026) |
| `img/news-vaga.jpg` | Portada + Notícies | ✅ Puesta (Instagram, 07/10/2026) |
| `img/news-cruilla.jpg` | Portada + Notícies | ✅ Puesta (Instagram, 13/07/2026) |
| `img/news-bingo.jpg` | Notícies | ✅ Puesta (portada del vídeo, 23/07/2026) |
| `img/news-taller.jpg` | Notícies | ✅ Puesta (portada del vídeo, 10/07/2026) |
| `img/news-muhba.jpg` | Notícies | ✅ Puesta (portada del vídeo, 20/05/2026) |
| `img/proj-samarretes.jpg` | Projectes | ✅ Puesta (portada del vídeo, 19/07/2026) |
| `img/centre.jpg` | El CIO | ❌ Falta: una foto del espacio del centro |
| `img/proj-receptari.jpg` | Projectes | ❌ Falta: algún plato del taller de cocina |
| `img/proj-coctelera.jpg` | Projectes | ❌ Falta: grabando La Coctelera en Ràdio Fabra |
| `img/proj-sensibilitzacio.jpg` | Projectes | ❌ Falta: 8M, Sant Jordi o una manifestación |

Las fotos puestas se descargaron de Instagram a 640 px. Las que vienen de vídeos (reels) llevan
el icono de "play" incrustado por Instagram; en la web, al pulsar la foto se abre el vídeo.
Si tenéis los originales, mejor sustituirlas por fotos sin icono y a más resolución (mismo nombre de archivo).

## Datos pendientes de confirmar

- **Correo y teléfono** del CIO (en Contacte sale "Pendent d'afegir").
- **Dirección exacta**: ahora pone la general del recinte Fabra i Coats (C. de Sant Adrià, 20, 08030).
- **Horario, plazas y entidad que gestiona el centro**, si se quieren mostrar como en cosinia.cat.
- **Formulario**: en `js/main.js`, busca `CONTACT_EMAIL = ""` y pon el correo. Así el botón prepara un email con el mensaje.
  Si se quiere que envíe sin abrir el programa de correo, hay que conectarlo a un servicio (Formspree, el propio hosting, WordPress…).
- **Aviso legal y política de privacidad**: no están incluidos.

## Noticias

Las 6 noticias salen de las últimas publicaciones de Instagram (mayo–octubre 2026).
Para añadir una nueva, copia un bloque `<li class="note">…</li>` dentro de la sección `noticies` y cambia fecha, texto, foto y enlace.
