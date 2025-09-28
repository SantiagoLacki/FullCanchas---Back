import { Router } from "express";
import {
  crearUsuario,
  leerUsuarios,
  login,
} from "../controllers/usuarios.controllers.js";
import { isAdmin } from "../middleware/validarAdmin.js";

const router = Router();

router.route("/").get(leerUsuarios).post(isAdmin, crearUsuario);
router.route("/login").post(login);

export default router;
