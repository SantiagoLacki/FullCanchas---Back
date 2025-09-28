import { Router } from "express";
import { leerUsuarios } from "../controllers/usuarios.controllers.js";

const router = Router();

router.route("/").get(leerUsuarios);

export default router;
