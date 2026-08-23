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

const STATUS_LABELS = { available: 'Dostępny', reserved: 'Zarezerwowany', sold: 'Sprzedany' };
const PROFILE_URLS = {
  olx: 'https://www.olx.pl/oferty/uzytkownik/4QzZV/',
  allegro: 'https://allegrolokalnie.pl/uzytkownik/Sobolll_',
  vinted: 'https://www.vinted.pl/member/3175187738-huberts2003'
};
let selectedCategory = 'all';

document.getElementById('year').textContent = new Date().getFullYear();

function escapeHtml(s=''){
  return String(s).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
function safeUrl(url=''){
  try {
    const u = new URL(url, location.origin);
    return ['http:','https:'].includes(u.protocol) ? u.href : '#';
  } catch { return '#'; }
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
  const t = title.toLowerCase();
  if(/pamięć ram|\bram\b|ddr[2345]/i.test(title)) return 'RAM';
  if(/\bssd\b|\bhdd\b|dysk/i.test(title)) return 'Dyski';
  if(/laptop|notebook/i.test(title)) return 'Laptopy';
  if(/telefon|smartfon|iphone|galaxy/i.test(title)) return 'Telefony';
  if(/płyta|procesor|touchpad|matryca|bateria|karta wi-?fi|karta sieciowa|moduł bluetooth|modem|chłodzeni|wentylator|radiator/i.test(title)) return 'Części';
  return 'Akcesoria';
}
function catalogProducts(){
  if(typeof CATALOGS === 'undefined') return [];
  return Object.entries(CATALOGS).flatMap(([platform,items]) => (Array.isArray(items)?items:[]).map(item=>({
    title:item.title,
    category:inferCategory(item.title),
    platform:platform==='olx'?'OLX':'Allegro Lokalnie',
    status:'available',
    currentPrice:item.price,
    description:Array.isArray(item.bullets)?item.bullets.slice(0,2).join(' '):'',
    url:item.link || '',
    image:''
  })));
}
function productKey(p){ return `${String(p.platform||'').toLowerCase()}|${String(p.title||'').trim().toLowerCase()}`; }
const CATALOG_PRODUCTS = catalogProducts();
const MANUAL_KEYS = new Set(PRODUCTS.map(productKey));
const SOURCE_PRODUCTS = [...PRODUCTS, ...CATALOG_PRODUCTS.filter(p=>!MANUAL_KEYS.has(productKey(p)))];

uniq(SOURCE_PRODUCTS.map(p=>p.platform)).forEach(v=>platformFilter.insertAdjacentHTML('beforeend', `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`));

function productCard(p, sold=false){
  const status = statusOf(p);
  const currentPrice = currentPriceOf(p);
  const oldPrice = oldPriceOf(p);
  const discount = discountPercent(oldPrice,currentPrice);
  const img = p.image ? `<img src="${escapeHtml(safeUrl(p.image))}" alt="${escapeHtml(p.title)}" loading="lazy" />` : `<div class="product-placeholder" aria-hidden="true"><span>ST24</span><small>${escapeHtml(p.platform||'Oferta')}</small></div>`;
  return `
    <article class="product-card ${sold?'sold-card':''}">
      ${img}
      <div class="product-body">
        <div class="meta">
          <span class="chip">${escapeHtml(p.category || 'Akcesoria')}</span>
          <span class="chip">${escapeHtml(p.platform || 'Platforma')}</span>
          <span class="status-chip status-${escapeHtml(status)}">${escapeHtml(STATUS_LABELS[status] || status)}</span>
        </div>
        <h3>${escapeHtml(p.title)}</h3>
        <p class="desc">${escapeHtml(p.description || '')}</p>
        <div class="price-row">
          <span class="price">${escapeHtml(currentPrice)}</span>
          ${oldPrice ? `<span class="old-price">${escapeHtml(oldPrice)}</span>` : ''}
          ${discount ? `<span class="discount">-${discount}%</span>` : ''}
        </div>
        ${p.url && status !== 'sold' ? `<div class="product-actions"><a class="btn primary" href="${escapeHtml(safeUrl(p.url))}" target="_blank" rel="noopener noreferrer">Zobacz ogłoszenie</a></div>` : ''}
      </div>
    </article>`;
}

function render(){
  const q = searchInput.value.trim().toLowerCase();
  const plat = platformFilter.value;
  const stat = statusFilter.value;
  const activeProducts = SOURCE_PRODUCTS.filter(p=>statusOf(p)!=='sold');
  const items = activeProducts.filter(p => {
    const blob = `${p.title||''} ${p.category||''} ${p.platform||''} ${p.description||''}`.toLowerCase();
    return (!q || blob.includes(q)) &&
      (selectedCategory==='all' || p.category===selectedCategory) &&
      (plat==='all' || p.platform===plat) &&
      (stat==='all' || statusOf(p)===stat);
  });
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
  const catalogCount = CATALOG_PRODUCTS.length;
  document.getElementById('availableCount').textContent = available;
  document.getElementById('reservedCount').textContent = reserved;
  document.getElementById('soldCount').textContent = sold;
  document.getElementById('catalogCount').textContent = catalogCount;
  document.getElementById('heroActiveCount').textContent = available + reserved;
  document.getElementById('heroCatalogCount').textContent = catalogCount;
}

[searchInput, platformFilter, statusFilter].forEach(el=>el.addEventListener('input',render));
categoryChips.addEventListener('click',e=>{
  const btn = e.target.closest('[data-category]');
  if(!btn) return;
  selectedCategory = btn.dataset.category;
  categoryChips.querySelectorAll('.category-chip').forEach(x=>x.classList.toggle('active',x===btn));
  render();
});

menuBtn.addEventListener('click',()=>{
  const open = mainNav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded',String(open));
});
mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  mainNav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded','false');
}));

contactForm.addEventListener('submit', async e=>{
  e.preventDefault();
  const name = document.getElementById('contactName').value.trim();
  const message = document.getElementById('contactMessage').value.trim();
  const platform = document.getElementById('contactPlatform').value;
  const text = `${name ? name + ': ' : ''}${message}`;
  try {
    await navigator.clipboard.writeText(text);
    contactStatus.textContent = 'Wiadomość skopiowana. Otwieram wybraną platformę — wklej tekst w czacie.';
  } catch {
    contactStatus.textContent = 'Nie udało się automatycznie skopiować tekstu. Zaznacz wiadomość ręcznie i wklej ją na platformie.';
  }
  window.open(PROFILE_URLS[platform] || PROFILE_URLS.olx,'_blank','noopener');
});

updateStats();
render();
renderSold();
