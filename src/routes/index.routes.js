import routerProductos from "./productos.routes.js";
import { Router } from "express";

const router = Router();

router.use("/productos", routerProductos);

export default router;
