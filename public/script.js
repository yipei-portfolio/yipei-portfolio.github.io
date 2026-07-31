import {
  LETTER_MOTION_PROFILES,
  applySectionTheme,
  getEntryVector,
  sampleHeadShake,
} from "./site-motion.js";

const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll("[data-split]").forEach((element) => {
  const text = element.textContent;
  element.textContent = "";
  [...text].forEach((character, index) => {
    const span = document.createElement("span");
    span.className = "char";
    span.style.setProperty("--char", index);
    span.textContent = character === " " ? "\u00a0" : character;
    element.appendChild(span);
  });
});

const revealItems = document.querySelectorAll(".reveal");

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );
  revealItems.forEach((item) => revealObserver.observe(item));
}

const themeSections = document.querySelectorAll(".theme-section");
const themeMeta = document.querySelector('meta[name="theme-color"]');

if ("IntersectionObserver" in window) {
  const themeObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      applySectionTheme(
        root.style,
        themeMeta,
        visible.target.dataset.bg,
        visible.target.dataset.ink,
      );
    },
    { rootMargin: "-35% 0px -35%", threshold: [0, 0.2, 0.5, 0.8] },
  );
  themeSections.forEach((section) => themeObserver.observe(section));
}

const timeLabel = document.querySelector(".local-time b");
if (timeLabel) {
  const updateShanghaiTime = () => {
    timeLabel.textContent = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Shanghai",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
  };
  updateShanghaiTime();
  setInterval(updateShanghaiTime, 30_000);
}

const magneticNav = document.querySelector(".nav-magnetic");
const navActions = [...document.querySelectorAll(".nav-action")];

navActions.forEach((action, index) => {
  action.addEventListener("pointerenter", () => {
    if (!magneticNav) return;
    magneticNav.dataset.active = index;
    magneticNav.style.setProperty("--orb-x", `${index * 34 + 1}px`);
    action.classList.add("is-active");
  });
  action.addEventListener("pointerleave", () => {
    action.classList.remove("is-active");
  });
});

magneticNav?.addEventListener("pointerleave", () => {
  magneticNav.dataset.active = "none";
});

const cursor = document.querySelector(".custom-cursor");
const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

if (hasFinePointer && cursor) {
  window.addEventListener("pointermove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    cursor.classList.add("is-visible");
  });
  document.querySelectorAll("a, button, .project-shot, .portrait-frame").forEach((target) => {
    target.addEventListener("pointerenter", () => cursor.classList.add("is-large"));
    target.addEventListener("pointerleave", () => cursor.classList.remove("is-large"));
  });
  document.documentElement.addEventListener("mouseleave", () => cursor.classList.remove("is-visible"));
}

const hero = document.querySelector(".hero");
const heroWordmark = document.querySelector(".hero-wordmark");
const heroLetters = [...document.querySelectorAll(".hero-wordmark span")];

if (!reduceMotion && hasFinePointer && hero && heroWordmark && heroLetters.length) {
  const motionState = heroLetters.map(() => ({
    inside: false,
    startedAt: 0,
    cooldownUntil: 0,
    vector: null,
  }));

  hero.addEventListener("pointermove", (event) => {
    const heroRect = hero.getBoundingClientRect();
    hero.style.setProperty("--hero-x", `${((event.clientX - heroRect.left) / heroRect.width) * 100}%`);
    hero.style.setProperty("--hero-y", `${((event.clientY - heroRect.top) / heroRect.height) * 100}%`);
    cursor?.classList.add("is-hero");
  });

  hero.addEventListener("pointerleave", () => {
    hero.style.setProperty("--hero-x", "50%");
    hero.style.setProperty("--hero-y", "28%");
    cursor?.classList.remove("is-hero");
  });

  window.addEventListener(
    "pointermove",
    (event) => {
      const now = performance.now();
      heroLetters.forEach((letter, index) => {
        const profile = LETTER_MOTION_PROFILES[letter.dataset.letter];
        const state = motionState[index];
        if (!profile) return;

        const rect = letter.getBoundingClientRect();
        const padX = Math.max(18, rect.width * 0.06);
        const padY = Math.max(18, rect.height * 0.06);
        const inside =
          event.clientX >= rect.left - padX &&
          event.clientX <= rect.right + padX &&
          event.clientY >= rect.top - padY &&
          event.clientY <= rect.bottom + padY;

        if (inside && !state.inside && now >= state.cooldownUntil) {
          state.vector = getEntryVector(
            rect,
            { x: event.clientX, y: event.clientY },
            { x: event.movementX, y: event.movementY },
            profile,
          );
          state.startedAt = now;
          state.cooldownUntil = now + profile.duration;
          letter.classList.add("is-bouncing");
        }

        state.inside = inside;
      });
    },
    { passive: true },
  );

  window.addEventListener("pointerleave", () => {
    motionState.forEach((state) => {
      state.inside = false;
    });
  });

  const resetLetter = (letter, state) => {
    state.startedAt = 0;
    state.vector = null;
    letter.classList.remove("is-bouncing");
    letter.style.setProperty("--wave-x", "0px");
    letter.style.setProperty("--wave-y", "0px");
    letter.style.setProperty("--wave-rotate", "0deg");
  };

  const tick = (now) => {
    heroLetters.forEach((letter, index) => {
      const profile = LETTER_MOTION_PROFILES[letter.dataset.letter];
      const state = motionState[index];
      if (!profile || !state.startedAt || !state.vector) return;

      const progress = (now - state.startedAt) / profile.duration;
      if (progress >= 1) {
        resetLetter(letter, state);
        return;
      }

      const sample = sampleHeadShake(progress, state.vector, profile);
      letter.style.setProperty("--wave-x", `${sample.x.toFixed(3)}px`);
      letter.style.setProperty("--wave-y", `${sample.y.toFixed(3)}px`);
      letter.style.setProperty("--wave-rotate", `${sample.rotation.toFixed(3)}deg`);
    });
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);

  const heroMotionObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) return;
    motionState.forEach((state, index) => {
      const letter = heroLetters[index];
      resetLetter(letter, state);
      state.cooldownUntil = 0;
      state.inside = false;
    });
  });
  heroMotionObserver.observe(hero);
}

const projectShot = document.querySelector(".project-shot");
const updateParallax = () => {
  if (reduceMotion || !projectShot) return;
  const rect = projectShot.parentElement.getBoundingClientRect();
  const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
  const offset = Math.max(-22, Math.min(22, (progress - 0.5) * 44));
  projectShot.style.setProperty("--parallax", `${offset}px`);
};
window.addEventListener("scroll", updateParallax, { passive: true });
updateParallax();

const copyWechat = document.querySelector(".copy-wechat");
const copyFeedback = document.querySelector(".copy-feedback");
let feedbackTimer;

copyWechat?.addEventListener("click", async () => {
  const value = copyWechat.dataset.copy;
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const input = document.createElement("textarea");
    input.value = value;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
  }
  copyFeedback?.classList.add("is-visible");
  clearTimeout(feedbackTimer);
  feedbackTimer = setTimeout(() => copyFeedback?.classList.remove("is-visible"), 1800);
});
