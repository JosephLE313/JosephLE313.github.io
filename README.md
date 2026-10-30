# Joseph Leonardo Ccana Ayuque · Portafolio profesional

Sitio público: https://josephle313.github.io/
Repositorio: https://github.com/JosephLE313/JosephLE313.github.io

## Ejecutar y comprobar

Abre `index.html` directamente o sirve este directorio con cualquier servidor estático. No requiere instalación, compilación ni nuevas dependencias. Las fuentes de Google tienen respaldo local del sistema.

Con Node.js: `node --check script.js` y `node check.cjs`. La comprobación cubre recursos y enlaces internos, catorce secciones, seis proyectos con funciones y habilidades, menú, Escape, sección activa, progreso, copia de correo, partículas y ampliación de imágenes con zoom.

## Publicar

El repositorio está conectado a GitHub Desktop. Guarda los cambios, crea un commit y usa **Push origin**. GitHub Pages publica `main` desde la raíz del repositorio. Espera a que termine el despliegue. Los parámetros de versión de CSS y JS evitan conservar la versión anterior tras este rediseño.

## Organización y archivos modificados

- `index.html`: catorce secciones semánticas. Cada proyecto principal presenta descripción, misión, funciones y habilidades a la izquierda; la evidencia visual aparece a la derecha. El contenido y las imágenes originales siguen accesibles sin JavaScript.
- `projects.css`: composición de proyectos, franja de habilidades, planos, video, galería de campo y diálogo de ampliación. Reutiliza los colores y las fuentes del sitio.
- `style.css`: diseño arquitectónico azul oscuro y verde suave, retícula, componentes reutilizables, escritorio/tablet/móvil, scroll snap opcional por proximidad y movimiento reducido.
- `script.js`: menú, progreso y capítulo activo, entradas discretas, copia de correo y capa de partículas. El Canvas no modifica la foto: desplaza únicamente puntos superpuestos, con un máximo de 12 px de repulsión. Solo anima al interactuar y al asentarse; se desactiva con puntero táctil, movimiento reducido o pestaña oculta. Escala de píxeles limitada a 2.
- `assets/`: retrato y fotografías reales, tres planos PDF del CETPRO y sus vistas WebP, capturas y video de demostración de RC Bot, CV y portafolio documental original. No se incluyen workflows, credenciales ni archivos RVT.
- `check.cjs`: verificaciones ejecutables sin dependencias adicionales.
- Se retiraron `home.css`, `home.js`, `rock.svg` y `distress.svg`, que pertenecían a la portada anterior.

## Fuentes y alcance del contenido

Base documental proporcionada: CV, portafolio documental, fotografías, tres planos de señalización/evacuación, presentación Nexo Sísmico Demo Day e instrucciones escritas por Joseph. La portada incorpora la frase solicitada «Ingeniero Civil con visión tecnológica», manteniendo la condición de estudiante de Ingeniería Civil junto al nombre.

El CETPRO, la vivienda BIM, las investigaciones experimentales y el puente se identifican como trabajos académicos. El monitoreo está en desarrollo. Nexo Sísmico distingue el aporte de Joseph (bot de Telegram, validación y coordinación, según la diapositiva del equipo) de los componentes desarrollados por sus compañeros. No se publican porcentajes de precisión ni se atribuye validación profesional al prototipo. La presentación menciona diferentes algoritmos de aprendizaje automático; no se elige uno sin comprobar la versión del código.

El video `nexo-bot-demo.mp4` procede de la demostración local aportada en el contexto de RC Bot. Sus escenas muestran la configuración con tokens ocultos, los flujos de n8n, la conversación y un informe con datos sintéticos. Se ofrece una descripción textual del recorrido y reproducción manual; no hay audio automático.

No se afirman porcentajes de mejora, precisión, carga máxima, premios ni ahorros sin documentación. El octavo ciclo y las capacitaciones en curso reflejan el CV aportado, no una verificación administrativa posterior. BIM/VDC se muestra como área de profundización.

## Recursos que faltan para ampliar el contenido

- Exportaciones GLB/IFC de los dos modelos Revit para completar la visualización 3D; los archivos RVT originales se conservan fuera del repositorio.
- Planos de vigas, losas y columnas de la vivienda en un formato publicable.
- Nueva fotografía para la sección de trayectoria, anunciada por Joseph y todavía no recibida.
- Resultados y reportes experimentales que se autoricen publicar.
- Repositorio, metodología y evaluación del algoritmo de monitoreo estructural.

No hay dependencias de servicios para los enlaces internos o los PDF. LinkedIn y GitHub abren sitios externos; el correo usa el cliente de correo del visitante. El botón Copiar correo usa Clipboard API y muestra el texto para copia manual cuando el navegador no lo permite.

## Validación de esta entrega

Pasaron sintaxis, `node check.cjs` y solicitudes HTTP de los 22 recursos enlazados. Se comprobó el diseño en el navegador de escritorio y a 390 px: sin desbordamiento horizontal; menú móvil, ampliación de un plano, zoom al 300 %, cierre con Escape y restauración del foco. El video cargó y reprodujo correctamente (109,79 s, estado readyState 4); se comprobó reproducción/pausa con teclado, sin errores de consola. Utiliza carga diferida hasta la interacción.

La conversión de modelos no se ejecutó: Revit devolvió el consentimiento de Python como rechazado o cancelado. Python permanece desactivado; no se guardaron cambios en los RVT. La interfaz no simula que los modelos sean interactivos.
