"use client"
import ProfileHeading from '@/components/elements/profile/ProfileHeading'
import ProfileTabs from '@/components/elements/profile/ProfileTabs'

export default function ProfilePage() {
  return (
    <div className='min-h-dvh'>
      <ProfileHeading />
      <ProfileTabs />
    </div>
  )
}
