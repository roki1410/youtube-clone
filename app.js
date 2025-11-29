// Aplicación principal de YouTube Clone

class YouTubeCloneApp {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.sidebarToggle = document.getElementById('sidebarToggle');
        this.themeToggle = document.getElementById('themeToggle');
        this.settingsToggle = document.getElementById('settingsToggle');
        this.settingsModal = document.getElementById('settingsModal');
        this.closeSettings = document.getElementById('closeSettings');
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadHomePage();
        this.applySavedSettings();
    }
    
    setupEventListeners() {
        // Sidebar toggle
        if (this.sidebarToggle) {
            this.sidebarToggle.addEventListener('click', this.toggleSidebar.bind(this));
        }
        
        // Theme toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', this.toggleTheme.bind(this));
        }
        
        // Settings modal
        if (this.settingsToggle) {
            this.settingsToggle.addEventListener('click', this.openSettings.bind(this));
        }
        
        if (this.closeSettings) {
            this.closeSettings.addEventListener('click', this.closeSettingsModal.bind(this));
        }
        
        // Cerrar modal al hacer clic fuera
        if (this.settingsModal) {
            this.settingsModal.addEventListener('click', (e) => {
                if (e.target === this.settingsModal) {
                    this.closeSettingsModal();
                }
            });
        }
        
        // Configuración de temas
        this.setupThemeOptions();
        
        // Configuración de favoritos e historial
        this.setupFavoritesAndHistory();
        
        // Configuración de botones de configuración
        this.setupSettingsButtons();
        
        // Configuración de descripción expandible
        this.setupExpandableDescription();
        
        // Configuración de botones de like/dislike
        this.setupLikeDislikeButtons();
        
        // Configuración de botón de favoritos
        this.setupFavoriteButton();
        
        // Configuración de botón de descarga
        this.setupDownloadButton();
        
        // Configuración de botón de compartir
        this.setupShareButton();
    }
    
    toggleSidebar() {
        this.sidebar.classList.toggle('open');
    }
    
    toggleTheme() {
        const currentTheme = tempStorage.settings.theme;
        const themes = ['light', 'dark', 'oled', 'sepia'];
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        
        this.changeTheme(themes[nextIndex]);
    }
    
    changeTheme(theme) {
        tempStorage.settings.theme = theme;
        applySettings(tempStorage.settings);
        saveToSessionStorage();
        
        // Actualizar opciones de tema en settings modal
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.theme === theme);
        });
    }
    
    openSettings() {
        if (this.settingsModal) {
            this.settingsModal.classList.add('open');
            
            // Cargar configuración actual en el modal
            this.loadCurrentSettings();
        }
    }
    
    closeSettingsModal() {
        if (this.settingsModal) {
            this.settingsModal.classList.remove('open');
        }
    }
    
    loadCurrentSettings() {
        // Tema
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.theme === tempStorage.settings.theme);
        });
        
        // Velocidad predeterminada
        const defaultSpeed = document.getElementById('defaultSpeed');
        if (defaultSpeed) {
            defaultSpeed.value = tempStorage.settings.defaultSpeed;
        }
        
        // Vista previa al pasar el mouse
        const hoverPreview = document.getElementById('hoverPreview');
        if (hoverPreview) {
            hoverPreview.checked = tempStorage.settings.hoverPreview;
        }
    }
    
    setupThemeOptions() {
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.changeTheme(option.dataset.theme);
            });
        });
    }
    
    setupFavoritesAndHistory() {
        // Enlaces de favoritos e historial
        const favoritesLink = document.getElementById('favoritesLink');
        const historyLink = document.getElementById('historyLink');
        const mobileFavorites = document.getElementById('mobileFavorites');
        const mobileHistory = document.getElementById('mobileHistory');
        
        const showFavorites = () => {
            this.showSection('favorites');
            this.closeSettingsModal();
        };
        
        const showHistory = () => {
            this.showSection('history');
            this.closeSettingsModal();
        };
        
        if (favoritesLink) favoritesLink.addEventListener('click', showFavorites);
        if (historyLink) historyLink.addEventListener('click', showHistory);
        if (mobileFavorites) mobileFavorites.addEventListener('click', showFavorites);
        if (mobileHistory) mobileHistory.addEventListener('click', showHistory);
        
        // Navegación por categorías
        const categoryLinks = document.querySelectorAll('.nav-item[data-category]');
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = link.dataset.category;
                this.filterByCategory(category);
            });
        });
    }
    
    setupSettingsButtons() {
        // Botones de limpieza en settings
        const clearFavorites = document.getElementById('clearFavorites');
        const clearHistory = document.getElementById('clearHistory');
        const clearAll = document.getElementById('clearAll');
        
        if (clearFavorites) {
            clearFavorites.addEventListener('click', () => {
                clearTemporaryData('favorites');
                this.loadHomePage();
                this.closeSettingsModal();
                alert('Favoritos borrados');
            });
        }
        
        if (clearHistory) {
            clearHistory.addEventListener('click', () => {
                clearTemporaryData('history');
                this.loadHomePage();
                this.closeSettingsModal();
                alert('Historial borrado');
            });
        }
        
        if (clearAll) {
            clearAll.addEventListener('click', () => {
                clearTemporaryData('all');
                this.loadHomePage();
                this.closeSettingsModal();
                alert('Todos los datos temporales borrados');
            });
        }
        
        // Guardar configuración al cambiar
        const defaultSpeed = document.getElementById('defaultSpeed');
        const hoverPreview = document.getElementById('hoverPreview');
        
        if (defaultSpeed) {
            defaultSpeed.addEventListener('change', () => {
                tempStorage.settings.defaultSpeed = parseFloat(defaultSpeed.value);
                saveToSessionStorage();
            });
        }
        
        if (hoverPreview) {
            hoverPreview.addEventListener('change', () => {
                tempStorage.settings.hoverPreview = hoverPreview.checked;
                saveToSessionStorage();
            });
        }
    }
    
    setupExpandableDescription() {
        const showMoreBtn = document.getElementById('showMoreBtn');
        const descriptionText = document.getElementById('descriptionText');
        
        if (showMoreBtn && descriptionText) {
            showMoreBtn.addEventListener('click', () => {
                descriptionText.classList.toggle('expanded');
                showMoreBtn.textContent = descriptionText.classList.contains('expanded') ? 
                    'Mostrar menos' : 'Mostrar más';
            });
        }
    }
    
    setupLikeDislikeButtons() {
        const likeBtn = document.getElementById('likeBtn');
        const dislikeBtn = document.getElementById('dislikeBtn');
        
        if (likeBtn) {
            likeBtn.addEventListener('click', () => {
                likeBtn.classList.toggle('active');
                if (likeBtn.classList.contains('active')) {
                    dislikeBtn?.classList.remove('active');
                }
            });
        }
        
        if (dislikeBtn) {
            dislikeBtn.addEventListener('click', () => {
                dislikeBtn.classList.toggle('active');
                if (dislikeBtn.classList.contains('active')) {
                    likeBtn?.classList.remove('active');
                }
            });
        }
    }
    
    setupFavoriteButton() {
        const favoriteBtn = document.getElementById('favoriteBtn');
        
        if (favoriteBtn) {
            favoriteBtn.addEventListener('click', () => {
                const urlParams = new URLSearchParams(window.location.search);
                const videoId = urlParams.get('v');
                
                if (videoId) {
                    if (isFavorite(videoId)) {
                        removeFromFavorites(videoId);
                        favoriteBtn.innerHTML = '<i class="far fa-heart"></i><span>Favorito</span>';
                        favoriteBtn.classList.remove('active');
                    } else {
                        addToFavorites(videoId);
                        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i><span>En favoritos</span>';
                        favoriteBtn.classList.add('active');
                    }
                }
            });
        }
    }
    
    setupDownloadButton() {
        const downloadBtn = document.getElementById('downloadBtn');
        
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                alert('En una aplicación real, esto descargaría el video');
            });
        }
    }
    
    setupShareButton() {
        const shareBtn = document.getElementById('shareBtn');
        
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                const currentUrl = window.location.href;
                
                // En una aplicación real, usaríamos la Web Share API
                if (navigator.share) {
                    navigator.share({
                        title: document.title,
                        url: currentUrl
                    });
                } else {
                    // Fallback: copiar al portapapeles
                    navigator.clipboard.writeText(currentUrl).then(() => {
                        alert('Enlace copiado al portapapeles');
                    });
                }
            });
        }
    }
    
    loadHomePage() {
        this.loadTrendingVideos();
        this.loadShorts();
        this.loadRecommendedVideos();
        this.loadRecentVideos();
        this.loadFavoriteVideos();
        this.loadHistoryVideos();
    }
    
    loadTrendingVideos() {
        const trendingContainer = document.getElementById('trendingVideos');
        if (!trendingContainer) return;
        
        // Simular videos en tendencia (los más vistos)
        const trendingVideos = [...allVideos]
            .sort((a, b) => b.views - a.views)
            .slice(0, 8);
        
        trendingContainer.innerHTML = trendingVideos
            .map(video => this.createVideoCard(video))
            .join('');
        
        this.attachVideoCardListeners();
    }
    
    loadShorts() {
        const shortsContainer = document.getElementById('shortsVideos');
        if (!shortsContainer) return;
        
        // Tomar algunos shorts aleatorios
        const randomShorts = [...shorts]
            .sort(() => Math.random() - 0.5)
            .slice(0, 6);
        
        shortsContainer.innerHTML = randomShorts
            .map(short => this.createShortCard(short))
            .join('');
        
        this.attachShortCardListeners();
    }
    
    loadRecommendedVideos() {
        const recommendedContainer = document.getElementById('recommendedVideos');
        if (!recommendedContainer) return;
        
        // Simular videos recomendados (aleatorios con algunos en tendencia)
        const recommendedVideos = [...allVideos]
            .sort(() => Math.random() - 0.5)
            .slice(0, 12);
        
        recommendedContainer.innerHTML = recommendedVideos
            .map(video => this.createVideoCard(video))
            .join('');
        
        this.attachVideoCardListeners();
    }
    
    loadRecentVideos() {
        const recentContainer = document.getElementById('recentVideos');
        const recentSection = document.getElementById('recentSection');
        
        if (!recentContainer || !recentSection) return;
        
        const recentVideos = tempStorage.history
            .slice(0, 8)
            .map(item => getVideoById(item.videoId))
            .filter(video => video !== undefined);
        
        if (recentVideos.length > 0) {
            recentSection.style.display = 'block';
            recentContainer.innerHTML = recentVideos
                .map(video => this.createVideoCard(video, true))
                .join('');
            
            this.attachVideoCardListeners();
        } else {
            recentSection.style.display = 'none';
        }
    }
    
    loadFavoriteVideos() {
        const favoritesContainer = document.getElementById('favoriteVideos');
        const favoritesSection = document.getElementById('favoritesSection');
        
        if (!favoritesContainer || !favoritesSection) return;
        
        const favoriteVideos = tempStorage.favorites
            .map(id => getVideoById(id))
            .filter(video => video !== undefined);
        
        if (favoriteVideos.length > 0) {
            favoritesSection.style.display = 'block';
            favoritesContainer.innerHTML = favoriteVideos
                .map(video => this.createVideoCard(video))
                .join('');
            
            this.attachVideoCardListeners();
        } else {
            favoritesSection.style.display = 'none';
        }
    }
    
    loadHistoryVideos() {
        const historyContainer = document.getElementById('historyVideos');
        const historySection = document.getElementById('historySection');
        
        if (!historyContainer || !historySection) return;
        
        const historyVideos = tempStorage.history
            .slice(0, 12)
            .map(item => getVideoById(item.videoId))
            .filter(video => video !== undefined);
        
        if (historyVideos.length > 0) {
            historySection.style.display = 'block';
            historyContainer.innerHTML = historyVideos
                .map(video => this.createVideoCard(video, true))
                .join('');
            
            this.attachVideoCardListeners();
        } else {
            historySection.style.display = 'none';
        }
    }
    
    createVideoCard(video, showProgress = false) {
        const progress = getWatchProgress(video.id);
        const progressPercent = progress > 0 ? (progress / (video.duration ? this.parseDuration(video.duration) : 300)) * 100 : 0;
        const isFav = isFavorite(video.id);
        
        return `
            <div class="video-card" data-video-id="${video.id}">
                <div class="thumbnail-container">
                    <img src="${video.thumbnail}" alt="${video.title}" class="thumbnail">
                    <div class="video-duration">${video.duration}</div>
                    <div class="video-badges">
                        ${video.badges.map(badge => 
                            `<span class="badge ${badge}">${badge}</span>`
                        ).join('')}
                    </div>
                    ${showProgress && progress > 0 ? `
                        <div class="progress-bar-container">
                            <div class="progress-bar-fill" style="width: ${progressPercent}%"></div>
                        </div>
                    ` : ''}
                    <button class="favorite-btn ${isFav ? 'active' : ''}" data-video-id="${video.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div class="video-info">
                    <img src="${video.channel.avatar}" alt="Avatar" class="channel-avatar">
                    <div class="video-details">
                        <h3 class="video-title">${video.title}</h3>
                        <div class="video-meta">${video.channel.name}</div>
                        <div class="video-meta">${formatNumber(video.views)} vistas • ${formatDate(video.uploadDate)}</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    createShortCard(short) {
        return `
            <div class="short-card" data-video-id="${short.id}">
                <img src="${short.thumbnail}" alt="${short.title}" class="short-thumbnail">
                <h3 class="short-title">${short.title}</h3>
                <div class="short-views">${formatNumber(short.views)} vistas</div>
            </div>
        `;
    }
    
    attachVideoCardListeners() {
        const videoCards = document.querySelectorAll('.video-card');
        
        videoCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.favorite-btn')) {
                    const videoId = card.dataset.videoId;
                    window.location.href = `video.html?v=${videoId}`;
                }
            });
            
            // Botones de favoritos
            const favoriteBtn = card.querySelector('.favorite-btn');
            if (favoriteBtn) {
                favoriteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const videoId = favoriteBtn.dataset.videoId;
                    
                    if (isFavorite(videoId)) {
                        removeFromFavorites(videoId);
                        favoriteBtn.classList.remove('active');
                    } else {
                        addToFavorites(videoId);
                        favoriteBtn.classList.add('active');
                    }
                    
                    // Recargar sección de favoritos si está visible
                    this.loadFavoriteVideos();
                });
            }
            
            // Vista previa al pasar el mouse
            if (tempStorage.settings.hoverPreview) {
                card.addEventListener('mouseenter', this.showVideoPreview.bind(this));
                card.addEventListener('mouseleave', this.hideVideoPreview.bind(this));
            }
        });
    }
    
    attachShortCardListeners() {
        const shortCards = document.querySelectorAll('.short-card');
        
        shortCards.forEach(card => {
            card.addEventListener('click', () => {
                const videoId = card.dataset.videoId;
                window.location.href = `shorts.html?s=${videoId}`;
            });
        });
    }
    
    showVideoPreview(e) {
        // En una aplicación real, mostraríamos un preview del video
        // Por ahora, solo mostramos un tooltip con información
        const card = e.currentTarget;
        const videoId = card.dataset.videoId;
        const video = getVideoById(videoId);
        
        if (video) {
            // Podríamos mostrar un tooltip o mini reproductor aquí
            console.log('Mostrando preview de:', video.title);
        }
    }
    
    hideVideoPreview(e) {
        // Ocultar el preview
        console.log('Ocultando preview');
    }
    
    showSection(sectionName) {
        // Ocultar todas las secciones primero
        const sections = ['trending', 'shorts', 'recommended', 'recent', 'favorites', 'history'];
        sections.forEach(section => {
            const element = document.getElementById(`${section}Section`);
            if (element) {
                element.style.display = section === sectionName ? 'block' : 'none';
            }
        });
        
        // Recargar la sección específica
        switch(sectionName) {
            case 'favorites':
                this.loadFavoriteVideos();
                break;
            case 'history':
                this.loadHistoryVideos();
                break;
            case 'recent':
                this.loadRecentVideos();
                break;
            default:
                this.loadHomePage();
        }
    }
    
    filterByCategory(category) {
        const filteredVideos = allVideos.filter(video => video.category === category);
        
        // Ocultar todas las secciones y mostrar solo los videos de esta categoría
        const sections = ['trending', 'shorts', 'recommended', 'recent', 'favorites', 'history'];
        sections.forEach(section => {
            const element = document.getElementById(`${section}Section`);
            if (element) {
                element.style.display = 'none';
            }
        });
        
        // Mostrar los videos filtrados
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.innerHTML = `
                <section class="section">
                    <h2 class="section-title">Categoría: ${category}</h2>
                    <div class="videos-grid">
                        ${filteredVideos.map(video => this.createVideoCard(video)).join('')}
                    </div>
                </section>
            `;
            
            this.attachVideoCardListeners();
        }
    }
    
    parseDuration(duration) {
        // Convertir formato "MM:SS" o "HH:MM:SS" a segundos
        const parts = duration.split(':').map(part => parseInt(part));
        
        if (parts.length === 2) {
            return parts[0] * 60 + parts[1];
        } else if (parts.length === 3) {
            return parts[0] * 3600 + parts[1] * 60 + parts[2];
        }
        
        return 300; // 5 minutos por defecto
    }
    
    applySavedSettings() {
        applySettings(tempStorage.settings);
    }
}

// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new YouTubeCloneApp();
});