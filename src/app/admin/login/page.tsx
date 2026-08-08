'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { Shield, Mail, Lock, ArrowRight, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  // If user already has an active session cookie, automatically redirect to Dashboard!
  useEffect(() => {
    if (!isPending && session) {
      router.replace('/admin/dashboard');
    }
  }, [session, isPending, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await authClient.signIn.email({
        email,
        password,
      });

      if (res.error) {
        setError(res.error.message || 'Credenciais inválidas.');
      } else {
        router.push('/admin/dashboard');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao realizar login');
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="w-full min-h-screen bg-theme-page text-theme-main flex items-center justify-center">
        <div className="flex items-center gap-2 text-xs font-mono text-theme-muted">
          <Loader2 className="w-4 h-4 animate-spin text-theme-main" />
          <span>Verificando sessão...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-theme-page text-theme-main font-sans flex flex-col justify-between p-6 sm:p-10">
      {/* Top Header Navbar */}
      <header className="w-full flex items-center justify-between pb-6 border-b border-theme-border/60">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-theme-card hover:bg-theme-card-hover text-theme-main text-xs font-mono border border-theme-border transition-all shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-theme-muted" />
          <span>Voltar ao Portfólio</span>
        </Link>

        <ThemeToggle />
      </header>

      {/* Centered Login Card */}
      <main className="my-auto py-10 w-full flex items-center justify-center">
        <div className="w-full max-w-[480px] rounded-2xl bg-theme-card border border-theme-border p-8 sm:p-10 space-y-6 shadow-sm">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-theme-page border border-theme-border flex items-center justify-center mx-auto text-theme-main shadow-sm mb-3">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-theme-main tracking-tight">Área Administrativa</h1>
            <p className="text-xs sm:text-sm text-theme-muted font-mono">Autenticação Segura Better-Auth</p>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-theme-muted block">Endereço de E-mail</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-theme-muted absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ruanlopes.dev"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-theme-page border border-theme-border text-theme-main text-xs sm:text-sm focus:outline-none focus:border-theme-main transition-colors font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-theme-muted block">Senha de Acesso</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-theme-muted absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-theme-page border border-theme-border text-theme-main text-xs sm:text-sm focus:outline-none focus:border-theme-main transition-colors font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-theme-main text-theme-page hover:opacity-95 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Autenticando...</span>
                </>
              ) : (
                <>
                  <span>Entrar no Painel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      {/* Full-width Footer */}
      <footer className="w-full pt-6 border-t border-theme-border/60 text-center text-xs text-theme-muted font-mono">
        <p>© {new Date().getFullYear()} Ruan Lopes</p>
      </footer>
    </div>
  );
}
