import useLogin from '@/utils/hooks/useLogin'
import { LoginData } from '@/utils/schema/authSchema'
import React, { useState } from 'react'
import AuthForm, { FormInputData } from '../AuthForm'
import AuthFormFooter from '../AuthFormFooter'
import AuthHeader from '../AuthHeader'
import AuthPageItemContainer from '../AuthPageItemContainer'
import AuthLoadingOverlay from '../AuthLoadingOverlay'

export default function LoginInputForm() {
    const { signIn, loading } = useLogin()
    const [loginInput, setLoginInput] = useState<LoginData>({ email: "", password: "" })
    const loginInputData: FormInputData[] = [
        {
            id: 1,
            name: "email",
            label: "Nama Pengguna",
            placeholder: "Nama email kamu",
            value: loginInput.email,
        },
        {
            id: 2,
            name: "password",
            label: "Kata Sandi",
            placeholder: "Kata sandi Kamu",
            value: loginInput.password,
            type: "password"
        }
    ]

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setLoginInput((previous) => ({
            ...previous,
            [name]: value
        }))
    }

    return (
        <>
            <AuthPageItemContainer className='flex-col w-full xl:w-2/5 h-auto md:h-1/3 lg:h-full'>
                <AuthHeader
                    subText='Masukkan Email dan Kata sandi Anda'
                />
                <AuthForm
                    handleSubmit={(e) => signIn(e, loginInput)}
                    inputData={loginInputData}
                    handleChangeInputData={(e) => handleOnChange(e)}
                >
                    <AuthFormFooter
                        buttonText='Masuk'
                        redirectText='Belum memiliki akun?'
                        redirectTriggerText='Daftarkan akun'
                        redirectUrl='/register'
                    />
                </AuthForm>
            </AuthPageItemContainer>
            {
                loading && <AuthLoadingOverlay message='Tunggu Sebentar...' />
            }
        </>
    )
}
