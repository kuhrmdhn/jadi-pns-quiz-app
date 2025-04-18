import { create } from "zustand";
import React from "react";
import { VariantProps } from "class-variance-authority";
import { alertVariants } from "@/components/ui/alert";
import { Check, X } from "lucide-react"

export enum AlertVariant {
  DEFAULT = "default",
  SUCCESS = "success",
  DESTRUCTIVE = "destructive",
}

type AlertVariantType = VariantProps<typeof alertVariants>["variant"];


type Store = {
  variant: AlertVariantType;
  setVariant: (variant: AlertVariant) => void
  isShowAlert: boolean;
  toggleAlert: (duration?: number) => void;
  icon?: React.ReactNode;
  setIcon: (icon: React.ReactNode) => void;
  message: string;
  setMessage: (message: string) => void;
  successAlert: () => void;
  errorAlert: () => void
};

export const useAlertStore = create<Store>()((set) => ({
  variant: AlertVariant.DEFAULT,
  setVariant: (variant) => set({ variant }),
  isShowAlert: false,
  toggleAlert: (duration = 7000) => {
    set({ isShowAlert: true });
    setTimeout(() => {
      set({ isShowAlert: false });
    }, duration);
  },
  icon: null,
  setIcon: (icon) => set({ icon }),
  message: "",
  setMessage: (message) => set({ message }),
  successAlert() {
    const { setIcon, toggleAlert, setVariant } = useAlertStore.getState();
    setIcon(React.createElement(Check, { className: "h-5 w-5" }));
    toggleAlert();
    setVariant(AlertVariant.SUCCESS);
  },
  errorAlert() {
    const { setIcon, toggleAlert, setVariant } = useAlertStore.getState();
    setIcon(React.createElement(X, { className: "h-5 w-5" }));
    toggleAlert();
    setVariant(AlertVariant.DESTRUCTIVE);
  },
  
}));
