"use client"
import Link from 'next/link'
import AuthForm from '../components/elements/authentication/AuthForm'
import AuthHeader from '../components/elements/authentication/AuthHeader'
import AuthPageContainer from '../components/elements/authentication/AuthPageContainer'
import AuthPageItemContainer from '../components/elements/authentication/AuthPageItemContainer'
import LoginImage from '../components/elements/icons/LoginImage'
import useLogin from '../utils/hooks/useLogin'

export default function LoginPage() {
  const { signIn, loading, handleOnChange, loginInputData } = useLogin()
  return (
    <AuthPageContainer>
      <AuthPageItemContainer className='flex-col w-5/6 sm:w-1/2 xl:w-1/2 sm:h-1/3 lg:h-full animate-slide-right relative -left-full'>
        <AuthHeader
          subText='Masukkan Nama Pengguna dan Kata sandi Anda'
        />
        <AuthForm
          handleSubmit={(e) => signIn(e)}
          inputData={loginInputData}
          handleChangeInputData={(e) => handleOnChange(e)}
        >
          <div className='flex gap-4 mt-4'>
            <button
              className='btn btn-primary !text-white shadow-lg shadow-primary'
              type='submit'
            >
              Masuk
            </button>
            <Link
              className='btn btn-primary btn-outline !text-primary hover:!bg-transparent shadow-primary shadow-lg'
              href="/register"
            >
              Daftar
            </Link>
          </div>
        </AuthForm>
      </AuthPageItemContainer>
      <AuthPageItemContainer className='hidden lg:flex w-full lg:w-1/2 h-1/3 xl:h-full bg-gray-soft'>
        <div className='size-1/2 animate-slide-left relative -right-full'>
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