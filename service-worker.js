/* Offline-fähige PWA – die eigene Spielversion vollständig lokal speichern. */
'use strict';
const CACHE_NAME = 'super-knack-offline-v2';
const FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names => Promise.all(
      names.filter(name => name.startsWith('super-knack-offline-') && name !== CACHE_NAME)
        .map(name => caches.delete(name))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).then(response => {
      if (response.ok) {
        const copy = response.clone();
        event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put(req, copy)));
      }
      return response;
    }).catch(async () => (await caches.match(req)) || (await caches.match('./index.html'))));
    return;
  }

  event.respondWith(caches.match(req).then(cached => cached || fetch(req).then(response => {
    if (response.ok) {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put(req, copy)));
    }
    return response;
  })));
});
