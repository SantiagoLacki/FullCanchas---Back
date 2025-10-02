import Reservas from "../models/reservas.js";

const leerReservas = async (req, res) => {
  try {
    const reservas = Reservas.find().populate("idUsuario");
    res.status(200).json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "No se pudo leer la reserva" });
  }
};

const crearReservas = async (req, res) => {
  try {
    const crearReservas = new Reservas(req.body);
    await crearReservas.save();
    res.status(201).json({ mensaje: "La reserva fue creada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "No se pudo crear la reserva" });
  }
};
