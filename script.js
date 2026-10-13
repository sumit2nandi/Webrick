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
const projects = {
  forma: {
    title: 'Forma Studio',
    description: 'A bold, expressive website concept for an independent creative studio. Playful shapes, confident typography, and a clear story make space for the work to shine. Designed to feel just as considered on a phone as on a desktop.',
    tags: ['Brand-led design', 'Responsive development', 'Portfolio experience']
  },
  nook: {
    title: 'Nook Living',
    description: 'A warm, thoughtfully minimal e-commerce concept for everyday objects. An editorial approach to product discovery, natural colors, and an uncluttered shopping journey bring the brand’s less-but-better philosophy to life.',
    tags: ['E-commerce', 'Product discovery', 'Responsive design']
  }
};
const dialog = document.getElementById('project-dialog');
document.querySelectorAll('[data-project]').forEach(card => {
  card.addEventListener('click', () => {
    const project = projects[card.dataset.project];
    document.getElementById('dialog-title').textContent = project.title;
    document.getElementById('dialog-description').textContent = project.description;
    const tags = document.getElementById('dialog-tags');
    tags.replaceChildren(...project.tags.map(text => { const tag = document.createElement('span'); tag.textContent = text; return tag; }));
    dialog.showModal();
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
document.getElementById('dialog-cta').addEventListener('click', () => {
  dialog.close();
  document.getElementById('service-select').value = 'Website design & development';
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
