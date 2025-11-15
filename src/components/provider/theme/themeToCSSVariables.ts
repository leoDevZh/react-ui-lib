import { Theme } from "./ThemeContext"

export function themeToCSSVariables(theme: Theme): Record<string, string> {
    const vars: Record<string, string> = {};

    const flatten = (obj: any, prefix = '') => {
        for (const [key, value] of Object.entries(obj)) {
            const newKey = prefix ? `${prefix}-${key}` : key;
            if (typeof value === 'object' && value !== null) {
                flatten(value, newKey);
            } else {
                vars[`--${newKey}`] = String(value);
            }
        }
    };

    flatten(theme);
    return vars;
}
