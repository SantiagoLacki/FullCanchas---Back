import routerProductos from "./productos.routes.js";
import routerUsuarios from "./usuarios.routes.js";
import { Router } from "express";

const router = Router();

router.use("/productos", routerProductos);
router.use("/usuarios", routerUsuarios);

export default router;
