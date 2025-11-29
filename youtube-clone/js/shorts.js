// Funcionalidad específica para la página de Shorts

class ShortsPlayer {
    constructor() {
        this.shortsContainer = document.getElementById('shortsContainer');
        this.prevShortBtn = document.getElementById('prevShort');
        this.nextShortBtn = document.getElementById('nextShort');
        this.currentShortIndex = 0;
        this.currentShortId = null;
        
        this.init();
    }
    
    init() {
        this.loadShorts();
        this.setupEventListeners();
        this.loadShortFromURL();
    }
    
    loadShorts() {
        if (!this.shortsContainer) return;
        
        this.shortsContainer.innerHTML = shorts
            .map((short, index) => this.createShortElement(short, index))
            .join('');
        
        // Configurar event listeners para los shorts
        this.setupShortVideoListeners();
    }
    
    createShortElement(short, index) {
        return `
            <div class="short-video-container" data-short-index="${index}" data-video-id="${short.id}">
                <video class="short-video" loop playsinline>
                    <source src="${short.videoUrl}" type="video/mp4">
                    Tu navegador no soporta el elemento de video.
                </video>
                <div class="short-info">
                    <h3 class="short-title-large">${short.title}</h3>
                    <div class="short-meta">
                        <span>${formatNumber(short.views)} vistas</span>
                        <span>•</span>
                        <span>${formatDate(short.uploadDate)}</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    setupEventListeners() {
        // Navegación entre shorts
        if (this.prevShortBtn) {
            this.prevShortBtn.addEventListener('click', () => this.navigateShort(-1));
        }
        
        if (this.nextShortBtn) {
            this.nextShortBtn.addEventListener('click', () => this.navigateShort(1));
        }
        
        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') {
                this.navigateShort(-1);
            } else if (e.key === 'ArrowDown') {
                this.navigateShort(1);
            } else if (e.key === ' ') {
                e.preventDefault();
                this.toggleCurrentShortPlayback();
            }
        });
        
        // Navegación con scroll (para móviles)
        let touchStartY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const diff = touchStartY - touchEndY;
            
            if (Math.abs(diff) > 50) { // Umbral mínimo para considerar un swipe
                if (diff > 0) {
                    this.navigateShort(1); // Swipe hacia arriba
                } else {
                    this.navigateShort(-1); // Swipe hacia abajo
                }
            }
        });
        
        // Configurar botones de acción de shorts
        this.setupShortsActionButtons();
    }
    
    setupShortVideoListeners() {
        const shortVideos = this.shortsContainer.querySelectorAll('.short-video');
        
        shortVideos.forEach((video, index) => {
            // Reproducir automáticamente cuando esté en vista
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.playShort(index);
                    } else {
                        this.pauseShort(index);
                    }
                });
            }, { threshold: 0.8 });
            
            observer.observe(video);
            
            // Agregar al historial cuando se reproduzca
            video.addEventListener('play', () => {
                const videoId = video.closest('.short-video-container').dataset.videoId;
                addToHistory(videoId, 0);
            });
        });
    }
    
    setupShortsActionButtons() {
        // Botones de like/dislike
        const shortsLikeBtn = document.getElementById('shortsLikeBtn');
        const shortsDislikeBtn = document.getElementById('shortsDislikeBtn');
        const shortsCommentBtn = document.getElementById('shortsCommentBtn');
        const shortsShareBtn = document.getElementById('shortsShareBtn');
        const shortsFavoriteBtn = document.getElementById('shortsFavoriteBtn');
        
        if (shortsLikeBtn) {
            shortsLikeBtn.addEventListener('click', () => {
                shortsLikeBtn.classList.toggle('active');
                if (shortsLikeBtn.classList.contains('active')) {
                    shortsDislikeBtn?.classList.remove('active');
                }
                
                // Actualizar contador (simulado)
                const likeCount = document.getElementById('shortsLikeCount');
                if (likeCount) {
                    const currentCount = parseInt(likeCount.textContent) || 0;
                    likeCount.textContent = shortsLikeBtn.classList.contains('active') ? 
                        formatNumber(currentCount + 1) : formatNumber(currentCount - 1);
                }
            });
        }
        
        if (shortsDislikeBtn) {
            shortsDislikeBtn.addEventListener('click', () => {
                shortsDislikeBtn.classList.toggle('active');
                if (shortsDislikeBtn.classList.contains('active')) {
                    shortsLikeBtn?.classList.remove('active');
                }
            });
        }
        
        if (shortsCommentBtn) {
            shortsCommentBtn.addEventListener('click', () => {
                this.openCommentsModal();
            });
        }
        
        if (shortsShareBtn) {
            shortsShareBtn.addEventListener('click', () => {
                const currentUrl = window.location.href;
                
                if (navigator.share) {
                    navigator.share({
                        title: document.title,
                        url: currentUrl
                    });
                } else {
                    navigator.clipboard.writeText(currentUrl).then(() => {
                        alert('Enlace copiado al portapapeles');
                    });
                }
            });
        }
        
        if (shortsFavoriteBtn) {
            shortsFavoriteBtn.addEventListener('click', () => {
                shortsFavoriteBtn.classList.toggle('active');
                
                if (this.currentShortId) {
                    if (isFavorite(this.currentShortId)) {
                        removeFromFavorites(this.currentShortId);
                    } else {
                        addToFavorites(this.currentShortId);
                    }
                }
            });
        }
    }
    
    loadShortFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const shortId = urlParams.get('s');
        
        if (shortId) {
            const shortIndex = shorts.findIndex(short => short.id === shortId);
            if (shortIndex !== -1) {
                this.currentShortIndex = shortIndex;
                this.scrollToShort(shortIndex);
            }
        } else {
            // Reproducir el primer short
            this.playShort(0);
        }
    }
    
    playShort(index) {
        const shortContainer = this.shortsContainer.querySelector(`[data-short-index="${index}"]`);
        if (!shortContainer) return;
        
        const video = shortContainer.querySelector('.short-video');
        if (!video) return;
        
        // Pausar todos los otros shorts
        this.pauseAllShorts();
        
        // Reproducir el short actual
        video.play().catch(error => {
            console.log('Error al reproducir automáticamente:', error);
        });
        
        // Actualizar información del short actual
        this.currentShortIndex = index;
        this.currentShortId = shortContainer.dataset.videoId;
        this.updateShortsInfo(this.currentShortId);
        
        // Agregar al historial
        addToHistory(this.currentShortId, 0);
    }
    
    pauseShort(index) {
        const shortContainer = this.shortsContainer.querySelector(`[data-short-index="${index}"]`);
        if (!shortContainer) return;
        
        const video = shortContainer.querySelector('.short-video');
        if (!video) return;
        
        video.pause();
    }
    
    pauseAllShorts() {
        const allVideos = this.shortsContainer.querySelectorAll('.short-video');
        allVideos.forEach(video => {
            video.pause();
        });
    }
    
    toggleCurrentShortPlayback() {
        const currentShort = this.shortsContainer.querySelector(`[data-short-index="${this.currentShortIndex}"]`);
        if (!currentShort) return;
        
        const video = currentShort.querySelector('.short-video');
        if (!video) return;
        
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }
    
    navigateShort(direction) {
        const newIndex = this.currentShortIndex + direction;
        
        if (newIndex >= 0 && newIndex < shorts.length) {
            this.scrollToShort(newIndex);
        }
    }
    
    scrollToShort(index) {
        const shortContainer = this.shortsContainer.querySelector(`[data-short-index="${index}"]`);
        if (!shortContainer) return;
        
        shortContainer.scrollIntoView({ behavior: 'smooth' });
        this.playShort(index);
    }
    
    updateShortsInfo(shortId) {
        const short = shorts.find(s => s.id === shortId);
        if (!short) return;
        
        // Actualizar contadores
        const likeCount = document.getElementById('shortsLikeCount');
        const commentCount = document.getElementById('shortsCommentCount');
        
        if (likeCount) likeCount.textContent = formatNumber(short.likes);
        if (commentCount) commentCount.textContent = formatNumber(tempStorage.comments.length);
        
        // Actualizar botón de favoritos
        const favoriteBtn = document.getElementById('shortsFavoriteBtn');
        if (favoriteBtn) {
            favoriteBtn.classList.toggle('active', isFavorite(shortId));
        }
    }
    
    openCommentsModal() {
        const modal = document.getElementById('shortsCommentsModal');
        if (modal) {
            modal.classList.add('open');
            this.loadShortsComments();
        }
    }
    
    loadShortsComments() {
        const commentsList = document.getElementById('shortsCommentsList');
        if (!commentsList) return;
        
        commentsList.innerHTML = tempStorage.comments
            .slice(0, 10) // Mostrar solo los primeros 10 comentarios
            .map(comment => `
                <div class="comment">
                    <img src="${comment.avatar}" alt="Avatar" class="comment-avatar">
                    <div class="comment-content">
                        <div class="comment-author">${comment.author}</div>
                        <div class="comment-text">${comment.text}</div>
                        <div class="comment-actions">
                            <span class="comment-action">
                                <i class="fas fa-thumbs-up"></i> ${formatNumber(comment.likes)}
                            </span>
                            <span class="comment-action">${comment.timestamp}</span>
                        </div>
                    </div>
                </div>
            `)
            .join('');
        
        // Configurar envío de comentarios para shorts
        const commentInput = document.getElementById('shortsCommentInput');
        const submitComment = document.getElementById('submitShortsComment');
        const closeModal = document.getElementById('closeShortsComments');
        
        if (commentInput && submitComment) {
            commentInput.addEventListener('input', () => {
                submitComment.disabled = !commentInput.value.trim();
            });
            
            submitComment.addEventListener('click', () => {
                const commentText = commentInput.value.trim();
                if (commentText) {
                    this.addShortsComment(commentText);
                    commentInput.value = '';
                    submitComment.disabled = true;
                }
            });
        }
        
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.classList.remove('open');
            });
        }
        
        // Cerrar modal al hacer clic fuera
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
            }
        });
    }
    
    addShortsComment(commentText) {
        const newComment = addComment(this.currentShortId, commentText);
        this.loadShortsComments(); // Recargar comentarios
    }
}

// Inicializar el reproductor de shorts cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new ShortsPlayer();
});