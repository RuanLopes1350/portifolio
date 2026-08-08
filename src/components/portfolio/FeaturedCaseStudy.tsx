'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Terminal as TerminalIcon,
  Check,
  Copy,
  ArrowUpRight,
  ExternalLink,
  Package,
  Star,
  Layers,
  FolderCode,
} from 'lucide-react';
import { ProjectGallery } from '../ui/ProjectGallery';

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export interface ProjectSectionData {
  title: string;
  description: string;
  githubUrl?: string;
  technologies?: string[];
}

export interface FeaturedProjectData {
  _id?: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  npmUrl?: string;
  images?: string[];
  codeSnippet?: string;
  sections?: ProjectSectionData[];
  isFeatured?: boolean;
}

interface FeaturedCaseStudyProps {
  project?: FeaturedProjectData | null;
  isSecondary?: boolean;
}

export const FeaturedCaseStudy: React.FC<FeaturedCaseStudyProps> = ({ project, isSecondary = false }) => {
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!project) {
    return null;
  }

  const copySnippet = () => {
    if (project.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const sections = project.sections || [];
  const hasMultipleSections = sections.length > 1;
  const currentSection = sections[activeSectionIdx] || null;

  return (
    <section className="my-12 px-6 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl bg-theme-card border border-theme-border p-6 sm:p-8 space-y-6 shadow-sm"
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-theme-border pb-5">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-theme-muted font-semibold flex items-center gap-1">
              {!isSecondary ? (
                <>
                  <Star className="w-3 h-3 text-amber-500" /> Projeto em Destaque
                </>
              ) : (
                <>
                  <FolderCode className="w-3 h-3 text-theme-main" /> Projeto
                </>
              )}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-theme-main tracking-tight">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-theme-page text-theme-main text-xs font-mono border border-theme-border hover:bg-theme-card transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-theme-muted" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-theme-page text-theme-main text-xs font-mono border border-theme-border hover:bg-theme-card transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live</span>
                <ArrowUpRight className="w-3 h-3 text-theme-muted" />
              </a>
            )}
            {project.npmUrl && (
              <a
                href={project.npmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-theme-page text-theme-main text-xs font-mono border border-theme-border hover:bg-theme-card transition-colors"
              >
                <Package className="w-3.5 h-3.5" />
                <span>SDK</span>
                <ArrowUpRight className="w-3 h-3 text-theme-muted" />
              </a>
            )}
          </div>
        </div>

        {/* Summary & Detailed Overview */}
        <div className="space-y-2">
          <p className="text-theme-main font-medium text-sm sm:text-base">
            {project.summary}
          </p>
          <p className="text-theme-muted text-xs sm:text-sm leading-relaxed font-normal">
            {project.description}
          </p>
        </div>

        {/* Dynamic Project Sub-Sections / Tabs */}
        {sections.length > 0 && (
          <div className="rounded-xl border border-theme-border bg-theme-page overflow-hidden">
            {hasMultipleSections && (
              <div className="flex border-b border-theme-border bg-theme-card overflow-x-auto scrollbar-hide">
                {sections.map((sec, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSectionIdx(idx)}
                    className={`px-4 py-2.5 text-xs font-mono font-medium transition-colors border-b-2 cursor-pointer whitespace-nowrap ${
                      activeSectionIdx === idx
                        ? 'border-theme-main text-theme-main bg-theme-page font-bold'
                        : 'border-transparent text-theme-muted hover:text-theme-main'
                    }`}
                  >
                    {sec.title}
                  </button>
                ))}
              </div>
            )}

            {currentSection && (
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-theme-main text-xs flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-theme-muted" />
                    <span>{currentSection.title}</span>
                  </span>
                  {currentSection.githubUrl && (
                    <a
                      href={currentSection.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-theme-muted hover:text-theme-main text-xs flex items-center gap-1 font-mono"
                    >
                      <span>GitHub</span> <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <p className="text-theme-muted text-xs leading-relaxed">
                  {currentSection.description}
                </p>

                {currentSection.technologies && currentSection.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {currentSection.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-theme-card border border-theme-border text-theme-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Global Technologies Badges */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-theme-border">
            <span className="text-[11px] font-mono text-theme-muted uppercase tracking-wider block">
              Tecnologias Utilizadas
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono px-2.5 py-1 rounded bg-theme-page text-theme-main border border-theme-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Code Snippet Block */}
        {project.codeSnippet && (
          <div className="rounded-xl border border-theme-border bg-code overflow-hidden">
            <div className="flex items-center justify-between px-3.5 py-2 bg-theme-card border-b border-theme-border">
              <span className="text-[11px] font-mono text-theme-muted flex items-center gap-1.5">
                <TerminalIcon className="w-3 h-3 text-theme-muted" /> Exemplo de Integração / Código
              </span>
              <button
                onClick={copySnippet}
                className="text-[11px] font-mono text-theme-muted hover:text-theme-main flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-theme-main overflow-x-auto scrollbar-hide leading-relaxed">
              <code>{project.codeSnippet}</code>
            </pre>
          </div>
        )}

        {/* Conditional Project Screenshots Drawer */}
        <ProjectGallery images={project.images} projectTitle={project.title} />
      </motion.div>
    </section>
  );
};
