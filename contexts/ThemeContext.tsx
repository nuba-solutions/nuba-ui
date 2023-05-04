"use client"

import useThemeDetector from "@/lib/hooks/useThemeDetector";
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<any>({})

export const useTheme = () => useContext(ThemeContext)

export const ThemeContextProvider = ({children} : {children: React.ReactNode}) => {
    const isDarkTheme = useThemeDetector();
    const [theme, setTheme] = useState<any>(isDarkTheme ? 'dark' : 'light')

    const handleThemeStorage = () => {
        localStorage.removeItem('theme')
        localStorage.setItem('theme', theme)
        setTheme(localStorage.getItem('theme'))
    }

    useEffect(() => {
        handleThemeStorage()
    }, [theme])

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
    localStorage.theme = 'light'
    localStorage.theme = 'dark'
    localStorage.removeItem('theme')

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}