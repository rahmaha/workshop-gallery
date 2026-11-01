// Pembuat marquee looping (dipakai index.js dan katalog.js)
const MQ_REDUCED = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

// track  : elemen kosong yang akan berisi kartu
// items  : array string HTML kartu
// axis   : 'x' (kiri) atau 'y' (atas); tambahkan class "rev" di track untuk arah sebaliknya
// speed  : piksel per detik; minSize: lebar/tinggi area tampil
function buildMarquee(track, items, { axis = 'x', speed = 40, minSize = 800 } = {}) {
    const horiz = axis === 'x';
    track.classList.add('mq-track', horiz ? 'x' : 'y');
    const size = () => horiz ? track.offsetWidth : track.offsetHeight;

    track.innerHTML = items.join('');
    const one = size();
    if (!one) return;

    const half = items.join('').repeat(Math.max(1, Math.ceil(minSize / one)));
    track.innerHTML = half + half;               // dua salinan sama persis -> loop tanpa patah
    track.style.animationDuration = (size() / 2 / speed) + 's';

    const kids = [...track.children];            // salinan kedua disembunyikan dari pembaca layar
    kids.slice(kids.length / 2).forEach(k => { k.setAttribute('aria-hidden', 'true'); k.tabIndex = -1; });
}

// Tombol jeda/putar: toggle class .mq-paused pada elemen "area"
function bindPauseButton(btn, area) {
    const paint = () => {
        const p = area.classList.contains('mq-paused');
        btn.innerHTML = p ? '<i class="fa-solid fa-play"></i> Putar' : '<i class="fa-solid fa-pause"></i> Jeda';
    };
    if (MQ_REDUCED) area.classList.add('mq-paused');
    btn.addEventListener('click', () => { area.classList.toggle('mq-paused'); paint(); });
    paint();
}
