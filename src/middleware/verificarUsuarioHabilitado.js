export const verificarUsuarioHabilitado = (req, res, next) => {
  if (!req.usuario.habilitado) {
    return res.status(403).json({ mensaje: "Cuenta deshabilitada" });
  }
  next();
};
