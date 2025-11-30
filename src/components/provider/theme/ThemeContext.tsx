import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {defaultTheme} from "./themes";
import {themeToCSSVariables} from "./themeToCSSVariables";

type Theme = {
    colors: {
        background: {
            primaryColor: string
            secondaryColor: string
            tertiaryColor: string
        }
        font: {
            primaryColor: string
            secondaryColor: string
            tertiaryColor: string
        }
        accent: {
            primaryColor: string
            secondaryColor: string
            tertiaryColor: string
        }
        shadow: {
            primaryColor: string
            secondaryColor: string
            tertiaryColor: string
        }
        border: {
            primaryColor: string
            secondaryColor: string
            tertiaryColor: string
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
        sm: string
        md: string
        lg: string
        xl: string
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