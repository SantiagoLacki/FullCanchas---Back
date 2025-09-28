import { Router } from "express";
import {
  crearProducto,
  leerProductos,
  leerProductoID,
  borrarProducto,
} from "../controllers/productos.controllers.js";

const router = Router();

router.route("/").get(leerProductos).post(crearProducto);
router.route("/:id").get(leerProductoID).delete(borrarProducto);

export default router;
