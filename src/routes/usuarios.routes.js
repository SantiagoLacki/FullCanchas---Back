import { Router } from "express";
import {
  borrarUsuario,
  crearUsuario,
  editarUsuario,
  leerUsuarios,
  leerUsuariosPorID,
  login,
  usuariosPaginacion,
} from "../controllers/usuarios.controllers.js";
import validarUsuarios from "../middleware/validarUsuarios.js";
import verificarJWT from "../middleware/verificarJWT.js";
import asignarRol from "../middleware/asignarRol.js";
import verificarUsuarioHabilitado from "../middleware/verificarUsuarioHabilitado.js";

const router = Router();

router
  .route("/")
  .get(leerUsuarios)
  .post([validarUsuarios, asignarRol], crearUsuario);
router.route("/paginado").get(usuariosPaginacion);
router
  .route("/:id")
  .get(leerUsuariosPorID)
  .delete([verificarJWT, verificarUsuarioHabilitado], borrarUsuario)
  .put([verificarJWT, verificarUsuarioHabilitado, asignarRol], editarUsuario);
router.route("/login").post(login);

export default router;
