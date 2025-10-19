import jwt from "jsonwebtoken";

const verificarJWT = (req, res, next) => {
  try {
    const token = req.headers["x-token"];
    if (!token) {
      res.status(401).json({ mensaje: "No se envio el token la solicitud" });
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.nombreUsuario = payload.nombreUsuario;
    req.email = payload.email;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ mensaje: "Token invalido", error: error.message });
  }
};

export default verificarJWT;
