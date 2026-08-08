import React from 'react';
import connectToDatabase from '@/lib/db';
import Project from '@/lib/models/Project';
import SocialLink from '@/lib/models/SocialLink';
import About from '@/lib/models/About';
import TechSkill from '@/lib/models/TechSkill';
import { HeroSection } from '@/components/portfolio/HeroSection';
import { FeaturedCaseStudy } from '@/components/portfolio/FeaturedCaseStudy';
import { TechStackSection } from '@/components/portfolio/TechStackSection';
import { SecretAdminTrigger } from '@/components/portfolio/SecretAdminTrigger';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getData() {
  try {
    await connectToDatabase();
    const [aboutDoc, socialsDocs, projectsDocs, techSkillsDocs] = await Promise.all([
      About.findOne().lean(),
      SocialLink.find().sort({ order: 1 }).lean(),
      Project.find().sort({ isFeatured: -1, order: 1, createdAt: -1 }).lean(),
      TechSkill.find().sort({ order: 1 }).lean(),
    ]);

    return {
      about: aboutDoc ? JSON.parse(JSON.stringify(aboutDoc)) : null,
      socials: socialsDocs.length > 0 ? JSON.parse(JSON.stringify(socialsDocs)) : null,
      projects: projectsDocs.length > 0 ? JSON.parse(JSON.stringify(projectsDocs)) : null,
      techSkills: techSkillsDocs.length > 0 ? JSON.parse(JSON.stringify(techSkillsDocs)) : null,
    };
  } catch (error) {
    return { about: null, socials: null, projects: null, techSkills: null };
  }
}

export default async function HomePage() {
  const { about, socials, projects, techSkills } = await getData();

  const defaultSocials = socials || [
    { platform: 'GitHub', label: 'GitHub', url: 'https://github.com/RuanLopes1350' },
    { platform: 'LinkedIn', label: 'LinkedIn', url: 'https://linkedin.com/in/ruanlopes' },
    { platform: 'Email', label: 'Email', url: 'mailto:ruanlopes@example.com' },
  ];

  // 100% Dynamic: Find featured project from DB
  const featuredProject = projects?.find((p: any) => p.isFeatured);
  const otherProjects = projects?.filter((p: any) => p !== featuredProject) || [];

  return (
    <div className="w-full min-h-screen bg-theme-page text-theme-main font-sans selection:bg-zinc-800 selection:text-white">
      {/* 1. Hero Section */}
      <HeroSection
        name={about?.name || 'Ruan Lopes'}
        headline={about?.headline || 'Full-Stack & Systems Engineer'}
        bio={about?.bio || 'Desenvolvedor Full-Stack focado em arquiteturas escaláveis, APIs REST de alta performance em Node.js/TypeScript e interfaces reativas em Next.js.'}
        statusText={about?.statusText || 'Disponível para trabalho'}
        location={about?.location || 'Vilhena, RO - Brasil'}
        employmentStatus={about?.employmentStatus || 'available'}
        companyName={about?.companyName || ''}
        socials={defaultSocials}
      />

      {/* 2. Flagship Featured Case Study */}
      {featuredProject && <FeaturedCaseStudy project={featuredProject} />}

      {/* 3. "Outros Projetos" Section */}
      {otherProjects.length > 0 && (
        <section className="my-12 px-6 max-w-6xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between border-b border-theme-border pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-theme-main tracking-tight">Outros Projetos</h2>
            <span className="text-xs font-mono text-theme-muted">{otherProjects.length} Projeto(s)</span>
          </div>

          <div className="space-y-8">
            {otherProjects.map((proj: any, idx: number) => (
              <FeaturedCaseStudy key={proj._id || idx} project={proj} isSecondary />
            ))}
          </div>
        </section>
      )}

      {/* 4. Tech Stack Section */}
      <TechStackSection categories={techSkills || []} />

      {/* 5. Minimal Clean Footer: Only Name and Year */}
      <footer className="mt-16 py-8 border-t border-theme-border text-center text-xs text-theme-muted font-mono">
        <SecretAdminTrigger>
          <p>Ruan Lopes</p>
          <p>© {new Date().getFullYear()}</p>
        </SecretAdminTrigger>
      </footer>
    </div>
  );
}
