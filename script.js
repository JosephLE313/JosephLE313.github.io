// Native anchors and details keep navigation usable without JavaScript.
const menu = document.querySelector('.menu');
document.querySelectorAll('.menu nav a').forEach(link => {
  link.addEventListener('click', () => { menu.open = false; });
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.open) {
    menu.open = false;
    menu.querySelector('summary').focus();
  }
});
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('.progress a')];
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      links.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-20% 0px -50% 0px' });
  document.querySelectorAll('main > section').forEach(section => observer.observe(section));
}
