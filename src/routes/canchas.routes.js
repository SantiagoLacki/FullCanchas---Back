import { Router } from "express";
import {
  borrarCancha,
  crearCancha,
  editarCancha,
  leerCanchas,
  leerCanchasID,
} from "../controllers/canchas.controllers.js";

const router = Router();

router.route("/").get(leerCanchas).post(crearCancha);
router.route("/:id").get(leerCanchasID).delete(borrarCancha).put(editarCancha);

export default router;
