import { AuthContextProvider } from '@/contexts/AuthContext'
import { ThemeContextProvider } from '@/contexts/ThemeContext'

export default function RootLayout({children}: {children: React.ReactNode}) {

	return (
		<ThemeContextProvider>
			<AuthContextProvider>
				{children}
			</AuthContextProvider>
		</ThemeContextProvider>
  	)
}
