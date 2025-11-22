import {Theme} from "./ThemeContext";

export const defaultTheme: Theme = {
    colors: {
        background: {
            primaryColor: 'hsl(0, 0%, 95%)',
            secondaryColor: 'hsl(0, 0%, 90%)',
            tertiaryColor: 'hsl(0, 0%, 88%)'
        },
        font: {
            primaryColor: 'hsl(0, 0%, 15%)',
            secondaryColor: 'hsl(0, 0%, 20%)',
            tertiaryColor: 'hsl(0, 0%, 25%)'
        },
        accent: {
            primaryColor: 'hsl(30, 100%, 44%)',
            secondaryColor: 'hsl(30, 100%, 52%)',
            tertiaryColor: 'hsl(30, 100%, 60%)'
        },
        shadow: {
            primaryColor: 'hsl(0, 0%, 95%)',
            secondaryColor: 'hsl(0, 0%, 95%)',
            tertiaryColor: 'hsl(0, 0%, 95%)'
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
    typography: {
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            md: '1rem',
            lg: '1.125rem',
            xl: '1.25rem'
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
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px'
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