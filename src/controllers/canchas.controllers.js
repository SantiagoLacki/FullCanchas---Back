import Canchas from "../models/canchas.js";

export const leerCanchas = async (req, res) => {
  try {
    const listaCanchas = await Canchas.find();
    res.status(200).json(listaCanchas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al leer los canchas" });
  }
};

export const leerCanchasID = async (req, res) => {
  try {
    const cancha = await Canchas.findById(req.params.id);
    if (!cancha) {
      return res.status(404).json({ message: "Cancha no encontrada" });
    }
    res.status(200).json(cancha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al leer la cancha" });
  }
};

export const crearCancha = async (req, res) => {
  try {
    const crearCancha = new Canchas(req.body);
    await crearCancha.save();
    res.status(201).json({ message: "Cancha creada con exito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la cancha" });
  }
};

export const borrarCancha = async (req, res) => {
  try {
    const canchaBorrada = await Canchas.findByIdAndDelete(req.params.id);
    if (!canchaBorrada) {
      return res.status(404).json({ message: "Cancha no encontrada" });
    }
    res.status(200).json({ message: "Cancha borrada con exito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al borrar la cancha" });
  }
};

export const editarCancha = async (req, res) => {
  try {
    const canchaEditada = await Canchas.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!canchaEditada) {
      return res.status(404).json({ message: "Cancha no encontrada" });
    }
    res.status(200).json({ message: "Cancha editada con exito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al editar la cancha" });
  }
};
