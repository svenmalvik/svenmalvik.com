(() => {
  var a = "theme-preference";
  var l = {
      dark: "{{ designTokens.colors.items[0].value }}",
      light: "{{ designTokens.colors.items[1].value }}",
    },
    t = { value: s() };
  window.onload = () => {
    let e = document.querySelector("#light-theme-toggle"),
      r = document.querySelector("#dark-theme-toggle");
    document.querySelector("[data-theme-switcher]") &&
      (c(),
        o(),
        e.addEventListener("click", () => n("light")),
        r.addEventListener("click", () => n("dark")),
        e.setAttribute("aria-pressed", t.value === "light"),
        r.setAttribute("aria-pressed", t.value === "dark"));
  };
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener(
    "change",
    ({ matches: e }) => {
      t.value = e ? "dark" : "light", i(), o();
    },
  );
  function n(e) {
    t.value = e,
      document.querySelector("#light-theme-toggle").setAttribute(
        "aria-pressed",
        e === "light",
      ),
      document.querySelector("#dark-theme-toggle").setAttribute(
        "aria-pressed",
        e === "dark",
      ),
      i(),
      o();
  }
  function s() {
    return localStorage.getItem(a)
      ? localStorage.getItem(a)
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  function i() {
    localStorage.setItem(a, t.value), c(), o();
  }
  function c() {
    document.firstElementChild.setAttribute("data-theme", t.value);
  }
  function o() {
    let e = document.querySelector('meta[name="theme-color"]'),
      r = t.value === "dark" ? l.dark : l.light;
    e.setAttribute("content", r);
  }
  c();
})();
