(() => {
  var c = document.querySelectorAll("button[data-index]"),
    o = document.querySelectorAll("dialog"),
    l = document.querySelectorAll("dialog button");
  c.forEach((t, e) => {
    t.addEventListener("click", () => {
      o[e].showModal();
    });
  });
  l.forEach((t, e) => {
    t.addEventListener("click", () => {
      o[e].close();
    });
  });
  window.addEventListener("click", (t) => {
    o.forEach((e) => {
      t.target === e && e.close();
    });
  });
})();
