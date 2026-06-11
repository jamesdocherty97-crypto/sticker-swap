const CACHE_NAME = 'sticker-swap-public-v7';

// App shell. index.html is fetched network-first (see below), so a redeploy
// always reaches phones without needing this version string bumped.
const APP_SHELL = [
  './',
  './index.html',
  './firebase-config.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-180.png',
  './icon-maskable-512.png',
  './og-share.png',
  './public/assets/artwork/invite-landing-hero.webp',
  './public/assets/artwork/best-move-card-artwork.webp',
  './public/assets/artwork/accepted-offer-confirm-handover-artwork.webp',
  './public/assets/artwork/achievement-milestone-modal-artwork.webp',
  './public/assets/artwork/pwa-splash-background.webp',
  './public/assets/artwork/group-progress-artwork.webp',
  './public/assets/artwork/store-screenshot-background.webp',
  './public/assets/README.md',
  './public/assets/brand/tokens.css',
  './public/assets/brand/app-icon.svg',
  './public/assets/motifs/sticker-edge.svg',
  './public/assets/motifs/foil-shine.svg',
  './public/assets/motifs/pack.svg',
  './public/assets/motifs/album-slot.svg',
  './public/assets/motifs/swap-arrows.svg',
  './public/assets/artwork/README.md'
];

// Resilient precache: one failed asset (flaky connection) must not abort the
// whole install, or the app would never work offline.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(APP_SHELL.map(url => cache.add(url)))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

function isHtmlRequest(request, url) {
  return request.mode === 'navigate' ||
    url.pathname.endsWith('/') ||
    url.pathname.endsWith('.html');
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return; // let Firebase/fonts hit the network

  // Network-first for the app itself, so a new Netlify deploy shows up on the
  // next load when online; fall back to cache when offline.
  if (isHtmlRequest(event.request, url)) {
    event.respondWith(
      fetch(event.request).then(resp => {
        if (resp.ok) {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, copy)).catch(() => {});
        }
        return resp;
      }).catch(() => caches.match(event.request).then(c => c || caches.match('./index.html')))
    );
    return;
  }

  // Cache-first for static assets (images, icon, manifest) - they rarely change.
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(resp => {
        if (resp.ok) {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, copy)).catch(() => {});
        }
        return resp;
      }).catch(() => undefined);
    })
  );
});
