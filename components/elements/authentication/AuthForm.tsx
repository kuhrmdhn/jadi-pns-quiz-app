import { Input } from '@/components/ui/input'
import React from 'react'

type FormInputData = {
    id: number
    label: string
    placeholder: string
    name: string
    value: string
    type?: string
    alt?: string
}

type Props = {
    inputData: FormInputData[]
    children: React.ReactNode
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    handleChangeInputData: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function AuthForm({ inputData, children, handleSubmit, handleChangeInputData }: Props) {
    return (
        <form onSubmit={(e) => handleSubmit(e)} className='w-full lg:w-3/4 flex flex-col gap-8'>
            {
                inputData.map((input) => (
                    <div key={input.id} className='relative'>
                        <Input
                            className='h-12'
                            id={`${input.name}-input`}
                            value={input.value}
                            name={input.name}
                            onChange={(e) => handleChangeInputData(e)}
                            placeholder={input.placeholder}
                            type={input.type}
                            required
                        />
                    </div>
                ))
            }
            <div>
                {children}
            </div>
        </form>
    )
}
