"use client"
import AuthPageContainer from '@/components/elements/authentication/AuthPageContainer'
import AuthPageItemContainer from '@/components/elements/authentication/AuthPageItemContainer'
import RegisterInputForm from '@/components/elements/authentication/registerPage/RegisterInputForm'
import RegisterImage from '@/components/elements/icons/RegisterImage'

export default function RegisterPage() {
  return (
    <AuthPageContainer className='sm:!flex-col xl:!flex-row'>
      <AuthPageItemContainer className='hidden sm:flex justify-center md:w-full lg:w-3/5 h-1/3 lg:h-full'>
        <div className='sm:size-3/5 lg:size-1/2'>
          <RegisterImage />
        </div>
      </AuthPageItemContainer>
      <RegisterInputForm />
    </AuthPageContainer>
  )
}