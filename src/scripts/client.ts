const filter = document.querySelector("[data-filter]");
if (filter) {
  const search = document.querySelector<HTMLInputElement>("#search")!;
  const tag = document.querySelector<HTMLSelectElement>("#tag")!;
  const entries = [...document.querySelectorAll<HTMLElement>("[data-entry]")];
  const more = document.querySelector<HTMLButtonElement>("#more")!;
  let limit = 8;
  function apply() {
    let count = 0;
    entries.forEach((e) => {
      const match =
        (e.dataset.search || "").includes(search.value.toLowerCase()) &&
        (!tag.value || (e.dataset.tags || "").split("|").includes(tag.value));
      if (match) count++;
      e.hidden = !match || count > limit;
    });
    document.querySelector<HTMLElement>("#empty")!.hidden = count > 0;
    more.hidden = count <= limit;
    document.querySelector("#results-status")!.textContent =
      `${count} ${count === 1 ? "note" : "notes"}`;
  }
  search.addEventListener("input", () => {
    limit = 8;
    apply();
  });
  tag.addEventListener("change", () => {
    limit = 8;
    apply();
  });
  more.addEventListener("click", () => {
    limit += 8;
    apply();
  });
  apply();
}
document.querySelectorAll<HTMLElement>(".prose pre").forEach((pre) => {
  const parent = pre.closest<HTMLElement>(".prose")!;
  const wrap = document.createElement("div");
  wrap.className = "code-wrap";
  pre.before(wrap);
  wrap.append(pre);
  const label = document.createElement("span");
  label.className = "code-label";
  label.textContent = pre.dataset.language || "CODE";
  wrap.append(label);
  const button = document.createElement("button");
  button.className = "copy-code";
  button.textContent = parent.dataset.copy || "Copy code";
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(pre.textContent || "");
      button.textContent = parent.dataset.copied || "Copied";
      setTimeout(
        () => (button.textContent = parent.dataset.copy || "Copy code"),
        1800,
      );
    } catch {
      button.textContent = "Select and copy";
      const range = document.createRange();
      range.selectNodeContents(pre);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  });
  wrap.append(button);
});
document
  .querySelectorAll<HTMLElement>(".prose h2[id],.prose h3[id]")
  .forEach((h) => {
    const a = document.createElement("a");
    a.href = `#${h.id}`;
    a.textContent = h.textContent;
    a.style.color = "inherit";
    a.style.textDecoration = "none";
    h.textContent = "";
    h.append(a);
  });

// Only reveal content that starts below the viewport. Animating already-painted
// content from opacity zero causes a flash during document navigation.
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const runningAnimations = new Set<Animation>();
const entranceTargets = document.querySelectorAll<HTMLElement>(
  ".hero-copy, .hero-portrait, .page-heading, .section-heading, .project, .note-row, .interest > h2, .interest > div, .contact-band, .personal-layout, .detail-cover, .article-layout, .related",
);
const entranceObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting);
    visible.forEach((entry, index) => {
      entranceObserver.unobserve(entry.target);
      if (
        motionPreference.matches ||
        entry.target.contains(document.activeElement)
      )
        return;
      const animation = entry.target.animate(
        [
          { opacity: 0, transform: "translateY(20px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 720,
          delay: Math.min(index * 65, 195),
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "backwards",
        },
      );
      runningAnimations.add(animation);
      animation.finished
        .then(() => runningAnimations.delete(animation))
        .catch(() => runningAnimations.delete(animation));
    });
  },
  { threshold: 0, rootMargin: "0px 0px -24px 0px" },
);
entranceTargets.forEach((element) => {
  const bounds = element.getBoundingClientRect();
  if (bounds.top < window.innerHeight) return;
  entranceObserver.observe(element);
});
// Navigation snapshots should capture finished content, not a half-faded reveal.
window.addEventListener("pageswap", () => {
  runningAnimations.forEach((animation) => animation.cancel());
});
motionPreference.addEventListener("change", () => {
  if (motionPreference.matches)
    runningAnimations.forEach((animation) => animation.cancel());
});
document.addEventListener("focusin", () => {
  runningAnimations.forEach((animation) => {
    const target = (animation.effect as KeyframeEffect | null)?.target;
    if (target instanceof Element && target.contains(document.activeElement))
      animation.cancel();
  });
});

// Load the trailer only on interaction; the cover remains the default state.
document
  .querySelectorAll<HTMLElement>("[data-trailer-card]")
  .forEach((card) => {
    const video = card.querySelector<HTMLVideoElement>("[data-trailer]");
    const button = card.querySelector<HTMLButtonElement>(".trailer-toggle");
    if (!video || !button) return;
    let wantsPlayback = false;
    let sequence = 0;
    let shineAnimation: Animation | undefined;
    const shine = document.createElement("span");
    shine.className = "trailer-shine";
    shine.setAttribute("aria-hidden", "true");
    card.querySelector(".now-work-media")?.append(shine);
    const stop = () => {
      wantsPlayback = false;
      sequence++;
      shineAnimation?.cancel();
      video.pause();
      card.classList.remove("is-playing");
      button.textContent = `${button.dataset.playLabel} ▷`;
      button.setAttribute("aria-pressed", "false");
    };
    const play = async () => {
      if (wantsPlayback) return;
      wantsPlayback = true;
      const request = ++sequence;
      button.setAttribute("aria-pressed", "true");
      button.textContent = `${button.dataset.pauseLabel} Ⅱ`;
      try {
        // Decode behind the cover while the shine runs, then overlap the fade.
        if (video.readyState === 0) video.load();
        let revealDelay: Promise<void> = Promise.resolve();
        if (!motionPreference.matches) {
          shineAnimation = shine.animate(
            [
              { transform: "translateX(-160%) skewX(-18deg)", opacity: 0 },
              { opacity: 0.65, offset: 0.25 },
              { opacity: 0.45, offset: 0.7 },
              { transform: "translateX(430%) skewX(-18deg)", opacity: 0 },
            ],
            { duration: 800, iterations: Infinity, easing: "cubic-bezier(0.4, 0, 0.2, 1)" },
          );
          revealDelay = new Promise<void>((resolve) =>
            setTimeout(resolve, 560),
          );
        }
        await Promise.all([video.play(), revealDelay]);
        if (request !== sequence) {
          if (!wantsPlayback) video.pause();
          return;
        }
        if (!wantsPlayback) {
          video.pause();
          return;
        }
        shineAnimation?.cancel();
        card.classList.add("is-playing");
        button.textContent = `${button.dataset.pauseLabel} Ⅱ`;
        button.setAttribute("aria-pressed", "true");
      } catch {
        if (request === sequence) stop();
      }
    };
    card.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse" && !motionPreference.matches)
        void play();
    });
    card.addEventListener("pointerleave", (event) => {
      if (event.pointerType === "mouse") stop();
    });
    button.addEventListener("click", () =>
      wantsPlayback ? stop() : void play(),
    );
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
    });
    motionPreference.addEventListener("change", () => {
      if (motionPreference.matches) stop();
    });
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) stop();
    });
    observer.observe(card);
  });

// Native scrolling keeps the gallery usable without JavaScript or hover.
document
  .querySelectorAll<HTMLElement>("[data-carousel]")
  .forEach((carousel) => {
    const track = carousel.querySelector<HTMLElement>("[data-capture-track]")!;
    const slides = [...track.querySelectorAll<HTMLElement>("[data-slide]")];
    slides[0]?.classList.add("is-active");
    if (slides.length < 2) return;
    const previous =
      carousel.querySelector<HTMLButtonElement>("[data-previous]")!;
    const next = carousel.querySelector<HTMLButtonElement>("[data-next]")!;
    const thumbnails = [
      ...carousel.querySelectorAll<HTMLButtonElement>("[data-capture-index]"),
    ];
    carousel.querySelector<HTMLElement>("[data-capture-controls]")!.hidden =
      false;
    carousel.querySelector<HTMLElement>("[data-capture-thumbnails]")!.hidden =
      false;
    let current = 0,
      frame = 0;
    const update = () => {
      frame = 0;
      const position = track.getBoundingClientRect().left + track.clientWidth / 2;
      current = slides.reduce(
        (closest, slide, index) =>
          Math.abs(slide.getBoundingClientRect().left + slide.clientWidth / 2 - position) <
          Math.abs(slides[closest].getBoundingClientRect().left + slides[closest].clientWidth / 2 - position)
            ? index
            : closest,
        0,
      );
      slides.forEach((slide, index) => {
        slide.classList.toggle("is-active", index === current);
        if (index !== current) {
          slide.querySelector("iframe")?.remove();
          const play = slide.querySelector<HTMLButtonElement>(
            "[data-project-video]",
          );
          if (play) play.hidden = false;
        }
      });
      previous.disabled = current === 0;
      next.disabled = current === slides.length - 1;
      carousel.querySelector("[data-capture-count]")!.textContent =
        `${current + 1} / ${slides.length}`;
      thumbnails.forEach((button, index) =>
        button.setAttribute("aria-pressed", String(index === current)),
      );
    };
    const go = (index: number) => {
      const target = slides[Math.max(0, Math.min(slides.length - 1, index))];
      track.scrollTo({
        left: target.offsetLeft + target.clientWidth / 2 - track.clientWidth / 2,
        behavior: motionPreference.matches ? "instant" : "smooth",
      });
    };
    previous.addEventListener("click", () => go(current - 1));
    next.addEventListener("click", () => go(current + 1));
    thumbnails.forEach((button, index) =>
      button.addEventListener("click", () => go(index)),
    );
    track.addEventListener(
      "scroll",
      () => {
        if (!frame) frame = requestAnimationFrame(update);
      },
      { passive: true },
    );
    track.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        go(current + (event.key === "ArrowLeft" ? -1 : 1));
      }
    });
    new ResizeObserver(update).observe(track);
    update();
  });

// A native dialog supplies focus trapping, Escape, and a larger inspection view.
document
  .querySelectorAll<HTMLElement>("[data-carousel]")
  .forEach((carousel) => {
    const images = [
      ...carousel.querySelectorAll<HTMLImageElement>(
        "[data-slide]:not(.capture-video) > img",
      ),
    ];
    const dialog = document.createElement("dialog");
    dialog.className = "capture-lightbox";
    dialog.setAttribute("aria-label", "Development capture viewer");
    dialog.innerHTML =
      '<div class="lightbox-toolbar"><span class="eyebrow">Development captures</span><span data-view-count aria-live="polite"></span><button type="button" data-close aria-label="Close viewer">Close ×</button></div><div class="lightbox-stage"><button type="button" data-view-prev aria-label="Previous image">←</button><img alt="" /><button type="button" data-view-next aria-label="Next image">→</button></div><p data-view-caption></p>';
    document.body.append(dialog);
    let index = 0;
    let opener: HTMLElement | null = null;
    const show = (next: number) => {
      index = Math.max(0, Math.min(images.length - 1, next));
      const image = dialog.querySelector("img")!;
      image.src = images[index].src;
      image.alt = images[index].alt;
      dialog.querySelector("[data-view-count]")!.textContent =
        `${String(index + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;
      dialog.querySelector("[data-view-caption]")!.textContent =
        images[index].alt;
      dialog.querySelector<HTMLButtonElement>("[data-view-prev]")!.disabled =
        index === 0;
      dialog.querySelector<HTMLButtonElement>("[data-view-next]")!.disabled =
        index === images.length - 1;
      if (!motionPreference.matches)
        image.animate(
          [
            { opacity: 0.3, transform: "scale(.985)" },
            { opacity: 1, transform: "scale(1)" },
          ],
          { duration: 350, easing: "ease-out" },
        );
    };
    carousel
      .querySelectorAll<HTMLButtonElement>("[data-expand-capture]")
      .forEach((button) =>
        button.addEventListener("click", () => {
          opener = button;
          show(Number(button.dataset.expandCapture));
          dialog.showModal();
          document.documentElement.classList.add("viewer-open");
        }),
      );
    dialog
      .querySelector("[data-close]")!
      .addEventListener("click", () => dialog.close());
    dialog
      .querySelector("[data-view-prev]")!
      .addEventListener("click", () => show(index - 1));
    dialog
      .querySelector("[data-view-next]")!
      .addEventListener("click", () => show(index + 1));
    dialog.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        show(index + (event.key === "ArrowLeft" ? -1 : 1));
      }
    });
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => {
      document.documentElement.classList.remove("viewer-open");
      opener?.focus();
    });
  });

// Load third-party players only after an explicit request.
document
  .querySelectorAll<HTMLButtonElement>("[data-project-video]")
  .forEach((button) => {
    button.addEventListener("click", () => {
      const frame = document.createElement("iframe");
      frame.src = button.dataset.projectVideo!;
      frame.title = "Project film";
      frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      frame.allowFullscreen = true;
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      button.closest(".capture-video")!.append(frame);
      button.hidden = true;
    });
  });
