import jwt from "jsonwebtoken";
import Usuario from "../models/usuarios.js";

const verificarJWT = async (req, res, next) => {
  try {
    const token = req.headers["x-token"];
    if (!token) {
      console.error("ERROR: No hay token en los headers");
      return res.status(401).json({
        mensaje: "No se envió el token en la solicitud",
      });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const usuario = await Usuario.findOne({ email: payload.email });

    if (!usuario) {
      return res.status(401).json({
        mensaje: "Usuario no encontrado",
      });
    }

    req.usuario = {
      _id: usuario._id.toString(),
      nombreUsuario: usuario.nombreUsuario,
      email: usuario.email,
      rol: usuario.rol,
      habilitado: usuario.habilitado,
    };

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ mensaje: "Token invalido", error: error.message });
  }
};

export default verificarJWT;
