import Productos from "../models/productos.js";

export const leerProductos = (req, res) => {};

export const crearProducto = async (req, res) => {
  try {
    console.log(req.body);
    const crearProducto = new Productos(req.body);
    await crearProducto.save();
    res.status(201).json({ message: "Producto creado con exito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el producto" });
  }
};
