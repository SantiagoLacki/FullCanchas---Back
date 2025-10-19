import Canchas from "../models/canchas.js";
import subirImagen from "../helpers/cloudinaryUpload.js";

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
    let imagenUrl = "";
    if (req.file) {
      const resultado = await subirImagen(req.file.buffer);
      imagenUrl = resultado.secure_url;
    } else {
      imagenUrl =
        "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg";
    }
    const crearCancha = new Canchas({ ...req.body, imagen: imagenUrl });
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
    const canchaBuscada = await Canchas.findById(req.params.id);
    if (!canchaBuscada) {
      return res.status(404).json({ mensaje: "La cancha no fue encontrada" });
    }
    let imagenUrl = canchaBuscada.imagen;
    if (req.file) {
      const resultado = await subirImagen(req.file.buffer);
      imagenUrl = resultado.secure_url;
    }
    await Canchas.findByIdAndUpdate(req.params.id, {
      ...req.body,
      imagen: imagenUrl,
    });
    res.status(200).json({ message: "Cancha editada con exito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al editar la cancha" });
  }
};
