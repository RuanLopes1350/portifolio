import { Request, Response } from "express";
import ServiceAbout from "../services/serviceAbout.js";
import { typeAbout } from "../types/typeAbout.js";

class ControllerAbout {
    private service: ServiceAbout;

    constructor() {
        this.service = new ServiceAbout();
    }

    async criar(req: Request, res: Response) {
        const dados: typeAbout = req.body;
        const resposta = await this.service.criar(dados);
        return res.status(201).json(resposta); // envia resposta ao cliente
    }

    async buscar(req: Request, res: Response) {
        const resposta = await this.service.buscar();
        return res.json(resposta); // envia resultado
    }

    async editar(req: Request, res: Response) {
        const id = req.params.id;
        const dados: typeAbout = req.body;
        const resposta = await this.service.editar(id, dados);
        return resposta;
    }

    async deletar(req: Request, res: Response) {
        const id = req.params.id;
        const resposta = await this.service.deletar(id);
        return resposta;
    }
}

export default ControllerAbout;