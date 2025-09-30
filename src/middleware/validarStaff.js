export const isStaff = (req, res, next) => {
  const { rol, secretKey } = req.body;
  if (rol === "staff" && secretKey === process.env.STAFF_SECRET_KEY)
    return next();

  console.warn("Intento de acceso malicioso detectado", {
    ip: req.ip,
    body: req.body,
    time: new Date().toISOString(),
  });

  return res.status(403).json({
    mensaje: "Acceso denegado.",
  });
};
