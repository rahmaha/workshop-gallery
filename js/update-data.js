// ===== Pengaturan (boleh diedit) =====
// Singkatan jurusan -> nama kategori. Yang tidak terdaftar tetap dipakai apa adanya.
const ALIAS_JURUSAN = { 'KA': 'Kimia Analisis' };

// ===== CSV =====
function parseCSV(text, sep) {
    const rows = []; let row = [], cur = '', q = false;
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (q) {
            if (c === '"' && text[i + 1] === '"') { cur += '"'; i++; }
            else if (c === '"') q = false;
            else cur += c;
        } else if (c === '"') q = true;
        else if (c === sep) { row.push(cur); cur = ''; }
        else if (c === '\n') { row.push(cur); rows.push(row); row = []; cur = ''; }
        else if (c !== '\r') cur += c;
    }
    if (cur || row.length) { row.push(cur); rows.push(row); }
    return rows;
}
function detectSep(line) {
    const n = ch => line.split(ch).length;
    return [',', ';', '\t'].sort((a, b) => n(b) - n(a))[0];
}

// ===== Kelas -> jurusan =====
function jurusan(kelas) {
    let s = kelas.toUpperCase().trim();
    s = s.replace(/^(XII|XI|X|12|11|10)\b[\s.\-]*/, '');
    s = s.replace(/[\s\-]+[A-Z0-9]$/, '');
    s = s.trim() || 'Lainnya';
    if (ALIAS_JURUSAN[s]) return ALIAS_JURUSAN[s];
    return s.length <= 5 ? s : s.toLowerCase().replace(/(^|\s)\S/g, m => m.toUpperCase());
}

const clean = s => (s || '').replace(/\|/g, '/').replace(/\s+/g, ' ').trim();
const fixLink = u => { u = clean(u); return u && !/^https?:\/\//i.test(u) ? 'https://' + u : u; };

let output = '';
const $ = id => document.getElementById(id);

function build() {
    const f = $('file').files[0];
    if (!f) return;
    f.text().then(raw => {
        const text = raw.replace(/^\uFEFF/, '');
        const sep = detectSep(text.split('\n')[0]);
        const rows = parseCSV(text, sep).filter(r => r.some(x => x.trim()));
        const head = rows.shift().map(h => h.toLowerCase());
        const col = re => head.findIndex(h => re.test(h));
        const iNo = col(/^no\b/), iNama = col(/nama/), iKelas = col(/kelas/), iLink = col(/link|canva|url/);
        if (iNama < 0 || iLink < 0) {
            $('status').textContent = 'Kolom "Nama" atau "Link" tidak ditemukan di baris judul CSV.';
            $('result').hidden = $('out').hidden = true; return;
        }
        const useImg = $('useimg').checked;
        const lines = [], warns = [], cats = {};
        rows.forEach((r, i) => {
            const nama = clean(r[iNama]), link = fixLink(r[iLink]);
            const kelas = iKelas >= 0 ? clean(r[iKelas]) : '';
            const no = iNo >= 0 ? clean(r[iNo]) : String(i + 1);
            if (!nama) return;
            if (!link) { warns.push(`${nama} (No ${no}): link kosong, dilewati`); return; }
            const kat = kelas ? jurusan(kelas) : 'Karya';
            cats[kat] = (cats[kat] || 0) + 1;
            lines.push([nama, link, '', kelas, kat, useImg ? `img/${no}.jpg` : ''].join(' | '));
        });
        output = `// Dibuat otomatis oleh update-data.html dari ${f.name}\n// Kolom: nama | link | judul karya | kelas | kategori | gambar\nconst DATA_KARYA = \`\n${lines.join('\n')}\n\`;\n`;
        $('status').textContent = `${lines.length} karya terbaca dari ${rows.length} baris.`;
        $('cats').innerHTML = Object.entries(cats).sort((a, b) => b[1] - a[1]).map(([k, n]) => `<span class="chip">${k} (${n})</span>`).join('');
        $('warns').innerHTML = warns.map(w => `<p class="warn">${w}</p>`).join('');
        $('preview').value = output;
        $('result').hidden = $('out').hidden = false;
    });
}
$('file').addEventListener('change', build);
$('useimg').addEventListener('change', build);
$('dl').addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([output], { type: 'text/javascript' }));
    a.download = 'data-karya.js'; a.click(); URL.revokeObjectURL(a.href);
});
