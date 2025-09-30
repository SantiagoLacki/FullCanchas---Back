import { Router } from "express";
import {
  crearUsuario,
  leerUsuarios,
  login,
} from "../controllers/usuarios.controllers.js";
import { isAdminOrStaff } from "../middleware/validarAdminStaff.js";
import validarUsuarios from "../middleware/validarUsuarios.js";

const router = Router();

router
  .route("/")
  .get(leerUsuarios)
  .post([validarUsuarios, isAdminOrStaff], crearUsuario);
router.route("/login").post(login);

export default router;
