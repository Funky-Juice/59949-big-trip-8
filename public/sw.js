const CACHE_NAME = `BIG_TRIP`;

self.addEventListener(`install`, (evt) => {

  const openCache = caches.open(CACHE_NAME)
    .then((cache) => {
      return cache.addAll([
        `/`,
        `/index.html`,
        `/bundle.js`,
        `/bundle.js.map`,
        `/css/main.css`,
        `/css/normalize.css`,
        `/img/star.svg`,
        `/img/star--check.svg`
      ]);
    });

  evt.waitUntil(openCache);
});

self.addEventListener(`fetch`, (evt) => {
  evt.respondWith(
      caches.match(evt.request)
      .then((response) => {
        // eslint-disable-next-line
        console.log(`Find in cache`, {response});
        return response ? response : fetch(evt.request);
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.error({err});
        throw err;
      })
  );
});
