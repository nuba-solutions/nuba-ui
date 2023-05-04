import Image from 'next/image'
import React from 'react'

interface ProfileImageProps {
    image?: boolean,
    source?: string,
    name: string,
    size?: string,
    shadow?: boolean
}

const ProfileImage: React.FC<ProfileImageProps> = ({image, source, name, size, shadow}) => {
    let sizeClass: string = ''

    switch(size) {
        case 'sm':
            sizeClass = 'h-[25px] w-[25px]'
            break;
        case 'md':
            sizeClass = 'h-[35px] w-[35px]'
            break;
        case 'lg':
            sizeClass = 'h-[45px] w-[45px]'
            break;
        case 'xl':
            sizeClass = 'h-[55px] w-[55px] text-lg'
            break;
        case '2xl':
            sizeClass = 'h-[65px] w-[65px] text-2xl'
            break;
        default:
            sizeClass = 'h-[35px] w-[35px]'
            break;
    }

    const handleGetInitials = () => {
        if (!name) return

        let firstLetter = name.split(" ")[0].charAt(0)
        let secondLetter = name.split(" ")[1].charAt(0)

        return `${firstLetter}${secondLetter}`
    }

    return (
        <div className={`${sizeClass} overflow-clip rounded-full flex justify-center items-center outline outline-2 outline-slate-50 dark:outline-slate-700 ${shadow ? 'shadow-md' : ''}`}>
            {
                image? (
                    <Image src={source ? source : ''} alt={name} width={20} height={20} className='w-full h-full object-cover object-bottom' quality={100}/>
                ) : (
                    <div className='bg-primary-500 dark:bg-primary-300 h-full w-full flex justify-center items-center font-semibold leading-4 text-slate-100 dark:text-secondary-500'>
                        {handleGetInitials()}
                    </div>
                )
            }
        </div>
    )
}

export default ProfileImage