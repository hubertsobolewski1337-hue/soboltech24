const grid = document.getElementById('productGrid');
const soldGrid = document.getElementById('soldGrid');
const searchInput = document.getElementById('searchInput');
const platformFilter = document.getElementById('platformFilter');
const statusFilter = document.getElementById('statusFilter');
const resultsCount = document.getElementById('resultsCount');
const soldResultsCount = document.getElementById('soldResultsCount');
const categoryChips = document.getElementById('categoryChips');
const menuBtn = document.getElementById('menuBtn');
const mainNav = document.getElementById('mainNav');
const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');

const STATUS_LABELS = { available:'Dostępny', reserved:'Zarezerwowany', sold:'Sprzedany' };
const PROFILE_URLS = {
  olx:'https://www.olx.pl/oferty/uzytkownik/4QzZV/',
  allegro:'https://allegrolokalnie.pl/uzytkownik/Sobolll_',
  vinted:'https://www.vinted.pl/member/3175187738-huberts2003'
};
let selectedCategory = 'all';
let activeGallery = [];
let activeGalleryIndex = 0;

document.getElementById('year').textContent = new Date().getFullYear();

function escapeHtml(s=''){
  return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
function safeUrl(url=''){
  try{
    const u = new URL(url,location.origin);
    return ['http:','https:'].includes(u.protocol) ? u.href : '#';
  }catch{return '#';}
}
function uniq(arr){return [...new Set(arr.filter(Boolean))].sort((a,b)=>a.localeCompare(b,'pl'));}
function statusOf(p){return p.status||'available';}
function currentPriceOf(p){return p.currentPrice||p.price||'';}
function oldPriceOf(p){return p.oldPrice||'';}
function discountPercent(oldPrice,currentPrice){
  const oldNum=Number(String(oldPrice).replace(/[^0-9,.-]/g,'').replace(',','.'));
  const curNum=Number(String(currentPrice).replace(/[^0-9,.-]/g,'').replace(',','.'));
  if(!oldNum||!curNum||curNum>=oldNum)return '';
  return Math.round((1-curNum/oldNum)*100);
}
function inferCategory(title=''){
  if(/pamięć ram|\bram\b|ddr[2345]/i.test(title))return 'RAM';
  if(/\bssd\b|\bhdd\b|dysk/i.test(title))return 'Dyski';
  if(/laptop|notebook/i.test(title))return 'Laptopy';
  if(/telefon|smartfon|iphone|galaxy/i.test(title))return 'Telefony';
  if(/płyta|procesor|touchpad|matryca|bateria|karta wi-?fi|karta sieciowa|moduł bluetooth|modem|chłodzeni|wentylator|radiator/i.test(title))return 'Części';
  return 'Akcesoria';
}
function specEntries(p){
  if(Array.isArray(p.specs))return p.specs.map(s=>Array.isArray(s)?{label:s[0],value:s[1]}:s).filter(s=>s&&s.value);
  if(p.specs&&typeof p.specs==='object')return Object.entries(p.specs).map(([label,value])=>({label,value}));
  return [];
}
function catalogProducts(){
  if(typeof CATALOGS==='undefined')return [];
  return Object.entries(CATALOGS).flatMap(([platform,items])=>(Array.isArray(items)?items:[]).map(item=>({
    title:item.title, category:inferCategory(item.title), platform:platform==='olx'?'OLX':'Allegro Lokalnie',
    status:'available', currentPrice:item.price,
    description:Array.isArray(item.bullets)?item.bullets.slice(0,2).join(' '):'',
    url:item.link||'', linkType:item.link&&/\/oferta\//.test(item.link)?'direct':'search', image:'', specs:[]
  })));
}
function productKey(p){return `${String(p.platform||'').toLowerCase()}|${String(p.title||'').trim().toLowerCase()}`;}
const CATALOG_PRODUCTS=catalogProducts();
const MANUAL_KEYS=new Set(PRODUCTS.map(productKey));
const SOURCE_PRODUCTS=[...PRODUCTS,...CATALOG_PRODUCTS.filter(p=>!MANUAL_KEYS.has(productKey(p)))];
SOURCE_PRODUCTS.forEach((p,i)=>p._siteIndex=i);

uniq(SOURCE_PRODUCTS.map(p=>p.platform)).forEach(v=>platformFilter.insertAdjacentHTML('beforeend',`<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`));

function specPreview(p){
  const specs=specEntries(p).slice(0,4);
  if(!specs.length)return '';
  return `<ul class="spec-preview">${specs.map(s=>`<li><b>${escapeHtml(s.label)}</b><span>${escapeHtml(s.value)}</span></li>`).join('')}</ul>`;
}
function linkLabel(p){return p.linkType==='direct'||/\/oferta\//.test(p.url||'')?'Zobacz ogłoszenie':'Znajdź ofertę';}
function productCard(p,sold=false){
  const status=statusOf(p), currentPrice=currentPriceOf(p), oldPrice=oldPriceOf(p), discount=discountPercent(oldPrice,currentPrice);
  const img=p.image?`<button class="product-image-button js-details" data-product-index="${p._siteIndex}" aria-label="Otwórz zdjęcie i szczegóły: ${escapeHtml(p.title)}"><img src="${escapeHtml(safeUrl(p.image))}" alt="${escapeHtml(p.title)}" loading="lazy" /></button>`:`<div class="product-placeholder" aria-hidden="true"><span>ST24</span><small>${escapeHtml(p.platform||'Oferta')}</small></div>`;
  return `<article class="product-card ${sold?'sold-card':''}">
    ${img}
    <div class="product-body">
      <div class="meta"><span class="chip">${escapeHtml(p.category||'Akcesoria')}</span><span class="chip">${escapeHtml(p.platform||'Platforma')}</span><span class="status-chip status-${escapeHtml(status)}">${escapeHtml(STATUS_LABELS[status]||status)}</span></div>
      <h3>${escapeHtml(p.title)}</h3>
      <p class="desc">${escapeHtml(p.description||'')}</p>
      ${specPreview(p)}
      <div class="price-row"><span class="price">${escapeHtml(currentPrice)}</span>${oldPrice?`<span class="old-price">${escapeHtml(oldPrice)}</span>`:''}${discount?`<span class="discount">-${discount}%</span>`:''}</div>
      <div class="product-actions">
        ${p.url&&status!=='sold'?`<a class="btn primary" href="${escapeHtml(safeUrl(p.url))}" target="_blank" rel="noopener noreferrer">${linkLabel(p)}</a>`:''}
        <button class="btn ghost js-details" type="button" data-product-index="${p._siteIndex}">Zdjęcia i parametry</button>
      </div>
    </div>
  </article>`;
}

function searchBlob(p){
  return `${p.title||''} ${p.category||''} ${p.platform||''} ${p.description||''} ${specEntries(p).map(s=>`${s.label} ${s.value}`).join(' ')}`.toLowerCase();
}
function render(){
  const q=searchInput.value.trim().toLowerCase(), plat=platformFilter.value, stat=statusFilter.value;
  const items=SOURCE_PRODUCTS.filter(p=>statusOf(p)!=='sold').filter(p=>(!q||searchBlob(p).includes(q))&&(selectedCategory==='all'||p.category===selectedCategory)&&(plat==='all'||p.platform===plat)&&(stat==='all'||statusOf(p)===stat));
  resultsCount.textContent=`${items.length} ${items.length===1?'oferta':'ofert'}`;
  grid.innerHTML=items.length?items.map(p=>productCard(p)).join(''):'<div class="empty">Brak ofert pasujących do wybranych filtrów.</div>';
}
function renderSold(){
  const sold=SOURCE_PRODUCTS.filter(p=>statusOf(p)==='sold');
  soldResultsCount.textContent=`${sold.length} ${sold.length===1?'pozycja':'pozycji'}`;
  soldGrid.innerHTML=sold.length?sold.map(p=>productCard(p,true)).join(''):'<div class="empty">Na razie brak produktów oznaczonych jako sprzedane.</div>';
}
function updateStats(){
  const available=SOURCE_PRODUCTS.filter(p=>statusOf(p)==='available').length;
  const reserved=SOURCE_PRODUCTS.filter(p=>statusOf(p)==='reserved').length;
  const sold=SOURCE_PRODUCTS.filter(p=>statusOf(p)==='sold').length;
  const catalogCount=CATALOG_PRODUCTS.length;
  document.getElementById('availableCount').textContent=available;
  document.getElementById('reservedCount').textContent=reserved;
  document.getElementById('soldCount').textContent=sold;
  document.getElementById('catalogCount').textContent=catalogCount;
  document.getElementById('heroActiveCount').textContent=available+reserved;
  document.getElementById('heroCatalogCount').textContent=catalogCount;
}

// Modal szczegółów tworzony dynamicznie — nie wymaga osobnej podstrony dla produktu.
const detailsModal=document.createElement('div');
detailsModal.className='details-modal';
detailsModal.setAttribute('aria-hidden','true');
detailsModal.innerHTML=`<div class="details-backdrop" data-close-details></div>
  <section class="details-panel" role="dialog" aria-modal="true" aria-labelledby="detailsTitle">
    <button class="details-close" type="button" data-close-details aria-label="Zamknij">×</button>
    <div class="details-gallery">
      <div class="gallery-stage"><img id="detailsImage" alt="" /></div>
      <div class="gallery-controls"><button type="button" id="galleryPrev" aria-label="Poprzedni widok">‹</button><span id="galleryCounter"></span><button type="button" id="galleryNext" aria-label="Następny widok">›</button></div>
      <div class="gallery-thumbs" id="galleryThumbs"></div>
      <p class="gallery-note" id="galleryNote"></p>
    </div>
    <div class="details-info">
      <div class="meta" id="detailsMeta"></div>
      <h2 id="detailsTitle"></h2>
      <p class="details-description" id="detailsDescription"></p>
      <div class="price-row" id="detailsPrice"></div>
      <h3>Parametry techniczne</h3>
      <div class="details-specs" id="detailsSpecs"></div>
      <div class="details-actions" id="detailsActions"></div>
    </div>
  </section>`;
document.body.append(detailsModal);
const detailsImage=document.getElementById('detailsImage');
const galleryStage=detailsModal.querySelector('.gallery-stage');
const galleryCounter=document.getElementById('galleryCounter');
const galleryThumbs=document.getElementById('galleryThumbs');
const galleryNote=document.getElementById('galleryNote');

function mediaFor(p){
  const actual=[...(Array.isArray(p.gallery)?p.gallery:[]),p.image].filter(Boolean);
  const unique=[...new Set(actual)];
  const media=unique.map((src,i)=>({src,zoom:false,label:`Zdjęcie ${i+1}`}));
  if(unique.length===1)media.push({src:unique[0],zoom:true,label:'Powiększenie'});
  return media;
}
function paintGallery(){
  const m=activeGallery[activeGalleryIndex];
  if(!m)return;
  detailsImage.src=safeUrl(m.src);
  galleryStage.classList.toggle('zoomed',!!m.zoom);
  galleryCounter.textContent=`${activeGalleryIndex+1} / ${activeGallery.length}`;
  galleryThumbs.querySelectorAll('button').forEach((b,i)=>b.classList.toggle('active',i===activeGalleryIndex));
}
function openDetails(p){
  activeGallery=mediaFor(p); activeGalleryIndex=0;
  const status=statusOf(p), cur=currentPriceOf(p), old=oldPriceOf(p), disc=discountPercent(old,cur), specs=specEntries(p);
  document.getElementById('detailsTitle').textContent=p.title||'';
  document.getElementById('detailsDescription').textContent=p.description||'';
  document.getElementById('detailsMeta').innerHTML=`<span class="chip">${escapeHtml(p.category||'Akcesoria')}</span><span class="chip">${escapeHtml(p.platform||'Platforma')}</span><span class="status-chip status-${escapeHtml(status)}">${escapeHtml(STATUS_LABELS[status]||status)}</span>`;
  document.getElementById('detailsPrice').innerHTML=`<span class="price">${escapeHtml(cur)}</span>${old?`<span class="old-price">${escapeHtml(old)}</span>`:''}${disc?`<span class="discount">-${disc}%</span>`:''}`;
  document.getElementById('detailsSpecs').innerHTML=specs.length?specs.map(s=>`<div class="details-spec"><span>${escapeHtml(s.label)}</span><b>${escapeHtml(s.value)}</b></div>`).join(''):'<div class="details-spec empty-spec">Brak dodatkowych parametrów.</div>';
  document.getElementById('detailsActions').innerHTML=p.url&&status!=='sold'?`<a class="btn primary" href="${escapeHtml(safeUrl(p.url))}" target="_blank" rel="noopener noreferrer">${linkLabel(p)}</a>`:'';
  galleryThumbs.innerHTML=activeGallery.map((m,i)=>`<button type="button" data-gallery-index="${i}" title="${escapeHtml(m.label)}"><img src="${escapeHtml(safeUrl(m.src))}" alt="${escapeHtml(m.label)}" />${m.zoom?'<span class="zoom-badge">+</span>':''}</button>`).join('');
  galleryNote.textContent=activeGallery.some(m=>m.zoom)&&activeGallery.filter(m=>!m.zoom).length===1?'Dostępne jest jedno zdjęcie źródłowe; drugi widok to jego powiększenie. Kolejne oryginalne zdjęcia można dopinać do galerii bez zmiany układu strony.':'';
  paintGallery();
  detailsModal.classList.add('open'); detailsModal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open');
  detailsModal.querySelector('.details-close').focus();
}
function closeDetails(){detailsModal.classList.remove('open');detailsModal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');}
function changeGallery(delta){if(!activeGallery.length)return;activeGalleryIndex=(activeGalleryIndex+delta+activeGallery.length)%activeGallery.length;paintGallery();}

document.addEventListener('click',e=>{
  const detailsBtn=e.target.closest('.js-details');
  if(detailsBtn){const p=SOURCE_PRODUCTS[Number(detailsBtn.dataset.productIndex)];if(p)openDetails(p);return;}
  if(e.target.closest('[data-close-details]')){closeDetails();return;}
  const thumb=e.target.closest('[data-gallery-index]');
  if(thumb){activeGalleryIndex=Number(thumb.dataset.galleryIndex)||0;paintGallery();}
});
document.getElementById('galleryPrev').addEventListener('click',()=>changeGallery(-1));
document.getElementById('galleryNext').addEventListener('click',()=>changeGallery(1));
document.addEventListener('keydown',e=>{
  if(!detailsModal.classList.contains('open'))return;
  if(e.key==='Escape')closeDetails();
  if(e.key==='ArrowLeft')changeGallery(-1);
  if(e.key==='ArrowRight')changeGallery(1);
});

[searchInput,platformFilter,statusFilter].forEach(el=>el.addEventListener('input',render));
categoryChips.addEventListener('click',e=>{
  const btn=e.target.closest('[data-category]');if(!btn)return;
  selectedCategory=btn.dataset.category;
  categoryChips.querySelectorAll('.category-chip').forEach(x=>x.classList.toggle('active',x===btn));
  render();
});
menuBtn.addEventListener('click',()=>{const open=mainNav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));});
mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mainNav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');}));

contactForm.addEventListener('submit',async e=>{
  e.preventDefault();
  const name=document.getElementById('contactName').value.trim();
  const message=document.getElementById('contactMessage').value.trim();
  const platform=document.getElementById('contactPlatform').value;
  const text=`${name?name+': ':''}${message}`;
  try{await navigator.clipboard.writeText(text);contactStatus.textContent='Wiadomość skopiowana. Otwieram wybraną platformę — wklej tekst w czacie.';}
  catch{contactStatus.textContent='Nie udało się automatycznie skopiować tekstu. Zaznacz wiadomość ręcznie i wklej ją na platformie.';}
  window.open(PROFILE_URLS[platform]||PROFILE_URLS.olx,'_blank','noopener');
});

updateStats();render();renderSold();
