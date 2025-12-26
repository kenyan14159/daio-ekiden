"use client";

import Link from 'next/link';
import OptimizedImage from '@/app/components/ui/OptimizedImage';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const navSections = [
  {
    title: 'メンバー紹介',
    link: '/members',
    items: null,
  },
  {
    title: 'トピックス',
    items: [
      { title: 'スケジュール', link: '/schedule' },
      { title: 'ニュース', link: '/news' },
      { title: 'リザルト', link: '/results' },
    ],
  },
  {
    title: 'チーム情報',
    items: [
      { title: 'サポーターの皆様', link: '/supporters' },
      { title: '応援してくださる皆様へ', link: '/message' },
      { title: 'ホームページについて', link: '/about' },
      { title: 'お問い合わせ', link: '/contact' },
    ],
  },
  {
    title: '限定コンテンツ',
    link: '/exclusive',
    items: null,
  },
];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/daitobunka_ekiden/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/DaitoBunka__TF',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMobileSections, setOpenMobileSections] = useState<string[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMobileSection = (title: string) => {
    setOpenMobileSections(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-white/90 backdrop-blur-sm shadow-sm"
        )}
      >
        <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <OptimizedImage
              src="/images/daito-ekiden.png"
              alt="大東文化大学 陸上競技部 男子長距離ブロック"
              width={180}
              height={40}
              className="h-8 md:h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navSections.map((section) => (
              <div
                key={section.title}
                className="relative"
                onMouseEnter={() => section.items && setOpenDropdown(section.title)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {section.items ? (
                  <>
                    <button
                      className={cn(
                        "px-4 py-2 text-sm font-bold transition-colors flex items-center rounded-md",
                        openDropdown === section.title
                          ? "text-daito-green bg-daito-green/5"
                          : "hover:text-daito-green hover:bg-daito-green/5"
                      )}
                      aria-expanded={openDropdown === section.title}
                    >
                      {section.title}
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 ml-1 transition-transform duration-200",
                          openDropdown === section.title && "rotate-180"
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {openDropdown === section.title && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 w-56 bg-white shadow-lg rounded-lg py-2 border border-gray-100"
                        >
                          {section.items.map((item) => (
                            <Link
                              key={item.link}
                              href={item.link}
                              className="block px-4 py-2.5 text-sm hover:bg-daito-green/5 hover:text-daito-green transition-colors"
                            >
                              {item.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={section.link!}
                    className="px-4 py-2 text-sm font-bold hover:text-daito-green hover:bg-daito-green/5 transition-colors rounded-md block"
                  >
                    {section.title}
                  </Link>
                )}
              </div>
            ))}

            {/* Social Links */}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-neutral-200">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 flex items-center justify-center text-neutral-500 hover:text-daito-green transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center group z-[60] text-neutral-900"
            aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={isMenuOpen}
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                animate={{
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 8 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-6 h-0.5 bg-current block origin-center"
              />
              <motion.span
                animate={{ opacity: isMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-6 h-0.5 bg-current block"
              />
              <motion.span
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? -8 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-6 h-0.5 bg-current block origin-center"
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
      </header>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-lg lg:hidden flex flex-col pt-16 md:pt-20"
          >
            {/* Menu Content */}
            <div className="flex-1 overflow-y-auto py-8">
              <nav className="container mx-auto px-6 flex flex-col items-center gap-8">
                {navSections.map((section, idx) => (
                  <motion.div
                    key={section.title}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    className="w-full max-w-sm text-center"
                  >
                    {section.items ? (
                      <div className="group">
                        <button
                          onClick={() => toggleMobileSection(section.title)}
                          aria-expanded={openMobileSections.includes(section.title)}
                          aria-label={`${section.title}メニューを${openMobileSections.includes(section.title) ? '閉じる' : '開く'}`}
                          className="text-2xl font-serif font-medium text-neutral-900 group-hover:text-daito-green transition-colors flex items-center justify-center mx-auto gap-2"
                        >
                          {section.title}
                          <ChevronDown
                            className={cn(
                              "w-5 h-5 text-neutral-400 transition-transform duration-300",
                              openMobileSections.includes(section.title) && "rotate-180"
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {openMobileSections.includes(section.title) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-4 py-4">
                                {section.items.map((item) => (
                                  <Link
                                    key={item.link}
                                    href={item.link}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-neutral-500 hover:text-daito-green transition-colors"
                                  >
                                    {item.title}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={section.link!}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-2xl font-serif font-medium text-neutral-900 hover:text-daito-green transition-colors block"
                      >
                        {section.title}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-12 flex justify-center gap-6"
              >
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-daito-green hover:text-white hover:border-daito-green transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
