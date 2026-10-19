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
document.querySelectorAll<HTMLElement>("[data-preview-url]").forEach((card) => {
  const media = card.querySelector<HTMLElement>(".project-visual")!;
  const button = card.querySelector<HTMLButtonElement>("[data-preview-toggle]")!;
  const label = button.getAttribute("aria-label")!;
  const shine = document.createElement("span");
  shine.className = "trailer-shine";
  shine.setAttribute("aria-hidden", "true");
  media.append(shine);
  let player: HTMLIFrameElement | null = null;
  let animation: Animation | undefined;
  let controller: PreviewPlayer | undefined;
  const stop = () => {
    controller?.destroy();
    controller = undefined;
    animation?.cancel();
    player?.remove();
    player = null;
    card.classList.remove("is-previewing");
    setIconLabel(button, "Play preview", "play");
    button.setAttribute("aria-label", label);
    button.setAttribute("aria-pressed", "false");
  };
  const play = () => {
    if (player) return;
    const frame = document.createElement("iframe");
    player = frame;
    frame.className = "project-preview-player";
    frame.title = "Muted project preview";
    frame.tabIndex = -1;
    frame.setAttribute("aria-hidden", "true");
    frame.allow = "autoplay; encrypted-media";
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    if (!previewMotion.matches) {
      animation = shine.animate([
        { transform: "translateX(-160%) skewX(-18deg)", opacity: 0 },
        { opacity: .65, offset: .25 },
        { opacity: .45, offset: .7 },
        { transform: "translateX(430%) skewX(-18deg)", opacity: 0 },
      ], { duration: 800, iterations: Infinity, easing: "cubic-bezier(0.4, 0, 0.2, 1)" });
    }
    frame.src = card.dataset.previewUrl! + "&enablejsapi=1&origin=" + encodeURIComponent(location.origin);
    media.append(frame);
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
          animation?.cancel();
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
