export const iconPaths = {
  northeast: "M5 19 19 5M5 5h14v14",
  down: "M12 4v16m-7-7 7 7 7-7",
  left: "M20 12H4m7-7-7 7 7 7",
  right: "M4 12h16m-7-7 7 7-7 7",
  play: "m8 5 11 7-11 7Z",
  pause: "M8 5v14M16 5v14",
  expand: "M8 3H3v5m0-5 7 7m6 11h5v-5m0 5-7-7",
} as const;

export type IconName = keyof typeof iconPaths;

export function iconMarkup(name: IconName) {
  return `<svg class="ui-icon" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="${iconPaths[name]}" /></svg>`;
}

export function setIconLabel(button: HTMLElement, label: string, name: IconName) {
  button.textContent = label + " ";
  button.insertAdjacentHTML("beforeend", iconMarkup(name));
}
