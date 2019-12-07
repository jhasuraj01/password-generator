const cacheName = 'v1';
const assets = [
    './',
    './index.htm',
    './manifest.json',
    './registerSW.js',
    './scripts/pg.js',
    './scripts/share.js',
    './scripts/style.js',
    './stylesheets/default.css',
    './stylesheets/footer.css',
    './stylesheets/hambergerMenuBtn.css',
    './stylesheets/SideNavBar.css',
    './stylesheets/style.css',
    './stylesheets/toggle-btn.css',
    './images/icon/fingerprint.svg',
    './images/icon/fingerprint(128).png',
    './images/icon/fingerprint(152).png',
    './images/icon/fingerprint(192).png',
    './images/icon/fingerprint(384).png',
    './images/icon/fingerprint(512).png',
    './images/copy.svg',
    './images/refresh.svg'
];

// Call install event
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');

    // wait untill the promice is finished
    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching File');
                cache.addAll(assets);
            })
            .then(() => self.skipWaiting())
    );
});

// call activate event
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');

    // remove unwanted previously cached files
    event.waitUntil(
        /* here we will iterate through all the caches and delete all the cache other the one whose name is saved in 'cacheName' variable */
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: claering Old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// call fetch event
self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetching');
    // first check if live site is availabe else fetch file from cache
    event.respondWith(
        /* if there is no connection then fetching will fail then we would call a catch function since it returns a promise*/
        fetch(event.request).catch(() => caches.match(e.request))
    )
})