import { AuthContextProvider } from '@/contexts/AuthContext'
import { PageHeaderContextProvider } from '@/contexts/PageHeaderContext'
import ProtectedRoute from '@/components/ProtectedRoutes/ProtectedRoute'

export default function RootLayout({children}: {children: React.ReactNode}) {

	return (
		<AuthContextProvider>
			<PageHeaderContextProvider>
				<ProtectedRoute>
					{children}
				</ProtectedRoute>
			</PageHeaderContextProvider>
		</AuthContextProvider>
  	)
}
