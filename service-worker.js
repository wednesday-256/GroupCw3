var cacheName = "appStore-v1";

//intercepts requests to save all fetched files in the cache if new or return from cache if exisiting
self.addEventListener("fetch", (e) => {
  e.respondWith(
    // checks if the requested file is cached
    caches.match(e.request).then((r) => {
      // returns the caches file or requests it if not available
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
