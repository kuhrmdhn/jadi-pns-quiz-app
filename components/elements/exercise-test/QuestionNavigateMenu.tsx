"use client";
import { useRef, useState } from "react";
import { IoMdApps } from "react-icons/io";
import QuestionNavigationList from "./QuestionNavigationList";
import useClickOutside from "@/utils/hooks/useClickOutside";

export default function QuestionNavigateMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useClickOutside(
        menuRef,
        () => setIsOpen(false)
    );

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="p-2 rounded-full bg-transparent"
            >
                <IoMdApps size={44} />
            </button>
            {
                isOpen && (
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
