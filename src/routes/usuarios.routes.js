import { Router } from "express";
import {
  crearUsuario,
  leerUsuarios,
  login,
} from "../controllers/usuarios.controllers.js";

const router = Router();

router.route("/").get(leerUsuarios).post(crearUsuario);
router.route("/login").post(login);

export default router;
