import Logo from '../navbar/Logo'

type Props = {
    subText: string
}

export default function AuthHeader({ subText }: Props) {
    return (
        <header className="w-full h-1/6 lg:h-1/5 flex flex-col justify-center items-center">
            <Logo className="text-4xl" />
            <p className='font-light text-xs sm:text-sm'>{subText}</p>
        </header>
    )
}
