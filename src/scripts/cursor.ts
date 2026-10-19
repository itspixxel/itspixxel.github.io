// A short-lived field of sparks, painted behind the page content.
const cursorMedia = matchMedia("(hover: hover) and (pointer: fine)");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const canvas = document.createElement("canvas");
canvas.className = "cursor-field";
canvas.setAttribute("aria-hidden", "true");
const context = canvas.getContext("2d");

if (context) {
  document.body.prepend(canvas);
  const ctx = context;
  type Spark = { x: number; y: number; born: number; size: number; drift: number };
  let sparks: Spark[] = [];
  let frame = 0;
  let lastEmission = 0;
  let width = innerWidth;
  let height = innerHeight;
  const enabled = () => cursorMedia.matches && !reducedMotion.matches;
  const resize = () => {
    width = innerWidth;
    height = innerHeight;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  };
  const clear = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    sparks = [];
    ctx.clearRect(0, 0, width, height);
  };
  const draw = (now: number) => {
    frame = 0;
    ctx.clearRect(0, 0, width, height);
    if (!enabled() || document.hidden) return;
    sparks = sparks.filter(spark => now - spark.born < 1100);
    for (const spark of sparks) {
      const age = (now - spark.born) / 1100;
      const opacity = (1 - age) ** 2;
      const y = spark.y - age * spark.drift;
      const size = spark.size * (1 - age * .5);
      ctx.strokeStyle = `rgba(197,160,245,${opacity * .18})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(spark.x - size, y);
      ctx.lineTo(spark.x + size, y);
      ctx.moveTo(spark.x, y - size);
      ctx.lineTo(spark.x, y + size);
      ctx.stroke();
    }
    if (sparks.length) frame = requestAnimationFrame(draw);
  };
  window.addEventListener("pointermove", (event) => {
    if (!enabled() || event.pointerType === "touch") return;
    const now = performance.now();
    if (now - lastEmission > 32) {
      sparks.push({ x: event.clientX + (Math.random() - .5) * 24, y: event.clientY + (Math.random() - .5) * 24, born: now, size: 1 + Math.random() * 1.5, drift: 12 + Math.random() * 24 });
      sparks = sparks.slice(-36);
      lastEmission = now;
    }
    if (!frame) frame = requestAnimationFrame(draw);
  }, { passive: true });
  window.addEventListener("blur", clear);
  document.addEventListener("visibilitychange", clear);
  cursorMedia.addEventListener("change", clear);
  reducedMotion.addEventListener("change", clear);
  window.addEventListener("resize", resize, { passive: true });
  resize();
}
