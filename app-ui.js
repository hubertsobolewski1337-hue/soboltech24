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
const {statusLabels: STATUS_LABELS, profileUrls: PROFILE_URLS, directUrls: DIRECT_URL_OVERRIDES, specs: SPECS_BY_INDEX} = window.ST24_DATA;

const detailsCss = document.createElement('link');
detailsCss.rel = 'stylesheet';
detailsCss.href = 'product-details.css';
document.head.appendChild(detailsCss);

let selectedCategory = 'all';
document.getElementById('year').textContent = new Date().getFullYear();

function escapeHtml(s=''){
  return String(s).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
function safeUrl(url=''){
  try { const u = new URL(url, location.origin); return ['http:','https:'].includes(u.protocol) ? u.href : '#'; }
  catch { return '#'; }
}
function uniq(arr){ return [...new Set(arr.filter(Boolean))].sort((a,b)=>a.localeCompare(b,'pl')); }
function statusOf(p){ return p.status || 'available'; }
function currentPriceOf(p){ return p.currentPrice || p.price || ''; }
function oldPriceOf(p){ return p.oldPrice || ''; }
function discountPercent(oldPrice,currentPrice){
  const oldNum = Number(String(oldPrice).replace(/[^0-9,.-]/g,'').replace(',','.'));
  const curNum = Number(String(currentPrice).replace(/[^0-9,.-]/g,'').replace(',','.'));
  if(!oldNum || !curNum || curNum >= oldNum) return '';
  return Math.round((1-curNum/oldNum)*100);
}
function inferCategory(title=''){
  if(/pamięć ram|\bram\b|ddr[2345]/i.test(title)) return 'RAM';
  if(/\bssd\b|\bhdd\b|dysk/i.test(title)) return 'Dyski';
  if(/laptop|notebook/i.test(title)) return 'Laptopy';
  if(/telefon|smartfon|iphone|galaxy/i.test(title)) return 'Telefony';
  if(/płyta|procesor|touchpad|matryca|bateria|karta wi|karta sieciowa|moduł bluetooth|modem|chłodzeni|wentylator|radiator/i.test(title)) return 'Części';
  return 'Akcesoria';
}
function allegroSearchUrl(title=''){ return `https://allegrolokalnie.pl/oferty/q/${encodeURIComponent(title)}`; }

function enrichManualProducts(){
  PRODUCTS.forEach((p,i)=>{
    if(p.platform !== 'Allegro Lokalnie') return;
    p.specs = p.specs || SPECS_BY_INDEX[i] || {};
    p.images = Array.isArray(p.images) && p.images.length ? p.images : (p.image ? [p.image] : []);
    p.searchUrl = p.searchUrl || allegroSearchUrl(p.title);
    const currentUrl = String(p.url || '');
    const verifiedDirect = DIRECT_URL_OVERRIDES[i] || (currentUrl.includes('allegrolokalnie.pl/oferta/') ? currentUrl : '');
    p.url = verifiedDirect;
    p.directVerified = Boolean(verifiedDirect);
    p.updatedAt = p.updatedAt || '2026-08-23';
    p.photoSource = 'Autentyczna miniatura przypisana na podstawie aktywnej oferty widocznej w Twoim panelu Allegro Lokalnie. Pełna rozdzielczość zdjęć pozostaje na Allegro Lokalnie.';
  });
}
enrichManualProducts();

function catalogProducts(){
  if(typeof CATALOGS === 'undefined') return [];
  const olxItems = Array.isArray(CATALOGS.olx) ? CATALOGS.olx : [];
  return olxItems.map(item=>({
    title:item.title, category:inferCategory(item.title), platform:'OLX', status:'available',
    currentPrice:item.price, description:Array.isArray(item.bullets)?item.bullets.slice(0,2).join(' '):'',
    url:item.link || '', image:item.image || '', images:item.image ? [item.image] : [], specs:{}, updatedAt:'2026-08-23'
  }));
}
function productKey(p){ return `${String(p.platform||'').toLowerCase()}|${String(p.title||'').trim().toLowerCase()}`; }
const CATALOG_PRODUCTS = catalogProducts();
const SOURCE_PRODUCTS = [...PRODUCTS, ...CATALOG_PRODUCTS];
const PRODUCT_MAP = new Map(SOURCE_PRODUCTS.map(p=>[productKey(p),p]));
const ALL_CATALOG_COUNT = (typeof CATALOGS === 'undefined') ? 0 : Object.values(CATALOGS).reduce((n,v)=>n+(Array.isArray(v)?v.length:0),0);

uniq(SOURCE_PRODUCTS.map(p=>p.platform)).forEach(v=>platformFilter.insertAdjacentHTML('beforeend', `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`));

function specsHtml(p){
  const entries = Object.entries(p.specs || {}).filter(([,v])=>v!=='' && v!==null && v!==undefined);
  if(!entries.length) return '';
  return `<details class="spec-details"><summary>Parametry techniczne <span>${entries.length}</span></summary><dl class="spec-grid">${entries.map(([k,v])=>`<div class="spec-row"><dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd></div>`).join('')}</dl></details>`;
}
function getImages(p){
  const list = Array.isArray(p.images) ? p.images : [];
  if(list.length) return list.filter(Boolean);
  return p.image ? [p.image] : [];
}
function productCard(p, sold=false){
  const status = statusOf(p);
  const currentPrice = currentPriceOf(p);
  const oldPrice = oldPriceOf(p);
  const discount = discountPercent(oldPrice,currentPrice);
  const images = getImages(p);
  const key = productKey(p);
  const img = images.length
    ? `<button class="product-media" type="button" data-gallery-key="${escapeHtml(key)}" aria-label="Otwórz zdjęcie: ${escapeHtml(p.title)}"><img src="${escapeHtml(safeUrl(images[0]))}" alt="${escapeHtml(p.title)}" loading="lazy" /><span class="photo-badge">Zdjęcie oferty</span><span class="gallery-count">${images.length} ${images.length===1?'zdjęcie':'zdjęcia'}</span></button>`
    : `<div class="product-placeholder" aria-hidden="true"><span>ST24</span><small>${escapeHtml(p.platform||'Oferta')}</small></div>`;
  const direct = p.url && status !== 'sold' ? `<a class="btn primary" href="${escapeHtml(safeUrl(p.url))}" target="_blank" rel="noopener noreferrer">Otwórz aukcję</a>` : '';
  const fallback = p.searchUrl && status !== 'sold' ? `<a class="btn ghost compact" href="${escapeHtml(safeUrl(p.searchUrl))}" target="_blank" rel="noopener noreferrer">Wyszukaj ofertę</a>` : '';
  return `<article class="product-card ${sold?'sold-card':''}">
      ${img}
      <div class="product-body">
        <div class="meta"><span class="chip">${escapeHtml(p.category || 'Akcesoria')}</span><span class="chip">${escapeHtml(p.platform || 'Platforma')}</span><span class="status-chip status-${escapeHtml(status)}">${escapeHtml(STATUS_LABELS[status] || status)}</span></div>
        <h3>${escapeHtml(p.title)}</h3>
        <p class="desc">${escapeHtml(p.description || '')}</p>
        ${specsHtml(p)}
        <div class="price-row"><span class="price">${escapeHtml(currentPrice)}</span>${oldPrice ? `<span class="old-price">${escapeHtml(oldPrice)}</span>` : ''}${discount ? `<span class="discount">-${discount}%</span>` : ''}</div>
        ${p.updatedAt ? `<small class="updated-at">Aktualizacja: ${escapeHtml(p.updatedAt.split('-').reverse().join('.'))}</small>` : ''}
        ${(direct||fallback) ? `<div class="product-actions">${direct}${fallback}</div>` : ''}
      </div>
    </article>`;
}
function searchableBlob(p){ return `${p.title||''} ${p.category||''} ${p.platform||''} ${p.description||''} ${Object.entries(p.specs||{}).flat().join(' ')}`.toLowerCase(); }
function render(){
  const q = searchInput.value.trim().toLowerCase(), plat = platformFilter.value, stat = statusFilter.value;
  const items = SOURCE_PRODUCTS.filter(p=>statusOf(p)!=='sold').filter(p => (!q || searchableBlob(p).includes(q)) && (selectedCategory==='all' || p.category===selectedCategory) && (plat==='all' || p.platform===plat) && (stat==='all' || statusOf(p)===stat));
  resultsCount.textContent = `${items.length} ${items.length===1?'oferta':'ofert'}`;
  grid.innerHTML = items.length ? items.map(p=>productCard(p,false)).join('') : '<div class="empty">Brak ofert pasujących do wybranych filtrów.</div>';
}
function renderSold(){
  const sold = SOURCE_PRODUCTS.filter(p=>statusOf(p)==='sold');
  soldResultsCount.textContent = `${sold.length} ${sold.length===1?'pozycja':'pozycji'}`;
  soldGrid.innerHTML = sold.length ? sold.map(p=>productCard(p,true)).join('') : '<div class="empty">Na razie brak produktów oznaczonych jako sprzedane.</div>';
}
function updateStats(){
  const available = SOURCE_PRODUCTS.filter(p=>statusOf(p)==='available').length;
  const reserved = SOURCE_PRODUCTS.filter(p=>statusOf(p)==='reserved').length;
  const sold = SOURCE_PRODUCTS.filter(p=>statusOf(p)==='sold').length;
  document.getElementById('availableCount').textContent = available;
  document.getElementById('reservedCount').textContent = reserved;
  document.getElementById('soldCount').textContent = sold;
  document.getElementById('catalogCount').textContent = ALL_CATALOG_COUNT;
  document.getElementById('heroActiveCount').textContent = available + reserved;
  document.getElementById('heroCatalogCount').textContent = ALL_CATALOG_COUNT;
}

const galleryModal = document.createElement('div');
galleryModal.className = 'gallery-modal';
galleryModal.hidden = true;
galleryModal.innerHTML = `<div class="gallery-backdrop" data-close-gallery></div><section class="gallery-dialog" role="dialog" aria-modal="true" aria-labelledby="galleryTitle"><button class="gallery-close" type="button" data-close-gallery aria-label="Zamknij">×</button><div class="gallery-main"><img id="galleryMainImage" alt="" /></div><div class="gallery-copy"><p class="eyebrow">ZDJĘCIE Z AUKCJI</p><h2 id="galleryTitle"></h2><p id="gallerySource" class="gallery-source"></p><div id="galleryThumbs" class="gallery-thumbs"></div><div class="gallery-actions"><a id="galleryAuction" class="btn primary" target="_blank" rel="noopener noreferrer">Pełna galeria na Allegro</a><a id="gallerySearch" class="btn ghost" target="_blank" rel="noopener noreferrer">Wyszukaj ofertę</a></div></div></section>`;
document.body.appendChild(galleryModal);
const galleryMainImage = document.getElementById('galleryMainImage');
const galleryTitle = document.getElementById('galleryTitle');
const gallerySource = document.getElementById('gallerySource');
const galleryThumbs = document.getElementById('galleryThumbs');
const galleryAuction = document.getElementById('galleryAuction');
const gallerySearch = document.getElementById('gallerySearch');
function showGallery(p){
  const images = getImages(p); if(!images.length) return;
  galleryTitle.textContent = p.title || 'Oferta';
  gallerySource.textContent = p.photoSource || 'Zdjęcie przypisane do tej oferty.';
  galleryMainImage.src = safeUrl(images[0]); galleryMainImage.alt = p.title || 'Zdjęcie oferty';
  galleryAuction.href = safeUrl(p.url || '#'); galleryAuction.hidden = !p.url;
  gallerySearch.href = safeUrl(p.searchUrl || p.url || '#'); gallerySearch.hidden = !p.searchUrl;
  galleryThumbs.innerHTML = images.map((src,i)=>`<button type="button" class="gallery-thumb ${i===0?'active':''}" data-gallery-index="${i}"><img src="${escapeHtml(safeUrl(src))}" alt="Miniatura ${i+1}" /></button>`).join('');
  galleryThumbs.querySelectorAll('[data-gallery-index]').forEach(btn=>btn.addEventListener('click',()=>{ const idx=Number(btn.dataset.galleryIndex||0); galleryMainImage.src=safeUrl(images[idx]); galleryThumbs.querySelectorAll('.gallery-thumb').forEach(x=>x.classList.toggle('active',x===btn)); }));
  galleryModal.hidden = false; document.body.classList.add('modal-open');
}
function closeGallery(){ galleryModal.hidden = true; document.body.classList.remove('modal-open'); }
document.addEventListener('click',e=>{ const media=e.target.closest('[data-gallery-key]'); if(media){ const p=PRODUCT_MAP.get(media.dataset.galleryKey); if(p) showGallery(p); return; } if(e.target.closest('[data-close-gallery]')) closeGallery(); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape' && !galleryModal.hidden) closeGallery(); });

[searchInput, platformFilter, statusFilter].forEach(el=>el.addEventListener('input',render));
categoryChips.addEventListener('click',e=>{ const btn=e.target.closest('[data-category]'); if(!btn) return; selectedCategory=btn.dataset.category; categoryChips.querySelectorAll('.category-chip').forEach(x=>x.classList.toggle('active',x===btn)); render(); });
menuBtn.addEventListener('click',()=>{ const open=mainNav.classList.toggle('open'); menuBtn.setAttribute('aria-expanded',String(open)); });
mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{ mainNav.classList.remove('open'); menuBtn.setAttribute('aria-expanded','false'); }));
contactForm.addEventListener('submit', async e=>{ e.preventDefault(); const name=document.getElementById('contactName').value.trim(); const message=document.getElementById('contactMessage').value.trim(); const platform=document.getElementById('contactPlatform').value; const text=`${name ? name + ': ' : ''}${message}`; try { await navigator.clipboard.writeText(text); contactStatus.textContent='Wiadomość skopiowana. Otwieram wybraną platformę — wklej tekst w czacie.'; } catch { contactStatus.textContent='Nie udało się automatycznie skopiować tekstu. Zaznacz wiadomość ręcznie i wklej ją na platformie.'; } window.open(PROFILE_URLS[platform] || PROFILE_URLS.olx,'_blank','noopener'); });

updateStats();
render();
renderSold();
