import { AuthContextProvider } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoutes/ProtectedRoute'

export default function RootLayout({children}: {children: React.ReactNode}) {

	return (
		<AuthContextProvider>
			<ProtectedRoute>
				{children}
			</ProtectedRoute>
		</AuthContextProvider>
  	)
}
