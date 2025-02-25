"use client"
import { useState } from "react";
import { IoMdApps } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import QuestionNavigationList from "./QuestionNavigationList";

export default function QuestionNavigateMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const questionNavigateListVariants = {
        initial: { opacity: 0 },
        show: { opacity: 1 },
        exit: { height: 0, opacity: 0 },
    };

    const menuButtonVariants = {
        initial: { scale: 1 },
        click: { scale: .7 },
    }

    return (
        <div className="relative">
            <motion.button
                variants={menuButtonVariants}
                initial="initial"
                whileTap="click"
                onClick={() => setIsOpen((prev) => !prev)}
                className="p-2 rounded-full bg-transparent"
            >
                <IoMdApps size={44} />
            </motion.button>
            <AnimatePresence>
                {
                    isOpen &&
                    <motion.section
                        variants={questionNavigateListVariants}
                        initial="initial"
                        animate="show"
                        exit="exit"
                        className="absolute top-12 left-0 bg-white shadow-lg p-4 rounded-lg w-96 min-h-96"
                    >
                        <QuestionNavigationList />
                    </motion.section>
                }
            </AnimatePresence>
        </div>
    );
}
