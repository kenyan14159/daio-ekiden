"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';

const CORRECT_PASSWORD = process.env.NEXT_PUBLIC_EXCLUSIVE_PASSWORD || "1010";

export default function ExclusivePage() {
  const [password, setPassword] = useState('');
  // 初期状態を計算（useEffect内でのsetStateを回避）
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('exclusive_auth') === 'true';
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate a brief delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));

    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      // Store in sessionStorage so it persists during the session
      sessionStorage.setItem('exclusive_auth', 'true');
    } else {
      setError('パスワードが正しくありません');
      setPassword('');
    }
    setIsLoading(false);
  };

  if (isAuthenticated) {
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
              className="text-center"
            >
              <p className="text-daito-orange font-mono text-sm tracking-[0.3em] mb-4">
                EXCLUSIVE CONTENT
              </p>
              <h1 className="text-4xl md:text-6xl font-serif font-light text-white mb-4">
                限定コンテンツ
              </h1>
              <p className="text-white/60 text-lg">
                関係者限定の特別なコンテンツ
              </p>
            </motion.div>
          </div>
        </section>

        {/* Exclusive Content */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-2xl border border-neutral-100 p-8 md:p-12 shadow-sm mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="w-6 h-6 text-daito-green" />
                  <span className="text-daito-green font-medium">認証済み</span>
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  ようこそ、限定コンテンツへ
                </h2>
                <p className="text-neutral-600 leading-relaxed">
                  このページは大東文化大学陸上競技部男子長距離ブロックの関係者限定コンテンツです。 ここでは、チームの内部情報やメンバー限定のお知らせなどを閲覧できます。
                </p>
                <div className="mt-8 p-4 bg-neutral-50 rounded-lg text-sm text-neutral-500 text-center">
                  コンテンツ準備中...
                </div>
              </div>
            </motion.div>
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
            className="text-center"
          >
            <p className="text-daito-orange font-mono text-sm tracking-[0.3em] mb-4">
              EXCLUSIVE CONTENT
            </p>
            <h1 className="text-4xl md:text-6xl font-serif font-light text-white mb-4">
              限定コンテンツ
            </h1>
            <p className="text-white/60 text-lg">
              関係者専用ページ
            </p>
          </motion.div>
        </div>
      </section>

      {/* Login Form */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-white rounded-2xl border border-neutral-100 p-8 shadow-sm">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-daito-green/10 rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-daito-green" />
                </div>
              </div>

              <h2 className="text-xl font-bold text-neutral-900 text-center mb-2">
                パスワードを入力してください
              </h2>
              <p className="text-sm text-neutral-500 text-center mb-8">
                このコンテンツは関係者限定です
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="password" className="sr-only">
                    パスワード
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="パスワード"
                      className="w-full px-4 py-3 pr-12 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-daito-green focus:border-daito-green transition-colors"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "パスワードを非表示" : "パスワードを表示"}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-500 text-sm mb-4"
                  >
                    <XCircle className="w-4 h-4" />
                    {error}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !password}
                  className="w-full py-3 bg-daito-green text-white font-bold rounded-lg hover:bg-daito-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      確認中...
                    </span>
                  ) : (
                    'ログイン'
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
