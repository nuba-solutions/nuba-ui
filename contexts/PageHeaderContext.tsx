"use client"

import React, { createContext, useContext, useEffect, useState } from "react";

const PageHeaderContext = createContext<any>({})

export const usePageHeader = () => useContext(PageHeaderContext)

export const PageHeaderContextProvider = ({children} : {children: React.ReactNode}) => {
    const localStorage = typeof window !== 'undefined' ? window.localStorage : null

    type PageHeader = {
        title: string,
        sub: string
    }

    const [pageHeader, setPageHeader] = useState<PageHeader>(JSON.parse(localStorage?.getItem('pageHeader') || '{}'))

    const handleSetPageHeader = () => {
        if (localStorage && !('pageHeader' in localStorage)) {
            localStorage.setItem('pageHeader', JSON.stringify({
                title: 'Dashboard',
                sub: 'Welcome to Nuba UI'
            }))
        }

        let storageHeader: PageHeader = JSON.parse(localStorage?.getItem('pageHeader') || '{}')

        if (!(pageHeader.title && pageHeader.sub)) {
            setPageHeader({
                title: storageHeader.title,
                sub: storageHeader.sub,
            })
        }

        localStorage?.setItem('pageHeader', JSON.stringify(pageHeader))
    }

    useEffect(() => {
        handleSetPageHeader()
    }, [pageHeader])

    return (
        <PageHeaderContext.Provider value={{pageHeader, setPageHeader}}>
            {children}
        </PageHeaderContext.Provider>
    )
}