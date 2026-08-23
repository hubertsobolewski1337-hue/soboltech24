(async()=>{
  const load = src => new Promise((resolve,reject)=>{
    const s=document.createElement('script');
    s.src=src;
    s.onload=resolve;
    s.onerror=()=>reject(new Error(`Nie udało się wczytać ${src}`));
    document.head.appendChild(s);
  });
  try{
    await load('app-data.js');
    await load('app-ui.js');
  }catch(err){
    console.error(err);
    const grid=document.getElementById('productGrid');
    if(grid) grid.innerHTML='<div class="empty">Nie udało się wczytać katalogu. Odśwież stronę za chwilę.</div>';
  }
})();
