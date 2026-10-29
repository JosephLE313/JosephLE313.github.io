# Joseph Leonardo Ccana Ayuque · Portafolio profesional

Sitio público: https://josephle313.github.io/
Repositorio: https://github.com/JosephLE313/JosephLE313.github.io

## Ejecutar y comprobar

Abre `index.html` directamente o sirve este directorio con cualquier servidor estático. No requiere instalación, compilación ni nuevas dependencias. Las fuentes de Google tienen respaldo local del sistema.

Con Node.js: `node --check script.js` y `node check.cjs`. La comprobación cubre recursos y enlaces internos, ocho secciones, seis proyectos ampliables, menú, Escape, sección activa, progreso, copia de correo con alternativa y partículas con guardas de accesibilidad.

## Publicar

El repositorio está conectado a GitHub Desktop. Guarda los cambios, crea un commit y usa **Push origin**. GitHub Pages publica `main` desde la raíz del repositorio. Espera a que termine el despliegue. Los parámetros de versión de CSS y JS evitan conservar la versión anterior tras este rediseño.

## Organización y archivos modificados

- `index.html`: ocho secciones semánticas, contenido profesional, navegación, CV, contacto y proyectos con elementos `details` nativos. El contenido sigue accesible sin JavaScript.
- `style.css`: diseño arquitectónico azul oscuro y verde suave, retícula, componentes reutilizables, escritorio/tablet/móvil, scroll snap opcional por proximidad y movimiento reducido.
- `script.js`: menú, progreso y capítulo activo, entradas discretas, copia de correo y capa de partículas. El Canvas no modifica la foto: desplaza únicamente puntos superpuestos, con un máximo de 12 px de repulsión. Solo anima al interactuar y al asentarse; se desactiva con puntero táctil, movimiento reducido o pestaña oculta. Escala de píxeles limitada a 2.
- `assets/`: retrato y fotos reales optimizadas a WebP, CV original y portafolio documental original. No hay retratos generados ni renders ficticios.
- `check.cjs`: verificaciones ejecutables sin dependencias adicionales.
- Se retiraron `home.css`, `home.js`, `rock.svg` y `distress.svg`, que pertenecían a la portada anterior.

## Fuentes y alcance del contenido

Base documental proporcionada: CV de tres páginas y portafolio de diez páginas; fotografías profesionales y de laboratorio aportadas en esta conversación. La trayectoria, formación y proyectos proceden de esos documentos. El texto «Ingeniería civil con visión tecnológica» fue proporcionado por Joseph. Se conserva el título de estudiante; no se atribuye título profesional.

La vivienda BIM, respuesta sísmica, concreto ligero y puente de fideos se identifican como proyectos académicos o de investigación. El monitoreo estructural está en desarrollo. La IA para interpretar planos es una iniciativa propuesta: no se presenta como producto implementado. TypeScript, React y Vite se verificaron en el repositorio público Control_de_Obra_front durante la preparación inicial.

No se afirman porcentajes de mejora, precisión, carga máxima, premios ni ahorros sin documentación. El octavo ciclo y las capacitaciones en curso reflejan el CV aportado, no una verificación administrativa posterior. BIM/VDC se muestra como área de profundización.

## Recursos que faltan para ampliar el contenido

- Capturas de Revit y archivos o vistas compartibles de la vivienda BIM.
- Resultados y reportes experimentales que se autoricen publicar.
- Repositorio, metodología y evaluación del algoritmo de monitoreo estructural.
- Alcance, prototipo y evaluación de la iniciativa de interpretación de planos con IA.

No hay dependencias de servicios para los enlaces internos o los PDF. LinkedIn y GitHub abren sitios externos; el correo usa el cliente de correo del visitante. El botón Copiar correo usa Clipboard API y muestra el texto para copia manual cuando el navegador no lo permite.

## Validación de esta entrega

Pasaron la comprobación de sintaxis y `node check.cjs`, así como las solicitudes HTTP de los once recursos enlazados, incluidos ambos PDF. La validación visual automatizada en escritorio y móvil no pudo completarse: el controlador del navegador falló al iniciar con «failed to write kernel assets». Los puntos de corte responsive y las guardas de movimiento reducido/puntero táctil están implementados, pero esa revisión visual queda pendiente; las pruebas de lógica no la sustituyen.
