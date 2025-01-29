import { FormInputData } from '@/app/types/formInputType'
import React from 'react'

type Props = {
    inputData: FormInputData[]
    children: React.ReactNode
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    handleChangeInputData: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function AuthForm({ inputData, children, handleSubmit, handleChangeInputData }: Props) {
    return (
        <form onSubmit={(e) => handleSubmit(e)} className='w-full lg:w-3/4 flex flex-col gap-3 text-accent'>
            {
                inputData.map((input) => (
                    <label key={input.id} className='form-control' htmlFor={`${input.name}-input`}>
                        <div className='label'>
                            <span className='label-text text-md font-semibold'>
                                {input.label}
                            </span>
                        </div>
                        <input
                            className='input input-bordered input-primary'
                            id={`${input.name}-input`}
                            value={input.value}
                            name={input.name}
                            onChange={(e) => handleChangeInputData(e)}
                            placeholder={input.placeholder}
                            type={input.type}
                            required
                        />
                        <div className='label'>
                            <span className='label-text-alt text-xs'>
                                {input.alt}
                            </span>
                        </div>
                    </label>
                ))
            }
            <div>
                {children}
            </div>
        </form>
    )
}
