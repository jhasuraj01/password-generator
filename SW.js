// This is the service worker with the Cache-first network

const cacheName = "v2.0.2";
const precacheFiles = [
    /* Add an array of files to precache for your app */
    './index.html',
    './manifest.json',
    // './registerSW.js',
    // './scripts/pg.js',
    // './scripts/share.js',
    // './scripts/storage.js',
    // './scripts/style.js',
    './scripts/index.min.js',
    // './stylesheets/default.css',
    // './stylesheets/footer.css',
    // './stylesheets/hambergerMenuBtn.css',
    // './stylesheets/SideNavBar.css',
    // './stylesheets/style.css',
    // './stylesheets/toggle-btn.css',
    // './stylesheets/saved-passwords.css',
    './stylesheets/index.min.css',
    './images/icon/fingerprint.svg',
    './images/icon/fingerprint(72).png',
    './images/icon/fingerprint(96).png',
    './images/icon/fingerprint(128).png',
    './images/icon/fingerprint(144).png',
    './images/icon/fingerprint(152).png',
    './images/icon/fingerprint(192).png',
    './images/icon/fingerprint(384).png',
    './images/icon/fingerprint(512).png',
    './images/copy.svg',
    './images/refresh.svg'
];

self.addEventListener("install", function (event) {
    console.log("Install Event processing");


    event.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                console.log("Caching pages during install");
                return cache.addAll(precacheFiles);
            })
            .then(function () {
                console.log("Skip waiting on install");
                self.skipWaiting();
            })
    );
});

self.addEventListener("activate", function (event) {

    // Allow sw to control of current page
    console.log("Claiming clients for current page");
    event.waitUntil(self.clients.claim());

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

// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener("fetch", function (event) {
    if (event.request.method !== "GET") return;

    event.respondWith(
        fromCache(event.request)
            .then(
                function (response) {
                    // The response was found in the cache so we responde with it and update the entry

                    // This is where we call the server to get the newest version of the
                    // file to use the next time we show view
                    event.waitUntil(
                        fetch(event.request)
                            .then(function (response) {
                                console.log('Updating Files: ', response);
                                return updateCache(event.request, response);
                            })
                            .catch(function (err) {
                                console.log('No network Connection: Failed to update Files', err);
                            })

                    );

                    return response;
                },
                function () {
                    // The response was not found in the cache so we look for it on the server
                    return fetch(event.request)
                        .then(function (response) {
                            // If request was success, add or update it in the cache
                            event.waitUntil(updateCache(event.request, response.clone()));

                            return response;
                        })
                        .catch(function (error) {
                            console.log("Network request failed and no cache." + error);
                        });
                }
            )
    );
});

function fromCache(request) {
    // Check to see if you have it in the cache
    // Return response
    // If not in the cache, then return
    return caches.open(cacheName).then(function (cache) {
        return cache.match(request).then(function (matching) {
            if (!matching || matching.status === 404) {
                return Promise.reject("no-match");
            }

            return matching;
        });
    });
}

function updateCache(request, response) {
    return caches.open(cacheName).then(function (cache) {
        return cache.put(request, response);
    });
}