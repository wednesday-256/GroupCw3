var cacheName = "appStore-v1";

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
