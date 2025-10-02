import { validationResult } from "express-validator";

const resultadoValidacion = (req, res, next) => {
  const erorres = validationResult(req);
  if (!erorres.isEmpty()) {
    return res.status(400).json(erorres.array());
  }
  next();
};

export default resultadoValidacion;
