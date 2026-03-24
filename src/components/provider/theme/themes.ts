import {Theme} from "./ThemeContext";

export const defaultTheme: Theme = {
    colors: {
        neutral: {
            //bg
            0: 'hsl(0, 0%, 98%)',
            50: 'hsl(0, 0%, 95%)',
            100: 'hsl(0, 0%, 92%)',
            //none bg
            200: 'hsl(0, 0%, 90%)',
            500: 'hsl(0, 0%, 85%)',
            700: 'hsl(0, 0%, 35%)',
            800: 'hsl(0, 0%, 28%)',
            900: 'hsl(0, 0%, 15%)'
        },
        accent: {
            100: 'hsl(30, 100%, 90%)',
            300: 'hsl(30, 100%, 70%)',
            400: 'hsl(30, 100%, 60%)',
            500: 'hsl(30, 100%, 52%)',
            600: 'hsl(30, 100%, 44%)'
        },
        background: {
            primary: 'var(--colors-neutral-0)',
            secondary: 'var(--colors-neutral-50)',
            tertiary: 'var(--colors-neutral-100)'
        },
        text: {
            primary: 'var(--colors-neutral-900)',
            secondary: 'var(--colors-neutral-800)',
            tertiary: 'var(--colors-neutral-700)'
        },
        action: {
            primary: 'var(--colors-accent-500)',
            primaryHover: 'var(--colors-accent-600)',
            inverse: 'var(--colors-accent-100)'
        },
        interaction: {
            highlight: 'var(--colors-accent-500)',
            highlightSoft: 'var(--colors-accent-400)',
            highlightMuted: 'var(--colors-accent-100)'
        },
        border: {
            subtle: 'var(--colors-neutral-200)',
            strong: 'var(--colors-neutral-500)',
            inverse: 'var(--colors-neutral-0)'
        },
        status: {
            success: 'hsl(125, 73%, 42%)',
            warning: 'hsl(43, 100%, 70%)',
            danger: 'hsl(0, 100%, 50%)'
        }
    },
    shadow: {
        card: {
            base: `
                0 1px 2px hsla(0, 0%, 0%, 0.06),
                0 4px 8px hsla(0, 0%, 0%, 0.08)
            `,
            hover: `
                0 2px 4px hsla(0, 0%, 0%, 0.08),
                0 8px 16px hsla(0, 0%, 0%, 0.12)
            `
        },
        cta: {
            base: `
                0 1px 2px hsla(0, 0%, 0%, 0.06),
                0 3px 6px hsla(0, 0%, 0%, 0.08)
            `,
            hover: `
                0 2px 4px hsla(0, 0%, 0%, 0.08),
                0 5px 10px hsla(0, 0%, 0%, 0.10)
            `,
            active: `
                0 1px 2px hsla(0, 0%, 0%, 0.05),
                0 2px 4px hsla(0, 0%, 0%, 0.06)
            `
        }
    },
    typography: {
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            md: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            xxl: '2rem'
        },
        letterSpacing: {
            para: '0px',
            cta: '1px',
            header: '-1px'
        },
        lineHeight: {
            cta: '1.2',
            para: '1.5',
            header: '-1'
        }
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '32px',
        xl: '64px',
        xxl: '128px'
    },
    radius: {
        sm: '2px',
        md: '6px',
        lg: '12px',
        round: '50%'
    },
    zIndex: {
        zero: 0,
        low: 2,
        mid: 4,
        heigh: 8,
        full: 16
    },
    motion: {
        duration: {
            fast: '100ms',
            normal: '200ms',
            slow: '400ms'
        },
        easing: 'linear'
    },
    style: 'classic'
}