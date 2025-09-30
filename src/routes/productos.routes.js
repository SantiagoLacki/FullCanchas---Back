import { Router } from "express";
import {
  crearProducto,
  leerProductos,
  leerProductoID,
  borrarProducto,
  editarProducto,
} from "../controllers/productos.controllers.js";
import validarProducto from "../middleware/validarProductos.js";
import verificarJWT from "../middleware/verificarJWT.js";

const router = Router();

router
  .route("/")
  .get(leerProductos)
  .post([verificarJWT, validarProducto], crearProducto);
router
  .route("/:id")
  .get(leerProductoID)
  .delete(borrarProducto)
  .put(validarProducto, editarProducto);

export default router;
