#!/usr/bin/env python3
"""
Screenshot HALAMAN PERTAMA tiap website karya (Canva) secara otomatis.
Membuka tiap link di browser sungguhan (Chromium tak terlihat), menunggu halaman
selesai tampil, lalu memotret layar pertamanya -> img/NN.jpg
dan mengisi kolom "gambar" di js/data-karya.js.

Pemasangan (sekali saja, butuh internet, +/- 150 MB):
    python -m pip install playwright
    python -m playwright install chromium

Cara pakai (di folder proyek):
    python screenshot-karya.py              # semua karya
    python screenshot-karya.py --lewati-ada # lewati yang gambarnya sudah ada di img/
    python screenshot-karya.py --tunggu=10  # tunggu 10 detik/halaman (default 6) bila situs lambat
(di Mac/Linux pakai python3)
"""
import asyncio, os, re, shutil, sys

try:
    from playwright.async_api import async_playwright
except ImportError:
    sys.exit('Playwright belum terpasang. Jalankan:\n  python -m pip install playwright\n  python -m playwright install chromium')

BASE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(BASE, 'js', 'data-karya.js')
IMG = os.path.join(BASE, 'img')
LEBAR, TINGGI = 1000, 1250          # rasio 4:5, pas dengan kotak karya
PARALEL = 4
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36'

def opsi(nama, default):
    for a in sys.argv[1:]:
        if a.startswith(nama + '='):
            return float(a.split('=', 1)[1])
    return default

TUNGGU = opsi('--tunggu', 6)
LEWATI = '--lewati-ada' in sys.argv

async def potret(ctx, sem, n, nama, link, hasil):
    async with sem:
        err = ''
        for _ in range(2):                       # dua kali percobaan
            page = await ctx.new_page()
            try:
                await page.goto(link, wait_until='load', timeout=60000)
                try:
                    await page.wait_for_load_state('networkidle', timeout=12000)
                except Exception:
                    pass
                await page.wait_for_timeout(int(TUNGGU * 1000))
                fn = f'{n:02d}.jpg'
                await page.screenshot(path=os.path.join(IMG, fn), type='jpeg', quality=82)
                hasil[n] = 'img/' + fn
                print(f'  OK     {n:02d} {nama}')
                return
            except Exception as e:
                err = str(e).split('\n')[0][:110]
            finally:
                await page.close()
        hasil[n] = None
        print(f'  GAGAL  {n:02d} {nama}: {err}')

async def main():
    src = open(DATA, encoding='utf-8').read()
    m = re.search(r'(const DATA_KARYA = `\n)(.*?)(\n`;)', src, re.S)
    if not m:
        sys.exit('Format js/data-karya.js tidak dikenali.')
    os.makedirs(IMG, exist_ok=True)
    shutil.copy(DATA, DATA + '.bak')

    baris, tugas, n = [], [], 0
    for line in m.group(2).split('\n'):
        if not line.strip() or line.strip().startswith('#'):
            baris.append((line, None)); continue
        n += 1
        cols = ([c.strip() for c in line.split('|')] + [''] * 6)[:6]
        ada = cols[5] and os.path.exists(os.path.join(BASE, cols[5]))
        baris.append((cols, n))
        if cols[1] and not (LEWATI and ada):
            tugas.append((n, cols[0], cols[1]))

    print(f'Memotret {len(tugas)} halaman (tunggu {TUNGGU:g} dtk per halaman) ...')
    hasil = {}
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={'width': LEBAR, 'height': TINGGI}, user_agent=UA, locale='id-ID')
        sem = asyncio.Semaphore(PARALEL)
        await asyncio.gather(*[potret(ctx, sem, i, nm, lk, hasil) for i, nm, lk in tugas])
        await browser.close()

    out = []
    for cols, i in baris:
        if i is None:
            out.append(cols); continue
        if hasil.get(i):
            cols[5] = hasil[i]
        out.append(' | '.join(cols))
    open(DATA, 'w', encoding='utf-8').write(src[:m.start(2)] + '\n'.join(out) + src[m.end(2):])
    ok = sum(1 for v in hasil.values() if v)
    print(f'\nSelesai: {ok} berhasil, {len(hasil) - ok} gagal. (cadangan: js/data-karya.js.bak)')
    if len(hasil) - ok:
        print('Yang gagal: coba ulang dengan --tunggu=12 --lewati-ada, atau screenshot manual.')

asyncio.run(main())
