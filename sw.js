const cacheName = 'my-cache';

const filesToCache = [
    'index.html',
    'offline.html',
    'styles.css',
    'bulb.svg',
    'shadows-into-light.woff2',
];

self.addEventListener('activate', event => self.clients.claim());

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => cache.addAll(filesToCache))
    );
});

self.addEventListener('fetch', event => {
    const req = event.request;

    event.respondWith(
        fetch(req)
            .then(response => { return response })
            .catch(e => {
                return caches.match(
                    req.headers.get('Accept').includes('text/html')
                        ? 'offline.html'
                        : new Request(req)
                )
            })
    );
});
