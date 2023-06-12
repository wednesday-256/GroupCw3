var cacheName = "appStore-v1";

// self.addEventListener("install", (e) => {
//   console.log("[service worker] Install");
//   e.waitUntill(
//     caches.open(cacheName).then((cache) => {
//       console.log("[Service Worker] Caching all files");
//       return cache.addAll(cacheFiles);
//     })
//   );
// });

// //intercepts requests to retrun cached files
// self.addEventListener("fetch", (e) => {
//   e.respondWith(
//     caches.match(e.request).then((r) => {
//       console.log("[service worker] fetching resource:" + e.request.url);
//       return r;
//     })
//   );
// });

//intercepts requests to save all fetched files in the cache if new or return from cache if exisiting
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      return (
        r ||
        fetch(e.request).then((response) => {
          //adds the new file to cache
          return caches.open(cacheName).then((cache) => {
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
