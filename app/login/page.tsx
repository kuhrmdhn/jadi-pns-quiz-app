"use client"
import Link from 'next/link'
import AuthForm from '@/components/elements/authentication/AuthForm'
import AuthHeader from '@/components/elements/authentication/AuthHeader'
import AuthPageContainer from '@/components/elements/authentication/AuthPageContainer'
import AuthPageItemContainer from '@/components/elements/authentication/AuthPageItemContainer'
import LoginImage from '@/components/elements/icons/LoginImage'
import useLogin from '@/utils/hooks/useLogin'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const { signIn, loading, handleOnChange, loginInputData } = useLogin()
  return (
    <AuthPageContainer>
      <AuthPageItemContainer className='flex-col w-5/6 sm:w-1/2 xl:w-2/5 h-auto md:h-1/3 lg:h-full gap-4'>
        <AuthHeader
          subText='Masukkan Email dan Kata sandi Anda'
        />
        <AuthForm
          handleSubmit={(e) => signIn(e)}
          inputData={loginInputData}
          handleChangeInputData={(e) => handleOnChange(e)}
        >
          <div className='flex gap-4 mt-4'>
            <Button
              type='submit'
            >
              Masuk
            </Button>
            <Link
              href="/register"
            >
              <Button
                variant="outline"
              >
                Daftar
              </Button>
            </Link>
          </div>
        </AuthForm>
      </AuthPageItemContainer>
      <AuthPageItemContainer className='hidden md:flex md:w-full lg:w-3/5 h-1/3 md:h-1/3 lg:h-full bg-gray-100'>
        <div className='sm:size-1/3 lg:size-1/2 flex items-center'>
          <LoginImage />
        </div>
      </AuthPageItemContainer>
      {
        loading && <LoginLoading />
      }
    </AuthPageContainer>
  )
}


function LoginLoading() {
  return (
    <div className='w-full h-[100dvh] text-xl text-primary backdrop-blur-xs flex justify-center items-center fixed top-0 z-[999999]'>
      <p className='inline-flex justify-end items-end gap-1'>Tunggu sebentar
        <span className='loading-dots loading'></span>
      </p>
    </div>
  )
}