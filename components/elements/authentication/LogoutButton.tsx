"use client"
import useLogout from '@/utils/hooks/useLogout'
import React from 'react'

export default function LogoutButton() {
    const { logOut } = useLogout()

  return (
    <>
      <button onClick={logOut} className="btn-primary btn">Keluar</button>
    </>
  )
}

