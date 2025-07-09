"use client"
import AuthPageContainer from '@/components/elements/authentication/AuthPageContainer'
import AuthPageItemContainer from '@/components/elements/authentication/AuthPageItemContainer'
import LoginInputForm from '@/components/elements/authentication/loginPage/LoginInputForm'
import LoginImage from '@/components/elements/icons/LoginImage'

export default function LoginPage() {
  return (
    <AuthPageContainer>
      <LoginInputForm />
      <AuthPageItemContainer className='hidden sm:flex justify-center md:w-full lg:w-3/5 h-1/3 lg:h-full'>
        <div className='sm:size-2/5 lg:size-1/2'>
          <LoginImage />
        </div>
      </AuthPageItemContainer>
    </AuthPageContainer>
  )
}