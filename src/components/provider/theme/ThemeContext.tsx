import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {defaultTheme} from "./themes";
import {themeToCSSVariables} from "./themeToCSSVariables";

type Theme = {
    colors: {
        neutral: {
            0: string
            50: string
            100: string
            200: string
            500: string
            700: string
            800: string
            900: string
        },
        accent: {
            100: string
            300: string
            400: string
            500: string
            600: string
        },
        background: {
            primary: string
            secondary: string
            tertiary: string
        }
        text: {
            primary: string
            secondary: string
            tertiary: string
        }
        action: {
            primary: string
            primaryHover: string
            inverse: string
        },
        interaction: {
            highlight: string
            highlightSoft: string
            highlightMuted: string
        }
        border: {
            subtle: string
            strong: string
            inverse: string
        }
        status: {
            success: string
            warning: string
            danger: string
        }
    }
    typography: {
        fontFamily: string
        fontSize: {
            xs: string
            sm: string
            md: string
            lg: string
            xl: string
            xxl: string
        }
        letterSpacing: {
            cta: string
            para: string
            header: string
        }
        lineHeight: {
            cta: string
            para: string
            header: string
        }
    }
    spacing: {
        xs: string
        sm: string
        md: string
        lg: string
        xl: string
        xxl: string
    }
    radius: {
        sm: string
        md: string
        lg: string
        round: string
    }
    motion: {
        duration: {
            fast: string
            normal: string
            slow: string
        }
        easing: string
    }
    zIndex: {
        zero: number
        low: number
        mid: number
        heigh: number
        full: number
    }
    shadow: {
        card: {
            base: string
            hover: string
        },
        cta: {
            base: string
            hover: string
            active: string
        }
    }
    style: 'morphism' | 'classic'
}

type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

interface ThemeProviderProps {
    theme?: Theme
    children: ReactNode
}

// @ts-ignore
const ThemeContext = createContext<ThemeContextType>()


const ThemeProvider = ({ theme, children }: ThemeProviderProps) => {
    const [themeState, setThemeState] = useState<Theme>(theme ?? defaultTheme)
    const setTheme = (theme: Theme) => {
        setThemeState(theme)
    }

    useEffect(() => {
        const vars = themeToCSSVariables(themeState)
        const root = document.documentElement
        for (const [key, value] of Object.entries(vars)) {
            root.style.setProperty(key, value)
        }
    }, [themeState])

    return (
        <ThemeContext.Provider value={{theme: themeState, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

const useTheme = () => {
    return useContext(ThemeContext) ?? {
        theme: defaultTheme,
        setTheme: (_) => {}
    }
}

export { ThemeProvider, Theme, ComponentSize, useTheme }