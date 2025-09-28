import { Router } from "express";
import {
  crearProducto,
  leerProductos,
  leerProductoID,
} from "../controllers/productos.controllers.js";

const router = Router();

router.route("/").get(leerProductos).post(crearProducto);
router.route("/:id").get(leerProductoID);

export default router;
