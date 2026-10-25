const VERSION = 'langspark-v12';

// À l'installation : vider tous les anciens caches immédiatement
self.addEventListener('install', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.skipWaiting())
  );
});

// À l'activation : prendre le contrôle et forcer le rechargement de toutes les pages
self.addEventListener('activate', e => {
  e.waitUntil(
    self.clients.claim().then(() =>
      self.clients.matchAll({ type: 'window' }).then(clients =>
        clients.forEach(c => c.navigate(c.url))
      )
    )
  );
});

// Toujours aller chercher sur le réseau — jamais de cache
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
