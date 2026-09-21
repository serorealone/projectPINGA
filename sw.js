// Nome do cache - mude se atualizar o site
const CACHE_NAME = 'imobiliaria-prime-v1';

// Arquivos que serão salvos para usar offline
const ARQUIVOS_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png'
];

// Instala o Service Worker e salva os arquivos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Arquivos em cache');
                return cache.addAll(ARQUIVOS_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Busca os arquivos do cache (funciona offline)
self.addEventListener('fetch', event => {
    // Ignora requisições não GET (ex.: POST de formulários)
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Se achou no cache, usa ele
                if (response) {
                    return response;
                }
                // Se não achou, busca da internet
                return fetch(event.request).catch(() => {
                    // Fallback offline para navegações
                    if (event.request.mode === 'navigate') {
                        return caches.match('/index.html');
                    }
                });
            })
    );
});

// Atualiza o cache quando o Service Worker é atualizado
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Limpando cache antigo:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});
