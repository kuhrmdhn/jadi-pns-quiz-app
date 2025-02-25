import { create } from "zustand";
import React from "react";

export enum AlertVariant {
  SUCCESS = "alert-success",
  ERROR = "alert-error",
  WARNING = "alert-warning",
  INFO = "alert-info",
}

type Store = {
  variant: AlertVariant;
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
  variant: AlertVariant.INFO,
  setVariant: (variant) => set({ variant }),
  isShowAlert: false,
  toggleAlert: (duration = 2000) => {
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
    useAlertStore.getState().toggleAlert();
    useAlertStore.getState().setVariant(AlertVariant.SUCCESS);
  },
  errorAlert() {
    useAlertStore.getState().toggleAlert();
    useAlertStore.getState().setVariant(AlertVariant.ERROR);
  }
}));
