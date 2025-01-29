"use client"
import { useModalShow } from '@/app/utils/store/useModalStore'
import React from 'react'
import { useShallow } from 'zustand/shallow'

export default function ModalProvider() {
    const { modalDescription, modalTitle, modalChild } = useModalShow(useShallow((state) => ({
        modalDescription: state.modalDescription,
        modalTitle: state.modalTitle,
        modalChild: state.modalChild
    })))

    return (
        <dialog id="modal-1" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">
                    {modalTitle}
                </h3>
                <p className="py-4">
                    {modalDescription}
                </p>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        {modalChild}
                    </form>
                </div>
            </div>
        </dialog>
    )
}
