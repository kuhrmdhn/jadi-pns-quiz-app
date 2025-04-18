"use client"
import { useAlertStore } from '@/utils/store/useAlertStore'
import React from 'react'
import { useShallow } from "zustand/shallow"
import { Alert } from '../ui/alert'

export default function AlertProvider() {
    const { variant, isShowAlert, icon, message } = useAlertStore(useShallow((state) => ({
        variant: state.variant,
        isShowAlert: state.isShowAlert,
        icon: state.icon,
        message: state.message
    })))
    return (
        <Alert 
        className={`min-w-40 w-fit flex gap-3 items-center fixed top-2 ${isShowAlert ? "right-2" : "-right-full"} z-[99999] duration-500 ease-in-out`}
        variant={variant}
        >
            <span>
                {icon}
            </span>
            <span>
                {message}
            </span>
        </Alert>
    )
}
