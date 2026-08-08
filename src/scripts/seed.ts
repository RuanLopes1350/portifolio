import 'dotenv/config';
import connectToDatabase from '../lib/db';
import Project from '../lib/models/Project';
import SocialLink from '../lib/models/SocialLink';
import About from '../lib/models/About';
import TechSkill from '../lib/models/TechSkill';
import { auth } from '../lib/auth';

async function seed() {
  console.log('🌱 Starting Portfolio Database Seed...');
  await connectToDatabase();

  // 1. Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@ruanlopes.dev';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123456!';
  
  try {
    const adminUser = await auth.api.signUpEmail({
      body: {
        email: adminEmail,
        password: adminPassword,
        name: 'Ruan Lopes',
      },
    });
    console.log('✅ Admin user created/verified:', adminUser.user?.email || adminEmail);
  } catch (err: any) {
    console.log('ℹ️ Admin user registration status:', err.message || 'Already exists');
  }

  // 2. Seed About Profile
  await About.deleteMany({});
  await About.create({
    name: 'Ruan Lopes',
    headline: 'Full-Stack & Systems Engineer',
    bio: 'Desenvolvedor Full-Stack focado em arquiteturas escaláveis, APIs REST de alta performance em Node.js/TypeScript e interfaces reativas em Next.js.',
    statusText: 'Disponível para trabalho',
    location: 'Vilhena, RO - Brasil',
    employmentStatus: 'available',
    companyName: '',
  });
  console.log('✅ About profile seeded');

  // 3. Seed Social Links
  await SocialLink.deleteMany({});
  await SocialLink.create([
    {
      platform: 'GitHub',
      label: 'GitHub',
      url: 'https://github.com/RuanLopes1350',
      iconName: 'Github',
      order: 1,
    },
    {
      platform: 'LinkedIn',
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/ruanlopes',
      iconName: 'Linkedin',
      order: 2,
    },
    {
      platform: 'Email',
      label: 'Email',
      url: 'mailto:ruanlopes@example.com',
      iconName: 'Mail',
      order: 3,
    },
  ]);
  console.log('✅ Social links seeded');

  // 4. Seed Tech Skills Categories (Dynamically stored in DB)
  await TechSkill.deleteMany({});
  await TechSkill.create([
    {
      category: 'Backend & Engenharia de Sistemas',
      skills: ['Node.js', 'TypeScript', 'Express.js', 'BullMQ', 'Redis', 'PostgreSQL', 'Drizzle ORM', 'MongoDB', 'REST APIs', 'Argon2 & HMAC'],
      order: 1,
    },
    {
      category: 'Frontend & UI',
      skills: ['Next.js 16 / 15', 'React 19', 'Tailwind CSS', 'Server-Sent Events', 'Framer Motion', 'Monaco Editor'],
      order: 2,
    },
    {
      category: 'Infraestrutura & DevOps',
      skills: ['Docker & Compose', 'Git / GitHub Actions', 'Vercel Deployment', 'Linux / Bash', 'NPM Publishing'],
      order: 3,
    },
  ]);
  console.log('✅ Tech skill categories seeded');

  // 5. Seed Flagship Hermes Project
  await Project.deleteMany({});
  await Project.create({
    title: 'Hermes — Gateway & Sistema de E-mails Transacionais',
    slug: 'hermes',
    summary: 'Plataforma profissional e escalável para envio de e-mails transacionais com múltiplos serviços, templates MJML dinâmicos, fila assíncrona BullMQ/Redis e SDK TypeScript.',
    description: `O Hermes é um ecossistema completo de gateway transacional de e-mails. Ele separa o processamento de regras de negócios em uma API REST de alta performance em Node.js com Express e TypeScript, um Worker assíncrono com BullMQ/Redis para resiliência e concorrência, banco relacional PostgreSQL gerenciado via Drizzle ORM, um Dashboard em Next.js 16 (App Router) com Server-Sent Events (SSE) em tempo real e editor Monaco para MJML, além de um SDK oficial (hermes-client) com suporte a rotação automática de API Keys com hash Argon2 e validação HMAC SHA-256.`,
    technologies: [
      'TypeScript',
      'Node.js',
      'Express',
      'BullMQ',
      'Redis',
      'PostgreSQL',
      'Drizzle ORM',
      'Next.js 16',
      'React 19',
      'Monaco Editor',
      'Argon2',
      'Docker',
    ],
    githubUrl: 'https://github.com/RuanLopes1350/hermes-api',
    liveUrl: 'https://github.com/RuanLopes1350/hermes-front',
    npmUrl: 'https://github.com/RuanLopes1350/hermes-client',
    codeSnippet: `import { HermesClient } from 'hermes-client';

const hermes = new HermesClient({
  apiKey: process.env.HERMES_API_KEY!,
  serviceId: 'app-academico-v1',
});

const response = await hermes.sendEmail({
  template: 'welcome-user',
  to: 'user@domain.com',
  variables: { name: 'Ruan Lopes' },
});`,
    images: [],
    isFeatured: true,
    order: 1,
  });
  console.log('✅ Flagship Hermes project seeded');

  console.log('🎉 Seed finished successfully!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
