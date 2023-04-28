import { AuthContextProvider } from '@/contexts/AuthContext'

export default function RootLayout({children}: {children: React.ReactNode}) {

	return (
		<AuthContextProvider>
			{children}
		</AuthContextProvider>
  	)
}
