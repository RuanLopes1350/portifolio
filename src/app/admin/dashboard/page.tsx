'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import {
  FolderPlus,
  Trash2,
  Edit,
  LogOut,
  Plus,
  Image as ImageIcon,
  Check,
  ExternalLink,
  Shield,
  Loader2,
  X,
  Star,
  User,
  MapPin,
  Briefcase,
  Share2,
  Cpu,
  Code,
  Layers,
} from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

interface ProjectSectionData {
  title: string;
  description: string;
  githubUrl?: string;
  technologies?: string[];
}

interface ProjectData {
  _id?: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  npmUrl?: string;
  images: string[];
  codeSnippet?: string;
  sections?: ProjectSectionData[];
  isFeatured: boolean;
}

interface AboutData {
  name: string;
  headline: string;
  bio: string;
  location: string;
  employmentStatus: 'available' | 'employed';
  companyName: string;
  statusText?: string;
}

interface SocialData {
  _id?: string;
  platform: string;
  label: string;
  url: string;
}

interface TechSkillData {
  _id?: string;
  category: string;
  skills: string[];
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const [activeTab, setActiveTab] = useState<'projects' | 'personal'>('projects');

  // Verify active session. If not logged in, redirect to login page.
  useEffect(() => {
    if (!sessionPending && !session) {
      router.replace('/admin/login');
    }
  }, [session, sessionPending, router]);

  // Projects State
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectSaving, setProjectSaving] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Project Form State
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [technologiesStr, setTechnologiesStr] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [npmUrl, setNpmUrl] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState('');

  // Sub-Sections State (Up to 5)
  const [sections, setSections] = useState<ProjectSectionData[]>([]);
  const [sectionTitleInput, setSectionTitleInput] = useState('');
  const [sectionDescInput, setSectionDescInput] = useState('');
  const [sectionGithubInput, setSectionGithubInput] = useState('');
  const [sectionTechStr, setSectionTechStr] = useState('');

  // Personal Info & Settings State
  const [about, setAbout] = useState<AboutData>({
    name: 'Ruan Lopes',
    headline: 'Full-Stack & Systems Engineer',
    bio: '',
    location: 'Vilhena, RO - Brasil',
    employmentStatus: 'available',
    companyName: '',
    statusText: 'Disponível para trabalho',
  });
  const [aboutSaving, setAboutSaving] = useState(false);

  // Social Links State
  const [socials, setSocials] = useState<SocialData[]>([]);
  const [platform, setPlatform] = useState('GitHub');
  const [socialLabel, setSocialLabel] = useState('');
  const [socialUrl, setSocialUrl] = useState('');
  const [editingSocialId, setEditingSocialId] = useState<string | null>(null);

  // Tech Skills State
  const [techSkills, setTechSkills] = useState<TechSkillData[]>([]);
  const [techCategory, setTechCategory] = useState('');
  const [techSkillsStr, setTechSkillsStr] = useState('');
  const [editingTechId, setEditingTechId] = useState<string | null>(null);

  const fetchAllData = async () => {
    try {
      setProjectsLoading(true);
      const [projRes, aboutRes, socRes, techRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/about'),
        fetch('/api/socials'),
        fetch('/api/tech-skills'),
      ]);

      const [projData, aboutData, socData, techData] = await Promise.all([
        projRes.json(),
        aboutRes.json(),
        socRes.json(),
        techRes.json(),
      ]);

      if (Array.isArray(projData)) setProjects(projData);
      if (aboutData && aboutData.name) setAbout(aboutData);
      if (Array.isArray(socData)) setSocials(socData);
      if (Array.isArray(techData)) setTechSkills(techData);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setProjectsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchAllData();
    }
  }, [session]);

  // Project Handlers
  const handleAddImage = () => {
    if (imageUrlInput.trim()) {
      setImages([...images, imageUrlInput.trim()]);
      setImageUrlInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Section Handlers (Up to 5)
  const handleAddSection = () => {
    if (sections.length >= 5) {
      alert('Limite de 5 sub-seções atingido.');
      return;
    }
    if (sectionTitleInput.trim() && sectionDescInput.trim()) {
      const techArr = sectionTechStr.split(',').map((t) => t.trim()).filter(Boolean);
      setSections([
        ...sections,
        {
          title: sectionTitleInput.trim(),
          description: sectionDescInput.trim(),
          githubUrl: sectionGithubInput.trim() || undefined,
          technologies: techArr,
        },
      ]);
      setSectionTitleInput('');
      setSectionDescInput('');
      setSectionGithubInput('');
      setSectionTechStr('');
    }
  };

  const handleRemoveSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const resetProjectForm = () => {
    setEditingProjectId(null);
    setTitle('');
    setSummary('');
    setDescription('');
    setTechnologiesStr('');
    setGithubUrl('');
    setLiveUrl('');
    setNpmUrl('');
    setCodeSnippet('');
    setSections([]);
    setSectionTitleInput('');
    setSectionDescInput('');
    setSectionGithubInput('');
    setSectionTechStr('');
    setIsFeatured(false);
    setImages([]);
    setImageUrlInput('');
  };

  const handleEditProject = (project: ProjectData) => {
    setEditingProjectId(project._id || null);
    setTitle(project.title);
    setSummary(project.summary);
    setDescription(project.description);
    setTechnologiesStr(project.technologies.join(', '));
    setGithubUrl(project.githubUrl || '');
    setLiveUrl(project.liveUrl || '');
    setNpmUrl(project.npmUrl || '');
    setCodeSnippet(project.codeSnippet || '');
    setSections(project.sections || []);
    setIsFeatured(project.isFeatured || false);
    setImages(project.images || []);
  };

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setProjectSaving(true);

    const technologies = technologiesStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title,
      summary,
      description,
      technologies,
      githubUrl,
      liveUrl,
      npmUrl,
      codeSnippet,
      sections,
      images,
      isFeatured,
    };

    try {
      if (editingProjectId) {
        await fetch(`/api/projects/${editingProjectId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      resetProjectForm();
      await fetchAllData();
      router.refresh();
    } catch (err) {
      console.error('Error saving project:', err);
    } finally {
      setProjectSaving(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('Excluir este projeto?')) {
      try {
        await fetch(`/api/projects/${id}`, { method: 'DELETE' });
        await fetchAllData();
        router.refresh();
      } catch (err) {
        console.error('Error deleting project:', err);
      }
    }
  };

  // About Profile Handlers
  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setAboutSaving(true);
    try {
      await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(about),
      });
      alert('Dados pessoais atualizados com sucesso!');
    } catch (err) {
      console.error('Error updating profile:', err);
    } finally {
      setAboutSaving(false);
    }
  };

  // Social Link Handlers
  const handleSaveSocial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!socialLabel || !socialUrl) return;

    try {
      if (editingSocialId) {
        await fetch(`/api/socials/${editingSocialId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ platform, label: socialLabel, url: socialUrl }),
        });
      } else {
        await fetch('/api/socials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ platform, label: socialLabel, url: socialUrl }),
        });
      }
      setEditingSocialId(null);
      setSocialLabel('');
      setSocialUrl('');
      fetchAllData();
    } catch (err) {
      console.error('Error saving social link:', err);
    }
  };

  const handleDeleteSocial = async (id: string) => {
    if (confirm('Remover este link social?')) {
      try {
        await fetch(`/api/socials/${id}`, { method: 'DELETE' });
        fetchAllData();
      } catch (err) {
        console.error('Error deleting social:', err);
      }
    }
  };

  // Tech Skill Handlers
  const handleSaveTechCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!techCategory || !techSkillsStr) return;

    const skills = techSkillsStr.split(',').map((s) => s.trim()).filter(Boolean);

    try {
      if (editingTechId) {
        await fetch(`/api/tech-skills/${editingTechId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category: techCategory, skills }),
        });
      } else {
        await fetch('/api/tech-skills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category: techCategory, skills }),
        });
      }
      setEditingTechId(null);
      setTechCategory('');
      setTechSkillsStr('');
      fetchAllData();
    } catch (err) {
      console.error('Error saving tech skill category:', err);
    }
  };

  const handleDeleteTechCategory = async (id: string) => {
    if (confirm('Excluir esta categoria de tecnologias?')) {
      try {
        await fetch(`/api/tech-skills/${id}`, { method: 'DELETE' });
        fetchAllData();
      } catch (err) {
        console.error('Error deleting tech category:', err);
      }
    }
  };

  const handleLogout = async () => {
    await authClient.signOut();
    router.push('/admin/login');
  };

  if (sessionPending || !session) {
    return (
      <div className="w-full min-h-screen bg-theme-page text-theme-main flex items-center justify-center">
        <div className="flex items-center gap-2 text-xs font-mono text-theme-muted">
          <Loader2 className="w-4 h-4 animate-spin text-theme-main" />
          <span>Verificando autenticação...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-page text-theme-main p-4 sm:p-8 max-w-6xl mx-auto space-y-6 font-sans">
      {/* Top Header Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-theme-card border border-theme-border flex items-center justify-center font-bold text-theme-main shadow-sm">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-theme-main tracking-tight">Painel de Gerenciamento</h1>
            <p className="text-xs text-theme-muted font-mono">Portfólio 100% Dinâmico</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-theme-card hover:bg-theme-card-hover text-theme-main text-xs font-mono border border-theme-border shadow-sm"
          >
            <span>Ver Portfólio</span>
            <ExternalLink className="w-3.5 h-3.5 text-theme-muted" />
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-theme-card hover:bg-red-500/10 text-theme-muted hover:text-red-400 text-xs font-mono border border-theme-border cursor-pointer transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {/* Main 2-Section Tabs Bar */}
      <div className="flex border-b border-theme-border bg-theme-card rounded-xl p-1 max-w-md">
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'projects'
              ? 'bg-theme-page text-theme-main border border-theme-border shadow-sm'
              : 'text-theme-muted hover:text-theme-main'
          }`}
        >
          <FolderPlus className="w-4 h-4" />
          <span>1. Projetos ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('personal')}
          className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'personal'
              ? 'bg-theme-page text-theme-main border border-theme-border shadow-sm'
              : 'text-theme-muted hover:text-theme-main'
          }`}
        >
          <User className="w-4 h-4" />
          <span>2. Dados Pessoais & Redes</span>
        </button>
      </div>

      {/* SECTION 1: PROJECTS */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form Col (Col 7) */}
          <div className="lg:col-span-7 rounded-xl bg-theme-card border border-theme-border p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-theme-border">
              <h2 className="text-sm font-bold text-theme-main flex items-center gap-2">
                <FolderPlus className="w-4 h-4 text-theme-muted" />
                <span>{editingProjectId ? 'Editar Projeto' : 'Cadastrar Novo Projeto'}</span>
              </h2>
              {editingProjectId && (
                <button
                  onClick={resetProjectForm}
                  className="text-xs text-theme-muted hover:text-theme-main flex items-center gap-1 font-mono"
                >
                  <X className="w-3.5 h-3.5" /> Cancelar
                </button>
              )}
            </div>

            <form onSubmit={handleSubmitProject} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-theme-muted">Título do Projeto *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Sistema de Gestão / API Gateway"
                  className="w-full px-3 py-1.5 rounded-lg bg-theme-page border border-theme-border text-theme-main text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-theme-muted">Resumo Curto *</label>
                <input
                  type="text"
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Resumo para o card"
                  className="w-full px-3 py-1.5 rounded-lg bg-theme-page border border-theme-border text-theme-main text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-theme-muted">Descrição Detalhada *</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Arquitetura e funcionalidades"
                  className="w-full px-3 py-1.5 rounded-lg bg-theme-page border border-theme-border text-theme-main text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-theme-muted">Tecnologias Gerais (vírgula)</label>
                <input
                  type="text"
                  value={technologiesStr}
                  onChange={(e) => setTechnologiesStr(e.target.value)}
                  placeholder="Node.js, TypeScript, Express, BullMQ"
                  className="w-full px-3 py-1.5 rounded-lg bg-theme-page border border-theme-border text-theme-main text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] text-theme-muted">GitHub URL</label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-2.5 py-1 rounded-lg bg-theme-page border border-theme-border text-theme-main text-[11px] font-mono focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-theme-muted">Live/Dashboard URL</label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-2.5 py-1 rounded-lg bg-theme-page border border-theme-border text-theme-main text-[11px] font-mono focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-theme-muted">NPM/SDK URL</label>
                  <input
                    type="url"
                    value={npmUrl}
                    onChange={(e) => setNpmUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-2.5 py-1 rounded-lg bg-theme-page border border-theme-border text-theme-main text-[11px] font-mono focus:outline-none"
                  />
                </div>
              </div>

              {/* Code Snippet Input */}
              <div className="space-y-1 pt-1">
                <label className="text-xs font-medium text-theme-muted flex items-center gap-1">
                  <Code className="w-3.5 h-3.5" /> Exemplo de Código / Snippet (Opcional)
                </label>
                <textarea
                  rows={3}
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                  placeholder="Ex: import { Client } from 'sdk'..."
                  className="w-full px-3 py-1.5 rounded-lg bg-theme-page border border-theme-border text-theme-main text-xs font-mono focus:outline-none"
                />
              </div>

              {/* Dynamic Project Sub-Sections / Tabs (Up to 5) */}
              <div className="space-y-2 pt-2 border-t border-theme-border">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-theme-muted flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-theme-muted" />
                    <span>Sub-seções / Abas do Projeto (Até 5)</span>
                  </label>
                  <span className="text-[10px] font-mono text-theme-muted">
                    {sections.length}/5 Abas
                  </span>
                </div>
                <p className="text-[11px] text-theme-muted">
                  Se houver 2 ou mais abas, elas aparecem como botões alternáveis. Se houver 1 única aba, ela é exibida diretamente sem barra de abas.
                </p>

                {sections.length < 5 && (
                  <div className="p-3 rounded-lg bg-theme-page border border-theme-border space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={sectionTitleInput}
                        onChange={(e) => setSectionTitleInput(e.target.value)}
                        placeholder="Título da Aba (ex: hermes-api)"
                        className="px-2.5 py-1 rounded bg-theme-card border border-theme-border text-theme-main text-xs font-mono focus:outline-none"
                      />
                      <input
                        type="url"
                        value={sectionGithubInput}
                        onChange={(e) => setSectionGithubInput(e.target.value)}
                        placeholder="GitHub URL (Opcional)"
                        className="px-2.5 py-1 rounded bg-theme-card border border-theme-border text-theme-main text-xs font-mono focus:outline-none"
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={sectionDescInput}
                      onChange={(e) => setSectionDescInput(e.target.value)}
                      placeholder="Descrição da sub-seção"
                      className="w-full px-2.5 py-1 rounded bg-theme-card border border-theme-border text-theme-main text-xs focus:outline-none"
                    />
                    <input
                      type="text"
                      value={sectionTechStr}
                      onChange={(e) => setSectionTechStr(e.target.value)}
                      placeholder="Tecnologias específicas (Node.js, Express)"
                      className="w-full px-2.5 py-1 rounded bg-theme-card border border-theme-border text-theme-main text-xs font-mono focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddSection}
                      className="w-full py-1 rounded bg-theme-card hover:bg-theme-card-hover text-theme-main text-xs font-mono border border-theme-border flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Adicionar Sub-seção
                    </button>
                  </div>
                )}

                {sections.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    {sections.map((sec, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded bg-theme-page border border-theme-border text-xs">
                        <div className="space-y-0.5">
                          <span className="font-bold text-theme-main font-mono">{sec.title}</span>
                          <p className="text-[11px] text-theme-muted line-clamp-1">{sec.description}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveSection(i)}
                          className="text-red-400 hover:text-red-300 text-[11px] font-mono p-1"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Screenshots Manager */}
              <div className="space-y-2 pt-2 border-t border-theme-border">
                <label className="text-xs font-medium text-theme-muted flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-theme-muted" />
                  <span>Screenshots / Imagens</span>
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    placeholder="URL da imagem (ex: /projects/print.png ou https://...)"
                    className="flex-1 px-3 py-1.5 rounded-lg bg-theme-page border border-theme-border text-theme-main text-xs font-mono focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="px-3 py-1.5 rounded-lg bg-theme-page hover:bg-theme-card-hover text-theme-main text-xs font-mono border border-theme-border flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>

                {images.length > 0 && (
                  <div className="space-y-1 pt-1">
                    {images.map((img, i) => (
                      <div key={i} className="flex items-center justify-between px-3 py-1 rounded bg-theme-page border border-theme-border text-xs text-theme-main font-mono">
                        <span className="truncate max-w-xs">{img}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(i)}
                          className="text-red-400 hover:text-red-300 text-[11px]"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Checkbox Flagship */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-theme-border text-indigo-600"
                />
                <label htmlFor="isFeatured" className="text-xs text-theme-main flex items-center gap-1 font-medium">
                  <Star className="w-3 h-3 text-amber-500" />
                  <span>Projeto em Destaque Principal (Hero Case Study)</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={projectSaving}
                className="w-full py-2 rounded-lg bg-theme-main text-theme-page hover:opacity-90 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {projectSaving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Salvando...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{editingProjectId ? 'Atualizar Projeto' : 'Salvar Projeto'}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* List Col (Col 5) */}
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-theme-muted font-semibold">
              Projetos Cadastrados ({projects.length})
            </h2>

            {projectsLoading ? (
              <div className="p-6 text-center text-theme-muted text-xs font-mono flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-theme-main" />
                <span>Carregando...</span>
              </div>
            ) : projects.length === 0 ? (
              <div className="p-4 rounded-xl bg-theme-card text-center text-xs text-theme-muted border border-theme-border">
                Nenhum projeto cadastrado.
              </div>
            ) : (
              <div className="space-y-2">
                {projects.map((proj) => (
                  <div
                    key={proj._id}
                    className="p-3.5 rounded-xl bg-theme-card border border-theme-border flex items-start justify-between gap-3 shadow-sm"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-theme-main text-xs">{proj.title}</h4>
                        {proj.isFeatured && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                            Hero
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-theme-muted line-clamp-1">{proj.summary}</p>
                      <div className="flex items-center gap-2 text-[10px] text-theme-muted font-mono">
                        <span>{proj.sections?.length || 0} Abas</span>
                        <span>•</span>
                        <span>{proj.images?.length || 0} Screenshots</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEditProject(proj)}
                        className="p-1 rounded bg-theme-page text-theme-muted hover:text-theme-main border border-theme-border transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj._id!)}
                        className="p-1 rounded bg-theme-page text-red-400 hover:text-red-300 border border-theme-border transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 2: PERSONAL DATA & CONFIGURATIONS */}
      {activeTab === 'personal' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form Col 1: About & Employment Status (Col 6) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-xl bg-theme-card border border-theme-border p-5 space-y-4 shadow-sm">
              <h2 className="text-sm font-bold text-theme-main flex items-center gap-2 border-b border-theme-border pb-3">
                <User className="w-4 h-4 text-theme-muted" />
                <span>Perfil & Status de Emprego</span>
              </h2>

              <form onSubmit={handleSaveAbout} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-theme-muted">Seu Nome</label>
                  <input
                    type="text"
                    required
                    value={about.name}
                    onChange={(e) => setAbout({ ...about, name: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-theme-page border border-theme-border text-theme-main text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-theme-muted">Título / Headline</label>
                  <input
                    type="text"
                    required
                    value={about.headline}
                    onChange={(e) => setAbout({ ...about, headline: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-theme-page border border-theme-border text-theme-main text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-theme-muted flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Localização (OpenStreetMap)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={about.location}
                    onChange={(e) => setAbout({ ...about, location: e.target.value })}
                    placeholder="Vilhena, RO - Brasil"
                    className="w-full px-3 py-1.5 rounded-lg bg-theme-page border border-theme-border text-theme-main text-xs focus:outline-none font-mono"
                  />
                </div>

                {/* Employment Status Selector */}
                <div className="space-y-2 pt-2 border-t border-theme-border">
                  <label className="text-xs font-medium text-theme-muted flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-theme-main" />
                    <span>Status Profissional / Emprego</span>
                  </label>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAbout({ ...about, employmentStatus: 'available' })}
                      className={`p-2 rounded-lg text-xs font-mono font-medium border text-center transition-all cursor-pointer ${
                        about.employmentStatus === 'available'
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-500 font-bold'
                          : 'bg-theme-page border-theme-border text-theme-muted'
                      }`}
                    >
                      🟢 Disponível para Trabalho
                    </button>

                    <button
                      type="button"
                      onClick={() => setAbout({ ...about, employmentStatus: 'employed' })}
                      className={`p-2 rounded-lg text-xs font-mono font-medium border text-center transition-all cursor-pointer ${
                        about.employmentStatus === 'employed'
                          ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-400 font-bold'
                          : 'bg-theme-page border-theme-border text-theme-muted'
                      }`}
                    >
                      💼 Trabalhando Atualmente
                    </button>
                  </div>

                  {about.employmentStatus === 'employed' ? (
                    <div className="space-y-1 pt-1">
                      <label className="text-[11px] text-theme-muted">Nome da Empresa / Instituição</label>
                      <input
                        type="text"
                        value={about.companyName}
                        onChange={(e) => setAbout({ ...about, companyName: e.target.value })}
                        placeholder="Ex: IFRO - Campus Vilhena ou Empresa XYZ"
                        className="w-full px-3 py-1.5 rounded-lg bg-theme-page border border-theme-border text-theme-main text-xs focus:outline-none"
                      />
                    </div>
                  ) : (
                    <div className="space-y-1 pt-1">
                      <label className="text-[11px] text-theme-muted">Frase de Status Disponível</label>
                      <input
                        type="text"
                        value={about.statusText || ''}
                        onChange={(e) => setAbout({ ...about, statusText: e.target.value })}
                        placeholder="Ex: Disponível para novos desafios e projetos"
                        className="w-full px-3 py-1.5 rounded-lg bg-theme-page border border-theme-border text-theme-main text-xs focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-theme-muted">Biografia Curta</label>
                  <textarea
                    rows={3}
                    value={about.bio}
                    onChange={(e) => setAbout({ ...about, bio: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-theme-page border border-theme-border text-theme-main text-xs focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={aboutSaving}
                  className="w-full py-2 rounded-lg bg-theme-main text-theme-page hover:opacity-90 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {aboutSaving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Salvando...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Salvar Perfil & Status</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Form Col 2: Social Links & Tech Skills Manager (Col 6) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Social Links Manager */}
            <div className="rounded-xl bg-theme-card border border-theme-border p-5 space-y-4 shadow-sm">
              <h2 className="text-sm font-bold text-theme-main flex items-center gap-2 border-b border-theme-border pb-3">
                <Share2 className="w-4 h-4 text-theme-muted" />
                <span>Gerenciador de Redes Sociais</span>
              </h2>

              <form onSubmit={handleSaveSocial} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] text-theme-muted">Plataforma</label>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-theme-page border border-theme-border text-theme-main text-xs focus:outline-none"
                    >
                      <option value="GitHub">GitHub</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Email">Email</option>
                      <option value="Website">Website</option>
                      <option value="Twitter">Twitter / X</option>
                      <option value="Discord">Discord</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-theme-muted">Rótulo (Label)</label>
                    <input
                      type="text"
                      required
                      value={socialLabel}
                      onChange={(e) => setSocialLabel(e.target.value)}
                      placeholder="Ex: GitHub"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-theme-page border border-theme-border text-theme-main text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-theme-muted">URL do Perfil / Link</label>
                  <input
                    type="url"
                    required
                    value={socialUrl}
                    onChange={(e) => setSocialUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-1.5 rounded-lg bg-theme-page border border-theme-border text-theme-main text-xs font-mono focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-1.5 rounded-lg bg-theme-page hover:bg-theme-card-hover text-theme-main text-xs font-mono border border-theme-border flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{editingSocialId ? 'Atualizar Rede' : 'Adicionar Rede Social'}</span>
                </button>
              </form>

              {/* Social Links List */}
              <div className="space-y-2 pt-2 border-t border-theme-border">
                {socials.map((soc) => (
                  <div
                    key={soc._id}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-theme-page border border-theme-border text-xs"
                  >
                    <div className="space-y-0.5">
                      <span className="font-bold text-theme-main">{soc.label}</span>
                      <span className="text-[10px] text-theme-muted block font-mono truncate max-w-[200px]">
                        {soc.url}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDeleteSocial(soc._id!)}
                      className="text-red-400 hover:text-red-300 p-1"
                      title="Excluir"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Skill Categories Manager */}
            <div className="rounded-xl bg-theme-card border border-theme-border p-5 space-y-4 shadow-sm">
              <h2 className="text-sm font-bold text-theme-main flex items-center gap-2 border-b border-theme-border pb-3">
                <Cpu className="w-4 h-4 text-theme-muted" />
                <span>Competências Técnicas (Categorias)</span>
              </h2>

              <form onSubmit={handleSaveTechCategory} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-theme-muted">Nome da Categoria</label>
                  <input
                    type="text"
                    required
                    value={techCategory}
                    onChange={(e) => setTechCategory(e.target.value)}
                    placeholder="Ex: Backend & Engenharia de Sistemas"
                    className="w-full px-3 py-1.5 rounded-lg bg-theme-page border border-theme-border text-theme-main text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-theme-muted">Habilidades (separadas por vírgula)</label>
                  <input
                    type="text"
                    required
                    value={techSkillsStr}
                    onChange={(e) => setTechSkillsStr(e.target.value)}
                    placeholder="Node.js, TypeScript, Express, BullMQ"
                    className="w-full px-3 py-1.5 rounded-lg bg-theme-page border border-theme-border text-theme-main text-xs font-mono focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-1.5 rounded-lg bg-theme-page hover:bg-theme-card-hover text-theme-main text-xs font-mono border border-theme-border flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{editingTechId ? 'Atualizar Categoria' : 'Adicionar Categoria'}</span>
                </button>
              </form>

              {/* Tech Categories List */}
              <div className="space-y-2 pt-2 border-t border-theme-border">
                {techSkills.map((cat) => (
                  <div
                    key={cat._id}
                    className="flex items-start justify-between p-2.5 rounded-lg bg-theme-page border border-theme-border text-xs"
                  >
                    <div className="space-y-1">
                      <span className="font-bold text-theme-main block">{cat.category}</span>
                      <div className="flex flex-wrap gap-1">
                        {cat.skills.map((s, i) => (
                          <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-theme-card border border-theme-border text-theme-muted">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteTechCategory(cat._id!)}
                      className="text-red-400 hover:text-red-300 p-1"
                      title="Excluir"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
