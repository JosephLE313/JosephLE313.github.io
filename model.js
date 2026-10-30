const stage = document.querySelector('.model-stage');
const model = document.querySelector('#rosa-model');
const loadModel = document.querySelector('#load-rosa-model');
const modelStatus = document.querySelector('#model-status');
const modelPoster = document.querySelector('.model-poster');
const modelTools = document.querySelector('.model-tools');
const initialOrbit = '35deg 40deg 95%';

model.addEventListener('progress', event => {
  if (!modelTools.hidden) return;
  modelStatus.textContent = `Cargando modelo… ${Math.round(event.detail.totalProgress * 100)} %`;
});
model.addEventListener('load', () => {
  modelPoster.hidden = true;
  loadModel.hidden = true;
  modelTools.hidden = false;
  model.removeAttribute('aria-busy');
  modelStatus.textContent = 'Arrastra para girar · rueda o pellizco para acercar.';
});
function modelFailure() {
  model.hidden = true;
  modelTools.hidden = true;
  modelPoster.hidden = false;
  loadModel.hidden = false;
  loadModel.disabled = false;
  loadModel.textContent = 'Reintentar modelo 3D';
  model.removeAttribute('aria-busy');
  modelStatus.textContent = 'No se pudo abrir el modelo. Puedes reintentar o consultar los planos de abajo.';
}
model.addEventListener('error', modelFailure);
loadModel.addEventListener('click', async () => {
  loadModel.disabled = true;
  modelStatus.textContent = 'Preparando visor 3D…';
  try {
    // ponytail: load the viewer and geometry only after an explicit interaction.
    const { ModelViewerElement } = await import('./assets/vendor/model-viewer.min.js');
    ModelViewerElement.dracoDecoderLocation = new URL('./assets/vendor/draco/', import.meta.url).href;
    model.hidden = false;
    model.setAttribute('aria-busy', 'true');
    model.removeAttribute('src');
    model.src = 'assets/rosa-america-v2.glb';
  } catch { modelFailure(); }
});
document.querySelector('#reset-model').addEventListener('click', () => {
  model.cameraOrbit = initialOrbit;
  model.cameraTarget = 'auto auto auto';
  model.fieldOfView = 'auto';
});
const fullscreen = document.querySelector('#expand-model');
fullscreen.hidden = !document.fullscreenEnabled;
fullscreen.addEventListener('click', async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await stage.requestFullscreen();
  } catch { modelStatus.textContent = 'El navegador no permitió la pantalla completa. Puedes seguir explorando aquí.'; }
});
document.addEventListener('fullscreenchange', () => {
  fullscreen.textContent = document.fullscreenElement ? 'Salir de pantalla completa' : 'Pantalla completa';
});
