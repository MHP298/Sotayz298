const CACHE_NAME = 'sotay-pwa-v1';

// Cài đặt Service Worker
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Kích hoạt Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Bắt các yêu cầu mạng (Network First để không xung đột với tính năng chống lưu cache cũ)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
