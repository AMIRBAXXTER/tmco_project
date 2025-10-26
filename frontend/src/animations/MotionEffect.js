"use client";
import { motion } from "framer-motion";

const variants = {
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 2, ease: "easeOut" } },
    },
    slideUp: {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
    },
    staggeredFadeIn: {
        visible: {
            transition: {
                staggerChildren: 0.5,
                delayChildren: 0.5,
            },
        },
    },
    staggerChildFadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1, ease: "easeOut" } },
    },
    slideLeft: {
        hidden: { opacity: 0, x: 80 },
        visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
    },
    slideRight: {
        hidden: { opacity: 0, x: -80 },
        visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
    },
    fadeUp: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
    },
    scaleSlideUp: {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 1, ease: "easeOut" },
        },
    },
    staggeredSlideUp: {
        visible: {
            transition: { staggerChildren: 0.15 },
        },
    },
    staggerChildSlideUp: {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
    },
    fadeScale: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 1, ease: "easeOut" },
        },
    },
};

// ⚙️ اضافه کردن className و سایر props استاندارد
export default function MotionEffect({
    effect = "fadeIn",
    children,
    stagger = false,
    className = "",
    ...restProps   // این کار باعث میشه هر prop اضافه (مثل id, style, onClick) هم پاس داده بشه
}) {
    const isStaggeredParent =
        effect === "staggeredFadeIn" || effect === "staggeredSlideUp";

    const childEffect =
        effect === "staggeredFadeIn"
            ? "staggerChildFadeIn"
            : effect === "staggeredSlideUp"
                ? "staggerChildSlideUp"
                : null;

    if (!isStaggeredParent) {
        return (
            <motion.div
                variants={variants[effect]}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className={className}     // 💡 کلاس به دیو نهایی اضافه شد
                {...restProps}            // سایر خصوصیات اختیاری هم اضافه شد
            >
                {children}
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={variants[effect]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={className}      // 💡 در حالت stagger هم اضافه شد
            {...restProps}
        >
            {Array.isArray(children)
                ? (
                    <>
                        {children.map((child, i) => (
                            <motion.div key={i} variants={variants[childEffect]}>
                                {child}
                            </motion.div>
                        ))}
                    </>
                )
                : <motion.div variants={variants[childEffect]}>{children}</motion.div>}
        </motion.div>
    );
}
