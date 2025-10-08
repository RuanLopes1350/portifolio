import ServiceSkills from "../services/serviceSkills.js";
import { Request, Response } from "express";
import { typeSkills } from "../types/typeSkills.js";

class ControllerSkills {
    private service: ServiceSkills;

    constructor() {
        this.service = new ServiceSkills()
    }

    async criar(req: Request, res: Response) {
        const dados: typeSkills = req.body;
        const resposta = await this.service.criar(dados);
        return res.status(201).json(resposta);
    }

    async listar(req: Request, res: Response) {
        const resposta = await this.service.listar();
        return res.status(200).json(resposta);
    }

    async deletar(req: Request, res: Response) {
        const { id } = req.params;
        const resposta = await this.service.deletar(id);
        return res.status(200).json(resposta);
    }
}

export default ControllerSkills;