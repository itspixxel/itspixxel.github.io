const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const toggle = document.querySelector<HTMLButtonElement>(".commentary-toggle");
const panel = document.querySelector<HTMLElement>("#developer-notes");
if (toggle && panel) {
  const apply = (on: boolean) => {
    panel.hidden = !on;
    toggle.setAttribute("aria-expanded", String(on));
    toggle.textContent = on ? toggle.dataset.off! : toggle.dataset.on!;
  };
  try {
    apply(localStorage.getItem("pixxel-commentary") === "true");
  } catch {
    apply(false);
  }
  toggle.addEventListener("click", () => {
    const on = panel.hidden;
    apply(on);
    try {
      localStorage.setItem("pixxel-commentary", String(on));
    } catch {}
  });
}
document.querySelectorAll<HTMLElement>("[data-toy]").forEach((toy) => {
  const svg = toy.querySelector<SVGSVGElement>("svg")!;
  const point = (event: PointerEvent) => {
    const rect = svg.getBoundingClientRect();
    return {
      x: Math.max(
        24,
        Math.min(456, ((event.clientX - rect.left) / rect.width) * 480),
      ),
      y: Math.max(
        30,
        Math.min(210, ((event.clientY - rect.top) / rect.height) * 240),
      ),
    };
  };
  if (toy.dataset.toy === "rig") {
    const slider = toy.querySelector<HTMLInputElement>("[data-rig-target]")!;
    const draw = () => {
      const offset = Number(slider.value);
      let paths = "";
      for (let i = 0; i < 4; i++) {
        const hx = 190 + i * 29,
          hy = 116,
          fx = hx + offset + (i % 2 ? 8 : -8),
          fy = 196;
        const dx = fx - hx,
          dy = fy - hy,
          dist = Math.min(Math.hypot(dx, dy), 109.9),
          angle = Math.atan2(dy, dx),
          bend = Math.acos(dist / 110) * (i < 2 ? 1 : -1);
        const kx = hx + 55 * Math.cos(angle + bend),
          ky = hy + 55 * Math.sin(angle + bend);
        const endX = hx + dist * Math.cos(angle),
          endY = hy + dist * Math.sin(angle);
        paths += `<path d="M${hx} ${hy}L${kx} ${ky}L${endX} ${endY}"/><circle cx="${kx}" cy="${ky}" r="3"/>`;
      }
      toy.querySelector("[data-legs]")!.innerHTML = paths;
      toy
        .querySelector("[data-target]")!
        .setAttribute("cx", String(240 + offset));
    };
    slider.addEventListener("input", draw);
    draw();
    svg.addEventListener("pointerdown", (event) => {
      slider.value = String((point(event).x - 240) / 2);
      draw();
      svg.setPointerCapture(event.pointerId);
    });
    svg.addEventListener("pointermove", (event) => {
      if (svg.hasPointerCapture(event.pointerId)) {
        slider.value = String((point(event).x - 240) / 2);
        draw();
      }
    });
  }
  if (toy.dataset.toy === "spring") {
    const button = toy.querySelector<HTMLButtonElement>("[data-start]")!,
      creature = toy.querySelector("[data-creature]")!,
      target = toy.querySelector("[data-target]")!;
    let active = false,
      visible = true,
      frame = 0,
      last = 0,
      x = 240,
      y = 120,
      vx = 0,
      vy = 0,
      tx = 300,
      ty = 120;
    const render = () =>
      creature.setAttribute(
        "transform",
        `translate(${x} ${y}) rotate(${Math.max(-15, Math.min(15, vx * 2))})`,
      );
    const tick = (time: number) => {
      frame = 0;
      if (!active || !visible || document.hidden || reduced.matches) return;
      const dt = Math.min((time - last) / 16.67 || 1, 2);
      last = time;
      vx += (tx - x) * 0.035 * dt;
      vy += (ty - y) * 0.035 * dt;
      vx *= Math.pow(0.82, dt);
      vy *= Math.pow(0.82, dt);
      x += vx * dt;
      y += vy * dt;
      render();
      frame = requestAnimationFrame(tick);
    };
    const wake = () => {
      if (active && visible && !document.hidden && !reduced.matches && !frame) {
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    };
    const pause = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    button.addEventListener("click", () => {
      active = !active;
      button.setAttribute("aria-pressed", String(active));
      button.textContent = active
        ? button.dataset.stopLabel!
        : button.dataset.startLabel!;
      if (active) wake();
      else pause();
    });
    const move = (event: PointerEvent) => {
      if (!active) return;
      ({ x: tx, y: ty } = point(event));
      target.setAttribute("cx", String(tx));
      target.setAttribute("cy", String(ty));
      if (reduced.matches) {
        x = tx;
        y = ty;
        render();
      } else wake();
    };
    svg.addEventListener("pointermove", move);
    svg.addEventListener("pointerdown", move);
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible) wake();
      else pause();
    }).observe(toy);
    document.addEventListener("visibilitychange", () =>
      document.hidden ? pause() : wake(),
    );
    reduced.addEventListener("change", () =>
      reduced.matches ? pause() : wake(),
    );
    // Arrow keys provide the same target movement without a pointer.
    svg.setAttribute("tabindex", "0");
    svg.setAttribute(
      "aria-label",
      "Spring creature playground. Start the experiment, then use arrow keys to move its target.",
    );
    svg.addEventListener("keydown", (event) => {
      const directions: Record<string, [number, number]> = {
        ArrowLeft: [-20, 0],
        ArrowRight: [20, 0],
        ArrowUp: [0, -20],
        ArrowDown: [0, 20],
      };
      const delta = directions[event.key];
      if (!delta || !active) return;
      event.preventDefault();
      tx = Math.max(24, Math.min(456, tx + delta[0]));
      ty = Math.max(30, Math.min(210, ty + delta[1]));
      target.setAttribute("cx", String(tx));
      target.setAttribute("cy", String(ty));
      if (reduced.matches) {
        x = tx;
        y = ty;
        render();
      } else wake();
    });
  }
  if (toy.dataset.toy === "jump") {
    const button = toy.querySelector<HTMLButtonElement>("[data-jump]")!,
      jumper = toy.querySelector<SVGElement>("[data-jumper]")!;
    let jumping = false;
    button.addEventListener("click", async () => {
      if (jumping) return;
      jumping = true;
      button.disabled = true;
      if (!reduced.matches) {
        await jumper.animate(
          [
            { transform: "translate(0px,0px)" },
            { transform: "translate(130px,-100px)", offset: 0.5 },
            { transform: "translate(270px,0px)" },
          ],
          {
            duration: 850,
            easing: "cubic-bezier(.35,0,.65,1)",
            fill: "forwards",
          },
        ).finished;
      } else jumper.setAttribute("transform", "translate(270 0)");
      toy.querySelector<HTMLElement>(".toy-success")!.hidden = false;
      button.hidden = true;
      toy.querySelector<HTMLElement>(".toy-success")!.focus();
    });
  }
});
