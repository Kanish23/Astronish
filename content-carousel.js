
/**
 * Universal Infinite Carousel Logic
 * Handles mirroring, centering, and active state management.
 */

class ContentCarousel {
    constructor({ containerId, items, onNavigate }) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.originalItems = items;
        this.onNavigate = onNavigate; // Callback when an item is clicked

        // Config
        this.itemWidth = 220; // Matches CSS .content-carousel-item width
        this.itemGap = 32;    // Matches CSS margin (16px * 2)
        this.fullItemWidth = this.itemWidth + this.itemGap;
        this.visibleWidth = this.container.offsetWidth;

        // Build structure
        this.trackWrapper = document.createElement('div');
        this.trackWrapper.className = 'content-carousel-track-wrapper';

        this.track = document.createElement('div');
        this.track.className = 'content-carousel-track';

        this.trackWrapper.appendChild(this.track);
        this.container.appendChild(this.trackWrapper);

        // Navigation Buttons
        this.prevBtn = document.createElement('button');
        this.prevBtn.className = 'content-nav-btn content-nav-prev';
        this.prevBtn.innerHTML = '‹';
        this.container.appendChild(this.prevBtn);

        this.nextBtn = document.createElement('button');
        this.nextBtn.className = 'content-nav-btn content-nav-next';
        this.nextBtn.innerHTML = '›';
        this.container.appendChild(this.nextBtn);

        // Dots Container
        this.dotsContainer = document.createElement('div');
        this.dotsContainer.className = 'content-carousel-dots';
        this.container.appendChild(this.dotsContainer);

        // Setup mirrored data
        this.mirrorCount = 3; // How many items to clone on each side
        this.items = [
            ...this.originalItems.slice(-this.mirrorCount),
            ...this.originalItems,
            ...this.originalItems.slice(0, this.mirrorCount)
        ];

        // State
        this.currentIndex = this.mirrorCount; // Start at first "real" item
        this.isAnimating = false;

        this.init();
    }

    init() {
        this.renderItems();
        this.renderDots();
        this.updateDimensions();
        this.updatePosition(false); // No animation on init

        // Event Listeners
        this.prevBtn.addEventListener('click', () => this.move(-1));
        this.nextBtn.addEventListener('click', () => this.move(1));

        window.addEventListener('resize', () => {
            this.updateDimensions();
            this.updatePosition(false);
        });
    }

    renderItems() {
        this.track.innerHTML = '';
        this.items.forEach((item, index) => {
            const el = document.createElement('div');
            el.className = 'content-carousel-item';

            // Image
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
            img.className = 'content-carousel-image';

            // Title
            const title = document.createElement('div');
            title.className = 'content-carousel-title';
            title.textContent = item.name;

            el.appendChild(img);
            el.appendChild(title);

            // Click Interaction
            // Only navigate if it's the active item (center), otherwise center it?
            // User requirement: "Selecting a button moves it into the center" (Homepage behavior)
            // But usually infinite carousels just move. Let's make click center it.
            el.addEventListener('click', () => {
                if (this.currentIndex === index) {
                    // If Item has a 'url', go there (topic pages)
                    // BUT user wants carousel items to have progress bars for QUIZZES?
                    // Actually the user requirement says: "Progress bars under each subsection" 
                    // and "Each subsection quiz is accessed via quiz.html".
                    // The current items link to content pages (telescopes.html).
                    // Those content pages should link to the quiz? 
                    // OR the card itself links to the content, and the progress bar shows quiz progress?
                    // The prompts says: "Progress bars under each subsection... Each subsection card displays a progress bar underneath it".

                    if (this.onNavigate) this.onNavigate(item);
                    else if (item.url) window.location.href = item.url;
                } else {
                    const diff = index - this.currentIndex;
                    this.move(diff);
                }
            });

            // Render Progress Bar Container
            const progressContainer = document.createElement('div');
            progressContainer.className = 'carousel-progress-container';
            progressContainer.style.marginTop = '10px';
            progressContainer.style.width = '80%';
            progressContainer.style.height = '6px';
            progressContainer.style.backgroundColor = 'rgba(255,255,255,0.2)';
            progressContainer.style.borderRadius = '3px';
            progressContainer.style.overflow = 'hidden';
            progressContainer.style.display = 'none'; // Hidden by default until we have data

            const progressBar = document.createElement('div');
            progressBar.className = 'carousel-progress-bar';
            progressBar.style.height = '100%';
            progressBar.style.width = '0%';
            progressBar.style.backgroundColor = '#ff9501';
            progressBar.style.transition = 'width 0.5s ease';

            progressContainer.appendChild(progressBar);
            el.appendChild(progressContainer);

            // Fetch Progress if logged in
            // (We need access to firebase auth here. Assuming it's available globally via script.js/firebase.js)
            if (typeof firebase !== 'undefined' && firebase.auth) {
                firebase.auth().onAuthStateChanged(user => {
                    if (user) {
                        const db = firebase.firestore();
                        // Construct Quiz ID: section_subsection
                        // We need to know which section we are in. 
                        // Let's pass 'section' in the constructor or item data.
                        // For now, let's assume item has a 'quizId' property or we derive it.
                        // If not provided, we might skip.

                        if (item.quizId) {
                            const docRef = db.collection('users').doc(user.uid).collection('quizProgress').doc(item.quizId);
                            docRef.get().then(doc => {
                                if (doc.exists) {
                                    const data = doc.data();
                                    if (data.percentage !== undefined) {
                                        progressBar.style.width = `${data.percentage}%`;
                                        progressContainer.style.display = 'block';
                                    } else if (data.answers && data.totalQuestions) {
                                        const answered = Object.keys(data.answers).length;
                                        const pct = (answered / data.totalQuestions) * 100;
                                        progressBar.style.width = `${pct}%`;
                                        progressContainer.style.display = 'block';
                                    }
                                }
                            });
                        }
                    }
                });
            }

            this.track.appendChild(el);
        });
    }

    renderDots() {
        this.dotsContainer.innerHTML = '';
        this.originalItems.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'content-carousel-dot';
            dot.addEventListener('click', () => {
                // Find the closest instance of this original index to our current position
                // current 'real' index = this.currentIndex - this.mirrorCount
                // target 'real' index = i

                // Simple approach: Jump to the "main" set's instance of this index
                // Or better: calculate shortest distance?
                // Standard: Just go to the main one.
                const targetIndex = this.mirrorCount + i;
                const diff = targetIndex - this.currentIndex;
                this.move(diff);
            });
            this.dotsContainer.appendChild(dot);
        });
    }

    updateDimensions() {
        this.visibleWidth = this.container.offsetWidth;
    }

    move(direction) {
        if (this.isAnimating) return;

        this.currentIndex += direction;
        this.updatePosition(true);
    }

    updatePosition(animate = true) {
        if (animate) {
            this.track.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
            this.isAnimating = true;
        } else {
            this.track.style.transition = 'none';
        }

        const offset = (this.visibleWidth / 2) - (this.fullItemWidth / 2) - (this.currentIndex * this.fullItemWidth);
        this.track.style.transform = `translateX(${offset}px)`;

        // Update active classes
        const itemEls = this.track.querySelectorAll('.content-carousel-item');
        itemEls.forEach((el, i) => {
            el.classList.toggle('active', i === this.currentIndex);
        });

        // Update dots
        // Real index math: (current - mirror) % length
        // Handle negative modulo correctly
        let realIndex = (this.currentIndex - this.mirrorCount) % this.originalItems.length;
        if (realIndex < 0) realIndex += this.originalItems.length;

        const dots = this.dotsContainer.querySelectorAll('.content-carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === realIndex);
        });

        if (animate) {
            // Wait for transition to end, then check for loop
            setTimeout(() => {
                this.handleLoop();
                this.isAnimating = false;
            }, 400);
        }
    }

    handleLoop() {
        let hasLooped = false;
        const totalRaw = this.items.length;
        const totalOrig = this.originalItems.length;

        // If we are in the cloned tail (left side, index < mirrorCount)
        // e.g. mirror=2. items: [T2, T1, 1, 2, 3, H1, H2]. Length=7.
        // indices: 0, 1 | 2, 3, 4 | 5, 6.
        // If index becomes 1 (cloned T1), we strictly want to jump to 4 (real 3).

        if (this.currentIndex < this.mirrorCount) {
            this.currentIndex += totalOrig;
            hasLooped = true;
        }
        // If we are in the cloned head (right side)
        else if (this.currentIndex >= this.mirrorCount + totalOrig) {
            this.currentIndex -= totalOrig;
            hasLooped = true;
        }

        if (hasLooped) {
            this.updatePosition(false); // Instant jump
        }
    }
}
