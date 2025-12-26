"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { NewsArticle } from '@/lib/types';

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
}

interface NewsArticleViewProps {
    article: NewsArticle | null;
}

export default function NewsArticleView({ article }: NewsArticleViewProps) {
    if (!article) {
        return (
            <div className="min-h-screen bg-neutral-50">
                <section className="relative py-20 md:py-32 bg-neutral-950 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-daito-green/30 via-transparent to-daito-orange/20" />
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-serif font-light text-white mb-4">
                                記事が見つかりません
                            </h1>
                        </div>
                    </div>
                </section>
                <section className="py-12 md:py-20">
                    <div className="container mx-auto px-6 text-center">
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-2 text-daito-green hover:underline"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            ニュース一覧に戻る
                        </Link>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 bg-neutral-950 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-daito-green/30 via-transparent to-daito-orange/20" />
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-daito-green text-white text-xs font-medium rounded-full">
                                {article.category}
                            </span>
                            <span className="text-white/60 text-sm">{formatDate(article.date)}</span>
                        </div>
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-white leading-tight">
                            {article.title}
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        {/* Back Link */}
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-2 text-neutral-500 hover:text-daito-green transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            ニュース一覧に戻る
                        </Link>

                        {/* Article Content */}
                        <article className="bg-white rounded-2xl border border-neutral-100 p-8 md:p-12 shadow-sm">
                            <div className="prose prose-lg max-w-none">
                                {(article.content || article.excerpt || '').split('\n\n').map((paragraph, index) => (
                                    <p key={index} className="text-neutral-700 leading-relaxed mb-4">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </article>

                        {/* Navigation */}
                        <div className="mt-12 text-center">
                            <Link
                                href="/news"
                                className="inline-flex items-center justify-center px-8 py-4 border border-neutral-200 rounded-full text-sm font-medium text-neutral-600 hover:border-daito-green hover:text-daito-green transition-all"
                            >
                                ニュース一覧に戻る
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
