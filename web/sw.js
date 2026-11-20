// Glossa — service worker: офлайн-работа приложения
const VERSION = "glossa-v2";
const SHELL = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png",
  "vendor/fonts.css", "vendor/pdf.min.js", "vendor/pdf.worker.min.js", "vendor/jszip.min.js"];

self.addEventListener("install", e => {
  // файлы, которых нет (например, vendor/ до `npm run vendor`), просто пропускаются
  e.waitUntil(caches.open(VERSION).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.hostname === "api.anthropic.com") return; // перевод всегда идёт в сеть
  const cdn = /(cdnjs\.cloudflare\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)$/.test(url.hostname);
  if (cdn) { // библиотеки и шрифты: сначала кэш
    e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(r => {
      const copy = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return r;
    })));
    return;
  }
  if (url.origin === location.origin) { // свои файлы: сеть, при отсутствии — кэш
    e.respondWith(fetch(e.request).then(r => {
      const copy = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return r;
    }).catch(() => caches.match(e.request).then(hit => hit || caches.match("index.html"))));
  }
});
