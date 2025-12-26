"use client";

import { motion } from 'framer-motion';

const achievements = [
    { label: '学生3大駅伝3冠達成', detail: '平成2年度（箱根駅伝・全日本大学駅伝・出雲駅伝）' },
    { label: '東京箱根間往復大学駅伝競走', detail: '53回出場 / 4回優勝' },
    { label: '秩父宮賜杯全日本大学駅伝対抗選手権大会', detail: '45回出場 / 7回優勝' },
    { label: '出雲全日本大学選抜駅伝競走', detail: '18回出場 / 1回優勝' },
];

const teamInfo = [
    { label: '所属', value: '関東学生陸上競技連盟（男子2部）' },
    { label: '活動', value: '週7日（東松山キャンパス総合グラウンド）' },
    { label: '入部条件', value: 'あり（セレクション）' },
    { label: '寮', value: '全寮制（原則）' },
    { label: '部員数', value: '男子49名・女子3名（マネージャー）' },
];

export default function TeamInfo() {
    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <p className="text-daito-orange font-mono text-sm tracking-[0.3em] mb-3">
                        ABOUT THE TEAM
                    </p>
                    <h2 className="text-2xl md:text-4xl font-serif font-light text-neutral-900 mb-3">
                        陸上競技部 男子長距離
                    </h2>
                    <p className="text-lg md:text-xl font-medium text-daito-green">
                        箱根駅伝、シード権獲得に向けて
                    </p>
                </motion.div>

                {/* Description */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="max-w-3xl mx-auto mb-16"
                >
                    <p className="text-base md:text-lg text-neutral-600 leading-relaxed text-center">
                        正月の風物詩とも言える箱根駅伝に<span className="text-neutral-900 font-medium">53回出場</span>し、
                        <span className="text-neutral-900 font-medium">4度の総合優勝</span>を誇る伝統のある大東文化大学陸上競技部。
                        「努力によって不可能を可能にする」というスローガンのもとに、
                        先輩方が築き上げた歴史と伝統を引き継ぎ、
                        学生三大駅伝での上位入賞を目指して日々の練習に取り組んでいます。
                    </p>
                </motion.div>

                {/* Achievements - Simple List */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-16"
                >
                    <h3 className="text-center text-sm font-medium text-neutral-500 tracking-wider uppercase mb-6">
                        主な成績
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
                        {achievements.map((achievement) => (
                            <div
                                key={achievement.label}
                                className="bg-neutral-50 rounded-lg p-4 border border-neutral-100"
                            >
                                <h4 className="font-medium text-neutral-900 text-sm mb-1">{achievement.label}</h4>
                                <p className="text-xs text-neutral-500">{achievement.detail}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Team Info Grid - Simple Dark Box */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <div className="bg-neutral-900 rounded-2xl p-6 md:p-10">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                            {teamInfo.map((info) => (
                                <div
                                    key={info.label}
                                    className="text-center"
                                >
                                    <div className="text-[10px] tracking-[0.2em] text-white/40 uppercase mb-1">
                                        {info.label}
                                    </div>
                                    <div className="text-xs md:text-sm text-white font-medium leading-tight">
                                        {info.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
