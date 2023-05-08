import { AuthContextProvider } from '@/contexts/AuthContext'
import './globals.css'
import { Poppins } from 'next/font/google'
import { ThemeContextProvider } from '@/contexts/ThemeContext'

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
				<body className={`${poppins.className} bg-slate-100 dark:bg-gray-900 text-slate-600 dark:text-slate-200 min-h-full`}>
					<AuthContextProvider>
						{children}
					</AuthContextProvider>
				</body>
			</html>
		</ThemeContextProvider>
  	)
}
