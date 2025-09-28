export const isAdmin = (req, res, next) => {
  const { rol, secretKey } = req.body;
  if (rol === "admin" && secretKey === process.env.ADMIN_SECRET_KEY) {
    return next();
  }

  return res.status(403).json({
    mensaje:
      "Error de carácter administrativo. Nuestro personal ha sido informado sobre esta acción.",
  });
};
