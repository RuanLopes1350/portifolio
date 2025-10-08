import { typeSkills } from "../types/typeSkills.js";
import RepositorySkills from "../repository/repositorySkills.js";

class ServiceSkills {
    private repository: RepositorySkills;
    
  constructor() {
    this.repository = new RepositorySkills();
  }

  async criar(dados: typeSkills) {
    const resposta = await this.repository.criar(dados);
    return resposta;
  }

  async listar() {
    const resposta = await this.repository.listar();
    return resposta;
  }

  async deletar(id: string) {
    const resposta = await this.repository.deletar(id);
    return resposta;
  }
}

export default ServiceSkills;