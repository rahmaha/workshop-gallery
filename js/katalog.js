// Katalog otomatis dari js/data-karya.js (tidak perlu edit file ini)
const bentoGrid = document.getElementById('bento-grid');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search');
const emptyState = document.getElementById('empty-state');
const pillsBox = document.getElementById('category-pills');
let currentCategory = 'all';

const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// Jumlah karya otomatis
document.querySelectorAll('[data-count]').forEach(el => el.textContent = studentWorks.length);

// Tombol kategori otomatis dari data
function buildPills() {
    const cats = [...new Map(studentWorks.map(w => [w.category, w.categoryLabel])).entries()];
    pillsBox.className = 'flex flex-wrap gap-x-6 gap-y-2';
    pillsBox.innerHTML =
        `<button data-cat="all" class="cat-pill on">Semua (${studentWorks.length})</button>` +
        cats.map(([k, label]) => `<button data-cat="${esc(k)}" class="cat-pill">${esc(label)}</button>`).join('');
    pillsBox.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => {
        pillsBox.querySelectorAll('button').forEach(b => b.classList.remove('on'));
        btn.classList.add('on');
        currentCategory = btn.dataset.cat;
        renderBentoGrid();
    }));
}

const mqCols = document.getElementById('mq-cols');
const mqBar = document.getElementById('mq-bar');
const area = document.getElementById('gallery-area');

function cardHtml(w) {
    return `
        <a href="${esc(w.link)}" target="_blank" rel="noopener noreferrer" class="ed-item group">
            <div class="ed-img r${w.id % 4}">
                <img src="${w.image}" alt="${esc(w.title || w.student)}" loading="lazy" onerror="this.onerror=null;this.src='${w.fallback}'">
            </div>
            <div class="ed-label ed">
                <span class="nm">${esc(w.title || w.student)}</span>
                <span class="kl">${esc(w.title ? w.student : w.school)}</span>
            </div>
        </a>`;
}

function renderBentoGrid() {
    const q = searchInput.value.toLowerCase().trim();
    const list = studentWorks.filter(w =>
        (currentCategory === 'all' || w.category === currentCategory) &&
        (w.student + ' ' + w.title + ' ' + w.school + ' ' + w.categoryLabel).toLowerCase().includes(q));

    emptyState.classList.toggle('hidden', list.length > 0);

    // Kolom menyesuaikan lebar layar
    const cols = Math.max(2, Math.min(6, Math.floor(area.clientWidth / 290)));
    // Kalau hasil filter sedikit, tampilkan grid diam (supaya gampang dicari & diklik)
    const loop = list.length >= cols * 3;

    bentoGrid.classList.toggle('hidden', loop || list.length === 0);
    mqCols.classList.toggle('hidden', !loop);
    mqBar.classList.toggle('hidden', !loop);

    if (!loop) { bentoGrid.innerHTML = list.map(cardHtml).join(''); mqCols.innerHTML = ''; return; }

    // Marquee vertikal: kolom ganjil (1,3,5) naik, kolom genap (2,4,6) turun
    const h = Math.max(560, innerHeight - 110);
    mqCols.style.setProperty('--cols', cols);
    mqCols.style.setProperty('--h', h + 'px');
    mqCols.innerHTML = '';
    const buckets = Array.from({ length: cols }, () => []);
    list.forEach((w, i) => buckets[i % cols].push(cardHtml(w)));
    buckets.forEach((items, c) => {
        const col = document.createElement('div'); col.className = 'mq-col';
        const track = document.createElement('div');
        col.appendChild(track); mqCols.appendChild(col);
        buildMarquee(track, items, { axis: 'y', speed: 35, minSize: h });
        if (c % 2 === 1) track.classList.add('rev');
        track.style.animationDelay = '-' + (c * 11) + 's';   // tiap kolom mulai di posisi berbeda
    });
}

searchInput.addEventListener('input', () => {
    clearSearchBtn.classList.toggle('hidden', !searchInput.value.trim());
    renderBentoGrid();
});
clearSearchBtn.addEventListener('click', () => { searchInput.value = ''; clearSearchBtn.classList.add('hidden'); renderBentoGrid(); });

function resetFilters() {
    searchInput.value = ''; clearSearchBtn.classList.add('hidden'); currentCategory = 'all';
    buildPills(); renderBentoGrid();
}

bindPauseButton(document.getElementById('mq-toggle'), area);
buildPills();
renderBentoGrid();

let _w = innerWidth, _t;
addEventListener('resize', () => { clearTimeout(_t); _t = setTimeout(() => { if (innerWidth !== _w) { _w = innerWidth; renderBentoGrid(); } }, 250); });
