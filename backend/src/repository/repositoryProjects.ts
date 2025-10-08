import { typeProjects } from "../types/typeProjects.js";
import modelProjects from "../model/modelProjects.js";
import mongoose from "mongoose";

class RepositoryProjects {
    model: mongoose.Model<typeProjects>;

    constructor() {
        this.model = modelProjects;
    }

    async criar(dados: typeProjects) {
        const resposta = await this.model.create(dados);
        return resposta;
    }

    async listar() {
        const resposta = await this.model.find();
        return resposta;
    }

    async listarUm(id: string) {
        const resposta = await this.model.findById(id);
        return resposta;
    }

    async atualizar(id: string, dados: typeProjects) {
        const resposta = await this.model.findByIdAndUpdate(id, dados, { new: true });
        return resposta;
    }

    async deletar(id: string) {
        const resposta = await this.model.findByIdAndDelete(id);
        return resposta;
    }
}

export default RepositoryProjects;