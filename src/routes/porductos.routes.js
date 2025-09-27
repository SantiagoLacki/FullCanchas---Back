import { Router } from "express";
import {
  crearProducto,
  leerProductos,
} from "../controllers/productos.controllers.js";

const router = Router();

router.route("/productos").get(leerProductos).post(crearProducto);

export default router;
