import ServiceContact from "../services/serviceContact.js";
import { Request, Response } from "express";
import { typeContact } from "../types/typeContact.js";

class ControllerContact {
    service: ServiceContact;

    constructor() {
        this.service = new ServiceContact();
    }

    async criar(req: Request, res: Response) {
        const dados: typeContact = req.body;
        const resposta = await this.service.criar(dados);
        return res.status(201).json(resposta);
    }

    async buscar(req: Request, res: Response) {
        const resposta = await this.service.buscar();
        return res.status(200).json(resposta);
    }

    async deletar(req: Request, res: Response) {
        const { id } = req.params;
        const resposta = await this.service.deletar(id);
        return res.status(200).json(resposta);
    }
}

export default ControllerContact;