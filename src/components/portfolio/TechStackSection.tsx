'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Server, Layout, Wrench, Cpu } from 'lucide-react';

export interface TechCategoryData {
  _id?: string;
  category: string;
  skills: string[];
  order?: number;
}

interface TechStackSectionProps {
  categories?: TechCategoryData[];
}

export const TechStackSection: React.FC<TechStackSectionProps> = ({ categories = [] }) => {
  if (!categories || categories.length === 0) {
    return null;
  }

  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes('backend') || name.includes('sistema') || name.includes('api')) {
      return <Server className="w-4 h-4 text-theme-muted" />;
    }
    if (name.includes('front') || name.includes('ui') || name.includes('interface')) {
      return <Layout className="w-4 h-4 text-theme-muted" />;
    }
    if (name.includes('infra') || name.includes('devops') || name.includes('docker')) {
      return <Wrench className="w-4 h-4 text-theme-muted" />;
    }
    return <Cpu className="w-4 h-4 text-theme-muted" />;
  };

  return (
    <section className="my-12 px-6 max-w-6xl mx-auto w-full space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-theme-main tracking-tight">Competências Técnicas</h2>
        <p className="text-theme-muted text-xs font-normal">
          Tecnologias e ferramentas utilizadas no desenvolvimento dos meus projetos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat._id || idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
            className="rounded-xl bg-theme-card border border-theme-border p-5 space-y-3 shadow-sm"
          >
            <div className="flex items-center gap-2 border-b border-theme-border pb-3">
              {getCategoryIcon(cat.category)}
              <h3 className="font-semibold text-theme-main text-xs tracking-tight">{cat.category}</h3>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {cat.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-theme-page text-theme-main border border-theme-border"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
