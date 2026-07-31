export const LETTER_MOTION_PROFILES = Object.freeze({
  L: Object.freeze({
    duration: 3050,
    distance: 1.08,
    rebound1: -0.38,
    rebound2: 0.16,
    arc: 10,
    rotation: 0.9,
  }),
  Y: Object.freeze({
    duration: 2820,
    distance: 0.94,
    rebound1: -0.5,
    rebound2: 0.22,
    arc: -13,
    rotation: 1.08,
  }),
  P: Object.freeze({
    duration: 3180,
    distance: 1.12,
    rebound1: -0.42,
    rebound2: 0.18,
    arc: 10,
    rotation: 1,
  }),
});

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const smooth = (value) => value * value * (3 - 2 * value);
const round = (value) => {
  const rounded = Math.round(value * 1000) / 1000;
  return Object.is(rounded, -0) ? 0 : rounded;
};

export function getEntryVector(rect, pointer, movement, profile) {
  const centerX = rect.left + rect.width / 2;
  const awayX = pointer.x <= centerX ? 1 : -1;
  const movementX = movement?.x ?? 0;
  const movementY = movement?.y ?? 0;
  const speed = Math.min(48, Math.hypot(movementX, movementY));
  const awayY = clamp(
    (rect.top + rect.height * 0.42 - pointer.y) / Math.max(rect.height, 1),
    -0.16,
    0.16,
  );

  return {
    awayX,
    awayY: round(awayY),
    arcY: awayX * profile.arc,
    amplitude: round((102 + speed * 0.72) * profile.distance),
    rotationAmplitude: round(
      (awayX * 8.5 + movementX * 0.045) * profile.rotation,
    ),
  };
}

function reboundValue(progress, profile) {
  const frames = [
    [0, 0],
    [0.24, 1],
    [0.52, profile.rebound1],
    [0.76, profile.rebound2],
    [1, 0],
  ];

  for (let index = 1; index < frames.length; index += 1) {
    if (progress > frames[index][0]) continue;
    const from = frames[index - 1];
    const to = frames[index];
    const local = smooth(
      clamp((progress - from[0]) / (to[0] - from[0]), 0, 1),
    );
    return from[1] + (to[1] - from[1]) * local;
  }

  return 0;
}

export function sampleHeadShake(progress, vector, profile) {
  const boundedProgress = clamp(progress, 0, 1);
  const rebound = reboundValue(boundedProgress, profile);
  const arc =
    Math.sin(boundedProgress * Math.PI) *
    Math.sin(boundedProgress * Math.PI * 2);

  return {
    x: round(vector.awayX * vector.amplitude * rebound),
    y: round(
      vector.awayY * vector.amplitude * rebound +
        vector.arcY * arc,
    ),
    rotation: round(vector.rotationAmplitude * rebound),
  };
}

export function applySectionTheme(rootStyle, themeMeta, background, ink) {
  rootStyle.setProperty("--current-bg", background);
  rootStyle.setProperty("--current-ink", ink);
  themeMeta?.setAttribute("content", background);
}
