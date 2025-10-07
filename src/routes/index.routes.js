import routerProductos from "./productos.routes.js";
import routerUsuarios from "./usuarios.routes.js";
import routerCanchas from "./canchas.routes.js";
import routerReservas from "./reservas.routes.js";
import { Router } from "express";

const router = Router();

router.use("/productos", routerProductos);
router.use("/usuarios", routerUsuarios);
router.use("/canchas", routerCanchas);
router.use("/reservas", routerReservas);

export default router;
