import RepositoryAbout from "../repository/repositoryAbout.js";
import { typeAbout } from "../types/typeAbout.js";

class ServiceAbout {
    private repository: RepositoryAbout;

    constructor() {
        this.repository = new RepositoryAbout();
    }

    async criar(dados: typeAbout) {
        const resposta = await this.repository.criar(dados);
        return resposta;
    }

    async buscar() {
        const resposta = await this.repository.buscar();
        return resposta;
    }

    async editar(id: string, dados: typeAbout) {
        const resposta = await this.repository.editar(id, dados);
        return resposta;
    }

    async deletar(id: string) {
        const resposta = await this.repository.deletar(id);
        return resposta;
    }
}

export default ServiceAbout;