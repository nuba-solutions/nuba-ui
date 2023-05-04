import { AuthContextProvider } from '@/contexts/AuthContext'
import { ThemeContextProvider } from '@/contexts/ThemeContext'
import ProtectedRoute from '@/components/ProtectedRoutes/ProtectedRoute'

export default function RootLayout({children}: {children: React.ReactNode}) {

	return (
		<ThemeContextProvider>
			<AuthContextProvider>
				<ProtectedRoute>
					{children}
				</ProtectedRoute>
			</AuthContextProvider>
		</ThemeContextProvider>
  	)
}
