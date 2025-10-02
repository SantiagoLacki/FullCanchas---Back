import Reservas from "../models/reservas.js";

const leerReservas = async (req, res) => {
  try {
    const reservas = Reservas.find().populate("idUsuario");
    res.status(200).json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al leer las reservas" });
  }
};

const leerReservasPorID = async (req, res) => {
  try {
    const reservaBuscada = Reservas.findById(req.body.id).populate("idUsuario");
    if (!reservaBuscada)
      return res.status(404).json({ message: "Reserva no encontrado" });
    res.status(200).json(reservaBuscada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al leer la reserva" });
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
