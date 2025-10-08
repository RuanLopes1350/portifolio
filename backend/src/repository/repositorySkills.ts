import { typeSkills } from "../types/typeSkills.js";
import mongoose from "mongoose";
import ModelSkills from "../model/modelSkills.js";

class RepositorySkills {
    model: mongoose.Model<typeSkills>;

    constructor() {
        this.model = ModelSkills;
    }

    async criar(dados: typeSkills) {
        const resposta = await this.model.create(dados);
        return resposta;
    }

    async listar() {
        const resposta = await this.model.find();
        return resposta;
    }

    async deletar(id: string) {
        const resposta = await this.model.findByIdAndDelete(id);
        return resposta;
    }

}

export default RepositorySkills;