import Reservas from "../models/reservas.js";

export const leerReservas = async (req, res) => {
  try {
    const reservas = await Reservas.find()
      .populate("idUsuario")
      .populate("idCancha");
    res.status(200).json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al leer las reservas" });
  }
};

export const leerReservasPorID = async (req, res) => {
  try {
    const reservaBuscada = await Reservas.findById(req.params.id)
      .populate("idUsuario")
      .populate("idCancha");
    if (!reservaBuscada)
      return res.status(404).json({ message: "Reserva no encontrado" });
    res.status(200).json(reservaBuscada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al leer la reserva" });
  }
};

export const crearReservas = async (req, res) => {
  try {
    const crearReservas = new Reservas(req.body);
    await crearReservas.save();
    res.status(201).json({ mensaje: "La reserva fue creada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "No se pudo crear la reserva" });
  }
};

export const borrarReserva = async (req, res) => {
  try {
    const reservaBorrada = await Reservas.findByIdAndDelete(req.params.id);
    if (!reservaBorrada)
      return res.status(404).json({ message: "Reserva no encontrada" });
    res.status(200).json({ message: "Reserva borrada con exito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "No se pudo borrar la reserva" });
  }
};

export const editarReserva = async (req, res) => {
  try {
    const reservaEditada = await Reservas.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!reservaEditada)
      return res.status(404).json({ message: "Reserva no encontrado" });
    res.status(200).json({ message: "Reserva editada con exito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "No se pudo editar la reserva" });
  }
};

export const reservasPaginadas = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [reservas, total] = await Promise.all([
      Reservas.find()
        .skip(skip)
        .limit(limit)
        .populate("idUsuario")
        .populate("idCancha"),
      Reservas.countDocuments(),
    ]);

    res.status(200).json({
      reservas,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al leer las reservas" });
  }
};
