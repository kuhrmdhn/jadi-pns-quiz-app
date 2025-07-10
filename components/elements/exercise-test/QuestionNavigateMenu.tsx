"use client";
import useClickOutside from "@/utils/hooks/useClickOutside";
import { useQuestionNavigationMenuStore } from "@/utils/store/useQuestionNavigationMenuStore";
import { useRef } from "react";
import { IoMdApps } from "react-icons/io";
import QuestionNavigationList from "./QuestionNavigationList";

export default function QuestionNavigateMenu() {
    const menuRef = useRef<HTMLDivElement>(null);
    const { menuOpen, closeMenu, toggleMenu } = useQuestionNavigationMenuStore()

    useClickOutside(
        menuRef,
        () => closeMenu()
    );

    return (
        <div className="relative">
            <button
                onClick={() => toggleMenu()}
                className="p-2 rounded-full bg-transparent"
            >
                <IoMdApps size={44} />
            </button>
            {
                menuOpen && (
                    <section
                        ref={menuRef}
                        className="absolute top-12 left-0 shadow-lg p-4 rounded-lg w-96 h-fit bg-white dark:bg-black"
                    >
                        <QuestionNavigationList />
                    </section>
                )
            }
        </div>
    );
}
