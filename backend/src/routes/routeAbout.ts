import express from "express";
import ControllerAbout from "../controller/controllerAbout.js";

const routerAbout = express.Router();
const controllerAbout = new ControllerAbout();

routerAbout
    .get("/about", controllerAbout.buscar.bind(controllerAbout))
    .post("/about", controllerAbout.criar.bind(controllerAbout))
    .patch("/about/:id", controllerAbout.editar.bind(controllerAbout))
    .delete("/about/:id", controllerAbout.deletar.bind(controllerAbout));

export default routerAbout;