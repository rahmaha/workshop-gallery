// ==========================================================
// DOKUMENTASI  -  EDIT DAFTAR FOTO DI SINI
// foto : daftar file foto tiap momen (boleh 1 atau banyak).
//        Contoh: foto: ['img/dokumentasi/pembukaan-1.jpg', 'img/dokumentasi/pembukaan-2.jpg']
// lebar: 1 = kotak kecil, 2 = kotak lebar, 4 = selebar layar (desktop)
// Kalau foto masih kosong, kotak menampilkan nomor saja.
// ==========================================================
const DOKUMENTASI = [
    { no: '01', judul: 'Pembukaan', ket: 'Dihadiri dosen dan guru', lebar: 2,
      foto: ['img/dokumentasi/pembukaan.jpg'] },

    { no: '02', judul: 'Materi Teori', ket: '', lebar: 1,
      foto: ['img/dokumentasi/teori-1.jpg', 'img/dokumentasi/teori-2.jpg'] },

    { no: '03', judul: 'Materi Praktik', ket: '', lebar: 1,
      foto: ['img/dokumentasi/praktek-1.jpg', 'img/dokumentasi/praktek-2.jpg'] },

    { no: '04', judul: 'Presentasi', ket: '', lebar: 1,
      foto: ['img/dokumentasi/presentasi-1.jpg', 'img/dokumentasi/presentasi-2.jpg'] },

    { no: '05', judul: 'Penyerahan Hadiah', ket: '', lebar: 1,
      foto: ['img/dokumentasi/hadiah-1.jpg', 'img/dokumentasi/hadiah-2.jpg', 'img/dokumentasi/hadiah-3.jpg'] },

    { no: '06', judul: 'Foto Peserta', ket: '', lebar: 2,
      foto: ['img/dokumentasi/peserta.jpg', 'img/dokumentasi/peserta-panitia.jpg'] },

    { no: '07', judul: 'Foto Panitia', ket: '', lebar: 4,
      foto: ['img/dokumentasi/panitia.jpg', 'img/dokumentasi/full-team-1.jpg', 'img/dokumentasi/full-team-2.jpg'] },
];

// ---------- jangan ubah bagian bawah ini ----------
// Foto yang didaftarkan otomatis oleh foto-dokumentasi.py (js/dokumentasi-foto.js) menggantikan daftar di atas
if (typeof FOTO_DOKUMENTASI !== 'undefined') {
    DOKUMENTASI.forEach(d => { if (FOTO_DOKUMENTASI[d.no] && FOTO_DOKUMENTASI[d.no].length) d.foto = FOTO_DOKUMENTASI[d.no]; });
}
(function () {
    const grid = document.getElementById('dok-grid');
    const section = document.getElementById('dokumentasi');
    if (!grid || !section) return;

    const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    grid.innerHTML = DOKUMENTASI.map((d, i) => {
        const n = d.foto.length;
        const imgs = d.foto.map((s, k) => `<img src="${esc(s)}" alt="${esc(d.judul)} ${k + 1}" loading="lazy" class="${k ? '' : 'on'}">`).join('');
        return `
        <button type="button" class="dok-tile w${d.lebar || 1}${i === 0 ? ' big' : ''}${n ? '' : ' nofoto'}" data-i="${i}" aria-label="${esc(d.judul)}">
            <div class="dok-img"><span class="dok-ph">${esc(d.no)}</span>${imgs}</div>
            <div class="dok-label">
                <span class="dok-no">NO. ${esc(d.no)}</span>
                <span class="dok-judul">${esc(d.judul)}</span>
                ${d.ket ? `<span class="dok-ket">${esc(d.ket)}</span>` : ''}
                ${n > 1 ? `<span class="dok-count">${n} foto</span>` : ''}
            </div>
        </button>`;
    }).join('');

    const tiles = [...grid.querySelectorAll('.dok-tile')];
    grid.addEventListener('error', e => { if (e.target.tagName === 'IMG') e.target.remove(); }, true);

    // ---- Tombol jeda ----
    const pauseBtn = document.getElementById('dok-pause');
    if (pauseBtn && typeof bindPauseButton === 'function') bindPauseButton(pauseBtn, section);

    // ---- Foto bergantian otomatis di tiap kotak ----
    let tick = 0, hoverTile = null, lbOpen = false, visible = false;
    tiles.forEach(t => {
        t.addEventListener('mouseenter', () => { hoverTile = t; });
        t.addEventListener('mouseleave', () => { hoverTile = null; });
    });
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { threshold: 0.15 }).observe(grid);

    setInterval(() => {
        tick++;
        if (!visible || document.hidden || lbOpen || section.classList.contains('mq-paused')) return;
        tiles.forEach((t, i) => {
            if (i % 3 !== tick % 3 || t === hoverTile) return;      // tiap kotak bergantian bergiliran
            const imgs = [...t.querySelectorAll('.dok-img img')];
            if (imgs.length < 2) return;
            const cur = Math.max(0, imgs.findIndex(x => x.classList.contains('on')));
            imgs[cur].classList.remove('on');
            imgs[(cur + 1) % imgs.length].classList.add('on');
        });
    }, 1800);

    // ---- Pemutar foto layar penuh ----
    document.body.insertAdjacentHTML('beforeend', `
        <div class="dok-lb" id="dok-lb" role="dialog" aria-modal="true" aria-label="Foto dokumentasi">
            <button class="x" aria-label="Tutup">&times;</button>
            <button class="prev" aria-label="Sebelumnya">&#8249;</button>
            <img alt="">
            <div class="cap"><b></b><span></span></div>
            <button class="next" aria-label="Berikutnya">&#8250;</button>
        </div>`);
    const lb = document.getElementById('dok-lb');
    const lbImg = lb.querySelector('img'), lbTitle = lb.querySelector('.cap b'), lbMeta = lb.querySelector('.cap span');
    let cur = { i: 0, k: 0 };

    function show() {
        const d = DOKUMENTASI[cur.i], n = d.foto.length;
        cur.k = (cur.k + n) % n;
        lbImg.src = d.foto[cur.k];
        lbImg.alt = d.judul;
        lbTitle.textContent = d.judul + (d.ket ? ' · ' + d.ket : '');
        lbMeta.innerHTML = `<em>NO. ${esc(d.no)}</em> &nbsp;·&nbsp; ${cur.k + 1} / ${n}`;
        const nx = new Image(); nx.src = d.foto[(cur.k + 1) % n];   // muat foto berikutnya lebih dulu
    }
    function open(i, k) {
        cur = { i, k }; show();
        lb.classList.add('open'); lbOpen = true; document.body.style.overflow = 'hidden';
    }
    function close() { lb.classList.remove('open'); lbOpen = false; document.body.style.overflow = ''; }
    const go = d => { if (DOKUMENTASI[cur.i].foto.length > 1) { cur.k += d; show(); } };

    tiles.forEach(t => t.addEventListener('click', () => {
        const i = Number(t.dataset.i), d = DOKUMENTASI[i];
        if (!d.foto.length) return;
        const on = t.querySelector('.dok-img img.on');
        open(i, on ? Math.max(0, d.foto.indexOf(on.getAttribute('src'))) : 0);
    }));
    lb.querySelector('.x').addEventListener('click', close);
    lb.querySelector('.prev').addEventListener('click', () => go(-1));
    lb.querySelector('.next').addEventListener('click', () => go(1));
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => {
        if (!lbOpen) return;
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowLeft') go(-1);
        else if (e.key === 'ArrowRight') go(1);
    });
    let sx = 0;
    lb.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', e => { const d = sx - e.changedTouches[0].clientX; if (Math.abs(d) > 40) go(d > 0 ? 1 : -1); }, { passive: true });
})();
