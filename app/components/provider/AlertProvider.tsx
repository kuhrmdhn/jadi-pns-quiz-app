"use client"
import { useAlertStore } from '@/app/utils/store/useAlertStore'
import React from 'react'
import { useShallow } from "zustand/shallow"

export default function AlertProvider() {
    const { variant, isShowAlert, icon, message } = useAlertStore(useShallow((state) => ({
        variant: state.variant,
        isShowAlert: state.isShowAlert,
        icon: state.icon,
        message: state.message
    })))
    return (
        <div className={`min-w-40 w-fit text-white-darken alert fixed top-2 ${isShowAlert ? "right-2" : "-right-full"} z-[99999] duration-500 ease-in-out ${variant}`}>
            <span>
                {icon}
            </span>
            <span>
                {message}
            </span>
        </div>
    )
}
