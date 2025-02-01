"use client"
import React from 'react'
import AuthPageItemContainer from '../components/elements/authentication/AuthPageItemContainer'
import AuthForm from '../components/elements/authentication/AuthForm'
import AuthHeader from '../components/elements/authentication/AuthHeader'
import AuthPageContainer from '../components/elements/authentication/AuthPageContainer'
import RegisterImage from '../components/elements/icons/RegisterImage'
import Link from 'next/link'
import useRegister from '../utils/hooks/useRegister'

export default function RegisterPage() {
  const { handleOnChange, loading, registerInputData, signUp } = useRegister()
  return (
    <AuthPageContainer>
      <AuthPageItemContainer className='hidden lg:flex w-full lg:w-1/2 h-1/3 xl:h-full bg-gray-soft'>
        <div className='size-1/2 animate-slide-right relative -left-full'>
          <RegisterImage />
        </div>
      </AuthPageItemContainer>
      <AuthPageItemContainer className='flex-col w-5/6 sm:w-1/2 xl:w-1/2 sm:h-1/3 lg:h-full animate-slide-left relative -right-full'>
        <AuthHeader
          subText='Buat akun baru dengan email dan kata sandi kamu'
        />
        <AuthForm
          handleSubmit={(e) => signUp(e)}
          inputData={registerInputData}
          handleChangeInputData={(e) => handleOnChange(e)}
        >
          <div className='flex gap-4 mt-4'>
            <button
              className='btn btn-primary shadow-lg shadow-primary'
              type='submit'
            >
              Daftar
            </button>
            <Link
              className='btn btn-primary btn-outline !text-primary hover:!bg-transparent shadow-primary shadow-lg'
              href="/login"
            >
              Masuk
            </Link>
          </div>
        </AuthForm>
      </AuthPageItemContainer>
      {
        loading && <RegisterLoading/>
      }
    </AuthPageContainer>
  )
}

function RegisterLoading() {
  return (
    <div className='w-full h-[100dvh] text-xl text-primary backdrop-blur-xs flex justify-center items-center fixed top-0 z-[999999]'>
      <p className='inline-flex justify-end items-end gap-1'>Mendaftarkan Akun Kamu
        <span className='loading-spinner loading'></span>
      </p>
    </div>
  )
}