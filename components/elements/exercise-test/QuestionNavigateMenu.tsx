"use client"
import { useState } from "react";
import { IoMdApps } from "react-icons/io";
import QuestionNavigationList from "./QuestionNavigationList";

export default function QuestionNavigateMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="p-2 rounded-full bg-transparent"
            >
                <IoMdApps size={44} />
            </button>
                {
                    isOpen &&
                    <section
                        className="absolute top-12 left-0 bg-white shadow-lg p-4 rounded-lg w-96 min-h-96"
                    >
                        <QuestionNavigationList />
                    </section>
                }
        </div>
    );
}
