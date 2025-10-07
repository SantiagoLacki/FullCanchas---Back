export const isAdminOrStaff = (req, res, next) => {
  const { rol, secretKey } = req.body;
  if (rol === "admin") {
    if (secretKey === process.env.ADMIN_SECRET_KEY) {
      req.rolAsignado = "admin";
      return next();
    }
    return res.status(403).json({
      mensaje: "Intento de creación malicioso. Acceso denegado.",
    });
  }

  if (rol === "staff") {
    if (secretKey === process.env.STAFF_SECRET_KEY) {
      req.rolAsignado = "staff";
      return next();
    }
    return res.status(403).json({
      mensaje: "Intento de creación malicioso. Acceso denegado.",
    });
  }

  if (!rol || !secretKey) {
    req.rolAsignado = "user";
    return next();
  } else if (!rol && secretKey) {
    res
      .status(403)
      .json({ mensaje: "Intento de creación malicioso. Acceso denegado." });
  }

  console.warn("Intento de acceso malicioso detectado", {
    ip: req.ip,
    body: { ...req.body, password: undefined, secretKey: undefined },
    time: new Date().toISOString(),
  });

  return res.status(403).json({
    mensaje: "Rol inválido o intento de acceso malicioso.",
  });
};
