
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("tebak-hewan-cache").then((cache) => {
      return cache.addAll([
        "./",
        "./index.html",
        "./main.js",
        "./confetti.js",
        "./manifest.json",
        "./questions.json",
        "./icon.png"
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
