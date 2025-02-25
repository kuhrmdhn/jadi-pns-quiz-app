import { ReactNode } from 'react'
import { Button, ButtonProps } from './button'

type Props = ButtonProps & {
    className?: string
    icon: ReactNode
    children: ReactNode
}

function ButtonIconAnimation({ className, icon, children, ...props }: Props) {
    return (
        <Button
            {...props}
            className={`group/icon ${className}`}
        >
            <span className='translate-x-2 group-hover/icon:translate-x-0 duration-300'>
                {children}
            </span>
            <span className='opacity-0 -translate-x-[110%] group-hover/icon:opacity-100 group-hover/icon:-translate-x-1 duration-300'>
                {icon}
            </span>
        </Button>
    )
}

export { ButtonIconAnimation }

