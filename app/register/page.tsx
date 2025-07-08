"use client"
import AuthLoadingOverlay from '@/components/elements/authentication/AuthLoadingOverlay'
import AuthPageContainer from '@/components/elements/authentication/AuthPageContainer'
import AuthPageItemContainer from '@/components/elements/authentication/AuthPageItemContainer'
import RegisterInputForm from '@/components/elements/authentication/registerPage/RegisterInputForm'
import RegisterImage from '@/components/elements/icons/RegisterImage'
import useRegister from '@/utils/hooks/useRegister'

export default function RegisterPage() {
  const { loading } = useRegister()

  return (
    <AuthPageContainer className='sm:!flex-col xl:!flex-row'>
      <AuthPageItemContainer className='hidden sm:flex justify-center md:w-full lg:w-3/5 h-1/3 lg:h-full'>
        <div className='sm:size-3/5 lg:size-1/2'>
          <RegisterImage />
        </div>
      </AuthPageItemContainer>
      <RegisterInputForm />
      {
        loading && <AuthLoadingOverlay message='Mendaftarkan Akun' />
      }
    </AuthPageContainer>
  )
}