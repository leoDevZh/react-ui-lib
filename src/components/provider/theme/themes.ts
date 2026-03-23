import {Theme} from "./ThemeContext";

export const defaultTheme: Theme = {
    colors: {
        background: {
            primaryColor: 'hsl(0, 0%, 95%)',
            secondaryColor: 'hsl(0, 0%, 92%)',
            tertiaryColor: 'hsl(0, 0%, 90%)'
        },
        font: {
            primaryColor: 'hsl(0, 0%, 15%)',
            secondaryColor: 'hsl(0, 0%, 28%)',
            tertiaryColor: 'hsl(0, 0%, 35%)'
        },
        accent: {
            primaryColor: 'hsl(30, 100%, 44%)',
            secondaryColor: 'hsl(30, 100%, 52%)',
            tertiaryColor: 'hsl(30, 100%, 60%)'
        },
        shadow: {
            primaryColor: 'hsla(0, 0%, 0%, 0.06)',
            secondaryColor: 'hsla(0, 0%, 0%, 0.09)',
            tertiaryColor: 'hsla(0, 0%, 0%, 0.12)'
        },
        border: {
            primaryColor: 'hsl(0, 0%, 90%)',
            secondaryColor: 'hsl(0, 0%, 85%)',
            tertiaryColor: 'hsl(255, 0%, 15%)'
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
                0 4px 8px hsla(0, 0% 0%, 0.08)
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