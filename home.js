const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion) {
  const intro = document.createElement('div');
  intro.className = 'intro-screen';
  const name = document.createElement('p');
  name.setAttribute('aria-hidden', 'true');
  const skip = document.createElement('button');
  skip.textContent = 'Omitir intro';
  intro.append(name, skip);
  document.body.append(intro);
  const label = 'Joseph Ccana';
  let index = 0;
  let closeTimer;
  const finish = () => {
    clearInterval(typing);
    clearTimeout(closeTimer);
    intro.classList.add('done');
    if (intro.contains(document.activeElement)) document.querySelector('.monogram').focus();
    setTimeout(() => intro.remove(), 550);
  };
  const typing = setInterval(() => {
    name.textContent = label.slice(0, ++index);
    if (index === label.length) { clearInterval(typing); closeTimer = setTimeout(finish, 600); }
  }, 105);
  skip.addEventListener('click', finish);
  document.addEventListener('keydown', event => { if (event.key === 'Escape') finish(); });
}

// Initials are a placeholder until Joseph supplies his portrait.
const canvas = document.querySelector('#particle-mark');
const context = canvas.getContext('2d');
function drawParticles() {
  const width = Math.round(canvas.clientWidth);
  const height = Math.round(canvas.clientHeight);
  if (!width || !height || !context) return;
  const scale = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = width * scale;
  canvas.height = height * scale;
  context.setTransform(scale, 0, 0, scale, 0, 0);
  const mask = document.createElement('canvas');
  mask.width = width;
  mask.height = height;
  const pen = mask.getContext('2d');
  pen.fillStyle = '#fff';
  pen.font = `700 ${Math.min(width * .9, height * .75)}px "UnifrakturCook", Georgia`;
  pen.textAlign = 'center';
  pen.textBaseline = 'middle';
  pen.fillText('JL', width / 2, height * .48);
  const pixels = pen.getImageData(0, 0, width, height).data;
  for (let y = 0; y < height; y += 4) {
    for (let x = 0; x < width; x += 4) {
      if (pixels[(y * width + x) * 4 + 3] < 100) continue;
      const random = ((x * 37 + y * 61) % 97) / 97;
      context.fillStyle = `rgba(218,207,177,${.25 + random * .65})`;
      context.beginPath();
      context.arc(x + random * 2, y + random * 2, .5 + random * 1.1, 0, Math.PI * 2);
      context.fill();
    }
  }
}
document.fonts.ready.then(drawParticles);
let resizeTimer;
window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(drawParticles, 100); });
