const verificarUsuarioHabilitado = (req, res, next) => {
  if (!req.usuario.habilitado) {
    return res
      .status(403)
      .json({
        mensaje:
          "Cuenta deshabilitada, todas sus funciones fueron deshabilitadas",
      });
  }
  next();
};
export default verificarUsuarioHabilitado;
