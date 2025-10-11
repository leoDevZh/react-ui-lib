import { defaultTheme } from "./themes";
import { themeToCSSVariables } from "./themeToCSSVariables";

function applyThemeToCSS(theme: any) {
    if (typeof document === "undefined") return; // SSR-safe
    const root = document.documentElement
    const vars = themeToCSSVariables(theme)
    for (const [key, value] of Object.entries(vars)) {
        root.style.setProperty(key, value)
    }
}

// Immediately apply default theme on import
applyThemeToCSS(defaultTheme)
