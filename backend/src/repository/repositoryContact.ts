import { typeContact } from "../types/typeContact.js";
import ModelContact from "../model/modelContact.js";
import mongoose from "mongoose";

class RepositoryContact {
    model: mongoose.Model<typeContact>;

    constructor() {
        this.model = ModelContact
    }

    async criar(dados: typeContact) {
        const contact = new this.model(dados);
        return await contact.save();
    }

    async buscar() {
        const resposta = await this.model.find();
        return resposta;
    }

    async editar(id: string, dados: typeContact) {
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

export default RepositoryContact;