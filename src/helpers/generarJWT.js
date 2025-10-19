import jwt from "jsonwebtoken";

const generarJWT = async (nombreUsuario, email) => {
  try {
    const payload = { nombreUsuario, email };
    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "2h",
    });
    return token;
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo generar el token");
  }
};

export default generarJWT;
