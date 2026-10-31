(() => {
  const section = document.querySelector('#visitas');
  if (!section) return;
  const pages = [...section.querySelectorAll('.visit-page')];
  const buttons = [...section.querySelectorAll('[data-visit-page]')];
  const status = section.querySelector('#visits-status');
  function showPage(index) {
    pages.forEach((page, i) => {
      page.hidden = i !== index;
      if (page.hidden) page.querySelectorAll('details[open]').forEach(detail => { detail.open = false; });
    });
    buttons.forEach((button, i) => {
      if (i === index) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    status.textContent = `Visitas ${index * 3 + 1}–${index * 3 + 3} de 6 · ${index === 0 ? '2026' : '2025'}`;
  }
  buttons.forEach((button, i) => button.addEventListener('click', () => showPage(i)));
  showPage(0);
  section.querySelector('.visit-navigation').hidden = false;
})();
