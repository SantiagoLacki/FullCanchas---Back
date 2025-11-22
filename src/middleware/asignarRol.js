const asignarRol = (req, res, next) => {
  const { rol } = req.body;
  if (!req.usuario) {
    req.rolAsignado = "user";
    return next();
  }

  if (req.usuario.rol === "admin") {
    if (rol === "empleado") {
      req.rolAsignado = "empleado";
      return next();
    }
    return res.status(403).json({
      mensaje: "Un admin solo puede crear empleados",
    });
  }

  req.rolAsignado = "user";
  next();
};

export default asignarRol;
