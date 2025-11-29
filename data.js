// Datos de videos simulados
const videos = [
    {
        id: "001",
        title: "Ado-MAGIC",
        actor: "Ado",
        category: "Musica",
        description: "アニメ『キャッツ❤︎アイ』オープニングテーマ",
        tags: ["#Ado #MAGIC #キャッツアイ"],
        videoUrl: "assets/videos/Ado - MAGIC.mp4",
        previewUrl: "assets/videos/Ado - MAGIC.mp4",
        thumbnail: "assets/thumbnails/Ado-Magic.jpg",
        isShort: false,
        views: 4386494,
        likes: 155000,
        dislikes: 120,
        duration: "2:51",
        uploadDate: "2025-31-10",
        channel: {
            name: "Ado",
            avatar: "assets/thumbnails/Avatar-Ado.jpg",
            subscribers: "8.65M"
        },
        badges: ["nuevo", "tendencia"]
    },
    {
        id: "002",
        title: "Los 10 mejores trucos de JavaScript que todo desarrollador debe conocer",
        actor: "Code Master",
        category: "Tecnología",
        description: "Descubre estos increíbles trucos de JavaScript que harán tu código más eficiente y elegante. Perfecto para desarrolladores de todos los niveles.",
        tags: ["javascript", "trucos", "programación", "web development", "coding"],
        videoUrl: "assets/videos/video2.mp4",
        previewUrl: "assets/videos/preview2.mp4",
        thumbnail: "assets/thumbnails/thumbnail2.jpg",
        isShort: false,
        views: 89000,
        likes: 5200,
        dislikes: 85,
        duration: "12:45",
        uploadDate: "2023-06-22",
        channel: {
            name: "Code Master",
            avatar: "assets/thumbnails/avatar2.jpg",
            subscribers: "850K"
        },
        badges: ["tendencia"]
    },
    {
        id: "003",
        title: "Receta fácil: Pizza casera en 30 minutos",
        actor: "Cocina Fácil",
        category: "Cocina",
        description: "Aprende a hacer una deliciosa pizza casera con ingredientes simples. Perfecta para una cena rápida o reunión con amigos.",
        tags: ["cocina", "receta", "pizza", "comida", "fácil"],
        videoUrl: "assets/videos/video3.mp4",
        previewUrl: "assets/videos/preview3.mp4",
        thumbnail: "assets/thumbnails/thumbnail3.jpg",
        isShort: false,
        views: 450000,
        likes: 32000,
        dislikes: 150,
        duration: "8:20",
        uploadDate: "2023-04-10",
        channel: {
            name: "Cocina Fácil",
            avatar: "assets/thumbnails/avatar3.jpg",
            subscribers: "2.5M"
        },
        badges: ["recomendado"]
    },
    {
        id: "004",
        title: "Entrenamiento completo en casa sin equipos",
        actor: "Fitness Pro",
        category: "Deportes",
        description: "Rutina de ejercicios que puedes hacer en casa para mantenerte en forma. No necesitas equipos especiales, solo tu cuerpo y determinación.",
        tags: ["fitness", "ejercicio", "casa", "salud", "entrenamiento"],
        videoUrl: "assets/videos/video4.mp4",
        previewUrl: "assets/videos/preview4.mp4",
        thumbnail: "assets/thumbnails/thumbnail4.jpg",
        isShort: false,
        views: 320000,
        likes: 28000,
        dislikes: 200,
        duration: "25:15",
        uploadDate: "2023-07-05",
        channel: {
            name: "Fitness Pro",
            avatar: "assets/thumbnails/avatar4.jpg",
            subscribers: "1.8M"
        },
        badges: ["nuevo"]
    },
    {
        id: "005",
        title: "Reseña: El mejor smartphone del año",
        actor: "Tech Review",
        category: "Tecnología",
        description: "Análisis completo del smartphone más esperado del año. Te mostramos todas sus características, ventajas y desventajas.",
        tags: ["tecnología", "smartphone", "review", "móvil", "análisis"],
        videoUrl: "assets/videos/video5.mp4",
        previewUrl: "assets/videos/preview5.mp4",
        thumbnail: "assets/thumbnails/thumbnail5.jpg",
        isShort: false,
        views: 780000,
        likes: 45000,
        dislikes: 300,
        duration: "18:40",
        uploadDate: "2023-08-12",
        channel: {
            name: "Tech Review",
            avatar: "assets/thumbnails/avatar5.jpg",
            subscribers: "3.2M"
        },
        badges: ["tendencia", "recomendado"]
    },
    {
        id: "006",
        title: "Tutorial maquillaje natural para principiantes",
        actor: "Belleza Express",
        category: "Belleza",
        description: "Aprende a maquillarte de forma natural y rápida. Técnicas fáciles para realzar tu belleza sin complicaciones.",
        tags: ["maquillaje", "belleza", "tutorial", "natural", "cosméticos"],
        videoUrl: "assets/videos/video6.mp4",
        previewUrl: "assets/videos/preview6.mp4",
        thumbnail: "assets/thumbnails/thumbnail6.jpg",
        isShort: false,
        views: 210000,
        likes: 18000,
        dislikes: 95,
        duration: "14:25",
        uploadDate: "2023-09-01",
        channel: {
            name: "Belleza Express",
            avatar: "assets/thumbnails/avatar6.jpg",
            subscribers: "950K"
        },
        badges: []
    },
    {
        id: "007",
        title: "Cómo invertir en la bolsa desde cero",
        actor: "Finanzas Inteligentes",
        category: "Finanzas",
        description: "Guía completa para comenzar a invertir en el mercado de valores. Conceptos básicos, estrategias y consejos prácticos.",
        tags: ["finanzas", "inversión", "bolsa", "dinero", "educación financiera"],
        videoUrl: "assets/videos/video7.mp4",
        previewUrl: "assets/videos/preview7.mp4",
        thumbnail: "assets/thumbnails/thumbnail7.jpg",
        isShort: false,
        views: 150000,
        likes: 12000,
        dislikes: 80,
        duration: "22:10",
        uploadDate: "2023-07-20",
        channel: {
            name: "Finanzas Inteligentes",
            avatar: "assets/thumbnails/avatar7.jpg",
            subscribers: "680K"
        },
        badges: ["recomendado"]
    },
    {
        id: "008",
        title: "Viaje a Japón: Guía completa de Tokio",
        actor: "Viajero Mundial",
        category: "Viajes",
        description: "Todo lo que necesitas saber para visitar Tokio. Desde transporte y alojamiento hasta los mejores lugares para comer y visitar.",
        tags: ["viajes", "japón", "tokio", "turismo", "guía"],
        videoUrl: "assets/videos/video8.mp4",
        previewUrl: "assets/videos/preview8.mp4",
        thumbnail: "assets/thumbnails/thumbnail8.jpg",
        isShort: false,
        views: 89000,
        likes: 7500,
        dislikes: 45,
        duration: "28:35",
        uploadDate: "2023-05-30",
        channel: {
            name: "Viajero Mundial",
            avatar: "assets/thumbnails/avatar8.jpg",
            subscribers: "420K"
        },
        badges: []
    }
];

// Datos de shorts
const shorts = [
    {
        id: "s001",
        title: "Increíble truco de magia con cartas",
        actor: "Magic Pro",
        category: "Entretenimiento",
        description: "Asombroso truco de magia que puedes aprender fácilmente",
        tags: ["magia", "truco", "cartas", "entretenimiento"],
        videoUrl: "assets/shorts/short1.mp4",
        thumbnail: "assets/thumbnails/short1.jpg",
        isShort: true,
        views: 1500000,
        likes: 125000,
        dislikes: 5000,
        duration: "0:30",
        uploadDate: "2023-08-15",
        channel: {
            name: "Magic Pro",
            avatar: "assets/thumbnails/avatar9.jpg",
            subscribers: "2.1M"
        }
    },
    {
        id: "s002",
        title: "Ejercicio rápido para abdominales",
        actor: "Fitness Express",
        category: "Deportes",
        description: "Rutina de 30 segundos para fortalecer tu core",
        tags: ["fitness", "abdominales", "ejercicio", "salud"],
        videoUrl: "assets/shorts/short2.mp4",
        thumbnail: "assets/thumbnails/short2.jpg",
        isShort: true,
        views: 890000,
        likes: 78000,
        dislikes: 1200,
        duration: "0:30",
        uploadDate: "2023-09-05",
        channel: {
            name: "Fitness Express",
            avatar: "assets/thumbnails/avatar10.jpg",
            subscribers: "1.5M"
        }
    },
    {
        id: "s003",
        title: "Life hack para organización",
        actor: "Organización Fácil",
        category: "Lifestyle",
        description: "Truco simple para mantener tu espacio ordenado",
        tags: ["organización", "lifehack", "productividad", "hogar"],
        videoUrl: "assets/shorts/short3.mp4",
        thumbnail: "assets/thumbnails/short3.jpg",
        isShort: true,
        views: 1200000,
        likes: 95000,
        dislikes: 800,
        duration: "0:30",
        uploadDate: "2023-08-28",
        channel: {
            name: "Organización Fácil",
            avatar: "assets/thumbnails/avatar11.jpg",
            subscribers: "890K"
        }
    },
    {
        id: "s004",
        title: "Receta express: Batido saludable",
        actor: "Cocina Rápida",
        category: "Cocina",
        description: "Batido nutritivo que puedes preparar en menos de 1 minuto",
        tags: ["receta", "batido", "saludable", "rápido"],
        videoUrl: "assets/shorts/short4.mp4",
        thumbnail: "assets/thumbnails/short4.jpg",
        isShort: true,
        views: 750000,
        likes: 62000,
        dislikes: 600,
        duration: "0:30",
        uploadDate: "2023-09-10",
        channel: {
            name: "Cocina Rápida",
            avatar: "assets/thumbnails/avatar12.jpg",
            subscribers: "1.1M"
        }
    },
    {
        id: "s005",
        title: "Truco de Photoshop que no conocías",
        actor: "Diseño Pro",
        category: "Diseño",
        description: "Funcionalidad oculta de Photoshop que te ahorrará tiempo",
        tags: ["photoshop", "diseño", "truco", "edición"],
        videoUrl: "assets/shorts/short5.mp4",
        thumbnail: "assets/thumbnails/short5.jpg",
        isShort: true,
        views: 950000,
        likes: 81000,
        dislikes: 900,
        duration: "0:30",
        uploadDate: "2023-08-20",
        channel: {
            name: "Diseño Pro",
            avatar: "assets/thumbnails/avatar13.jpg",
            subscribers: "1.7M"
        }
    },
    {
        id: "s006",
        title: "Momento gracioso con mi mascota",
        actor: "Animales Divertidos",
        category: "Entretenimiento",
        description: "Mi perro haciendo algo increíblemente gracioso",
        tags: ["mascotas", "divertido", "animales", "humor"],
        videoUrl: "assets/shorts/short6.mp4",
        thumbnail: "assets/thumbnails/short6.jpg",
        isShort: true,
        views: 2100000,
        likes: 185000,
        dislikes: 1500,
        duration: "0:30",
        uploadDate: "2023-09-02",
        channel: {
            name: "Animales Divertidos",
            avatar: "assets/thumbnails/avatar14.jpg",
            subscribers: "3.4M"
        }
    }
];

// Videos con gameTag (para minijuegos)
const gameVideos = [
    {
        id: "g001",
        title: "Juego retro: Reseña completa",
        actor: "Game Reviews",
        category: "Videojuegos",
        description: "Análisis profundo de este clásico juego que marcó una generación. Incluye gameplay, secretos y curiosidades.",
        tags: ["videojuegos", "retro", "reseña", "gameplay", "clásico", "gameTag"],
        videoUrl: "assets/videos/video9.mp4",
        previewUrl: "assets/videos/preview9.mp4",
        thumbnail: "assets/thumbnails/thumbnail9.jpg",
        isShort: false,
        views: 320000,
        likes: 24000,
        dislikes: 180,
        duration: "16:45",
        uploadDate: "2023-07-15",
        channel: {
            name: "Game Reviews",
            avatar: "assets/thumbnails/avatar15.jpg",
            subscribers: "1.3M"
        },
        badges: ["tendencia"],
        hasGame: true
    },
    {
        id: "g002",
        title: "Los mejores juegos indie del año",
        actor: "Indie Games",
        category: "Videojuegos",
        description: "Recopilación de los juegos independientes más destacados de este año. Descubre joyas ocultas del mundo gaming.",
        tags: ["videojuegos", "indie", "gameplay", "reseña", "gameTag"],
        videoUrl: "assets/videos/video10.mp4",
        previewUrl: "assets/videos/preview10.mp4",
        thumbnail: "assets/thumbnails/thumbnail10.jpg",
        isShort: false,
        views: 180000,
        likes: 15000,
        dislikes: 120,
        duration: "19:20",
        uploadDate: "2023-08-25",
        channel: {
            name: "Indie Games",
            avatar: "assets/thumbnails/avatar16.jpg",
            subscribers: "780K"
        },
        badges: ["nuevo"],
        hasGame: true
    }
];

// Combinar todos los videos
const allVideos = [...videos, ...gameVideos];

// Comentarios simulados
const sampleComments = [
    {
        id: "c001",
        author: "Usuario123",
        text: "¡Excelente video! Muy informativo y bien explicado.",
        likes: 24,
        timestamp: "Hace 2 horas",
        avatar: "assets/thumbnails/avatar-default.jpg"
    },
    {
        id: "c002",
        author: "AprendizCurioso",
        text: "Alguien puede explicar el minuto 5:30? No entendí bien esa parte.",
        likes: 8,
        timestamp: "Hace 5 horas",
        avatar: "assets/thumbnails/avatar-default.jpg"
    },
    {
        id: "c003",
        author: "TechFan",
        text: "Llevo tiempo siguiendo este canal y la calidad siempre es impresionante. ¡Sigan así!",
        likes: 42,
        timestamp: "Hace 1 día",
        avatar: "assets/thumbnails/avatar-default.jpg"
    },
    {
        id: "c004",
        author: "ProgramadorNovato",
        text: "Justo lo que necesitaba para mi proyecto. Muchas gracias por compartir.",
        likes: 15,
        timestamp: "Hace 1 día",
        avatar: "assets/thumbnails/avatar-default.jpg"
    },
    {
        id: "c005",
        author: "CríticoConstructivo",
        text: "Buen contenido pero la edición de audio podría mejorar. Se escuchan algunos cortes extraños.",
        likes: 3,
        timestamp: "Hace 2 días",
        avatar: "assets/thumbnails/avatar-default.jpg"
    }
];