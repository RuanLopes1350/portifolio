import axios from 'axios';
import type { About, Contact, Skill, Project, UserInfo } from '@/types/api';

const apiClient = axios.create({
    baseURL: 'https://portifolio-lilac-one-71.vercel.app/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Funções tipadas para cada endpoint
export async function buscarAbout() {
    const response = await apiClient.get<About[]>('/about');
    return response.data;
}

export async function buscarContact() {
    const response = await apiClient.get<Contact[]>('/contact');
    return response.data;
}

export async function buscarSkills() {
    const response = await apiClient.get<Skill[]>('/skills');
    return response.data;
}

export async function buscarProjects() {
    const response = await apiClient.get<Project[]>('/projects');
    return response.data;
}

export async function buscarUserInfo() {
    const response = await apiClient.get<UserInfo>('/user-info');
    return response.data;
}

// Função genérica mantida para compatibilidade
export function buscarNaApi(comando: string) {
    return apiClient.get(`/${comando}`);
}