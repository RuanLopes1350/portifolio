// Tipos correspondentes às respostas da API do backend

export interface About {
    id: string;
    about: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Contact {
    name: string;
    link: string;
}

export interface Skill {
    skill: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    technologies: string;
    linkGitHub: string;
    linkDemo?: string;
    createdAt: Date;
    updatedAt: Date;
}

// Tipo para o histórico do terminal
export interface TerminalHistoryEntry {
    command: string;
    output: string;
    type: 'success' | 'error' | 'info';
}

// Tipo para informações do usuário
export interface UserInfo {
    ip: string;
    userAgent: string;
    timestamp: string;
}
