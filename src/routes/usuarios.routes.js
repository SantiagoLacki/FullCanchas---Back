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

const router = Router();

router.route("/").get(leerUsuarios).post(validarUsuarios, crearUsuario);
router.route("/paginado").get(usuariosPaginacion);
router
  .route("/:id")
  .get(leerUsuariosPorID)
  .delete(verificarJWT, borrarUsuario)
  .put([verificarJWT, validarUsuarios], editarUsuario);
router.route("/login").post(login);

export default router;
