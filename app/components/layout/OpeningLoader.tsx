"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function OpeningLoader() {
    // 初期状態を計算（useEffect内でのsetStateを回避）
    const [isPresent, setIsPresent] = useState(() => {
        if (typeof window === 'undefined') return true;
        const lastVisit = localStorage.getItem('lastVisit');
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;
        // 24時間以内の訪問の場合は初期状態をfalseに
        return !(lastVisit && (now - parseInt(lastVisit)) < oneDay);
    });

    useEffect(() => {
        if (!isPresent) return;

        // 初回訪問または24時間経過後は表示
        const timer = setTimeout(() => {
            setIsPresent(false);
            if (typeof window !== 'undefined') {
                localStorage.setItem('lastVisit', Date.now().toString());
            }
        }, 2000); // 2秒に短縮

        return () => clearTimeout(timer);
    }, [isPresent]);

    // ページ読み込みが完了したら即座に非表示にする
    useEffect(() => {
        if (typeof window === 'undefined') return;

        if (document.readyState === 'complete') {
            const timer = setTimeout(() => setIsPresent(false), 500);
            return () => clearTimeout(timer);
        }

        const handleLoad = () => {
            setTimeout(() => setIsPresent(false), 500);
        };
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
    }, []);

    return (
        <AnimatePresence>
            {isPresent && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-neutral-950"
                >
                    <div className="relative overflow-hidden">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 bg-daito-green z-10 mix-blend-multiply"
                        />

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-4xl md:text-6xl font-serif text-white font-light tracking-[0.2em] relative z-20"
                        >
                            歴史への礎
                        </motion.h1>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.8, duration: 0.8, ease: "circOut" }}
                            className="h-px bg-daito-orange mt-4 origin-left"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
