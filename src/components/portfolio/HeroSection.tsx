'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Briefcase,
  ArrowUpRight,
} from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';

export interface SocialLinkData {
  _id?: string;
  platform: string;
  label: string;
  url: string;
  iconName?: string;
}

interface HeroSectionProps {
  name?: string;
  headline?: string;
  bio?: string;
  statusText?: string;
  location?: string;
  employmentStatus?: 'available' | 'employed';
  companyName?: string;
  socials?: SocialLinkData[];
}

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
  </svg>
);

export const HeroSection: React.FC<HeroSectionProps> = ({
  name = 'Ruan Lopes',
  headline = 'Full-Stack & Systems Engineer',
  bio = 'Desenvolvedor Full-Stack focado em arquiteturas escaláveis, APIs REST de alta performance em Node.js/TypeScript e interfaces reativas em Next.js.',
  statusText = 'Disponível para trabalho',
  location = 'Vilhena, RO - Brasil',
  employmentStatus = 'available',
  companyName = '',
  socials = [],
}) => {
  const osmSearchUrl = `https://www.openstreetmap.org/search?query=${encodeURIComponent(location)}`;

  return (
    <header className="relative max-w-6xl mx-auto pt-8 pb-12 px-6 border-b border-theme-border">
      {/* Top Navbar */}
      <nav className="flex items-center justify-between gap-4 mb-10 pb-4 border-b border-theme-border/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-theme-card border border-theme-border flex items-center justify-center font-bold text-theme-main shadow-sm text-sm">
            RL
          </div>
          <div>
            <h1 className="text-lg font-bold text-theme-main tracking-tight">{name}</h1>
            <a
              href={osmSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-theme-muted hover:text-theme-main transition-colors flex items-center gap-1 font-mono group"
              title="Ver no OpenStreetMap"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span>{location}</span>
              <ArrowUpRight className="w-3 h-3 text-theme-muted group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Main Text Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Employment Badge */}
          <div className="flex items-center gap-2">
            {employmentStatus === 'employed' ? (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-mono">
                <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                <span>Atualmente trabalhando para {companyName || 'Empresa'}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{statusText || 'Disponível para trabalho'}</span>
              </span>
            )}
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-theme-main tracking-tight leading-tight">
              {headline}
            </h2>
            <p className="text-theme-muted text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              {bio}
            </p>
          </div>

          {/* Social Links List */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {socials.map((soc, idx) => (
              <a
                key={soc._id || idx}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-theme-card hover:bg-theme-card-hover text-theme-main text-xs font-mono border border-theme-border transition-colors shadow-sm"
              >
                {soc.platform.toLowerCase().includes('github') && <GithubIcon className="w-3.5 h-3.5" />}
                {soc.platform.toLowerCase().includes('linkedin') && <LinkedinIcon className="w-3.5 h-3.5" />}
                <span>{soc.label}</span>
                <ArrowUpRight className="w-3 h-3 text-theme-muted" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
