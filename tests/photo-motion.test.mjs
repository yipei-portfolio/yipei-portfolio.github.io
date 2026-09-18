import assert from "node:assert/strict";
import test from "node:test";
import { initPhotoMotion } from "../public/photo-motion.js";

function withGallery(options, verify) {
  const previous = new Map(["document", "window", "IntersectionObserver"].map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  const makeElement = () => {
    const classes = new Set();
    const listeners = new Map();
    return { classes, listeners, classList: { add: (name) => classes.add(name), remove: (name) => classes.delete(name) }, addEventListener: (name, handler) => listeners.set(name, handler) };
  };
  const photos = Array.from({ length: 3 }, makeElement);
  const gallery = { ...makeElement(), querySelectorAll: () => photos };
  const preference = { matches: options.reduce ?? false, ...makeElement() };
  let observer;
  class Observer {
    constructor(callback) { this.callback = callback; this.observed = new Set(); observer = this; }
    observe(photo) { this.observed.add(photo); }
    unobserve(photo) { this.observed.delete(photo); }
    disconnect() { this.observed.clear(); }
  }
  try {
    globalThis.document = { querySelector: () => gallery };
    globalThis.window = { matchMedia: () => preference, ...(options.noObserver ? {} : { IntersectionObserver: Observer }) };
    globalThis.IntersectionObserver = Observer;
    initPhotoMotion();
    verify({ gallery, photos, preference, observer });
  } finally {
    for (const [key, descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  }
}

test("the collage starts one staggered entrance when it enters view", () => {
  withGallery({}, ({ gallery, photos, observer }) => {
    assert.ok(gallery.classes.has("photo-motion-ready"));
    assert.ok(observer.observed.has(gallery));
    observer.callback([{ target: gallery, isIntersecting: false }]);
    assert.ok(photos.every((photo) => !photo.classes.has("is-photo-visible")));
    observer.callback([{ target: gallery, isIntersecting: true }]);
    assert.ok(photos.every((photo) => photo.classes.has("is-photo-visible")));
    assert.equal(observer.observed.size, 0);
  });
});

test("keyboard focus bypasses pending delays and brings every photo into view", () => {
  withGallery({}, ({ gallery, photos, observer }) => {
    photos[1].listeners.get("focusin")();
    assert.ok(photos.every((photo) => photo.classes.has("is-photo-visible")));
    assert.ok(!gallery.classes.has("photo-motion-ready"));
    assert.equal(observer.observed.size, 0);
  });
});

test("reduced motion and unsupported observers leave every photo visible by default", () => {
  for (const options of [{ reduce: true }, { noObserver: true }]) {
    withGallery(options, ({ gallery, observer }) => {
      assert.ok(!gallery.classes.has("photo-motion-ready"));
      assert.equal(observer, undefined);
    });
  }
});

test("switching reduced motion on cancels pending entrances without leaving invisible photos", () => {
  withGallery({}, ({ gallery, photos, preference, observer }) => {
    preference.listeners.get("change")({ matches: true });
    assert.ok(!gallery.classes.has("photo-motion-ready"));
    assert.ok(photos.every((photo) => photo.classes.has("is-photo-visible")));
    assert.equal(observer.observed.size, 0);
  });
});
