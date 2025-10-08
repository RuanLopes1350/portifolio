import RepositoryContact from "../repository/repositoryContact.js";
import { typeContact } from "../types/typeContact.js";

class ServiceContact {
    repository: RepositoryContact;

    constructor() {
        this.repository = new RepositoryContact();
    }

    async criar(dados: typeContact) {
        const resposta = await this.repository.criar(dados);
        return resposta;
    }

    async buscar() {
        const resposta = await this.repository.buscar();
        return resposta;
    }

    async deletar(id: string) {
        const resposta = await this.repository.deletar(id);
        return resposta;
    }
}

export default ServiceContact;