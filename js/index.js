// ==========================================
// 1. DATA: STUDENT WORKS (GALERI KARYA)
// ==========================================
/* studentWorks dimuat dari works.js */

// ==========================================
// 2. DATA: TEAM MEMBERS (8 ANGGOTA TIM)
// ==========================================
const teamMembers = [
  {
    id: 1,
    name: "Ammar Al Hakim Asshiddiqi",
    role: "Ketua Pelaksana; Divisi PDD",
    nim: "25105260237",
    badge: "PROJECT LEADER",
    bio: "Mengoordinasikan seluruh rangkaian kegiatan Digital Workshop 2026 serta mengarahkan koordinasi antaranggota dan divisi.",
    quote: "Kegiatan yang bermakna terwujud ketika setiap orang bergerak menuju tujuan yang sama.",
    avatar: "img/member/ammar.JPG"
  },
  {
    id: 2,
    name: "Rischa Nuril Fadila",
    role: "Sekretaris; Divisi Konsumsi",
    nim: "25105260270",
    badge: "SECRETARY",
    bio: "Mengelola administrasi dan kebutuhan kesekretariatan serta membantu koordinasi konsumsi untuk mendukung kelancaran kegiatan.",
    quote: "Keteraturan dalam persiapan membantu setiap kegiatan berjalan lebih lancar.",
    avatar: "img/member/rischa.JPG"
  },
  {
    id: 3,
    name: "Lisa Nazhirotun Nisa",
    role: "Bendahara; Divisi Konsumsi",
    nim: "25105260297",
    badge: "TREASURER",
    bio: "Mengelola pencatatan dan kebutuhan keuangan kegiatan serta mendukung koordinasi konsumsi peserta.",
    quote: "Tanggung jawab dalam hal kecil ikut menentukan keberhasilan bersama.",
    avatar: "img/member/lisa.jpg"
  },
  {
    id: 4,
    name: "Elsa Yunia",
    role: "Divisi Acara (Pembawa Acara)",
    nim: "25105260198",
    badge: "EVENT HOST",
    bio: "Memandu jalannya acara dan menghubungkan setiap sesi agar rangkaian workshop berlangsung tertib dan komunikatif.",
    quote: "Suasana yang hangat membuat setiap pengalaman lebih berkesan.",
    avatar: "img/member/elsa.jpg"
  },
  {
    id: 5,
    name: "Apaf Nur Fauzia",
    role: "Divisi Acara (Narasumber 1)",
    nim: "25105260234",
    badge: "THEORY SPEAKER",
    bio: "Menyampaikan materi dan penjelasan konseptual sebagai bekal peserta memahami dasar serta tahapan pembuatan portofolio digital.",
    quote: "Pemahaman yang kuat menjadi awal dari praktik yang terarah.",
    avatar: "img/member/jia.JPG"
  },
  {
    id: 6,
    name: "Rahma Hayuning Astuti",
    role: "Divisi Acara (Narasumber 2)",
    nim: "25105260251",
    badge: "PRACTICE MENTOR",
    bio: "Mendampingi peserta dalam demonstrasi dan praktik pembuatan portofolio digital serta membantu peserta menerapkan materi secara langsung.",
    quote: "Belajar menjadi lebih bermakna ketika kita berani mencoba dan berkarya.",
    avatar: "img/member/rahma.jpg"
  },
  {
    id: 7,
    name: "Miftahul Janaah",
    role: "Divisi PDD",
    nim: "25105260255",
    badge: "PUBLICATION & MEDIA",
    bio: "Mendukung publikasi dan dokumentasi kegiatan serta menyiapkan kebutuhan media visual Digital Workshop 2026.",
    quote: "Setiap momen memiliki cerita yang layak untuk dibagikan.",
    avatar: "img/member/miftah.JPG"
  },
  {
    id: 8,
    name: "Ibnu Allika Prabo Warasto",
    role: "Divisi Humas; Divisi Perlengkapan",
    nim: "25105260264",
    badge: "PUBLIC RELATIONS & LOGISTICS",
    bio: "Menghubungkan komunikasi dengan pihak terkait serta menyiapkan kebutuhan perlengkapan agar kegiatan berjalan lancar.",
    quote: "Kolaborasi yang baik juga dibangun melalui komunikasi dan kesiapan.",
    avatar: "img/member/ibnu.JPG"
  }
];

// ==========================================
// 3. GALERI KARYA PILIHAN (MARQUEE LOOPING)
// ==========================================

// Pilih 5 karya secara manual berdasarkan ID dari works.js
const featuredWorkIds = [
    2,
    12,
    5,
    33,
    26,
    1
];

function renderGallerySlides() {
    const track = document.getElementById('student-gallery-wrapper');
    const view = document.getElementById('gallery-marquee');

    const selectedWorks = featuredWorkIds
        .map(id => studentWorks.find(work => work.id === id))
        .filter(Boolean);

    const items = selectedWorks.map(work => `
        <a class="mq-item work-card group" href="${work.link}" target="_blank" rel="noopener">
            <div class="thumb"><img src="${work.image}" alt="${work.title || work.student}" loading="lazy" onerror="this.onerror=null;this.src='${work.fallback}'"></div>
            <div class="pt-4 px-1">
                <span class="text-[11px] font-bold text-muted uppercase tracking-widest">${work.categoryLabel}</span>
                <h3 class="font-bold text-xl tracking-tight leading-snug mt-1 group-hover:text-accent transition-colors">${work.title || work.student}</h3>
                <p class="text-sm text-muted mt-1">${work.title ? work.student : work.school} <i class="fa-solid fa-arrow-up-right-from-square text-[10px] ml-1"></i></p>
            </div>
        </a>`);

    const build = () => {
        track.className = '';
        buildMarquee(track, items, {
            axis: 'x',
            speed: 45,
            minSize: view.clientWidth
        });
    };

    build();
    bindPauseButton(document.getElementById('gal-pause'), view);

    let w = innerWidth, t;
    addEventListener('resize', () => {
        clearTimeout(t);
        t = setTimeout(() => {
            if (innerWidth !== w) {
                w = innerWidth;
                build();
            }
        }, 250);
    });
}

// ==========================================
// 4. TEAM FANNED CARDS
// ==========================================
let currentTeamIdx = 0;
let isAnimatingTeam = false;

// Auto-play configuration
let teamAutoPlay = null;
let teamInteractionTimeout = null;

const TEAM_AUTO_PLAY_DELAY = 3000;
const TEAM_RESUME_DELAY = 5000;

// ------------------------------------------
// AUTO PLAY CONTROLS
// ------------------------------------------
function startTeamAutoPlay() {
    stopTeamAutoPlay();

    teamAutoPlay = setInterval(() => {
        if (document.hidden) return;

        currentTeamIdx = (currentTeamIdx + 1) % teamMembers.length;
        updateFannedCardsPositions();
    }, TEAM_AUTO_PLAY_DELAY);
}

function stopTeamAutoPlay() {
    if (teamAutoPlay !== null) {
        clearInterval(teamAutoPlay);
        teamAutoPlay = null;
    }
}

function pauseTeamAutoPlay() {
    stopTeamAutoPlay();
    clearTimeout(teamInteractionTimeout);

    teamInteractionTimeout = setTimeout(() => {
        startTeamAutoPlay();
    }, TEAM_RESUME_DELAY);
}

// Pause when the browser tab is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopTeamAutoPlay();
        clearTimeout(teamInteractionTimeout);
    } else {
        startTeamAutoPlay();
    }
});

// ------------------------------------------
// RENDER FAN CARDS
// ------------------------------------------
function renderFannedCards() {
    const stage = document.getElementById('fanned-stage-area');
    stage.innerHTML = '';

    teamMembers.forEach((member, i) => {
        const card = document.createElement('div');

        card.className = `team-card flex flex-col overflow-hidden ${i === currentTeamIdx ? 'active-card' : ''}`;
        card.setAttribute('data-index', i);

        card.innerHTML = `
            <div class="h-3/4 relative overflow-hidden bg-cream">
                <img src="${member.avatar}" alt="${member.name}" class="w-full h-full object-cover pointer-events-none">
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <span class="absolute top-3 right-3 px-2 py-1 bg-black/70 backdrop-blur text-white text-[10px] font-mono rounded">
                    0${member.id}
                </span>
            </div>
            <div class="p-4 flex-1 flex flex-col justify-center bg-creamDark border-t border-dark/10">
                <h4 class="font-syne font-bold text-base text-dark leading-tight">${member.name}</h4>
                <p class="text-xs font-semibold text-accent mt-0.5">${member.role}</p>
            </div>
        `;

        // Click card to select member
        card.addEventListener('click', () => {
            if (currentTeamIdx !== i) {
                currentTeamIdx = i;
                updateFannedCardsPositions();
            }

            pauseTeamAutoPlay();
        });

        stage.appendChild(card);
    });

    updateFannedCardsPositions(false);
}

// ------------------------------------------
// UPDATE CARD POSITIONS
// ------------------------------------------
function updateFannedCardsPositions(animate = true) {
    const cards = document.querySelectorAll('.team-card');

    cards.forEach((card, i) => {
        let offset = i - currentTeamIdx;

        let rotation = offset * 7.5;
        let translateX = offset * 65;
        let translateY = Math.abs(offset) * 12;
        let scale = i === currentTeamIdx
            ? 1.15
            : Math.max(0.8, 1 - Math.abs(offset) * 0.08);

        let zIndex = 50 - Math.abs(offset) * 5;
        let opacity = Math.abs(offset) > 3 ? 0.2 : 1;

        if (i === currentTeamIdx) {
            rotation = 0;
            translateY = -15;
            card.classList.add('active-card');
        } else {
            card.classList.remove('active-card');
        }

        const animationProps = {
            rotation,
            x: translateX,
            y: translateY,
            scale,
            zIndex,
            opacity
        };

        if (animate) {
            gsap.to(card, {
                ...animationProps,
                duration: 0.45,
                ease: "power2.out"
            });
        } else {
            gsap.set(card, animationProps);
        }
    });

    updateTeamBioPanel(teamMembers[currentTeamIdx]);
}

// ------------------------------------------
// UPDATE BIO PANEL
// ------------------------------------------
function updateTeamBioPanel(member) {
    const panel = document.getElementById('team-bio-panel');

    gsap.to(panel, {
        opacity: 0.3,
        y: 10,
        duration: 0.2,
        onComplete: () => {
            document.getElementById('bio-avatar').src = member.avatar;
            document.getElementById('bio-badge').innerText = member.badge;
            document.getElementById('bio-name').innerText = member.name;
            document.getElementById('bio-role').innerText = member.role;
            document.getElementById('bio-nim').innerText = member.nim;
            document.getElementById('bio-desc').innerText = member.bio;
            document.getElementById('bio-quote').innerText = `"${member.quote}"`;
            document.getElementById('bio-index').innerText =
                `0${member.id} / 0${teamMembers.length}`;

            gsap.to(panel, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });
}

// ------------------------------------------
// MOUSE WHEEL SCROLL
// ------------------------------------------
const fannedSection = document.getElementById('tim');
let wheelCooldown = false;

fannedSection.addEventListener('wheel', (e) => {
    const rect = fannedSection.getBoundingClientRect();

    const inView =
        rect.top < window.innerHeight / 2 &&
        rect.bottom > window.innerHeight / 2;

    if (inView && !wheelCooldown) {
        let changed = false;

        if (e.deltaY > 0) {
            currentTeamIdx =
                (currentTeamIdx + 1) % teamMembers.length;
            changed = true;

        } else if (e.deltaY < 0) {
            currentTeamIdx =
                (currentTeamIdx - 1 + teamMembers.length) % teamMembers.length;
            changed = true;
        }

        if (changed) {
            updateFannedCardsPositions();
            triggerWheelCooldown();
            pauseTeamAutoPlay();
        }
    }
}, { passive: true });

function triggerWheelCooldown() {
    wheelCooldown = true;

    setTimeout(() => {
        wheelCooldown = false;
    }, 350);
}

// ------------------------------------------
// TOUCH SWIPE - MOBILE
// ------------------------------------------
let touchStartX = 0;
const stageArea = document.getElementById('fanned-stage-area');

stageArea.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
}, { passive: true });

stageArea.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 40) {
        if (diff > 0) {
            currentTeamIdx =
                (currentTeamIdx + 1) % teamMembers.length;

        } else {
            currentTeamIdx =
                (currentTeamIdx - 1 + teamMembers.length) % teamMembers.length;
        }

        updateFannedCardsPositions();
        pauseTeamAutoPlay();
    }
}, { passive: true });


// ==========================================
// 5. MODALS LOGIC
// ==========================================
// Portfolio Modal
const portfolioModal = document.getElementById('portfolio-modal');
const closeModalBtn = document.getElementById('close-modal-btn');

function openPortfolioModal(id) {
    const item = studentWorks.find(w => w.id === id);
    if (!item) return;

    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
        <div class="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider mb-2">
            <span>Kategori: ${item.categoryLabel}</span>
            <span>•</span>
            <span>Edisi 2026</span>
        </div>
        <h2 class="font-syne font-extrabold text-3xl sm:text-4xl text-dark mb-1">${item.title}</h2>
        <p class="text-sm font-semibold text-muted mb-6">Karya Oleh: <span class="text-dark">${item.student}</span></p>

        <div class="rounded-2xl overflow-hidden border border-dark/15 mb-6 aspect-video bg-creamDark">
            <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover">
        </div>

        <div class="space-y-4">
            <div>
                <h4 class="font-syne font-bold text-sm uppercase text-dark mb-1">Deskripsi Proyek</h4>
                <p class="text-sm text-subtleDark leading-relaxed">${item.description}</p>
            </div>

            <div>
                <h4 class="font-syne font-bold text-sm uppercase text-dark mb-2">Teknologi & Tools</h4>
                <div class="flex flex-wrap gap-2">
                    ${item.tech.map(t => `<span class="px-3 py-1 bg-creamDark border border-dark/20 text-dark rounded-full font-semibold text-xs">${t}</span>`).join('')}
                </div>
            </div>

            <div class="pt-4 border-t border-dark/10 flex justify-end gap-3">
                <button onclick="alert('Pratinjau Live Demo berhasil dimuat dalam sandbox.')" class="px-6 py-2.5 bg-accent text-white rounded-full font-bold text-xs uppercase tracking-wider hover:bg-accentHover transition-colors">
                    Live Preview <i class="fa-solid fa-arrow-right ml-1"></i>
                </button>
            </div>
        </div>
    `;

    portfolioModal.classList.remove('hidden');
    portfolioModal.classList.add('flex');
}

closeModalBtn.addEventListener('click', () => {
    portfolioModal.classList.add('hidden');
    portfolioModal.classList.remove('flex');
});

portfolioModal.addEventListener('click', (e) => {
    if (e.target === portfolioModal) {
        portfolioModal.classList.add('hidden');
        portfolioModal.classList.remove('flex');
    }
});

// Documentation Lightbox Modal
const docModal = document.getElementById('doc-modal');
const docModalImg = document.getElementById('doc-modal-img');
const docModalCaption = document.getElementById('doc-modal-caption');
const closeDocBtn = document.getElementById('close-doc-btn');

document.querySelectorAll('.doc-photo-item').forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.getAttribute('data-img');
        const caption = item.getAttribute('data-caption');

        docModalImg.src = imgSrc;
        docModalCaption.innerText = caption;
        docModal.classList.remove('hidden');
        docModal.classList.add('flex');
    });
});

closeDocBtn.addEventListener('click', () => {
    docModal.classList.add('hidden');
    docModal.classList.remove('flex');
});

docModal.addEventListener('click', (e) => {
    if (e.target === docModal) {
        docModal.classList.add('hidden');
        docModal.classList.remove('flex');
    }
});

// Video Player Mockup Trigger
document.getElementById('video-mockup-trigger').addEventListener('click', () => {
    alert('Video Recap Digital Workshop 2026 diputar dalam resolusi 4K (Demo Player Mode).');
});

// GSAP ScrollTrigger Animations
window.onload = function() {
    renderGallerySlides();
    renderFannedCards();

    // GSAP Header Animation
    gsap.from('#main-nav', {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    startTeamAutoPlay();
};

// VIDEO HERO
(function () {
    const v = document.getElementById('hero-video');
    const fb = document.getElementById('video-fallback');
    const btn = document.getElementById('video-sound');
    const src = v.querySelector('source');
    src.addEventListener('error', () => fb.classList.remove('hidden'));
    v.addEventListener('error', () => fb.classList.remove('hidden'));
    v.play().catch(() => {});
    btn.addEventListener('click', () => {
        v.muted = !v.muted;
        btn.innerHTML = v.muted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
        v.play().catch(() => {});
    });
})();
