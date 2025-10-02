import Reservas from "../models/reservas.js";

const leerReservas = async (req, res) => {
  try {
    const reservas = Reservas.find().populate("idUsuario");
    res.status(200).json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "No se pudo crear la reserva" });
  }
};
