"use client";

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    // 初期状態を計算（useEffect内でのsetStateを回避）
    const [isPointerDevice, setIsPointerDevice] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(hover: none)').matches;
    });
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        // タッチデバイスかどうかを検出
        const checkPointerDevice = () => {
            if (typeof window === 'undefined') return false;
            return window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(hover: none)').matches;
        };

        // ポインターデバイスでない場合は早期リターン
        if (!isPointerDevice) {
            return;
        }

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 12);
            cursorY.set(e.clientY - 12);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-hover')
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        // リサイズ時に再チェック
        const handleResize = () => {
            const isPointer = checkPointerDevice();
            setIsPointerDevice(isPointer);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('resize', handleResize);
        };
    }, [cursorX, cursorY]);

    // タッチデバイスの場合はカーソルを表示しない
    if (!isPointerDevice) {
        return null;
    }

    return (
        <motion.div
            className="fixed top-0 left-0 w-6 h-6 rounded-full bg-white border-2 border-black z-[99999] pointer-events-none"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                scale: isHovered ? 1.8 : 1,
                boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.8), 0 0 15px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 255, 255, 0.3)',
            }}
            aria-hidden="true"
        />
    );
}
