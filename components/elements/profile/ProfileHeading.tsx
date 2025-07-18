import React from 'react'
import UserAvatar from './UserAvatar'
import { useUserStore } from '@/utils/store/useUserStore'
import ProfileOptions from './ProfileOptions'

export default function ProfileHeading() {
    const { userData } = useUserStore()

    return (
        <div className="h-[20dvh] w-full flex items-center justify-center gap-10">
            <UserAvatar username={userData?.username || ""} />
            <section className="flex gap-5">
                <div className='flex flex-col gap-5'>
                    <h1>{userData?.username}</h1>
                    <p>{userData?.name}</p>
                </div>
                <div>
                    <ProfileOptions />
                </div>
            </section>
        </div>
    )
}
