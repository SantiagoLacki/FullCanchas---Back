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

const router = Router();

router
  .route("/")
  .get(leerCanchas)
  .post(
    [verificarJWT, upload.single("imagen"), errorMulter, validarCanchas],
    crearCancha
  );
router
  .route("/:id")
  .get(leerCanchasID)
  .delete(verificarJWT, borrarCancha)
  .put(
    [verificarJWT, upload.single("imagen"), errorMulter, validarCanchas],
    editarCancha
  );

export default router;
