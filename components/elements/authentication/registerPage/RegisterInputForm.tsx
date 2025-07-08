import { UserAuthentication } from '@/types/authPayloadType'
import { FormInputData } from '@/types/formInputType'
import useRegister from '@/utils/hooks/useRegister'
import React, { useState } from 'react'
import AuthForm from '../AuthForm'
import AuthFormFooter from '../AuthFormFooter'
import AuthHeader from '../AuthHeader'
import AuthPageItemContainer from '../AuthPageItemContainer'

export interface RegistrationInput extends UserAuthentication {
    confirmPassword: string
}

export default function RegisterInputForm() {
    const { signUp } = useRegister()
    const [userRegisterData, setUserRegisterData] = useState<RegistrationInput>({ email: "", password: "", confirmPassword: "" })
    const registerInputData: FormInputData[] = [
        {
            id: 1,
            name: "email",
            value: userRegisterData.email,
            label: "Email",
            type: "email",
            placeholder: "Email kamu",
            alt: "Masukkan alamat email yang valid"
        },
        {
            id: 2,
            name: "password",
            value: userRegisterData.password,
            label: "Kata sandi",
            placeholder: "Buat kata sandi",
            alt: "Kata sandi minimal 8 karakter",
            type: "password"
        },
        {
            id: 3,
            name: "confirmPassword",
            value: userRegisterData.confirmPassword,
            label: "Ulangi Kata sandi",
            placeholder: "Konfirmasi kata sandi",
            alt: "Masukkan kata sandi sebelumnya",
            type: "password"
        }
    ]

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setUserRegisterData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <AuthPageItemContainer className='flex-col w-full xl:w-2/5 h-auto md:h-1/3 lg:h-full'>
            <AuthHeader
                subText='Buat akun baru dengan email dan kata sandi kamu'
            />
            <AuthForm
                handleSubmit={(e) => signUp(e, userRegisterData)}
                inputData={registerInputData}
                handleChangeInputData={(e) => handleOnChange(e)}
            >
                <AuthFormFooter
                    buttonText='Daftar'
                    redirectText='Sudah memiliki akun?'
                    redirectTriggerText='Masuk ke akun'
                    redirectUrl='/login'
                />
            </AuthForm>
        </AuthPageItemContainer >
    )
}
