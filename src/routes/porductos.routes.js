import { Router } from "express";
import {
  crearProducto,
  leerProductos,
} from "../controllers/productos.controllers";

const router = Router();

router.route("/").get(leerProductos).post(crearProducto);

export default router;
