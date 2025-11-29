// Funcionalidad de búsqueda

class SearchManager {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchButton = document.getElementById('searchButton');
        this.searchSuggestions = document.getElementById('searchSuggestions');
        
        this.init();
    }
    
    init() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', this.handleInput.bind(this));
            this.searchInput.addEventListener('focus', this.showSuggestions.bind(this));
            this.searchInput.addEventListener('keydown', this.handleKeydown.bind(this));
        }
        
        if (this.searchButton) {
            this.searchButton.addEventListener('click', this.performSearch.bind(this));
        }
        
        // Cerrar sugerencias al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!this.searchInput?.contains(e.target) && 
                !this.searchSuggestions?.contains(e.target)) {
                this.hideSuggestions();
            }
        });
    }
    
    handleInput() {
        const query = this.searchInput.value.trim();
        
        if (query.length > 0) {
            this.showSuggestions();
        } else {
            this.hideSuggestions();
        }
    }
    
    handleKeydown(e) {
        if (e.key === 'Enter') {
            this.performSearch();
        } else if (e.key === 'Escape') {
            this.hideSuggestions();
        }
    }
    
    showSuggestions() {
        if (!this.searchSuggestions) return;
        
        const query = this.searchInput.value.trim();
        const suggestions = generateSearchSuggestions(query);
        
        if (suggestions.length > 0) {
            this.searchSuggestions.innerHTML = suggestions
                .map(suggestion => `
                    <div class="search-suggestion" data-suggestion="${suggestion}">
                        <i class="fas fa-search"></i> ${suggestion}
                    </div>
                `)
                .join('');
            
            this.searchSuggestions.style.display = 'block';
            
            // Agregar event listeners a las sugerencias
            this.searchSuggestions.querySelectorAll('.search-suggestion').forEach(suggestion => {
                suggestion.addEventListener('click', () => {
                    this.searchInput.value = suggestion.dataset.suggestion;
                    this.performSearch();
                    this.hideSuggestions();
                });
            });
        } else {
            this.hideSuggestions();
        }
    }
    
    hideSuggestions() {
        if (this.searchSuggestions) {
            this.searchSuggestions.style.display = 'none';
        }
    }
    
    performSearch() {
        const query = this.searchInput.value.trim();
        
        if (query) {
            // En una aplicación real, redirigiríamos a una página de resultados
            // Por ahora, simulamos los resultados en consola
            const results = searchVideos(query);
            console.log('Resultados de búsqueda:', results);
            
            // Mostrar mensaje temporal (en una aplicación real, mostraríamos los resultados)
            alert(`Se encontraron ${results.length} resultados para "${query}"`);
            
            this.hideSuggestions();
        }
    }
}

// Inicializar el gestor de búsqueda cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new SearchManager();
});