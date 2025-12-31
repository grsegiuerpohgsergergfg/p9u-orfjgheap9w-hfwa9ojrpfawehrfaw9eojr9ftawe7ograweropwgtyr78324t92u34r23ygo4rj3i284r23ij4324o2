window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const site = document.getElementById("site");

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.transition = "opacity 1.2s ease";

    setTimeout(() => {
      loader.style.display = "none";
      site.classList.remove("hidden");
      document.body.classList.add("site-loaded");
      document.body.style.overflow = "auto";
    }, 1200);
  }, 2500);
});
