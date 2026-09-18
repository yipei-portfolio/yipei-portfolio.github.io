// Entrance and hover live on separate elements so their transforms never compete.
export function initPhotoMotion() {
  const gallery = document.querySelector(".about-gallery");
  if (!gallery) return;
  const photos = [...gallery.querySelectorAll(".photo-reveal")];
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (preference.matches || !("IntersectionObserver" in window)) return;

  const reveal = (photo) => photo.classList.add("is-photo-visible");
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    photos.forEach(reveal);
    observer.disconnect();
  }, { threshold: 0.18 });

  gallery.classList.add("photo-motion-ready");
  observer.observe(gallery);
  photos.forEach((photo) => {
    // Keyboard navigation must never land on a waiting, invisible photo.
    photo.addEventListener("focusin", () => {
      photos.forEach(reveal);
      gallery.classList.remove("photo-motion-ready");
      observer.disconnect();
    });
  });

  preference.addEventListener("change", (event) => {
    if (!event.matches) return;
    observer.disconnect();
    photos.forEach(reveal);
    gallery.classList.remove("photo-motion-ready");
  });
}
