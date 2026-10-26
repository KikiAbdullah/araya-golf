const iconPaths = {};
async function loadIcons(){
  try{
    const response = await fetch('assets/icons/phosphor-paths.json');
    Object.assign(iconPaths, await response.json());
    document.querySelectorAll('[data-icon]').forEach(renderIcon);
  }catch(error){console.warn('Ikon lokal belum dapat dimuat.',error)}
}
function renderIcon(el){
  const paths=iconPaths[el.dataset.icon];
  if(!paths)return;
  el.innerHTML=`<svg class="icon" viewBox="0 0 256 256" aria-hidden="true" focusable="false">${paths.map(d=>`<path d="${d}"></path>`).join('')}</svg>`;
}
loadIcons();

const menuButton=document.querySelector('.menu-toggle');
const mobileMenu=document.querySelector('.mobile-menu');
menuButton?.addEventListener('click',()=>{
  const open=mobileMenu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded',String(open));
  menuButton.setAttribute('aria-label',open?'Tutup menu':'Buka menu');
  mobileMenu.setAttribute('aria-hidden',String(!open));
  const icon=menuButton.querySelector('[data-icon]');
  icon.dataset.icon=open?'x':'list';renderIcon(icon);
});
mobileMenu?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden','true');
  menuButton.setAttribute('aria-expanded','false');
  menuButton.setAttribute('aria-label','Buka menu');
  const icon=menuButton.querySelector('[data-icon]');icon.dataset.icon='list';renderIcon(icon);
}));

const gallery=document.querySelector('#gallery-track');
const galleryStep=()=>Math.min(gallery.clientWidth*.72,440);
document.querySelector('#gallery-next')?.addEventListener('click',()=>gallery.scrollBy({left:galleryStep(),behavior:'smooth'}));
document.querySelector('#gallery-prev')?.addEventListener('click',()=>gallery.scrollBy({left:-galleryStep(),behavior:'smooth'}));

const faqItems=[...document.querySelectorAll('.faq-list details')];
function syncFaqIcon(item){
  const icon=item.querySelector('summary [data-icon]');
  if(!icon)return;
  icon.dataset.icon=item.open?'minus':'plus';renderIcon(icon);
}
faqItems.forEach(item=>item.addEventListener('toggle',()=>{
  if(item.open)faqItems.forEach(other=>{if(other!==item&&other.open)other.open=false});
  faqItems.forEach(syncFaqIcon);
}));
