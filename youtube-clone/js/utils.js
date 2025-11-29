// Utilidades para la aplicación

// Almacenamiento temporal en memoria
const tempStorage = {
    favorites: [],
    history: [],
    settings: {
        theme: 'light',
        defaultSpeed: 1,
        hoverPreview: true,
        compactMode: false
    },
    watchProgress: {},
    comments: JSON.parse(JSON.stringify(sampleComments)) // Copia de los comentarios de muestra
};

// Inicializar almacenamiento temporal
function initializeTempStorage() {
    // Cargar desde sessionStorage si existe (para persistencia durante la sesión)
    const savedFavorites = sessionStorage.getItem('youtubeClone_favorites');
    const savedHistory = sessionStorage.getItem('youtubeClone_history');
    const savedSettings = sessionStorage.getItem('youtubeClone_settings');
    const savedProgress = sessionStorage.getItem('youtubeClone_progress');
    
    if (savedFavorites) tempStorage.favorites = JSON.parse(savedFavorites);
    if (savedHistory) tempStorage.history = JSON.parse(savedHistory);
    if (savedSettings) tempStorage.settings = JSON.parse(savedSettings);
    if (savedProgress) tempStorage.watchProgress = JSON.parse(savedProgress);
    
    // Aplicar configuración cargada
    applySettings(tempStorage.settings);
}

// Guardar en sessionStorage
function saveToSessionStorage() {
    sessionStorage.setItem('youtubeClone_favorites', JSON.stringify(tempStorage.favorites));
    sessionStorage.setItem('youtubeClone_history', JSON.stringify(tempStorage.history));
    sessionStorage.setItem('youtubeClone_settings', JSON.stringify(tempStorage.settings));
    sessionStorage.setItem('youtubeClone_progress', JSON.stringify(tempStorage.watchProgress));
}

// Aplicar configuración
function applySettings(settings) {
    // Tema
    document.body.className = `${settings.theme}-theme`;
    
    // Actualizar botón de tema
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.innerHTML = settings.theme === 'light' ? 
            '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    }
    
    // Otras configuraciones se aplican donde corresponda
}

// Formatear números (vistas, likes, etc.)
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Formatear duración
function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Formatear fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Hace 1 día';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`;
    return `Hace ${Math.floor(diffDays / 365)} años`;
}

// Obtener video por ID
function getVideoById(id) {
    return allVideos.find(video => video.id === id) || 
           shorts.find(short => short.id === id);
}

// Obtener videos relacionados
function getRelatedVideos(video, count = 5) {
    const sameCategory = allVideos.filter(v => 
        v.category === video.category && v.id !== video.id
    );
    
    const sameTags = allVideos.filter(v => 
        v.id !== video.id && v.tags.some(tag => 
            video.tags.includes(tag)
        )
    );
    
    // Combinar y eliminar duplicados
    const related = [...new Set([...sameCategory, ...sameTags])];
    
    // Si no hay suficientes, agregar aleatorios
    if (related.length < count) {
        const randomVideos = allVideos.filter(v => 
            v.id !== video.id && !related.includes(v)
        ).slice(0, count - related.length);
        
        related.push(...randomVideos);
    }
    
    return related.slice(0, count);
}

// Obtener shorts relacionados
function getRelatedShorts(video, count = 3) {
    const related = shorts.filter(s => 
        s.category === video.category || 
        s.tags.some(tag => video.tags.includes(tag))
    );
    
    // Si no hay suficientes, agregar aleatorios
    if (related.length < count) {
        const randomShorts = shorts.filter(s => 
            !related.includes(s)
        ).slice(0, count - related.length);
        
        related.push(...randomShorts);
    }
    
    return related.slice(0, count);
}

// Agregar a favoritos
function addToFavorites(videoId) {
    if (!tempStorage.favorites.includes(videoId)) {
        tempStorage.favorites.push(videoId);
        saveToSessionStorage();
        return true;
    }
    return false;
}

// Eliminar de favoritos
function removeFromFavorites(videoId) {
    const index = tempStorage.favorites.indexOf(videoId);
    if (index > -1) {
        tempStorage.favorites.splice(index, 1);
        saveToSessionStorage();
        return true;
    }
    return false;
}

// Verificar si es favorito
function isFavorite(videoId) {
    return tempStorage.favorites.includes(videoId);
}

// Agregar al historial
function addToHistory(videoId, progress = 0) {
    const existing = tempStorage.history.find(item => item.videoId === videoId);
    
    if (existing) {
        existing.timestamp = new Date().toISOString();
        existing.progress = progress;
    } else {
        tempStorage.history.unshift({
            videoId: videoId,
            timestamp: new Date().toISOString(),
            progress: progress
        });
        
        // Mantener solo los últimos 50 elementos
        if (tempStorage.history.length > 50) {
            tempStorage.history = tempStorage.history.slice(0, 50);
        }
    }
    
    saveToSessionStorage();
}

// Obtener progreso de visualización
function getWatchProgress(videoId) {
    return tempStorage.watchProgress[videoId] || 0;
}

// Guardar progreso de visualización
function saveWatchProgress(videoId, progress) {
    tempStorage.watchProgress[videoId] = progress;
    saveToSessionStorage();
}

// Generar comentario aleatorio
function generateRandomComment() {
    const comments = [
        "¡Excelente contenido!",
        "Muy útil, gracias por compartir",
        "No estoy de acuerdo con algunos puntos pero en general buen video",
        "¿Podrías hacer un video sobre...?",
        "La calidad de producción es impresionante",
        "Esto cambió mi perspectiva completamente",
        "Más contenido como este por favor",
        "Alguien más llegó aquí por...?",
        "La explicación fue muy clara, gracias",
        "Tengo una pregunta sobre el minuto 3:45"
    ];
    
    const authors = [
        "UsuarioAnónimo", "Curioso123", "AprendizDigital", "TechLover", 
        "CríticoConstructivo", "FanDelCanal", "NuevoSeguidor", "ExpertoEnLaMateria"
    ];
    
    return {
        id: 'c' + Date.now(),
        author: authors[Math.floor(Math.random() * authors.length)],
        text: comments[Math.floor(Math.random() * comments.length)],
        likes: Math.floor(Math.random() * 50),
        timestamp: "Hace " + (Math.floor(Math.random() * 24) + 1) + " horas",
        avatar: "assets/thumbnails/avatar-default.jpg"
    };
}

// Agregar comentario
function addComment(videoId, commentText) {
    const newComment = {
        id: 'c' + Date.now(),
        author: "Tú",
        text: commentText,
        likes: 0,
        timestamp: "Ahora mismo",
        avatar: "assets/thumbnails/avatar-default.jpg"
    };
    
    // En una aplicación real, esto se enviaría al servidor
    // Por ahora, solo lo agregamos a la lista temporal
    tempStorage.comments.unshift(newComment);
    return newComment;
}

// Limpiar datos temporales
function clearTemporaryData(type) {
    switch(type) {
        case 'favorites':
            tempStorage.favorites = [];
            break;
        case 'history':
            tempStorage.history = [];
            tempStorage.watchProgress = {};
            break;
        case 'all':
            tempStorage.favorites = [];
            tempStorage.history = [];
            tempStorage.watchProgress = {};
            tempStorage.comments = JSON.parse(JSON.stringify(sampleComments));
            break;
    }
    saveToSessionStorage();
}

// Simular búsqueda con corrección de errores simples
function searchVideos(query) {
    if (!query.trim()) return [];
    
    const searchTerms = query.toLowerCase().split(' ');
    
    return allVideos.filter(video => {
        const searchableText = (
            video.title + ' ' + 
            video.actor + ' ' + 
            video.category + ' ' + 
            video.tags.join(' ') + ' ' + 
            video.description
        ).toLowerCase();
        
        // Buscar todos los términos
        return searchTerms.every(term => 
            searchableText.includes(term) ||
            // Corrección simple: buscar términos similares
            searchableText.includes(term.slice(0, -1)) || // Sin última letra
            searchableText.includes(term + 's') || // Plural
            searchableText.includes(term.slice(0, -2)) // Sin últimas dos letras
        );
    });
}

// Generar sugerencias de búsqueda
function generateSearchSuggestions(query) {
    if (!query.trim()) return [];
    
    const allSearchTerms = [];
    
    // Extraer términos de títulos, categorías, etc.
    allVideos.forEach(video => {
        allSearchTerms.push(video.title);
        allSearchTerms.push(video.actor);
        allSearchTerms.push(video.category);
        video.tags.forEach(tag => allSearchTerms.push(tag));
    });
    
    // Filtrar y eliminar duplicados
    const uniqueTerms = [...new Set(allSearchTerms)];
    
    // Filtrar por consulta
    return uniqueTerms
        .filter(term => term.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 8); // Máximo 8 sugerencias
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', initializeTempStorage);