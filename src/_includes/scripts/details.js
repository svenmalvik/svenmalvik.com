(() => {
  var t = document.querySelector(".details"),
    c = t.querySelector("#expandAll"),
    s = t.querySelector("#collapseAll"),
    l = t.querySelectorAll("details");
  c.addEventListener("click", () => {
    l.forEach((e) => e.open = !0);
  });
  s.addEventListener("click", () => {
    l.forEach((e) => e.open = !1);
  });
  l.forEach((e) => {
    e.addEventListener("toggle", () => {
      let n = e.open ? `#${e.id}` : "#";
      history.pushState(null, null, n);
    });
  });
  var o = window.location.hash.slice(1);
  if (o) {
    let e = t.querySelector(`#${CSS.escape(o)}`);
    e && (e.open = !0);
  }
})();
