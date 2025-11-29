// Reproductor de video personalizado

class VideoPlayer {
    constructor() {
        this.video = document.getElementById('videoPlayer');
        this.overlay = document.getElementById('videoOverlay');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.playPauseControl = document.getElementById('playPauseControl');
        this.progressBar = document.getElementById('progressBar');
        this.progress = document.getElementById('progress');
        this.progressThumb = document.getElementById('progressThumb');
        this.currentTime = document.getElementById('currentTime');
        this.totalTime = document.getElementById('totalTime');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.muteBtn = document.getElementById('muteBtn');
        this.speedBtn = document.getElementById('speedBtn');
        this.pipBtn = document.getElementById('pipBtn');
        this.cinemaBtn = document.getElementById('cinemaBtn');
        this.fullscreenBtn = document.getElementById('fullscreenBtn');
        this.miniPlayer = document.getElementById('miniPlayer');
        this.miniVideoPlayer = document.getElementById('miniVideoPlayer');
        this.miniPlayerClose = document.getElementById('miniPlayerClose');
        
        this.isDragging = false;
        this.currentVideoId = null;
        
        this.init();
    }
    
    init() {
        if (this.video) {
            this.setupEventListeners();
            this.loadVideoFromURL();
        }
    }
    
    setupEventListeners() {
        // Eventos del video
        this.video.addEventListener('loadedmetadata', this.onLoadedMetadata.bind(this));
        this.video.addEventListener('timeupdate', this.onTimeUpdate.bind(this));
        this.video.addEventListener('play', this.onPlay.bind(this));
        this.video.addEventListener('pause', this.onPause.bind(this));
        this.video.addEventListener('volumechange', this.onVolumeChange.bind(this));
        
        // Controles de reproducción
        this.playPauseBtn?.addEventListener('click', this.togglePlay.bind(this));
        this.playPauseControl?.addEventListener('click', this.togglePlay.bind(this));
        
        // Barra de progreso
        this.progressBar?.addEventListener('click', this.seek.bind(this));
        this.progressBar?.addEventListener('mousedown', this.startDrag.bind(this));
        document.addEventListener('mousemove', this.drag.bind(this));
        document.addEventListener('mouseup', this.stopDrag.bind(this));
        
        // Controles de volumen
        this.volumeSlider?.addEventListener('input', this.changeVolume.bind(this));
        this.muteBtn?.addEventListener('click', this.toggleMute.bind(this));
        
        // Controles de velocidad
        this.speedBtn?.addEventListener('click', this.changeSpeed.bind(this));
        
        // Modos de pantalla
        this.pipBtn?.addEventListener('click', this.togglePip.bind(this));
        this.cinemaBtn?.addEventListener('click', this.toggleCinemaMode.bind(this));
        this.fullscreenBtn?.addEventListener('click', this.toggleFullscreen.bind(this));
        
        // Mini reproductor
        this.miniPlayerClose?.addEventListener('click', this.closeMiniPlayer.bind(this));
        
        // Detectar scroll para mini reproductor
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    
    loadVideoFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const videoId = urlParams.get('v');
        
        if (videoId) {
            this.loadVideo(videoId);
        }
    }
    
    loadVideo(videoId) {
        const videoData = getVideoById(videoId);
        
        if (videoData) {
            this.currentVideoId = videoId;
            
            // Actualizar información del video en la página
            this.updateVideoInfo(videoData);
            
            // Cargar progreso guardado
            const savedProgress = getWatchProgress(videoId);
            if (savedProgress > 0) {
                this.video.currentTime = savedProgress;
            }
            
            // Agregar al historial
            addToHistory(videoId, this.video.currentTime);
            
            // Mostrar minijuego si corresponde
            this.toggleMiniGame(videoData.hasGame);
        }
    }
    
    updateVideoInfo(videoData) {
        // Actualizar elementos de la página con la información del video
        const titleElement = document.getElementById('videoTitle');
        const viewsElement = document.getElementById('videoViews');
        const dateElement = document.getElementById('videoDate');
        const likeCountElement = document.getElementById('likeCount');
        const dislikeCountElement = document.getElementById('dislikeCount');
        const channelNameElement = document.getElementById('channelName');
        const channelSubsElement = document.getElementById('channelSubs');
        const descriptionElement = document.getElementById('descriptionText');
        const tagsElement = document.getElementById('videoTags');
        const commentsCountElement = document.getElementById('commentsCount');
        
        if (titleElement) titleElement.textContent = videoData.title;
        if (viewsElement) viewsElement.textContent = `${formatNumber(videoData.views)} vistas`;
        if (dateElement) dateElement.textContent = formatDate(videoData.uploadDate);
        if (likeCountElement) likeCountElement.textContent = formatNumber(videoData.likes);
        if (dislikeCountElement) dislikeCountElement.textContent = formatNumber(videoData.dislikes);
        if (channelNameElement) channelNameElement.textContent = videoData.channel.name;
        if (channelSubsElement) channelSubsElement.textContent = `${videoData.channel.subscribers} suscriptores`;
        if (descriptionElement) descriptionElement.textContent = videoData.description;
        if (commentsCountElement) commentsCountElement.textContent = formatNumber(tempStorage.comments.length);
        
        // Actualizar etiquetas
        if (tagsElement) {
            tagsElement.innerHTML = videoData.tags
                .map(tag => `<span class="tag">${tag}</span>`)
                .join('');
        }
        
        // Actualizar botón de favoritos
        this.updateFavoriteButton(videoData.id);
        
        // Cargar comentarios
        this.loadComments();
        
        // Cargar videos relacionados
        this.loadRelatedVideos(videoData);
    }
    
    updateFavoriteButton(videoId) {
        const favoriteBtn = document.getElementById('favoriteBtn');
        if (favoriteBtn) {
            const isFav = isFavorite(videoId);
            favoriteBtn.innerHTML = isFav ? 
                '<i class="fas fa-heart"></i><span>En favoritos</span>' :
                '<i class="far fa-heart"></i><span>Favorito</span>';
            favoriteBtn.classList.toggle('active', isFav);
        }
    }
    
    loadComments() {
        const commentsList = document.getElementById('commentsList');
        if (commentsList) {
            commentsList.innerHTML = tempStorage.comments
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
                                <span class="comment-action">
                                    <i class="fas fa-thumbs-down"></i>
                                </span>
                                <span class="comment-action">Responder</span>
                                <span class="comment-action">${comment.timestamp}</span>
                            </div>
                        </div>
                    </div>
                `)
                .join('');
        }
        
        // Configurar envío de comentarios
        const commentInput = document.getElementById('commentInput');
        const submitComment = document.getElementById('submitComment');
        
        if (commentInput && submitComment) {
            commentInput.addEventListener('input', () => {
                submitComment.disabled = !commentInput.value.trim();
            });
            
            submitComment.addEventListener('click', () => {
                const commentText = commentInput.value.trim();
                if (commentText) {
                    this.addComment(commentText);
                    commentInput.value = '';
                    submitComment.disabled = true;
                }
            });
            
            commentInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && commentInput.value.trim()) {
                    this.addComment(commentInput.value.trim());
                    commentInput.value = '';
                    submitComment.disabled = true;
                }
            });
        }
    }
    
    addComment(commentText) {
        const newComment = addComment(this.currentVideoId, commentText);
        this.loadComments(); // Recargar comentarios
        
        // Actualizar contador
        const commentsCountElement = document.getElementById('commentsCount');
        if (commentsCountElement) {
            commentsCountElement.textContent = formatNumber(tempStorage.comments.length);
        }
    }
    
    loadRelatedVideos(videoData) {
        const relatedVideosElement = document.getElementById('relatedVideos');
        const relatedShortsElement = document.getElementById('relatedShorts');
        
        if (relatedVideosElement) {
            const relatedVideos = getRelatedVideos(videoData);
            relatedVideosElement.innerHTML = relatedVideos
                .map(video => `
                    <div class="related-video" data-video-id="${video.id}">
                        <img src="${video.thumbnail}" alt="Thumbnail" class="related-thumbnail">
                        <div class="related-info">
                            <div class="related-title">${video.title}</div>
                            <div class="related-meta">${video.channel.name}</div>
                            <div class="related-meta">${formatNumber(video.views)} vistas • ${formatDate(video.uploadDate)}</div>
                        </div>
                    </div>
                `)
                .join('');
            
            // Agregar event listeners a los videos relacionados
            relatedVideosElement.querySelectorAll('.related-video').forEach(videoElement => {
                videoElement.addEventListener('click', () => {
                    const videoId = videoElement.dataset.videoId;
                    window.location.href = `video.html?v=${videoId}`;
                });
            });
        }
        
        if (relatedShortsElement) {
            const relatedShorts = getRelatedShorts(videoData);
            relatedShortsElement.innerHTML = relatedShorts
                .map(short => `
                    <div class="related-short" data-video-id="${short.id}">
                        <img src="${short.thumbnail}" alt="Thumbnail" class="related-short-thumbnail">
                        <div class="related-info">
                            <div class="related-title">${short.title}</div>
                            <div class="related-meta">${formatNumber(short.views)} vistas</div>
                        </div>
                    </div>
                `)
                .join('');
            
            // Agregar event listeners a los shorts relacionados
            relatedShortsElement.querySelectorAll('.related-short').forEach(shortElement => {
                shortElement.addEventListener('click', () => {
                    const videoId = shortElement.dataset.videoId;
                    window.location.href = `shorts.html?s=${videoId}`;
                });
            });
        }
    }
    
    toggleMiniGame(show) {
        const miniGameContainer = document.getElementById('miniGameContainer');
        if (miniGameContainer) {
            miniGameContainer.style.display = show ? 'block' : 'none';
            
            if (show) {
                this.setupMiniGame();
            }
        }
    }
    
    setupMiniGame() {
        const gameButton = document.getElementById('gameButton');
        const gameScore = document.getElementById('gameScore');
        
        let score = 0;
        
        if (gameButton && gameScore) {
            gameButton.addEventListener('click', () => {
                score++;
                gameScore.textContent = score;
                
                // Efecto visual
                gameButton.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    gameButton.style.transform = 'scale(1)';
                }, 100);
            });
        }
    }
    
    onLoadedMetadata() {
        if (this.totalTime) {
            this.totalTime.textContent = formatDuration(this.video.duration);
        }
    }
    
    onTimeUpdate() {
        const currentTime = this.video.currentTime;
        const duration = this.video.duration;
        
        if (this.currentTime) {
            this.currentTime.textContent = formatDuration(currentTime);
        }
        
        if (this.progress && duration > 0) {
            const progressPercent = (currentTime / duration) * 100;
            this.progress.style.width = `${progressPercent}%`;
            this.progressThumb.style.left = `${progressPercent}%`;
        }
        
        // Guardar progreso cada 5 segundos
        if (this.currentVideoId && Math.floor(currentTime) % 5 === 0) {
            saveWatchProgress(this.currentVideoId, currentTime);
            addToHistory(this.currentVideoId, currentTime);
        }
    }
    
    onPlay() {
        this.updatePlayPauseButtons(true);
    }
    
    onPause() {
        this.updatePlayPauseButtons(false);
    }
    
    onVolumeChange() {
        if (this.volumeSlider) {
            this.volumeSlider.value = this.video.volume;
        }
        
        if (this.muteBtn) {
            this.muteBtn.innerHTML = this.video.muted || this.video.volume === 0 ?
                '<i class="fas fa-volume-mute"></i>' :
                '<i class="fas fa-volume-up"></i>';
        }
    }
    
    updatePlayPauseButtons(isPlaying) {
        const icon = isPlaying ? 'fa-pause' : 'fa-play';
        
        if (this.playPauseBtn) {
            this.playPauseBtn.innerHTML = `<i class="fas ${icon}"></i>`;
        }
        
        if (this.playPauseControl) {
            this.playPauseControl.innerHTML = `<i class="fas ${icon}"></i>`;
        }
    }
    
    togglePlay() {
        if (this.video.paused) {
            this.video.play();
        } else {
            this.video.pause();
        }
    }
    
    seek(e) {
        if (!this.isDragging) {
            const rect = this.progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            this.video.currentTime = percent * this.video.duration;
        }
    }
    
    startDrag(e) {
        this.isDragging = true;
        this.progressThumb.style.opacity = '1';
    }
    
    drag(e) {
        if (this.isDragging) {
            const rect = this.progressBar.getBoundingClientRect();
            let percent = (e.clientX - rect.left) / rect.width;
            percent = Math.max(0, Math.min(1, percent));
            
            this.progress.style.width = `${percent * 100}%`;
            this.progressThumb.style.left = `${percent * 100}%`;
            this.video.currentTime = percent * this.video.duration;
        }
    }
    
    stopDrag() {
        this.isDragging = false;
        this.progressThumb.style.opacity = '';
    }
    
    changeVolume() {
        this.video.volume = this.volumeSlider.value;
    }
    
    toggleMute() {
        this.video.muted = !this.video.muted;
    }
    
    changeSpeed() {
        const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
        const currentSpeed = this.video.playbackRate;
        const currentIndex = speeds.indexOf(currentSpeed);
        const nextIndex = (currentIndex + 1) % speeds.length;
        
        this.video.playbackRate = speeds[nextIndex];
        this.speedBtn.textContent = `${speeds[nextIndex]}x`;
    }
    
    async togglePip() {
        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
            } else if (document.pictureInPictureEnabled) {
                await this.video.requestPictureInPicture();
            }
        } catch (error) {
            console.error('Error al activar Picture-in-Picture:', error);
        }
    }
    
    toggleCinemaMode() {
        document.body.classList.toggle('cinema-mode');
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
    
    handleScroll() {
        if (this.miniPlayer && window.pageYOffset > 300) {
            this.showMiniPlayer();
        } else {
            this.hideMiniPlayer();
        }
    }
    
    showMiniPlayer() {
        if (this.miniPlayer && this.video && !this.video.paused) {
            this.miniPlayer.style.display = 'block';
            
            // Actualizar información del mini reproductor
            const titleElement = this.miniPlayer.querySelector('.mini-player-title');
            if (titleElement) {
                const videoData = getVideoById(this.currentVideoId);
                if (videoData) {
                    titleElement.textContent = videoData.title;
                }
            }
        }
    }
    
    hideMiniPlayer() {
        if (this.miniPlayer) {
            this.miniPlayer.style.display = 'none';
        }
    }
    
    closeMiniPlayer() {
        this.hideMiniPlayer();
    }
}

// Inicializar el reproductor cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new VideoPlayer();
});