self.addEventListener("install",e=>{
  e.waitUntil(
    caches.open("mojo").then(cache=>{
      return cache.addAll([
        "/",
        "/index.html",
        "/style.css",
        "/script.js",
        "/data.json"
      ]);
    })
  );
});