import ControllerProjects from "../controller/controllerProjects.js";
import express from "express";

const routerProjects = express.Router();

const controller = new ControllerProjects();

routerProjects
    .get("/projects", controller.listar.bind(controller))
    .get("/projects/:id", controller.listarUm.bind(controller))
    .post("/projects", controller.criar.bind(controller))
    .patch("/projects/:id", controller.atualizar.bind(controller))
    .delete("/projects/:id", controller.deletar.bind(controller));

export default routerProjects;