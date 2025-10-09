import subirImagen from "../helpers/cloudinaryUpload.js";
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
    let imagenUrl = "";
    if (req.file) {
      const resultado = await subirImagen(req.file.buffer);
      imagenUrl = resultado.secure_url;
    } else {
      imagenUrl =
        "https://media.istockphoto.com/id/1472933890/es/vector/no-hay-s%C3%ADmbolo-vectorial-de-imagen-falta-el-icono-disponible-no-hay-galer%C3%ADa-para-este.jpg?s=612x612&w=0&k=20&c=fTxCETonJ20MRRE6DFU9pbGws6e7sa1uySP49wU372I=";
    }

    const crearProducto = new Productos({ ...req.body, imagen: imagenUrl });
    await crearProducto.save();
    res.status(201).json({ message: "Producto creado con éxito" });
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
    let imagenUrl = "";
    if (req.file) {
      const resultado = await subirImagen(req.file.buffer);
      imagenUrl = resultado.secure_url;
    } else {
      imagenUrl =
        "https://media.istockphoto.com/id/1472933890/es/vector/no-hay-s%C3%ADmbolo-vectorial-de-imagen-falta-el-icono-disponible-no-hay-galer%C3%ADa-para-este.jpg?s=612x612&w=0&k=20&c=fTxCETonJ20MRRE6DFU9pbGws6e7sa1uySP49wU372I=";
    }

    const dataActualizada = {
      ...req.body,
      ...(imagenUrl && { imagen: imagenUrl }),
    };

    const productoEditado = await Productos.findByIdAndUpdate(
      req.params.id,
      dataActualizada
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

export const productosPaginados = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [productos, total] = await Promise.all([
      Productos.find().skip(skip).limit(limit),
      Productos.countDocuments(),
    ]);

    res.status(200).json({
      productos,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener los productos paginados" });
  }
};
