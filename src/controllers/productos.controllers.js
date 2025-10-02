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

export const leerProductoID = async (req, res) => {
  try {
    const producto = await Productos.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al leer el producto" });
  }
};

export const crearProducto = async (req, res) => {
  try {
    const crearProducto = new Productos(req.body);
    await crearProducto.save();
    res.status(201).json({ message: "Producto creado con exito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el producto" });
  }
};

export const borrarProducto = async (req, res) => {
  try {
    const productoBorrado = await Productos.findByIdAndDelete(req.params.id);
    if (!productoBorrado) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto borrado con exito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al borrar el producto" });
  }
};

export const editarProducto = async (req, res) => {
  try {
    const productoEditado = await Productos.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!productoEditado) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto editado con exito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al editar el producto" });
  }
};
