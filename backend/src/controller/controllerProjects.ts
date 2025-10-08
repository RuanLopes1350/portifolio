import ServiceProjects from "../services/serviceProjects.js";
import { Request, Response } from "express";

class ControllerProjects {
    service: ServiceProjects;

    constructor() {
        this.service = new ServiceProjects();
    }

    async criar(req: Request, res: Response) {
        const dados = req.body;
        const resposta = await this.service.criar(dados);
        res.status(201).json(resposta);
    }

    async listar(req: Request, res: Response) {
        const resposta = await this.service.listar();
        res.status(200).json(resposta);
    }

    async listarUm(req: Request, res: Response) {
        const { id } = req.params;
        const resposta = await this.service.listarUm(id);
        res.status(200).json(resposta);
    }

    async atualizar(req: Request, res: Response) {
        const { id } = req.params;
        const dados = req.body;
        const resposta = await this.service.atualizar(id, dados);
        res.status(200).json(resposta);
    }

    async deletar(req: Request, res: Response) {
        const { id } = req.params;
        const resposta = await this.service.deletar(id);
        res.status(200).json(resposta);
    }
}

export default ControllerProjects;