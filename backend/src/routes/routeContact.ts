import ControllerContact from "../controller/controllerContact.js";
import express from "express";

const routerContact = express.Router();
const controller = new ControllerContact();

routerContact
    .post('/contact', controller.criar.bind(controller))
    .get('/contact', controller.buscar.bind(controller))
    .delete('/contact/:id', controller.deletar.bind(controller));

export default routerContact;