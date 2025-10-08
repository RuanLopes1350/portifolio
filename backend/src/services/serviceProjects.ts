import RepositoryProjects from "../repository/repositoryProjects.js";
import { typeProjects } from "../types/typeProjects.js";

class ServiceProjects {
    repository: RepositoryProjects;

    constructor() {
        this.repository = new RepositoryProjects();
    }

    async criar(dados: typeProjects) {
        return this.repository.criar(dados);
    }

    async listar() {
        return this.repository.listar();
    }

    async listarUm(id: string) {
        return this.repository.listarUm(id);
    }

    async atualizar(id: string, dados: typeProjects) {
        return this.repository.atualizar(id, dados);
    }

    async deletar(id: string) {
        return this.repository.deletar(id);
    }
}

export default ServiceProjects;