import express from "express";
import ControllerSkills from "../controller/controllerSkills.js";

const controller = new ControllerSkills();

const routerSkills = express.Router();

routerSkills
    .post("/skills", (req, res) => controller.criar(req, res))
    .get("/skills", (req, res) => controller.listar(req, res))
    .delete("/skills/:id", (req, res) => controller.deletar(req, res));

export default routerSkills;