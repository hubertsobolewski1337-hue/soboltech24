const grid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const platformFilter = document.getElementById('platformFilter');
const resultsCount = document.getElementById('resultsCount');
const menuBtn = document.getElementById('menuBtn');
const mainNav = document.getElementById('mainNav');

document.getElementById('year').textContent = new Date().getFullYear();

const uniq = arr => [...new Set(arr)].sort((a,b)=>a.localeCompare(b,'pl'));
uniq(PRODUCTS.map(p=>p.category)).forEach(v=>categoryFilter.insertAdjacentHTML('beforeend', `<option value="${v}">${v}</option>`));
uniq(PRODUCTS.map(p=>p.platform)).forEach(v=>platformFilter.insertAdjacentHTML('beforeend', `<option value="${v}">${v}</option>`));

function escapeHtml(s=''){
  return String(s).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

function render(){
  const q = searchInput.value.trim().toLowerCase();
  const cat = categoryFilter.value;
  const plat = platformFilter.value;
  const items = PRODUCTS.filter(p => {
    const blob = `${p.title} ${p.category} ${p.platform} ${p.description}`.toLowerCase();
    return (!q || blob.includes(q)) && (cat==='all' || p.category===cat) && (plat==='all' || p.platform===plat);
  });
  resultsCount.textContent = `${items.length} ${items.length===1?'oferta':'oferty'}`;
  if(!items.length){
    grid.innerHTML = '<div class="empty">Brak ofert pasujących do wybranych filtrów.</div>';
    return;
  }
  grid.innerHTML = items.map(p => `
    <article class="product-card">
      <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" loading="lazy" />
      <div class="product-body">
        <div class="meta"><span class="chip">${escapeHtml(p.category)}</span><span class="chip">${escapeHtml(p.platform)}</span></div>
        <h3>${escapeHtml(p.title)}</h3>
        <p class="desc">${escapeHtml(p.description)}</p>
        <div class="price">${escapeHtml(p.price)}</div>
        <div class="product-actions">
          <a class="btn primary" href="${escapeHtml(p.url)}" target="_blank" rel="noopener noreferrer">Zobacz ogłoszenie</a>
        </div>
      </div>
    </article>
  `).join('');
}

[searchInput, categoryFilter, platformFilter].forEach(el => el.addEventListener('input', render));
menuBtn.addEventListener('click', () => mainNav.classList.toggle('open'));
mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click',()=>mainNav.classList.remove('open')));
render();
