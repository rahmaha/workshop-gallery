// Membaca DATA_KARYA menjadi daftar karya (tidak perlu diedit)
const _WARNA = ['#141414','#1B130C','#241508','#181512','#2B1809','#101010','#33190A'];
function _slug(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'lain';}
function _inisial(n){const p=n.trim().split(/\s+/);return ((p[0]||'?')[0]+(p[1]?p[1][0]:'')).toUpperCase();}
function _tile(n,i){
    const c=_WARNA[i%_WARNA.length];
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000"><rect width="800" height="1000" fill="${c}"/><text x="50%" y="50%" fill="rgba(255,107,26,.32)" font-family="Inter,Arial,sans-serif" font-size="280" font-weight="800" text-anchor="middle" dominant-baseline="central">${_inisial(n)}</text></svg>`;
    return 'data:image/svg+xml;utf8,'+encodeURIComponent(svg);
}
const studentWorks = DATA_KARYA.split('\n')
    .map(l=>l.trim()).filter(l=>l && !l.startsWith('#'))
    .map((l,i)=>{
        const [nama,link,judul,kelas,kategori,gambar]=l.split('|').map(x=>(x||'').trim());
        const kat=kategori||'Karya';
        const tile=_tile(nama,i);
        return {
            id:i+1, student:nama, link:link||'#',
            title:judul||'', school:kelas||'',
            category:_slug(kat), categoryLabel:kat, catLabel:kat,
            image:gambar||tile, fallback:tile
        };
    });
