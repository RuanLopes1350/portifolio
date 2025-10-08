import mongoose from "mongoose";
import modelAbout from "../model/modelAbout.js";
import { typeAbout } from "../types/typeAbout.js";

class RepositoryAbout {
    private model = modelAbout;

    constructor(model = modelAbout) {
        this.model = model;
    }

    async criar(dados: typeAbout) {
        const about = new this.model(dados);
        return await about.save();
    }

    async buscar() {
        const resposta = await this.model.find();
        return resposta;
    }

    async editar(id: string, dados: typeAbout) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("ID inválido");
        }
        const resposta = await this.model.findByIdAndUpdate(id, dados, { new: true });
        return resposta;
    }

    async deletar(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("ID inválido");
        }
        const resposta = await this.model.findByIdAndDelete(id);
        return resposta;
    }
}

export default RepositoryAbout;