"use client"
import { Button } from '@/components/ui/button'
import useLogout from '@/utils/hooks/useLogout'
import React from 'react'

export default function ProfilePage() {
  const { logOut } = useLogout()
  return (
    <div>
      <Button onClick={logOut}>Logout</Button>
    </div>
  )
}
