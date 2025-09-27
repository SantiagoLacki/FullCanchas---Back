import routerProductos from "./porductos.routes.js";
import { Router } from "express";

const router = Router();

router.use("/productos", routerProductos);

export default router;
