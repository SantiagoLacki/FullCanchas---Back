import Productos from "../models/productos.js";

export const leerProductos = async (req, res) => {
  try {
    const listaProductos = await Productos.find();
    res.status(200).json(listaProductos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al leer los productos" });
  }
};

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
