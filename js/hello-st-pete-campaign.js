(() => {
 const slider = document.querySelector('.st-journey-slider');
 if (!slider) return;
 const slides = [...slider.querySelectorAll('.st-journey-slide')];
 const status = slider.querySelector('[aria-live]');
 let index = 0;
 const show = step => {
   index = (index + step + slides.length) % slides.length;
   slides.forEach((slide, i) => { slide.hidden = i !== index; });
   status.textContent = String(index + 1).padStart(2, '0') + ' / 04';
 };
 slider.querySelectorAll('button[data-step]').forEach(button => button.addEventListener('click', () => show(Number(button.dataset.step))));
 slider.addEventListener('keydown', event => {
   if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); show(event.key === 'ArrowRight' ? 1 : -1); }
 });
})();
