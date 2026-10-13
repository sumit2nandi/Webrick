const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.desktop-nav');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
window.addEventListener('resize', () => { if (window.innerWidth > 600) closeMenu(); });
document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('[data-service]').forEach(card => {
  card.addEventListener('click', () => { document.getElementById('service-select').value = card.dataset.service; });
});
// Static-site contact: opens a draft, and never claims the message was sent.
// Replace the destination below with your verified business inbox before publishing.
const contactEmail = 'hello@webricktechnologies.com';
document.getElementById('contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = `Project enquiry: ${data.get('service')}`;
  const body = `Hello Webrick Technologies,\n\n${data.get('message').trim()}\n\nName: ${data.get('name').trim()}\nEmail: ${data.get('email').trim()}\nService: ${data.get('service')}`;
  const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
  const status = document.querySelector('.form-status');
  status.replaceChildren(document.createTextNode('Your email draft is ready. Send it from your mail app to complete your enquiry. If it didn’t open, '));
  const retry = document.createElement('a');
  retry.href = mailto;
  retry.textContent = 'open the draft here.';
  retry.style.textDecoration = 'underline';
  status.appendChild(retry);
});
