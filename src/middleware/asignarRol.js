const asignarRol = (req, res, next) => {
  const { rol } = req.body;
  if (!req.usuario) {
    req.rolAsignado = rol ?? "user";
    return next();
  }

  if (req.usuario.rol === "superAdmin") {
    req.rolAsignado = rol ?? "user";
    return next();
  }

  if (req.usuario.rol === "admin") {
    if (rol === "empleado" || rol === "user") {
      req.rolAsignado = rol;
      return next();
    }
    return res.status(403).json({
      mensaje: "Un admin solo puede crear empleados o usuarios comunes",
    });
  }
  return res.status(403).json({
    mensaje: "No tienes permisos para crear usuarios",
  });
};

export default asignarRol;