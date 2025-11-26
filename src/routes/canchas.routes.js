import { Router } from "express";
import {
  borrarCancha,
  crearCancha,
  editarCancha,
  leerCanchas,
  leerCanchasID,
} from "../controllers/canchas.controllers.js";
import validarCanchas from "../middleware/validarCanchas.js";
import verificarJWT from "../middleware/verificarJWT.js";
import upload from "../middleware/upload.js";
import errorMulter from "../middleware/errorMulter.js";
import verificarUsuarioHabilitado from "../middleware/verificarUsuarioHabilitado.js";

const router = Router();

router
  .route("/")
  .get(leerCanchas)
  .post(
    [
      verificarJWT,
      verificarUsuarioHabilitado,
      upload.single("imagen"),
      errorMulter,
      validarCanchas,
    ],
    crearCancha
  );
router
  .route("/:id")
  .get(leerCanchasID)
  .delete([verificarJWT, verificarUsuarioHabilitado], borrarCancha)
  .put(
    [
      verificarJWT,
      verificarUsuarioHabilitado,
      upload.single("imagen"),
      errorMulter,
      validarCanchas,
    ],
    editarCancha
  );

export default router;
