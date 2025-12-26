"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const messages = [
  {
    id: 1,
    name: 'ファン',
    date: '2025.12.18',
    content: '「栄光の架け橋」 誰にも見せない泪があった。人知れず流した泪があった。 決して平らな道ではなかった。けれど確かに歩んで来た道だ。駅伝部のみなさん、地味な努力は実ります。頑張って！'
  },
  {
    id: 2,
    name: '卒業生',
    date: '2025.12.18',
    content: '練習を信じて、自分を信じて、仲間を信じて、一年かけて蓄えた力を充分に発揮し、自己ベストに近い走りができるように頑張って下さい。「練習は裏切りません。」自信を持って、がんばれー！'
  },
  {
    id: 3,
    name: '卒業生',
    date: '2025.12.18',
    content: '皆さんの悔し涙はもう見たくありません。大手町で飛び切りの笑顔が見たいです。みなさんならきっと8年振りのシード権獲得できるはず！体調に気をつけてしっかり調整してくださいね。'
  },
  {
    id: 4,
    name: 'ファン',
    date: '2025.12.14',
    content: '必ずシード権獲得!!!!!!! 応援しやす!!!!!!!!'
  }
];

function MessageCard({ message, index }: { message: typeof messages[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group h-full"
    >
      <motion.div
        className="relative h-full bg-white border border-neutral-100 rounded-2xl overflow-hidden transition-all duration-500 hover:border-neutral-200 hover:shadow-2xl hover:shadow-neutral-200/50"
        whileHover={{ y: -4 }}
      >
        <div className="p-6 md:p-8">
          {/* Quote Icon */}
          <div className="text-6xl font-serif text-neutral-100 leading-none mb-4 group-hover:text-daito-green/20 transition-colors duration-300">
            &ldquo;
          </div>

          {/* Content */}
          <p className="text-neutral-600 leading-relaxed line-clamp-4 -mt-8">
            {message.content}
          </p>

          {/* Author */}
          <div className="mt-6 pt-6 border-t border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm transition-colors duration-300",
                isHovered ? "bg-daito-green" : "bg-neutral-800"
              )}>
                {message.name.charAt(0)}
              </div>
              <div>
                <div className="font-medium text-neutral-900">{message.name}</div>
                <div className="text-xs text-neutral-400">{message.date}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-daito-green to-daito-orange"
          initial={{ scaleX: 0 }}
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: 'left' }}
        />
      </motion.div>
    </motion.article>
  );
}

export default function SupportMessages() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background Orbs */}
      <motion.div
        className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-daito-orange/5 blur-[100px]"
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-daito-green/5 blur-[80px]"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-baseline justify-center gap-4 mb-6">
            <span className="text-8xl md:text-9xl font-serif font-light text-neutral-100">04</span>
            <div className="-ml-6 text-left">
              <div className="text-[10px] tracking-[0.3em] text-daito-orange uppercase">Support Messages</div>
              <h2 className="text-2xl md:text-4xl font-medium text-neutral-900">応援メッセージ</h2>
            </div>
          </div>

          <p className="text-neutral-500 max-w-xl mx-auto mb-8">
            選手たちに届いた温かいメッセージをご紹介します。
          </p>

          <Link
            href="/message"
            className="inline-flex items-center gap-2 px-8 py-4 bg-daito-orange text-white rounded-full text-sm font-medium hover:bg-daito-orange-light transition-colors duration-300"
          >
            応援メッセージを送る
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {/* Messages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {messages.map((message, index) => (
            <MessageCard key={message.id} message={message} index={index} />
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button className="text-sm font-medium text-neutral-500 hover:text-daito-green transition-colors duration-300">
            全て見る（残り22件）
          </button>
        </motion.div>
      </div>
    </section>
  );
}
