"use client"

import { useState, KeyboardEvent, useEffect, useRef } from 'react';
import { buscarAbout, buscarContact, buscarSkills, buscarProjects, buscarUserInfo } from "@/utils/apiClient";
import type { About, Contact, Skill, Project } from '@/types/api';

// Tipo para definir cada linha que será exibida no histórico do terminal
type HistoryLine = {
    type: 'command' | 'output' | 'error' | 'help';
    content: string;
};

export default function TerminalComponent() {
    const [history, setHistory] = useState<HistoryLine[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const terminalEndRef = useRef<HTMLDivElement>(null);
    const [userIp, setUserIp] = useState<string>('Carregando...');

    // Busca informações do usuário ao montar o componente
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await buscarUserInfo();
                setUserIp(userInfo.ip);
            } catch (error) {
                console.error('Erro ao buscar IP:', error);
                setUserIp('Desconhecido');
            }
        };

        fetchUserInfo();
    }, []);

    // Rola para o final sempre que o histórico for atualizado
    useEffect(() => {
        terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    // Formata os dados de cada comando com cores e estrutura
    const formatAbout = (data: About[]): string => {
        if (data.length === 0) return 'Nenhuma informação disponível.';
        return data.map(item => item.about).join('\n\n');
    };

    const formatContact = (data: Contact[]): string => {
        if (data.length === 0) return 'Nenhum contato disponível.';
        return 'CONTATOS\n' + '─'.repeat(40) + '\n' +
            data.map(item => `  • ${item.name}\n    ${item.link}`).join('\n\n');
    };

    const formatSkills = (data: Skill[]): string => {
        if (data.length === 0) return 'Nenhuma habilidade cadastrada.';
        return 'HABILIDADES\n' + '─'.repeat(40) + '\n' +
            data.map(item => `  > ${item.skill}`).join('\n');
    };

    const formatProjects = (data: Project[]): string => {
        if (data.length === 0) return 'Nenhum projeto cadastrado.';
        return 'PROJETOS\n' + '─'.repeat(40) + '\n\n' +
            data.map((item, idx) =>
                `${idx + 1}. ${item.name.toUpperCase()}\n` +
                `   ${item.description}\n` +
                `   Tecnologias: ${item.technologies}\n` +
                `   Repositório: ${item.linkGitHub}` +
                `${item.linkDemo ? `\n   Demo: ${item.linkDemo}` : ''}`
            ).join('\n\n');
    };

    // Função para transformar URLs em links clicáveis e estilizar nomes de projetos
    const renderTextWithLinks = (text: string) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const projectNameRegex = /^(\d+\.\s+)(.+)$/gm; // Detecta linhas que começam com número (projetos)
        
        // Primeiro, processa nomes de projetos
        const lines = text.split('\n');
        
        return lines.map((line, lineIndex) => {
            const projectMatch = line.match(/^(\d+\.\s+)(.+)$/);
            
            // Se for uma linha de nome de projeto (ex: "1. NOME DO PROJETO")
            if (projectMatch) {
                const [, number, projectName] = projectMatch;
                return (
                    <span key={lineIndex}>
                        {number}
                        {projectName.split(' ').map((word, wordIdx) => (
                            <span key={`${lineIndex}-${wordIdx}`} className="text-[#FBBF24] font-semibold">
                                {word}{wordIdx < projectName.split(' ').length - 1 ? ' ' : ''}
                            </span>
                        ))}
                        {lineIndex < lines.length - 1 && '\n'}
                    </span>
                );
            }
            
            // Para outras linhas, processa URLs normalmente
            const urlParts = line.split(urlRegex);
            const processedLine = urlParts.map((part, partIndex) => {
                if (part.match(urlRegex)) {
                    return (
                        <a
                            key={`${lineIndex}-${partIndex}`}
                            href={part}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#60A5FA] underline hover:text-[#93C5FD] transition-colors"
                        >
                            {part}
                        </a>
                    );
                }
                return part;
            });
            
            return (
                <span key={lineIndex}>
                    {processedLine}
                    {lineIndex < lines.length - 1 && '\n'}
                </span>
            );
        });
    };

    const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !isLoading) {
            const command = inputValue.trim().toLowerCase();
            if (!command) return;

            const newHistory: HistoryLine[] = [...history, { type: 'command', content: command }];
            setIsLoading(true);

            try {
                let output = '';

                switch (command) {
                    case 'help':
                        setHistory([...newHistory, { type: 'help', content: '' }]);
                        break;

                    case 'clear':
                        setHistory([]);
                        break;

                    case 'about':
                        const aboutData = await buscarAbout();
                        output = formatAbout(aboutData);
                        setHistory([...newHistory, { type: 'output', content: output }]);
                        break;

                    case 'contact':
                        const contactData = await buscarContact();
                        output = formatContact(contactData);
                        setHistory([...newHistory, { type: 'output', content: output }]);
                        break;

                    case 'skills':
                        const skillsData = await buscarSkills();
                        output = formatSkills(skillsData);
                        setHistory([...newHistory, { type: 'output', content: output }]);
                        break;

                    case 'projects':
                        const projectsData = await buscarProjects();
                        output = formatProjects(projectsData);
                        setHistory([...newHistory, { type: 'output', content: output }]);
                        break;

                    default:
                        setHistory([...newHistory, {
                            type: 'error',
                            content: `bash: command not found: ${command}`
                        }]);
                }
            } catch (error) {
                setHistory([...newHistory, {
                    type: 'error',
                    content: `Erro ao executar comando: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
                }]);
            } finally {
                setIsLoading(false);
            }

            setInputValue('');
        }
    };

    // Função para renderizar cada linha do histórico
    const renderHistoryLine = (line: HistoryLine) => {
        switch (line.type) {
            case 'command':
                return (
                    <div className="flex flex-row gap-2 mt-1">
                        <span className="text-[#60A5FA] font-semibold selection:bg-[#4ADE80] selection:text-[#030712]">user@portfólio:~$</span>
                        <span className="text-[#4ADE80] font-medium selection:bg-[#4ADE80] selection:text-[#030712]">{line.content}</span>
                    </div>
                );

            case 'output':
                return (
                    <div className="ml-2 my-1">
                        <pre className="text-[#9CA3AF] whitespace-pre-wrap font-mono text-sm leading-relaxed selection:bg-[#4ADE80] selection:text-[#030712]">
                            {renderTextWithLinks(line.content)}
                        </pre>
                    </div>
                );

            case 'error':
                return (
                    <div className="ml-2 my-1 bg-red-950/30 border-l-2 border-red-500 pl-3 py-1">
                        <p className="text-red-400 font-medium selection:bg-[#4ADE80] selection:text-[#030712]">
                            {line.content}
                        </p>
                    </div>
                );

            case 'help':
                return (
                    <div className="ml-2 my-2 text-[#9CA3AF] selection:bg-[#4ADE80] selection:text-[#030712]">
                        <p className="text-white font-semibold mb-3 text-lg">Comandos Disponíveis</p>
                        <div className="space-y-2 ml-2">
                            <div className="flex items-start gap-3">
                                <span className="text-[#FACC15] font-bold min-w-[80px]">help</span>
                                <span className="text-[#9CA3AF]">Mostra esta mensagem</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-[#FACC15] font-bold min-w-[80px]">about</span>
                                <span className="text-[#9CA3AF]">Sobre mim</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-[#FACC15] font-bold min-w-[80px]">skills</span>
                                <span className="text-[#9CA3AF]">Minhas habilidades técnicas</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-[#FACC15] font-bold min-w-[80px]">contact</span>
                                <span className="text-[#9CA3AF]">Formas de me contatar</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-[#FACC15] font-bold min-w-[80px]">projects</span>
                                <span className="text-[#9CA3AF]">Meus projetos desenvolvidos</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-[#FACC15] font-bold min-w-[80px]">clear</span>
                                <span className="text-[#9CA3AF]">Limpar o terminal</span>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('pt-BR', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    const formattedTime = currentDate.toLocaleTimeString('pt-BR', { hour: 'numeric', minute: 'numeric', hour12: true });

    return (
        <div className="cursor-default rounded-[8px] overflow-hidden border-2 border-[#374151] min-h-[155px] max-h-[65svh] min-w-[85svw] max-w-[85svw] shadow-[0_4px_30px_-4px] shadow-[#0f1218] flex flex-col">
            <div className="flex flex-row items-center bg-[#1F2937] flex-shrink-0 border-b border-[#374151]/50">
                <div className="flex flex-row gap-[8px] items-center ml-5 h-[37px]">
                    <div className="w-3 h-3 rounded-full bg-[#EF4444] hover:bg-[#EF4444]/80 transition-colors cursor-pointer" title="Fechar"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FACC15] hover:bg-[#FACC15]/80 transition-colors cursor-pointer" title="Minimizar"></div>
                    <div className="w-3 h-3 rounded-full bg-[#4ADE80] hover:bg-[#4ADE80]/80 transition-colors cursor-pointer" title="Maximizar"></div>
                </div>
                <h1 className="text-[#9CA3AF] text-sm font-semibold text-center flex-grow mr-[85px]">Terminal - Portfólio</h1>
            </div>
            {/* Auto focar no input */}
            <div className="bg-[#030712] flex-1 p-4 flex flex-col gap-2 overflow-y-auto scrollbar-hide" onClick={() => document.getElementById('terminal-input')?.focus()}>
                <div className="text-[#9CA3AF] text-sm mb-1 selection:bg-[#4ADE80] selection:text-[#030712]">
                    <span className="opacity-75">Last login: </span>
                    <span className="text-white">{formattedDate}</span>
                    <span className="mx-2">•</span>
                    <span className="text-white">{formattedTime}</span>
                    <span className="mx-2">•</span>
                    <span className="text-[#FACC15]">IP: {userIp}</span>
                    <span className="mx-2">•</span>
                    <span className="text-[#60A5FA]">portfólio-terminal</span>
                </div>
                <div className="mb-2 pb-2 border-b border-[#374151]/30">
                    <p className="text-[#4ADE80] text-sm selection:bg-[#4ADE80] selection:text-[#030712]">
                        Bem-vindo ao meu portfólio! Digite{' '}
                        <span className="text-[#FACC15] font-bold px-1.5 py-0.5 bg-[#FACC15]/10 rounded">help</span>
                        {' '}para ver os comandos disponíveis
                    </p>
                </div>

                {/* Mapeia o histórico e renderiza cada linha com o estilo correto */}
                {history.map((line, index) => (
                    <div key={index}>{renderHistoryLine(line)}</div>
                ))}

                <div className="flex flex-row gap-2 items-center mt-1">
                    <span className="text-[#60A5FA] font-semibold selection:bg-[#4ADE80] selection:text-[#030712]">user@portfólio:~$</span>
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                            <span className="text-[#4ADE80] text-sm">Processando...</span>
                        </div>
                    ) : (
                        <input
                            id="terminal-input"
                            type="text"
                            className="bg-transparent text-[#4ADE80] font-medium focus:outline-none caret-[#4ADE80] appearance-none selection:bg-[#4ADE80] selection:text-[#030712] w-full placeholder:text-[#4ADE80]/30"
                            placeholder="Digite um comando..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            disabled={isLoading}
                        />
                    )}
                </div>
                {/* Div invisível no final para ajudar a rolar a tela para baixo */}
                <div ref={terminalEndRef} />
            </div>
        </div>
    )
}