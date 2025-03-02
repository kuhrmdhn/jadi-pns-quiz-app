"use client"
import React from 'react'
import AuthPageItemContainer from '@/components/elements/authentication/AuthPageItemContainer'
import AuthForm from '@/components/elements/authentication/AuthForm'
import AuthHeader from '@/components/elements/authentication/AuthHeader'
import AuthPageContainer from '@/components/elements/authentication/AuthPageContainer'
import RegisterImage from '@/components/elements/icons/RegisterImage'
import Link from 'next/link'
import useRegister from '@/utils/hooks/useRegister'
import { Button } from '@/components/ui/button'

export default function RegisterPage() {
  const { handleOnChange, loading, registerInputData, signUp } = useRegister()
  return (
    <AuthPageContainer>
      <AuthPageItemContainer className='hidden lg:flex w-full lg:w-1/2 h-1/3 xl:h-full bg-gray-100'>
        <div className='size-1/2 flex items-center'>
          <RegisterImage />
        </div>
      </AuthPageItemContainer>
      <AuthPageItemContainer className='flex-col w-5/6 sm:w-3/5 xl:w-2/5 h-auto md:h-1/3 lg:h-full gap-4'>
        <AuthHeader
          subText='Buat akun baru dengan email dan kata sandi kamu'
        />
        <AuthForm
          handleSubmit={(e) => signUp(e)}
          inputData={registerInputData}
          handleChangeInputData={(e) => handleOnChange(e)}
        >
          <div className='flex gap-4 mt-4'>
            <Button type='submit'>
              Daftar
            </Button>
            <Link href="/login" >
              <Button variant={"outline"}>
                Masuk
              </Button>
            </Link>
          </div>
        </AuthForm>
      </AuthPageItemContainer>
      {
        loading && <RegisterLoading />
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