"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

// 選手データ型定義
interface PersonalBest {
  event: string;
  time: string;
}

interface Member {
  name: string;
  fullName: string;
  reading: string;
  image?: string;
  personalBests: PersonalBest[];
  highSchool?: string;
  grade?: number;
}

interface Staff {
  name: string;
  fullName: string;
  reading: string;
  role: string;
  image?: string;
}

interface MembersData {
  fourthYear: Member[];
  thirdYear: Member[];
  secondYear: Member[];
  firstYear: Member[];
}

interface MembersClientProps {
  membersData: MembersData;
  staffData: Staff[];
}

// 学年データ（大学院を削除）
const gradeData = [
  { id: '4year', label: '4年生', en: '4th Year', key: 'fourthYear' as const },
  { id: '3year', label: '3年生', en: '3rd Year', key: 'thirdYear' as const },
  { id: '2year', label: '2年生', en: '2nd Year', key: 'secondYear' as const },
  { id: '1year', label: '1年生', en: '1st Year', key: 'firstYear' as const },
  { id: 'staff', label: 'スタッフ', en: 'STAFF', key: null },
];

// Parallax Hero
function ParallaxHero() {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-neutral-950">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-daito-green/30 via-transparent to-daito-orange/20" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 40%, rgba(0, 77, 37, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 70% 60%, rgba(243, 152, 0, 0.2) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div>
          <p className="text-daito-orange font-mono text-sm tracking-[0.3em] mb-6">
            TEAM ROSTER
          </p>

          <h1 className="text-white">
            <span className="block text-5xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight leading-none">
              部員紹介
            </span>
            <span className="block text-lg md:text-xl font-light tracking-[0.3em] mt-4 text-white/50">
              MEMBERS
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}

function MemberCard({ member, index, grade }: { member: Member; index: number; grade: number }) {
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05, duration: 0.5 }}
        className="group relative bg-white rounded-xl border border-neutral-100 p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:border-daito-green/30"
      >
        {/* Image */}
        <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-neutral-100">
          {member.image ? (
            <Image
              src={member.image}
              alt={`${member.fullName}（${grade}年生）`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-300 text-4xl">
              {member.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Name */}
        <div className="mb-2">
          <h3 className="font-bold text-sm md:text-base text-neutral-900 group-hover:text-daito-green transition-colors">
            {member.fullName}
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">{member.reading}</p>
        </div>

        {/* Personal Bests */}
        {member.personalBests && member.personalBests.length > 0 && (
          <div className="space-y-1 mt-3 pt-3 border-t border-neutral-50">
            {member.personalBests.slice(0, 2).map((pb, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className="text-neutral-500">{pb.event}</span>
                <span className="font-mono font-medium text-neutral-900">{pb.time}</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
  );
}

function StaffCard({ staff, index }: { staff: Staff; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group relative bg-white rounded-xl border border-neutral-100 p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:border-daito-green/30"
    >
      {/* Image */}
      <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-neutral-100">
        {staff.image ? (
          <Image
            src={staff.image}
            alt={staff.fullName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-300 text-4xl">
            {staff.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Name */}
      <div className="mb-2">
        <h3 className="font-bold text-sm md:text-base text-neutral-900 group-hover:text-daito-green transition-colors">
          {staff.fullName}
        </h3>
        <p className="text-xs text-neutral-500 mt-0.5">{staff.reading}</p>
        {staff.role && (
          <p className="text-xs text-daito-green mt-1 font-medium">{staff.role}</p>
        )}
      </div>
    </motion.div>
  );
}

export default function MembersClient({ membersData, staffData }: MembersClientProps) {
  const [activeTab, setActiveTab] = useState('4year');

  const activeGrade = gradeData.find(g => g.id === activeTab);
  const currentMembers = activeGrade?.key ? membersData[activeGrade.key] : [];

  // 学年を取得するヘルパー関数
  const getGrade = (key: string): number => {
    switch (key) {
      case 'fourthYear': return 4;
      case 'thirdYear': return 3;
      case 'secondYear': return 2;
      case 'firstYear': return 1;
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <ParallaxHero />

      {/* Tab Navigation - Modern Design */}
      <div className="sticky top-16 md:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100">
        <div className="container mx-auto px-6">
          <div className="flex justify-center py-4 gap-1">
            {gradeData.map((grade) => (
              <button
                key={grade.id}
                onClick={() => setActiveTab(grade.id)}
                aria-label={`${grade.label}を表示`}
                aria-pressed={activeTab === grade.id}
                className={cn(
                  "relative px-6 py-3 text-sm font-medium transition-all duration-300",
                  activeTab === grade.id
                    ? "text-neutral-900"
                    : "text-neutral-400 hover:text-neutral-600"
                )}
              >
                {grade.label}
                {/* Underline indicator */}
                {activeTab === grade.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-daito-green"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <>
            {/* Section Header */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-7xl md:text-8xl font-serif font-light text-neutral-100">
                  {activeGrade?.en.charAt(0)}
                </span>
                <div className="-ml-4">
                  <div className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase">
                    {activeGrade?.en}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-medium text-neutral-900">
                    {activeGrade?.label}
                  </h2>
                </div>
              </div>
            </motion.div>

            {/* Grid */}
            <motion.div
              key={`grid-${activeTab}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {activeTab === 'staff' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {staffData.map((staff, index) => (
                    <StaffCard key={staff.name} staff={staff} index={index} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {currentMembers.map((member, index) => (
                    <MemberCard 
                      key={member.name} 
                      member={member} 
                      index={index} 
                      grade={activeGrade?.key ? getGrade(activeGrade.key) : 0}
                    />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {(activeTab === 'staff' ? staffData.length === 0 : currentMembers.length === 0) && (
                <div className="text-center py-20 text-neutral-400">
                  データがありません
                </div>
              )}
            </motion.div>
          </>
        </div>
      </section>
    </div>
  );
}

