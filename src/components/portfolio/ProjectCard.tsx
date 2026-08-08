'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Package } from 'lucide-react';
import { ProjectGallery } from '../ui/ProjectGallery';

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export interface ProjectCardData {
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
  isFeatured?: boolean;
}

interface ProjectCardProps {
  project: ProjectCardData;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="rounded-xl bg-theme-card border border-theme-border p-5 flex flex-col justify-between shadow-sm"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold text-theme-main tracking-tight">{project.title}</h3>
          <div className="flex items-center gap-1.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded bg-theme-page hover:bg-theme-card-hover text-theme-muted hover:text-theme-main transition-colors border border-theme-border"
                title="GitHub"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded bg-theme-page hover:bg-theme-card-hover text-theme-muted hover:text-theme-main transition-colors border border-theme-border"
                title="Live Website"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.npmUrl && (
              <a
                href={project.npmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded bg-theme-page hover:bg-theme-card-hover text-theme-muted hover:text-theme-main transition-colors border border-theme-border"
                title="Pacote NPM"
              >
                <Package className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        <p className="text-theme-muted text-xs leading-relaxed font-normal">{project.summary}</p>

        <div className="flex flex-wrap gap-1 pt-1">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-theme-page text-theme-muted border border-theme-border"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Conditional Project Screenshot Drawer */}
      <ProjectGallery images={project.images} projectTitle={project.title} />
    </motion.div>
  );
};
