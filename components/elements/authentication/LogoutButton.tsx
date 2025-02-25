"use client"
import useLogout from '@/utils/hooks/useLogout'
import { useModalShow } from '@/utils/store/useModalStore'
import React from 'react'
import { useShallow } from 'zustand/shallow'

export default function LogoutButton() {
  const { showModal, setModalChild, setModalDescription, setModalTitle } = useModalShow(useShallow((state) => ({
    showModal: state.showModal,
    setModalChild: state.setModalChild,
    setModalTitle: state.setModalTitle,
    setModalDescription: state.setModalDescription
  })))
  function handleLogout() {
    setModalTitle("Logout")
    setModalDescription("Kamu yakin ingin keluar?")
    setModalChild(<AcceptLogoutButton />)
    showModal()
  }

  return (
    <>
      <button onClick={handleLogout} className="btn-primary btn">Keluar</button>
    </>
  )
}



function AcceptLogoutButton() {
  const { logOut } = useLogout()
  return (
    <button className="btn" onClick={logOut}>Ya, Keluar Sekarang</button>
  )
}
