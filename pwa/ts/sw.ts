interface Event {
    waitUntil;
    respondWith;
    request;
}

let cname: string = 'webStuffPWA-v1';
let cfiles: Array<string> = [
    '/web_stuff/pwa/',
    '/web_stuff/pwa/index.html',
    '/web_stuff/pwa/dist/js/app.min.js',
    '/web_stuff/pwa/dist/css/style.min.css',
    '/web_stuff/pwa/dist/img/logo.png'
];

self.addEventListener('install', function(e) {
    e.waitUntil(caches.open(cname).then(function(cache) {
        return cache.addAll(cfiles);
        })
    );
});

self.addEventListener('fetch', function(e) {
    e.respondWith(caches.match(e.request).then(function(r) {
        console.log('[Service Worker] Fetching resource: '+e.request.url);
        return r || fetch(e.request).then(function(response) {
            return caches.open(cname).then(function(cache) {
                console.log('[Service Worker] Caching new resource: '+e.request.url);
                cache.put(e.request, response.clone());
                return response;
            });
        });
    }));
});