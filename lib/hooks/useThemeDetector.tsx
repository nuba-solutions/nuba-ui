import { useState, useEffect } from 'react'

const useThemeDetector = () => {
    const getCurrentTheme = () => typeof window !== 'undefined' ?? window.matchMedia("(prefers-color-scheme: dark)").matches;

    const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());

    const mqListener = ((e: any) => {
        setIsDarkTheme(e.matches);
    });

    useEffect(() => {
        if(typeof window !== 'undefined') {
          const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

          darkThemeMq.addEventListener('change', mqListener);

          return () => darkThemeMq.removeEventListener('change', mqListener);
        }
    }, []);

    return isDarkTheme;
}

export default useThemeDetector