// ════════════════════════════════════════
//  LangSpark — fonctionnement hors connexion
//  · App (pages, cours, verbes) : réseau d'abord pour avoir la dernière version,
//    copie locale si pas de réseau (ou réseau trop lent).
//  · Voix (audio/*.mp3) : copie locale d'abord ; chaque voix écoutée est gardée.
//  · Comptes (Supabase) : jamais mis en cache.
// ════════════════════════════════════════
const VERSION = 'langspark-v19';
const SHELL_CACHE = 'langspark-shell-' + VERSION;
const AUDIO_CACHE = 'langspark-audio';      // gardé d'une version à l'autre
const NETWORK_TIMEOUT = 4000;

const SHELL = [
  './',
  './index.html',
  './account.js',
  './manifest.json',
  './icon.svg',
  './courses/dsl.js',
  './courses/en-a.js',
  './courses/en-b.js',
  './courses/pt-a.js',
  './courses/pt-b.js',
  './courses/es-a.js',
  './courses/es-b.js',
  './courses/verbs-en.js',
  './courses/verbs-pt.js',
  './courses/verbs-es.js',
  './courses/vocab.js',
  './courses/listen-pt.js',
  './courses/listen-en.js',
  './courses/listen-es.js',
  './audio/index.json',
  './audio/index-en-US.json',
  './audio/index-pt-PT.json',
  './audio/index-es-ES.json',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(SHELL_CACHE)
      // un fichier manquant ne doit pas bloquer l'installation
      .then(cache => Promise.all(SHELL.map(url => cache.add(new Request(url, { cache: 'reload' })).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(k => k.startsWith('langspark-shell-') && k !== SHELL_CACHE || k.startsWith('langspark-v'))
        .map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function networkFirst(request) {
  return new Promise(resolve => {
    let settled = false;
    const fromCache = () => caches.match(request, { ignoreSearch: true })
      .then(r => r || (request.mode === 'navigate' ? caches.match('./index.html') : undefined));
    const timer = setTimeout(() => {
      fromCache().then(r => { if (r && !settled) { settled = true; resolve(r); } });
    }, NETWORK_TIMEOUT);
    fetch(request).then(response => {
      clearTimeout(timer);
      if (response.ok) {
        const copy = response.clone();
        caches.open(SHELL_CACHE).then(c => c.put(request, copy));
      }
      if (!settled) { settled = true; resolve(response); }
    }).catch(() => {
      clearTimeout(timer);
      fromCache().then(r => { if (!settled) { settled = true; resolve(r || Response.error()); } });
    });
  });
}

function audioCacheFirst(request) {
  return caches.open(AUDIO_CACHE).then(cache =>
    cache.match(request).then(hit => hit || fetch(request).then(response => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    }))
  );
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname.endsWith('supabase.co') || url.port === '8765') return;   // comptes et voix locales : jamais en cache
  if (url.origin === self.location.origin && /\/audio\/[0-9a-f]{8}\.mp3$/.test(url.pathname)) {
    e.respondWith(audioCacheFirst(req));
    return;
  }
  if (url.origin === self.location.origin || url.hostname === 'cdn.jsdelivr.net') {
    e.respondWith(networkFirst(req));
  }
});
