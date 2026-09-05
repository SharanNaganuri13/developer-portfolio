/** Browser chrome colors, kept in lockstep with `--bg` in globals.css. */
export const THEME_COLOR = {
  dark: "#08090b",
  light: "#f6f2ec",
} as const;

export function applyThemeColor(theme: "dark" | "light"): void {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", THEME_COLOR[theme]);
  }
}
