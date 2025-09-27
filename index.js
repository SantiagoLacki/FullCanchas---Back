import Server from "./server/config.js";
import router from "./src/routes/porductos.routes.js";

const server = new Server();

server.app.use("/api", router)

server.listen();
