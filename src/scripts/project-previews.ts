import { setIconLabel } from "../icons";
type PreviewPlayer = { destroy(): void; mute(): void; playVideo(): void };
type PreviewAPI = { Player: new (frame: HTMLIFrameElement, options: { events: { onReady(event: { target: PreviewPlayer }): void; onStateChange(event: { data: number }): void; onError(): void } }) => PreviewPlayer };
const youtubeWindow = window as typeof window & { YT?: PreviewAPI; onYouTubeIframeAPIReady?: () => void };
let apiRequest: Promise<PreviewAPI> | undefined;
function loadPreviewAPI() {
  if (youtubeWindow.YT?.Player) return Promise.resolve(youtubeWindow.YT);
  return apiRequest ??= new Promise<PreviewAPI>((resolve, reject) => {
    const previous = youtubeWindow.onYouTubeIframeAPIReady;
    youtubeWindow.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve(youtubeWindow.YT!);
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.onerror = () => reject(new Error("Preview player unavailable"));
    document.head.append(script);
  });
}
const previewMotion = matchMedia("(prefers-reduced-motion: reduce)");
document.querySelectorAll<HTMLElement>("[data-preview-url], [data-preview-video]").forEach((card) => {
  const media = card.querySelector<HTMLElement>(".project-visual")!;
  const button = card.querySelector<HTMLButtonElement>("[data-preview-toggle]")!;
  const label = button.getAttribute("aria-label")!;
  const shine = document.createElement("span");
  shine.className = "trailer-shine";
  shine.setAttribute("aria-hidden", "true");
  media.append(shine);
  let player: HTMLIFrameElement | HTMLVideoElement | null = null;
  let animation: Animation | undefined;
  let controller: PreviewPlayer | undefined;
  const stop = () => {
    controller?.destroy();
    controller = undefined;
    animation?.cancel();
    shine.getAnimations().forEach((a) => a.cancel());
    if (player instanceof HTMLVideoElement) {
      player.pause();
      player.removeAttribute("src");
      player.load();
    }
    player?.remove();
    player = null;
    card.classList.remove("is-previewing");
    setIconLabel(button, "Play preview", "play");
    button.setAttribute("aria-label", label);
    button.setAttribute("aria-pressed", "false");
  };
  const startShine = (iterations = Infinity) => {
    if (previewMotion.matches) return;
    // Visible from the card's left edge: the old curve kept it transparent until it was a third of the way across.
    animation = shine.animate([
      { transform: "translateX(-120%) skewX(-18deg)", opacity: 0 },
      { transform: "translateX(-60%) skewX(-18deg)", opacity: .65, offset: .12 },
      { opacity: .45, offset: .85 },
      { transform: "translateX(300%) skewX(-18deg)", opacity: 0 },
    ], { duration: 900, iterations, easing: "ease-in-out" });
  };
  // Once a YouTube film plays, fade the shine out where it is (quick but soft) instead of sweeping on.
  const fadeShine = () => {
    const running = animation;
    if (!running) return;
    const fade = shine.animate(
      [{ opacity: getComputedStyle(shine).opacity }, { opacity: 0 }],
      { duration: 280, easing: "cubic-bezier(0.2, 0, 0, 1)", fill: "forwards" },
    );
    fade.finished.then(() => {
      running.cancel();
      fade.cancel();
      if (animation === running) animation = undefined;
    }, () => {});
  };
  const markPlaying = () => {
    setIconLabel(button, "Pause preview", "pause");
    button.setAttribute("aria-label", label.replace(/^Play /, "Pause "));
    button.setAttribute("aria-pressed", "true");
  };
  // Self-hosted trailer (mp4): a muted, looping video in place of the YouTube embed.
  const playVideo = () => {
    const video = document.createElement("video");
    player = video;
    video.className = "project-preview-player";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "auto";
    video.tabIndex = -1;
    video.setAttribute("aria-hidden", "true");
    video.src = card.dataset.previewVideo!;
    // A self-hosted film is ready almost instantly, so give it the same "loading" beat as the YouTube cards:
    // one full shine across the cover art, then the film fades in from its first frame.
    startShine(1);
    const sweep = animation ? animation.finished.then(() => {}, () => {}) : Promise.resolve();
    const ready = new Promise<void>((resolve) => video.addEventListener("playing", () => resolve(), { once: true }));
    void Promise.all([sweep, ready]).then(() => {
      if (player !== video) return;
      video.currentTime = 0;
      card.classList.add("is-previewing");
    });
    video.addEventListener("error", () => { if (player === video) stop(); });
    media.insertBefore(video, shine); // the shine sweeps over the film, not under it
    video.play().catch(() => { if (player === video) stop(); });
    markPlaying();
  };
  const play = () => {
    if (player) return;
    if (card.dataset.previewVideo) return playVideo();
    const frame = document.createElement("iframe");
    player = frame;
    frame.className = "project-preview-player";
    frame.title = "Muted project preview";
    frame.tabIndex = -1;
    frame.setAttribute("aria-hidden", "true");
    frame.allow = "autoplay; encrypted-media";
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    startShine();
    frame.src = card.dataset.previewUrl! + "&enablejsapi=1&origin=" + encodeURIComponent(location.origin);
    media.insertBefore(frame, shine);
    void loadPreviewAPI().then((api) => {
      if (player !== frame) return;
      controller = new api.Player(frame, { events: {
        onReady: ({ target }) => {
          if (player !== frame) return;
          target.mute();
          target.playVideo();
        },
        onStateChange: ({ data }) => {
          if (player !== frame || data !== 1) return;
          fadeShine();
          card.classList.add("is-previewing");
        },
        onError: () => { if (player === frame) stop(); },
      } });
    }).catch(() => { if (player === frame) stop(); });
    setIconLabel(button, "Pause preview", "pause");
    button.setAttribute("aria-label", label.replace(/^Play /, "Pause "));
    button.setAttribute("aria-pressed", "true");
  };
  card.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse" && !previewMotion.matches) play();
  });
  card.addEventListener("pointerleave", (event) => {
    if (event.pointerType === "mouse") stop();
  });
  button.addEventListener("click", () => player ? stop() : play());
  document.addEventListener("visibilitychange", () => { if (document.hidden) stop(); });
  previewMotion.addEventListener("change", () => { if (previewMotion.matches) stop(); });
  new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) stop(); }).observe(card);
});
