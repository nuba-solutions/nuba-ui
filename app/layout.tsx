import { AuthContextProvider } from '@/contexts/AuthContext'
import './globals.css'
import { Poppins } from 'next/font/google'
import { ThemeContextProvider } from '@/contexts/ThemeContext'
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({ subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata = {
  title: 'Nuba UI',
  description: 'A project to help developers hit the ground running!',
}

export default function RootLayout({children}: {children: React.ReactNode}) {

	return (
		<ThemeContextProvider>
			<html lang="en">
				<body className={`${poppins.className} bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-200 h-full`}>
					<AuthContextProvider>
						{children}
					</AuthContextProvider>
					<Toaster />
				</body>
			</html>
		</ThemeContextProvider>
  	)
}
