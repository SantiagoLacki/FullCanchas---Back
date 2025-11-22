import { Router } from "express";
import {
  crearProducto,
  leerProductos,
  leerProductoID,
  borrarProducto,
  editarProducto,
  productosPaginados,
} from "../controllers/productos.controllers.js";
import validarProducto from "../middleware/validarProductos.js";
import verificarJWT from "../middleware/verificarJWT.js";
import upload from "../middleware/upload.js";
import errorMulter from "../middleware/errorMulter.js";
import verificarUsuarioHabilitado from "../middleware/verificarUsuarioHabilitado.js";

const router = Router();

router
  .route("/")
  .get(leerProductos)
  .post(
    [
      verificarJWT,
      verificarUsuarioHabilitado,
      upload.single("imagen"),
      errorMulter,
      validarProducto,
    ],
    crearProducto
  );
router.route("/paginacion").get(productosPaginados);
router
  .route("/:id")
  .get(leerProductoID)
  .delete([verificarJWT, verificarUsuarioHabilitado], borrarProducto)
  .put(
    [
      verificarJWT,
      verificarUsuarioHabilitado,
      upload.single("imagen"),
      errorMulter,
      validarProducto,
    ],
    editarProducto
  );

export default router;
