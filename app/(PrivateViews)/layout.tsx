"use client"

import { AuthContextProvider } from '@/contexts/AuthContext'
import { PageHeaderContextProvider } from '@/contexts/PageHeaderContext'
import ProtectedRoute from '@/components/ProtectedRoutes/ProtectedRoute'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RootLayout({children}: {children: React.ReactNode}) {

	return (
		<AuthContextProvider>
			<PageHeaderContextProvider>
				<ProtectedRoute>
					<QueryClientProvider client={queryClient}>
						{children}
					</QueryClientProvider>
				</ProtectedRoute>
			</PageHeaderContextProvider>
		</AuthContextProvider>
  	)
}
