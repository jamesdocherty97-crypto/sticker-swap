const CACHE_NAME = 'sticker-swap-public-v9';

// App shell. index.html is fetched network-first (see below), so a redeploy
// always reaches phones without needing this version string bumped.
const APP_SHELL = [
  './',
  './index.html',
  './firebase-config.js',
  './manifest.webmanifest',
  './favicon.ico',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './icon-180.png',
  './icon-maskable-512.png',
  './og-share.jpg',
  './assets/01_app_icon.webp',
  './assets/02_pwa_splash_background.webp',
  './assets/03_landing_hero.webp',
  './assets/04_create_group_hero.webp',
  './assets/05_join_group_hero.webp',
  './assets/06_collection_empty_state.webp',
  './assets/07_spares_empty_state.webp',
  './assets/08_swaps_empty_state.webp',
  './assets/09_best_move_card_art.webp',
  './assets/10_incoming_offer_art.webp',
  './assets/11_confirm_handover_art.webp',
  './assets/12_group_progress_art.webp',
  './assets/13_completion_milestone_art.webp',
  './assets/14_social_share_card_background.webp',
  './assets/15_store_screenshot_background.webp',
  './assets/share-slide-background.webp',
  './assets/empty-calm-state.webp',
  './assets/milestone-clean.webp',
  './assets/onboard-portrait.webp'
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
