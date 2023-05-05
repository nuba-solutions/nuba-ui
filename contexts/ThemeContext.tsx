"use client"

import useThemeDetector from "@/lib/hooks/useThemeDetector";
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<any>({})

export const useTheme = () => useContext(ThemeContext)

export const ThemeContextProvider = ({children} : {children: React.ReactNode}) => {
    const localStorage = typeof window !== 'undefined' ? window.localStorage : null
    const isDarkTheme = useThemeDetector();
    const [systemTheme, setSystemTheme] = useState<any>(isDarkTheme ? 'dark' : '')
    const [theme, setTheme] = useState<any>(localStorage?.getItem('theme'))

    const handleThemeStorage = () => {
        if (localStorage && !('theme' in localStorage)) {
            localStorage?.setItem('theme', systemTheme)
        } else {
            localStorage?.setItem('theme', theme)
        }
        setTheme(localStorage?.getItem('theme'))

        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    useEffect(() => {
        handleThemeStorage()
    }, [theme])

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}