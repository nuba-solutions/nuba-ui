import RectButton from '@/components/Buttons/RectButton'
import Image from 'next/image'
import { IoRocket } from 'react-icons/io5'

export default function Home() {
	return (
		<main className="flex min-h-screen w-full flex-col items-center justify-center text-center
						bg-space-galaxy bg-center bg-cover bg-no-repeat bg-slate-600 bg-blend-multiply">
			<div className='flex mx-auto order-2 py-5 lg:py-0 lg:absolute lg:right-10 lg:top-10'>
				<RectButton visual='outline' classes='rounded-md hover:shadow-center-xl hover:shadow-slate-600 hover:bg-slate-300 hover:text-slate-950' variant='light' link='/login'>
					Get Started
					<IoRocket/>
				</RectButton>
			</div>
			<div className="relative flex flex-col place-items-center px-5 lg:order-2">
				<Image
					className="relative lg:w-[350px]"
					src="/logos/nuba-ui-logo-mixed.svg"
					alt="Nuba UI Logo"
					width={200}
					height={37}
					priority
				/>
				<h1 className='my-5 text-slate-400 lg:text-lg'>
					<span>Hello stranger👋 <strong>Welcome to Nuba UI</strong>.</span><br/>
					A Project to help Devs 🧑🏻‍💻 hit the ground running! 🏃🏻‍♂️
				</h1>
			</div>
		</main>
	)
}
