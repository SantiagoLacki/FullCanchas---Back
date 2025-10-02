export const isAdminOrStaff = (req, res, next) => {
  const { rol, secretKey } = req.body;
  if (rol === "admin" && secretKey === process.env.ADMIN_SECRET_KEY) {
    req.rolAsignado = "admin";
    return next();
  }

  if (rol === "staff" && secretKey === process.env.STAFF_SECRET_KEY) {
    req.rolAsignado = "staff";
    return next();
  }

  if (!rol || !secretKey) {
    req.rolAsignado = "user";
    return next();
  }

  console.warn("Intento de acceso malicioso detectado", {
    ip: req.ip,
    body: { ...req.body, password: undefined, secretKey: undefined },
    time: new Date().toISOString(),
  });

  return res.status(403).json({
    mensaje: "Acceso denegado.",
  });
};
