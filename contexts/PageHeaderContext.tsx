"use client"

import React, { createContext, useContext, useEffect, useState } from "react";

const PageHeaderContext = createContext<any>({})

export const usePageHeader = () => useContext(PageHeaderContext)

export const PageHeaderContextProvider = ({children} : {children: React.ReactNode}) => {
    type PageHeader = {
        title: string,
        sub: string
    }

    const [pageHeader, setPageHeader] = useState<PageHeader>({
        title: 'Dashboard',
        sub: 'Welcome to Nuba UI'
    })

    return (
        <PageHeaderContext.Provider value={{pageHeader, setPageHeader}}>
            {children}
        </PageHeaderContext.Provider>
    )
}