const menu = document.querySelector('.menu');
document.querySelectorAll('.menu nav a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary').focus(); }
});
const chapters = [...document.querySelectorAll('main > section')];
const chapterLinks = [...document.querySelectorAll('.chapter-nav a, .desktop-nav a')];
const progress = document.querySelector('.scroll-progress span');
let scheduled = false;
function updateScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0})`;
  const active = chapters.reduce((selected, section) => section.getBoundingClientRect().top <= innerHeight * .4 ? section : selected, chapters[0]);
  chapterLinks.forEach(link => {
    if (link.hash === `#${active.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scheduled = false;
}
addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); } }, { passive:true });
addEventListener('resize', updateScroll);
updateScroll();
const motion = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !motion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('reveal'); observer.unobserve(entry.target); }
    });
  }, { threshold:.12 });
  document.querySelectorAll('.section-top, .about-layout, .project-card, .research-layout, .skills-grid, .objectives blockquote').forEach(element => observer.observe(element));
}
const email = 'joseph200345@gmail.com';
document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    if (!navigator.clipboard) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(email);
    status.textContent = 'Correo copiado.';
  } catch { status.textContent = `Puedes copiar el correo manualmente: ${email}`; }
});
// The original photograph is intact. Canvas only paints a light overlay.
const stage = document.querySelector('.portrait-stage');
const canvas = document.querySelector('#portrait-particles');
const context = canvas.getContext('2d');
const cursorDevice = matchMedia('(hover: hover) and (pointer: fine)');
let points = [], width = 0, height = 0, frame = 0, hovered = false, lastTime = 0, leaveTime = 0;
let pointer = {x:-1000,y:-1000};
function enabled() { return !!context && cursorDevice.matches && !motion.matches && !document.hidden; }
function stopParticles() {
  cancelAnimationFrame(frame); frame = 0; hovered = false;
  if (context) context.clearRect(0,0,width,height);
}
function resizeParticles() {
  stopParticles();
  const rect = stage.getBoundingClientRect(); width = rect.width; height = rect.height;
  const ratio = Math.min(devicePixelRatio || 1,2);
  canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
  if (!context) return;
  context.setTransform(ratio,0,0,ratio,0,0);
  points = Array.from({length:78}, (_,i) => {
    const angle = i * 2.39996323, radius = .28 + ((i*29)%41)/100;
    const x = width/2 + Math.cos(angle)*width*radius, y = height/2 + Math.sin(angle)*height*radius;
    return {x,y,homeX:x,homeY:y,size:.6+(i%3)*.35};
  });
}
function paintParticles(time) {
  frame = 0;
  if (!enabled()) { stopParticles(); return; }
  const step = Math.min((time-lastTime)/16.67 || 1,2); lastTime = time;
  context.clearRect(0,0,width,height);
  let unsettled = false;
  points.forEach(point => {
    const dx = point.homeX-pointer.x, dy = point.homeY-pointer.y, distance = Math.hypot(dx,dy);
    const strength = hovered ? Math.max(0,1-distance/115)*12 : 0;
    const targetX = point.homeX+dx/(distance||1)*strength, targetY = point.homeY+dy/(distance||1)*strength;
    point.x += (targetX-point.x)*.12*step; point.y += (targetY-point.y)*.12*step;
    if (Math.abs(targetX-point.x)+Math.abs(targetY-point.y)>.08) unsettled = true;
    const opacity = hovered ? .3 : Math.max(0,.3-(time-leaveTime)/1200);
    context.fillStyle = `rgba(156,226,204,${opacity})`;
    context.beginPath(); context.arc(point.x,point.y,point.size,0,Math.PI*2); context.fill();
  });
  if (hovered || unsettled || time-leaveTime<400) frame = requestAnimationFrame(paintParticles);
  else context.clearRect(0,0,width,height);
}
stage.addEventListener('pointerenter', () => {
  if (!enabled()) return;
  hovered = true; lastTime = performance.now();
  if (!frame) frame = requestAnimationFrame(paintParticles);
});
stage.addEventListener('pointermove', event => {
  if (!enabled()) return;
  const rect = stage.getBoundingClientRect(); pointer = {x:event.clientX-rect.left,y:event.clientY-rect.top};
});
stage.addEventListener('pointerleave', () => { hovered = false; leaveTime = performance.now(); pointer = {x:-1000,y:-1000}; });
motion.addEventListener('change', stopParticles);
cursorDevice.addEventListener('change', stopParticles);
document.addEventListener('visibilitychange', stopParticles);
if ('ResizeObserver' in window) new ResizeObserver(resizeParticles).observe(stage);
else addEventListener('resize', resizeParticles);
resizeParticles();
