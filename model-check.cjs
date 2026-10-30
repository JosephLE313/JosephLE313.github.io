const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');

const glb = fs.readFileSync(path.join(__dirname, 'assets/rosa-america.glb'));
assert.equal(glb.subarray(0,4).toString(), 'glTF');
assert.equal(glb.readUInt32LE(4), 2);
assert.equal(glb.readUInt32LE(8), glb.length);
const length = glb.readUInt32LE(12);
assert.equal(glb.readUInt32LE(16), 0x4e4f534a);
const scene = JSON.parse(glb.subarray(20,20+length).toString());
assert(scene.extensionsRequired.includes('KHR_draco_mesh_compression'));
assert.equal(scene.materials.length, 93);
assert(scene.meshes[0].primitives.length > 0);
assert(!scene.buffers.some(buffer => buffer.uri), 'Geometry must be self-contained');
for (const view of scene.bufferViews) assert((view.byteOffset || 0) + view.byteLength <= scene.buffers[0].byteLength);

function setup({failedImport=false,fullscreen=true}={}) {
  const elements={}; let imports=0; const ModelViewerElement={};
  for (const selector of ['.model-stage','#rosa-model','#load-rosa-model','#model-status','.model-poster','.model-tools','#reset-model','#expand-model']) {
    elements[selector]={hidden:false,disabled:false,textContent:'',events:{},attrs:{},addEventListener(name,fn){this.events[name]=fn;},setAttribute(k,v){this.attrs[k]=v;},removeAttribute(k){delete this.attrs[k];}};
  }
  elements['.model-tools'].hidden=true;
  const doc={fullscreenEnabled:fullscreen,fullscreenElement:null,events:{},querySelector:s=>elements[s],addEventListener(k,fn){this.events[k]=fn;},async exitFullscreen(){this.fullscreenElement=null;}};
  elements['.model-stage'].requestFullscreen=async()=>{doc.fullscreenElement=elements['.model-stage'];};
  const code=fs.readFileSync(path.join(__dirname,'model.js'),'utf8').replace("await import('./assets/vendor/model-viewer.min.js')",'await testImport()').replaceAll('import.meta.url',"'https://portfolio.test/model.js'");
  vm.runInNewContext(code,{document:doc,URL,testImport:async()=>{imports++;if(failedImport)throw Error('Network failed');return {ModelViewerElement};}});
  return {elements,doc,ModelViewerElement,imports:()=>imports};
}
(async()=>{
  const t=setup(), e=t.elements, model=e['#rosa-model'];
  assert.equal(t.imports(),0);assert.equal(model.src,undefined);
  await e['#load-rosa-model'].events.click();assert.equal(t.imports(),1);assert.equal(model.src,'assets/rosa-america.glb');assert.equal(t.ModelViewerElement.dracoDecoderLocation,'https://portfolio.test/assets/vendor/draco/');
  model.events.load();assert(e['.model-poster'].hidden);assert(e['#load-rosa-model'].hidden);assert(!e['.model-tools'].hidden);
  const done=e['#model-status'].textContent;model.events.progress({detail:{totalProgress:1}});assert.equal(e['#model-status'].textContent,done);
  e['#reset-model'].events.click();assert.equal(model.cameraOrbit,'35deg 40deg 95%');
  await e['#expand-model'].events.click();assert(t.doc.fullscreenElement);t.doc.events.fullscreenchange();assert(e['#expand-model'].textContent.includes('Salir'));
  await e['#expand-model'].events.click();assert.equal(t.doc.fullscreenElement,null);
  model.events.error();assert(model.hidden);assert(!e['.model-poster'].hidden);assert(!e['#load-rosa-model'].disabled);assert(e['.model-tools'].hidden);
  const bad=setup({failedImport:true,fullscreen:false});await bad.elements['#load-rosa-model'].events.click();assert(bad.elements['#rosa-model'].hidden);assert(!bad.elements['#load-rosa-model'].disabled);assert(bad.elements['#expand-model'].hidden);
  console.log(`PASS: self-contained Draco GLB (${(glb.length/1e6).toFixed(1)} MB, 93 materials), load on click, loading completion, failure/retry, reset, fullscreen and local decoder.`);
})().catch(error=>{console.error(error);process.exitCode=1;});
