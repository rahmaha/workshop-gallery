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
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
        badge: "PROJECT LEADER",
        bio: "Spesialis Design System & Product Strategy dengan pengalaman 8+ tahun membimbing desainer muda menciptakan portofolio berkelas internasional.",
        quote: "Desain bukan sekadar tentang estetika visual, melainkan bagaimana pengalaman tersebut memberdayakan pengguna."
    },
    {
        id: 2,
        name: "Rizky Pratama",
        role: "Frontend Architect",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
        badge: "CREATIVE TECH",
        bio: "Pakar GSAP, WebGL, dan micro-interaction. Bertanggung jawab atas kualitas animasi dan performa web interaktif murid.",
        quote: "Kode adalah kuas lukis di era digital. Pastikan setiap barisnya menyampaikan cerita."
    },
    {
        id: 3,
        name: "Maya Salsabila",
        role: "Editorial & Brand Lead",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
        badge: "ART DIRECTION",
        bio: "Pengarah gaya visual edisi 2026. Fokus pada tipografi presisi, harmoni warna, dan kurasi katalog pameran.",
        quote: "Tipografi menyampaikan nada suara sebelum kata-kata itu sempat dibaca."
    },
    {
        id: 4,
        name: "Devon Vance",
        role: "3D Motion Specialist",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
        badge: "MOTION DESIGN",
        bio: "Perintis dalam penerapan animasi 3D modern pada web browser menggunakan Spline dan Three.js.",
        quote: "Bawa pergerakan dinamis ke dalam ruang hampa untuk memicu kejutan visual."
    },
    {
        id: 5,
        name: "Nadia Utami",
        role: "User Research Coach",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
        badge: "UX RESEARCH",
        bio: "Membantu murid mengolah wawasan pengguna menjadi fondasi utama konsep solusi produk digital.",
        quote: "Empati pada pengguna selalu menjadi prioritas utama sebelum piksel disusun."
    },
    {
        id: 6,
        name: "Julian Vance",
        role: "Fullstack Advisor",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
        badge: "BACKEND & API",
        bio: "Merancang arsitektur serverles dan integrasi API cepat untuk mendukung showcase portofolio murid.",
        quote: "Kecepatan dan performa adalah fondasi tak kasat mata dari desain yang hebat."
    },
    {
        id: 7,
        name: "Siti Rahma",
        role: "Creative Curator",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
        badge: "CURATOR",
        bio: "Menseleksi dan menggolongkan karya murid terbaik untuk dipublikasikan pada katalog majalah fisik dan digital.",
        quote: "Keotentikan dan keberanian bergaya menentukan daya tarik sebuah portofolio."
    },
    {
        id: 8,
        name: "Kevin Sanjaya",
        role: "Web Performance Tech",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
        badge: "OPTIMIZATION",
        bio: "Memastikan aksesibilitas (a11y) dan pengoptimalan aset digital hingga mencapai skor Lighthouse sempurna.",
        quote: "Buat web yang cepat, inklusif, dan siap dipamerkan ke industri global."
    }
];

// ==========================================
// 3. GALERI KARYA PILIHAN (MARQUEE LOOPING)
// ==========================================
function renderGallerySlides() {
    const track = document.getElementById('student-gallery-wrapper');
    const view = document.getElementById('gallery-marquee');
    const items = studentWorks.slice(0, 5).map(work => `
        <a class="mq-item work-card group" href="${work.link}" target="_blank" rel="noopener">
            <div class="thumb"><img src="${work.image}" alt="${work.title || work.student}" loading="lazy" onerror="this.onerror=null;this.src='${work.fallback}'"></div>
            <div class="pt-4 px-1">
                <span class="text-[11px] font-bold text-muted uppercase tracking-widest">${work.categoryLabel}</span>
                <h3 class="font-bold text-xl tracking-tight leading-snug mt-1 group-hover:text-accent transition-colors">${work.title || work.student}</h3>
                <p class="text-sm text-muted mt-1">${work.title ? work.student : work.school} <i class="fa-solid fa-arrow-up-right-from-square text-[10px] ml-1"></i></p>
            </div>
        </a>`);

    const build = () => { track.className = ''; buildMarquee(track, items, { axis: 'x', speed: 45, minSize: view.clientWidth }); };
    build();
    bindPauseButton(document.getElementById('gal-pause'), view);

    let w = innerWidth, t;
    addEventListener('resize', () => { clearTimeout(t); t = setTimeout(() => { if (innerWidth !== w) { w = innerWidth; build(); } }, 250); });
}

// ==========================================
// 4. TEAM FANNED CARDS (LANDO NORRIS AUTOMATIC SCROLL INTERACTION)
// ==========================================
let currentTeamIdx = 0;
let isAnimatingTeam = false;

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

        card.addEventListener('click', () => {
            if (currentTeamIdx !== i) {
                currentTeamIdx = i;
                updateFannedCardsPositions();
            }
        });

        stage.appendChild(card);
    });

    updateFannedCardsPositions(false);
}

function updateFannedCardsPositions(animate = true) {
    const cards = document.querySelectorAll('.team-card');
    const total = teamMembers.length;

    cards.forEach((card, i) => {
        let offset = i - currentTeamIdx;

        // Handle index offset wrap/distance
        let rotation = offset * 7.5; // Fan angles (-20deg to +20deg approx)
        let translateX = offset * 65; // Horizontal spread
        let translateY = Math.abs(offset) * 12; // Curvature down
        let scale = i === currentTeamIdx ? 1.15 : Math.max(0.8, 1 - Math.abs(offset) * 0.08);
        let zIndex = 50 - Math.abs(offset) * 5;
        let opacity = Math.abs(offset) > 3 ? 0.2 : 1;

        if (i === currentTeamIdx) {
            rotation = 0; // Active center card turns upright (0 deg)
            translateY = -15;
            card.classList.add('active-card');
        } else {
            card.classList.remove('active-card');
        }

        if (animate) {
            gsap.to(card, {
                rotation: rotation,
                x: translateX,
                y: translateY,
                scale: scale,
                zIndex: zIndex,
                opacity: opacity,
                duration: 0.45,
                ease: "power2.out"
            });
        } else {
            gsap.set(card, {
                rotation: rotation,
                x: translateX,
                y: translateY,
                scale: scale,
                zIndex: zIndex,
                opacity: opacity
            });
        }
    });

    // Update Active Team Bio Panel with GSAP Transition
    updateTeamBioPanel(teamMembers[currentTeamIdx]);
}

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
            document.getElementById('bio-index').innerText = `0${member.id} / 0${teamMembers.length}`;

            gsap.to(panel, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });
}

// Mouse Wheel Scroll Listener for Team Cards Section
const fannedSection = document.getElementById('tim');
let wheelCooldown = false;

fannedSection.addEventListener('wheel', (e) => {
    // Check if mouse is near or over fanned area
    const rect = fannedSection.getBoundingClientRect();
    const inView = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;

    if (inView && !wheelCooldown) {
        if (e.deltaY > 0) {
            // Scroll down -> next member
            if (currentTeamIdx < teamMembers.length - 1) {
                currentTeamIdx++;
                updateFannedCardsPositions();
                triggerWheelCooldown();
            }
        } else if (e.deltaY < 0) {
            // Scroll up -> previous member
            if (currentTeamIdx > 0) {
                currentTeamIdx--;
                updateFannedCardsPositions();
                triggerWheelCooldown();
            }
        }
    }
}, { passive: true });

function triggerWheelCooldown() {
    wheelCooldown = true;
    setTimeout(() => { wheelCooldown = false; }, 350);
}

// Touch Swipe Gesture for Mobile on Fanned Area
let touchStartX = 0;
const stageArea = document.getElementById('fanned-stage-area');

stageArea.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
}, { passive: true });

stageArea.addEventListener('touchend', (e) => {
    let touchEndX = e.changedTouches[0].clientX;
    let diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 40) {
        if (diff > 0 && currentTeamIdx < teamMembers.length - 1) {
            currentTeamIdx++;
            updateFannedCardsPositions();
        } else if (diff < 0 && currentTeamIdx > 0) {
            currentTeamIdx--;
            updateFannedCardsPositions();
        }
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
