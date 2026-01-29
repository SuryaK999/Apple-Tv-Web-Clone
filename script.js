const POSTER_WALL_IMAGES = [
    "assets/carousels/slide-4.webp",
    "assets/carousels/slide-2.webp",
    "assets/carousels/slide-3.webp",
    "assets/carousels/stranger-things.jpg",
    "assets/carousels/slide-5.webp",
    "assets/carousels/slide-6.webp",
    "assets/carousels/slide-7.webp",
    "assets/carousels/slide-9.webp",
    "assets/carousels/slide-10.webp"
];
const FEATURE_SLIDES = [
    {
        id: "hero-intro",
        type: 'wall',
        title: "Apple TV+ Intro",
        meta: "",
        desc: "Stream hundreds of exclusive shows and movies, with new releases every week.",
        bg: "assets/carousels/slide-1.webp",
        logo: "Get Apple TV+ free for 1 week.",
        video: "" // 3D wall doesn't use this
    },
    {
        id: "stranger-things",
        type: 'image',
        title: "Stranger Things",
        meta: "TV Show  · Sci-Fi · Horror · Mystery",
        desc: "set in 1980s Indiana, where the disappearance of a young boy coincides with the appearance of a girl with psychokinetic powers With a Group of friends.",
        bg: "assets/carousels/stranger-things.jpg",
        logo: "Stranger Things",
        video: "assets/videos/Stranger Things.mp4"
    }, {
        id: "morning-show",
        type: 'image',
        title: "The Morning Show",
        meta: "TV Show  · Drama",
        desc: "Scandals, affairs, conspiracies. And that's just the news team.",
        bg: "assets/carousels/slide-2.webp",
        logo: "THE MORNING SHOW",
        video: "assets/videos/The Morning Show.mp4"
    },
    {
        id: "f1",
        type: 'image',
        title: "F1",
        meta: "Movie · Action · Drama",
        desc: "A racing legend returns to the track—and clashes with a rising hotshot—in this epic thrill ride.",
        bg: "assets/carousels/slide-3.webp",
        logo: "BRAD PITT F1",
        video: "assets/videos/F1.mp4"
    },
    {
        id: "studio",
        type: 'image',
        title: "The Studio",
        meta: "TV Show · Comedy",
        desc: "Seth Rogen stars in an outrageous showbiz satire.",
        bg: "assets/carousels/slide-4.webp",
        logo: "The Studio",
        video: "assets/videos/The Studio.mp4"
    },
    {
        id: "hijack",
        type: 'image',
        title: "Hijack",
        meta: "TV Show · Thriller · Drama",
        desc: "This time, the suspense is off the rails.",
        bg: "assets/carousels/slide-5.webp",
        logo: "H/JACK",
        video: "assets/videos/hijack.mp4"
    },
    {
        id: "severance",
        type: 'image',
        title: "Severance",
        meta: "TV Show · Thriller · Sci-Fi",
        desc: "We're all family here.",
        bg: "assets/carousels/slide-6.webp",
        logo: "SEVERANCE",
        video: "assets/videos/Severance.mp4"
    },
    {
        id: "monarch",
        type: 'image',
        title: "Monarch : Legacy of Monsters",
        meta: "TV Show · Adventure · Sci-Fi",
        desc: "The Monsterverse Rages on as Godzilla and Kong Clash With a Colossal New Threat : Titan X.",
        bg: "assets/carousels/slide-7.webp",
        logo: "Monarch : Legacy of Monsters",
        video: "assets/videos/monarch.mp4"
    },
    {
        id: "pluribus",
        type: 'image',
        title: "Pluribus",
        meta: "TV Show · Drama · Sci-Fi",
        desc: "The Most Miserable Person on the Earth Must Save The World From Happiness. ",
        bg: "assets/carousels/slide-8.webp",
        logo: "Pluribus",
        video: "assets/videos/pluribus.mp4"
    },
    {
        id: "tehran",
        type: 'image',
        title: "Tehran",
        meta: "· Thriller · Action",
        desc: "A Secret Agent Embarks On Her Most Dangerous Mission Yet. ",
        bg: "assets/carousels/slide-9.webp",
        logo: "Tehran",
        video: "assets/videos/Tehran.mp4"
    },
    {
        id: "slow-horses",
        type: 'image',
        title: "Slow Horses",
        meta: "· Thriller · Drama",
        desc: "Gary Oldman Leads a Team of MI5 rejects who get the job done.Not well, but done . ",
        bg: "assets/carousels/slide-10.webp",
        logo: "Slow Horses",
        video: "assets/videos/Slow Horses.mp4"
    },
];

// --- CORE: Unified Main Header Carousel Controller ---
class MainHeaderCarousel {
    constructor() {
        this.track = document.getElementById('main-track');
        this.indicatorContainer = document.getElementById('main-indicators');

        if (!this.track) return;

        this.currentIndex = 0;
        this.totalSlides = FEATURE_SLIDES.length;

        this.init();
    }

    init() {
        this.renderSlides();
        this.renderIndicators();
        this.bindEvents();
        this.syncActiveSlide();
    }

    renderSlides() {
        this.track.innerHTML = '';
        FEATURE_SLIDES.forEach((item, idx) => {
            const slide = document.createElement('div');
            slide.className = 'main-slide';
            slide.setAttribute('role', 'group');
            slide.setAttribute('aria-label', item.title);

            if (item.type === 'wall') {
                slide.innerHTML = `
                    <div class="wall-slide-content">
                        <div class="wall-overlay-gradient"></div>
                        <div class="hero-content">
                            <h1 class="hero-title">${item.logo}</h1>
                            <p class="hero-desc">${item.desc}</p>
                            <button class="hero-cta-btn">Accept Free Trial</button>
                            <p class="hero-disclaimer">7 days free, then ₹99/month</p>
                        </div>
                        <div class="poster-wall-container">
                            <div class="poster-wall wall-grid" id="poster-wall"></div>
                        </div>
                    </div>
                `;
            } else {
                // Add data-video-src attribute
                slide.innerHTML = `
                    <div class="feature-slide-content" data-video-src="${item.video}">
                        <img src="${item.bg}" class="feature-bg" loading="lazy">
                        <video class="card-video-preview" src="${item.video}" muted loop playsinline preload="none"></video>
                        <div class="feature-gradient-overlay"></div>
                        <div class="feature-info">
                            <div class="feature-meta">
                                <span class="tv-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-apple" viewBox="0 0 16 16">
  <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/>
  <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/>
</svg>tv
                                </span>
                                ${item.meta}
                            </div>
                            <h2 class="feature-logo-text logo-${item.id}">${item.logo}</h2>
                            <p class="feature-desc">${item.desc}</p>
                            <div class="feature-actions">
                                <button class="hero-cta-btn">Accept Free Trial</button>
                                <button class="glass-btn">
                                    <span class="material-icons-round">add</span>
                                </button>
                            </div>
                            <p class="hero-disclaimer">7 days free, then ₹99/month</p>
                        </div>
                    </div>
                `;
            }
            this.track.appendChild(slide);
        });
        this.slides = document.querySelectorAll('.main-slide');
    }

    renderIndicators() {
        this.indicatorContainer.innerHTML = '';
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = `dot ${i === 0 ? 'active' : ''}`;
            dot.innerHTML = '<div class="dot-progress"></div>';
            dot.onclick = () => this.scrollToSlide(i);
            this.indicatorContainer.appendChild(dot);
        }
        this.dots = document.querySelectorAll('.dot');
    }
    bindEvents() {
        this.track.addEventListener('scroll', () => {
            clearTimeout(this.scrollFinishTimeout);
            this.scrollFinishTimeout = setTimeout(() => this.syncActiveSlide(), 100);
        });

        this.slides.forEach(slide => {
            const content = slide.querySelector('.feature-slide-content');
            if (!content) return;

            content.addEventListener('mouseenter', () => {

                this.syncActiveSlide();
            });

            content.addEventListener('mouseleave', () => {
                this.stopCurrentPreview();
            });
        });
    }

    scrollToSlide(index) {
        const slideWidth = this.track.offsetWidth;
        this.track.scrollTo({
            left: index * slideWidth,
            behavior: 'smooth'
        });
    }
    syncActiveSlide() {
        const slideWidth = this.track.offsetWidth;
        const scrollLeft = this.track.scrollLeft;
        this.currentIndex = Math.round(scrollLeft / slideWidth);

        // Stop previous animations/videos
        this.stopCurrentPreview();

        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentIndex);
            const progress = dot.querySelector('.dot-progress');
            if (progress) progress.style.width = '0%';
        });

        this.slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === this.currentIndex);
        });

        // Start new auto-preview delay
        this.startPreviewTimer();
    }

    startPreviewTimer() {
        const currentSlide = this.slides[this.currentIndex];
        const content = currentSlide.querySelector('.feature-slide-content');
        if (!content) return;

        this.previewTimeout = setTimeout(() => {
            this.playSlidePreview(content);
        }, 900); // 0.9 second delay as requested
    }

    playSlidePreview(content) {
        const video = content.querySelector('.card-video-preview');
        if (!video) return;

        video.style.opacity = '1';
        const playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise.catch(() => { });
        }

        // Handle Dot Progress
        const activeDot = this.dots[this.currentIndex];
        const progress = activeDot.querySelector('.dot-progress');

        if (progress) {
            const updateProgress = () => {
                if (video.paused || video.ended) return;
                const percent = (video.currentTime / video.duration) * 100;
                progress.style.width = `${percent}%`;
                this.progressRequest = requestAnimationFrame(updateProgress);
            };
            this.progressRequest = requestAnimationFrame(updateProgress);
        }
    }

    stopCurrentPreview() {
        clearTimeout(this.previewTimeout);
        cancelAnimationFrame(this.progressRequest);

        document.querySelectorAll('.card-video-preview').forEach(v => {
            v.pause();
            v.currentTime = 0;
            v.style.opacity = '0';
        });

        this.dots.forEach(dot => {
            const progress = dot.querySelector('.dot-progress');
            if (progress) progress.style.width = '0%';
        });
    }
}

class PosterWall {
    constructor() {
        setTimeout(() => {
            this.container = document.getElementById('poster-wall');
            if (this.container) {
                console.log("Initializing Poster Wall...");
                this.init();
            }
        }, 50);
    }

    init() {
        const rows = 6;
        const clones = 3;
        for (let r = 0; r < rows; r++) {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'wall-row';
            rowDiv.classList.add(r % 2 === 0 ? 'row-scroll-slow' : 'row-scroll-medium');

            const rowImages = [...POSTER_WALL_IMAGES].sort(() => Math.random() - 0.5);
            let content = '';

            for (let c = 0; c < clones; c++) {
                rowImages.forEach(imgUrl => {
                    content += `
                        <div class="wall-card">
                            <img src="${imgUrl}" loading="lazy">
                        </div>
                    `;
                });
            }
            rowDiv.innerHTML = content;
            this.container.appendChild(rowDiv);
        }
    }
}


// --- CORE: Apple TV+ Hover Video Preview Manager ---


// --- NEW: Mini Preview Manager (For Top 10 / Small Cards) ---
class MiniPreviewManager {
    constructor() {
        this.videoMap = {
            "Tehran": "assets/videos/Tehran.mp4",
            "H/Jack": "assets/videos/hijack.mp4",
            "Hijack": "assets/videos/hijack.mp4",
            "Pluribus": "assets/videos/pluribus.mp4",
            "Ted Lasso": "assets/videos/TedLasso.mp4",
            "The Morning Show": "assets/videos/The Morning Show.mp4",
            "Severance": "assets/videos/Severance.mp4",
            "Slow Horses": "assets/videos/Slow Horses.mp4",
            "Monarch": "assets/videos/monarch.mp4",
            "Invasion": "assets/videos/Invasion.mp4",
            "Silo": "assets/videos/Silo.mp4",
            "F1 : The Movie": "assets/videos/F1.mp4",
            "The Family Plan 2": "assets/videos/The Family Plan 2.mp4",
            "The Family Plan": "assets/videos/The Family Plan.mp4",
            "Wolfs": "assets/videos/WOLFS.mp4",
            "Ghosted": "assets/videos/Ghosted.mp4",
            "Fountain Of Youth": "assets/videos/Fountain of Youth.mp4",
            "The Gorge": "assets/videos/The Gorge.mp4",
            "Greyhound": "assets/videos/GREYHOUND.mp4",
            "The Lost Bus": "assets/videos/The Lost Bus.mp4",
            "Killers Of Flower Moon": "assets/videos/Killers of the Flower Moon.mp4"
        };
        this.init();
    }

    init() {
        if (window.matchMedia('(hover: none)').matches) return;
        const cards = document.querySelectorAll('.top10-item, .list-item-portrait, .list-item');
        this.initCards(cards);
    }

    initCards(cards) {
        cards.forEach(card => this.setupCard(card));
    }

    initForContainer(container) {
        const cards = container.querySelectorAll('.top10-item, .list-item-portrait, .list-item');
        this.initCards(cards);
    }

    setupCard(card) {
        let videoUrl = card.dataset.videoSrc;
        if (!videoUrl) {
            const titleEl = card.querySelector('.top10-title, .portrait-title');
            if (titleEl) {
                const title = titleEl.textContent.trim();
                videoUrl = this.videoMap[title];
            }
        }
        if (!videoUrl) return;

        // Check for existing video (clones will have it)
        let video = card.querySelector('.mini-card-video');
        if (!video) {
            video = document.createElement('video');
            video.className = 'mini-card-video';
            video.src = videoUrl;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.preload = "none";

            const img = card.querySelector('img');
            if (img) img.insertAdjacentElement('afterend', video);
            else card.appendChild(video);
        }

        let playTimeout;
        card.addEventListener('mouseenter', () => {
            playTimeout = setTimeout(() => {
                document.querySelectorAll('video').forEach(v => {
                    if (v !== video && !v.paused && v.classList.contains('mini-card-video')) {
                        v.pause();
                        v.style.opacity = '0';
                    }
                });
                video.style.opacity = '1';
                video.play().catch(() => { });
            }, 1200);
        });

        card.addEventListener('mouseleave', () => {
            if (playTimeout) clearTimeout(playTimeout);
            video.style.opacity = '0';
            setTimeout(() => {
                video.pause();
                video.currentTime = 0;
            }, 500);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MainHeaderCarousel();
    new PosterWall();
    const miniPreview = new MiniPreviewManager();

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.onclick = () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        };
    });


    // --- NEW: Section Detail Overlay Manager ---
    class SectionOverlayManager {
        constructor(miniPreview) {
            this.overlay = document.getElementById('section-overlay');
            this.grid = document.getElementById('section-detail-grid');
            this.title = document.getElementById('section-detail-title');
            this.closeBtn = document.getElementById('section-overlay-close');
            this.miniPreview = miniPreview;
            this.init();
        }

        init() {
            document.querySelectorAll('.section-title').forEach(title => {
                title.addEventListener('click', () => {
                    const sectionName = title.textContent.replace('chevron_right', '').trim();
                    const sectionRow = title.closest('.content-row');
                    const cards = sectionRow.querySelectorAll('.top10-item, .list-item-portrait, .list-item');
                    this.open(sectionName, cards);
                });
            });

            this.closeBtn.addEventListener('click', () => this.close());
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.overlay.classList.contains('active')) this.close();
            });
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) this.close();
            });
        }

        open(name, cards) {
            this.title.textContent = name;
            this.grid.innerHTML = '';
            cards.forEach((card, index) => {
                const clone = card.cloneNode(true);
                clone.classList.add('detail-card');
                // Remove group-hover if it causes issues, but keep it for style
                clone.style.transitionDelay = `${index * 0.04}s`;
                this.grid.appendChild(clone);
            });

            this.overlay.classList.add('active');
            document.body.classList.add('search-active');

            // Re-bind video previews for the new clones
            if (this.miniPreview) {
                this.miniPreview.initForContainer(this.grid);
            }
        }

        close() {
            this.overlay.classList.remove('active');
            document.body.classList.remove('search-active');
            setTimeout(() => { this.grid.innerHTML = ''; }, 600);
        }
    }

    new SectionOverlayManager(miniPreview);

    // --- Apple-Style Search Manager ---
    class SearchManager {
        constructor() {
            this.searchWrapper = document.querySelector('.search-input-wrapper');
            this.searchInput = document.querySelector('.search-input');
            this.searchOverlay = document.getElementById('search-overlay');
            this.browseSection = document.getElementById('search-browse-section');
            this.resultsSection = document.getElementById('search-results-section');
            this.resultsGrid = document.getElementById('search-results-grid');
            this.noResultsView = document.getElementById('no-results-view');
            this.searchTermDisplay = document.getElementById('search-term-display');
            this.resultsCountText = document.getElementById('results-count-text');

            this.corpus = [];
            this.init();
        }

        init() {
            this.indexContent();
            this.bindEvents();
        }

        indexContent() {
            // 1. Index Hero Slides
            if (typeof FEATURE_SLIDES !== 'undefined') {
                FEATURE_SLIDES.forEach(s => {
                    if (s.title && s.title !== "Apple TV+ Intro") {
                        this.corpus.push({
                            title: s.title,
                            genre: s.meta || "",
                            img: s.bg,
                            type: 'feature'
                        });
                    }
                });
            }

            // 2. Index content rows (Top 10, New Releases, etc.)
            const cards = document.querySelectorAll('.top10-item, .list-item-portrait');
            cards.forEach(card => {
                const titleEl = card.querySelector('.top10-title');
                const genreEl = card.querySelector('.top10-genre');
                const imgEl = card.querySelector('img');

                if (titleEl && imgEl) {
                    this.corpus.push({
                        title: titleEl.textContent.trim(),
                        genre: genreEl ? genreEl.textContent.trim() : "",
                        img: imgEl.getAttribute('src'),
                        type: 'row-item'
                    });
                }
            });

            // De-duplicate by title
            const seen = new Set();
            this.corpus = this.corpus.filter(item => {
                const duplicate = seen.has(item.title.toLowerCase());
                seen.add(item.title.toLowerCase());
                return !duplicate;
            });

            console.log(`Search Manager: Indexed ${this.corpus.length} items.`);
        }

        bindEvents() {
            this.searchWrapper.addEventListener('click', () => this.openSearch());

            this.searchInput.addEventListener('input', () => {
                this.performSearch(this.searchInput.value.trim());
            });

            this.searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') this.closeSearch();
            });

            // Close on outside click
            document.addEventListener('click', (e) => {
                if (!this.searchWrapper.contains(e.target) && !this.searchOverlay.contains(e.target) && this.searchWrapper.classList.contains('active')) {
                    if (this.searchInput.value.trim() === '') {
                        this.closeSearch();
                    }
                }
            });
        }

        openSearch() {
            if (!this.searchWrapper.classList.contains('active')) {
                this.searchWrapper.classList.add('active');
                this.searchOverlay.classList.add('active');
                document.body.classList.add('search-active');
                this.searchInput.focus();
                this.performSearch(this.searchInput.value.trim());
            }
        }

        closeSearch() {
            this.searchInput.value = '';
            this.searchWrapper.classList.remove('active');
            this.searchOverlay.classList.remove('active');
            document.body.classList.remove('search-active');
            this.resultsSection.classList.add('hidden');
            this.browseSection.classList.remove('hidden');
            this.searchInput.blur();
        }

        performSearch(query) {
            if (!query) {
                this.browseSection.classList.remove('hidden');
                this.resultsSection.classList.add('hidden');
                return;
            }

            this.browseSection.classList.add('hidden');
            this.resultsSection.classList.remove('hidden');

            const results = this.corpus.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.genre.toLowerCase().includes(query.toLowerCase())
            );

            this.renderResults(results, query);
        }

        renderResults(results, query) {
            this.resultsGrid.innerHTML = '';

            if (results.length === 0) {
                this.noResultsView.classList.remove('hidden');
                this.searchTermDisplay.textContent = query;
                this.resultsCountText.classList.add('hidden');
            } else {
                this.noResultsView.classList.add('hidden');
                this.resultsCountText.classList.remove('hidden');
                this.resultsCountText.textContent = `${results.length} ${results.length === 1 ? 'Result' : 'Results'}`;

                results.forEach(item => {
                    const regex = new RegExp(`(${query})`, 'gi');
                    const highlightedTitle = item.title.replace(regex, '<span class="search-highlight">$1</span>');

                    const card = document.createElement('div');
                    card.className = 'search-card result-card';
                    card.innerHTML = `
                        <img src="${item.img}" alt="${item.title}">
                        <div class="result-card-overlay">
                            <h3 class="result-title">${highlightedTitle}</h3>
                            <p class="result-genre">${item.genre}</p>
                        </div>
                    `;
                    this.resultsGrid.appendChild(card);
                });
            }
        }
    }

    new SearchManager();

    // --- Apple-Style Auth Manager ---
    class AuthManager {
        constructor() {
            this.modalOverlay = document.getElementById('global-modal-overlay');
            this.authModal = document.getElementById('auth-modal');
            this.trialModal = document.getElementById('trial-modal');
            this.navSigninBtn = document.getElementById('nav-signin-btn');

            this.step1 = document.getElementById('auth-step-1');
            this.stepName = document.getElementById('auth-step-name');
            this.step2 = document.getElementById('auth-step-2');

            this.identifierInput = document.getElementById('auth-identifier');
            this.nameInput = document.getElementById('auth-name');
            this.passwordInput = document.getElementById('auth-password');

            this.continueBtn = document.getElementById('auth-continue-btn');
            this.nameContinueBtn = document.getElementById('auth-name-continue-btn');
            this.signinBtn = document.getElementById('auth-signin-btn');

            this.identifierError = document.getElementById('identifier-error');
            this.nameError = document.getElementById('name-error');
            this.passwordError = document.getElementById('password-error');

            this.userDisplay = document.getElementById('auth-user-display');

            this.currentUser = null;
            this.confirmedName = "";
            this.currentStep = 1;

            this.init();
        }

        init() {
            this.continueBtn.addEventListener('click', () => this.handleIdentifierNext());
            this.nameContinueBtn.addEventListener('click', () => this.handleNameNext());
            this.signinBtn.addEventListener('click', () => this.handleSignin());

            // Back buttons
            document.querySelectorAll('.auth-back-trigger').forEach(btn => {
                btn.addEventListener('click', () => this.goBack());
            });

            // Clear errors on input
            [this.identifierInput, this.nameInput, this.passwordInput].forEach(input => {
                input.addEventListener('input', () => {
                    input.classList.remove('error');
                    input.parentElement.classList.remove('shake');
                    const errorId = input.id.replace('auth-', '') + '-error';
                    const errorDiv = document.getElementById(errorId);
                    if (errorDiv) errorDiv.classList.remove('visible');
                });
            });

            // Handle Enter key
            this.identifierInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') this.handleIdentifierNext(); });
            this.nameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') this.handleNameNext(); });
            this.passwordInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') this.handleSignin(); });
        }

        open(modalId = 'auth-modal') {
            this.modalOverlay.classList.add('active');
            document.querySelectorAll('.action-modal').forEach(m => m.classList.remove('active'));
            document.getElementById(modalId).classList.add('active');
            document.body.classList.add('search-active');

            if (modalId === 'auth-modal') {
                this.confirmedName = "";
                this.goToStep(1);
            }
        }

        close() {
            this.modalOverlay.classList.remove('active');
            document.body.classList.remove('search-active');
            setTimeout(() => {
                document.querySelectorAll('.action-modal').forEach(m => m.classList.remove('active'));
            }, 400);
        }

        goToStep(stepNumber) {
            this.currentStep = stepNumber;
            // Hide all steps first
            [this.step1, this.stepName, this.step2].forEach(s => {
                if (s) s.classList.remove('active');
            });

            const target = stepNumber === 1 ? this.step1 : (stepNumber === 'name' ? this.stepName : this.step2);

            setTimeout(() => {
                if (target) target.classList.add('active');
                if (stepNumber === 1) this.identifierInput.focus();
                else if (stepNumber === 'name') this.nameInput.focus();
                else this.passwordInput.focus();
            }, 50);
        }

        goBack() {
            if (this.currentStep === 'name') this.goToStep(1);
            else if (this.currentStep === 2) this.goToStep('name');
        }

        showError(input, errorElement, message) {
            input.classList.add('error');
            input.parentElement.classList.add('shake');
            errorElement.textContent = message;
            errorElement.classList.add('visible');
            setTimeout(() => { input.parentElement.classList.remove('shake'); }, 500);
        }

        validateIdentifier(val) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^\d{10,}$/;
            return emailRegex.test(val) || phoneRegex.test(val);
        }

        async handleIdentifierNext() {
            const val = this.identifierInput.value.trim();
            if (!val) { this.showError(this.identifierInput, this.identifierError, "Email or phone number is required."); return; }
            if (!this.validateIdentifier(val)) { this.showError(this.identifierInput, this.identifierError, "Enter a valid email address or phone number."); return; }

            this.continueBtn.classList.add('loading');
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.continueBtn.classList.remove('loading');
            this.goToStep('name');
        }

        async handleNameNext() {
            const name = this.nameInput.value.trim();
            if (!name) { this.showError(this.nameInput, this.nameError, "Please enter your name."); return; }
            if (name.length < 2) { this.showError(this.nameInput, this.nameError, "Please enter a valid name."); return; }

            this.nameContinueBtn.classList.add('loading');
            await new Promise(resolve => setTimeout(resolve, 800));
            this.nameContinueBtn.classList.remove('loading');

            this.confirmedName = name;
            this.userDisplay.textContent = this.identifierInput.value.trim();
            this.goToStep(2);
        }

        async handleSignin() {
            const pass = this.passwordInput.value.trim();
            if (!pass) { this.showError(this.passwordInput, this.passwordError, "Password is required."); return; }
            if (pass.length < 4) { this.showError(this.passwordInput, this.passwordError, "The password you entered is incorrect."); return; }

            this.signinBtn.classList.add('loading');
            await new Promise(resolve => setTimeout(resolve, 1500));
            this.signinBtn.classList.remove('loading');

            this.onLoginSuccess();
        }

        onLoginSuccess() {
            const name = this.confirmedName || "User";
            const displayName = name.split(' ')[0].charAt(0).toUpperCase() + name.split(' ')[0].slice(1);

            this.currentUser = displayName;
            const btnText = this.navSigninBtn.querySelector('.btn-text');
            if (btnText) {
                btnText.textContent = `Hi ${displayName}!`;
            }
            this.navSigninBtn.classList.add('signed-in');
            this.close();
            this.passwordInput.value = '';
        }
    }

    const auth = new AuthManager();

    // Global click handler for auth & modals
    document.addEventListener('click', (e) => {
        // Open Trial Modal
        if (e.target.matches('.hero-cta-btn, .promo-btn, .glass-btn, .glass-btn *')) {
            auth.open('trial-modal');
        }

        // Open Auth Modal
        if (e.target.closest('#nav-signin-btn')) {
            auth.open('auth-modal');
        }

        // Transition from Trial to Auth
        if (e.target.id === 'accept-trial-btn') {
            const btn = e.target;
            btn.classList.add('loading');

            setTimeout(() => {
                btn.classList.remove('loading');
                auth.open('auth-modal');
            }, 1000);
        }

        // Close on overlay click or close button
        if (e.target === auth.modalOverlay || e.target.closest('.modal-close-btn') || e.target.classList.contains('modal-close-trigger')) {
            auth.close();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && auth.modalOverlay.classList.contains('active')) {
            auth.close();
        }
    });
});




