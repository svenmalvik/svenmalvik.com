(() => {
  var n = document.querySelector("nav"),
    r = n.querySelector("ul"),
    i = document.querySelector("#burger-template").content.cloneNode(!0),
    t = i.querySelector("button");
  t.addEventListener("click", (e) => {
    let o = t.getAttribute("aria-expanded") === "true";
    t.setAttribute("aria-expanded", !o);
  });
  var c = () => {
    t.setAttribute("aria-expanded", !1);
  };
  n.addEventListener("keyup", (e) => {
    e.code === "Escape" && c();
  });
  document.addEventListener("click", (e) => {
    n.contains(e.target) || c();
  });
  document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
      r.removeAttribute("no-flash");
    }, 100);
  });
  n.insertBefore(i, r);
})();
