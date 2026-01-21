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
        "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg";
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
    const productoBuscado = await Productos.findById(req.params.id);
    if (!productoBuscado) {
      return res.status(404).json({ mensaje: "El producto no fue encontrado" });
    }
    const datosActualizados = {};
    if (req.body.nombre !== undefined)
      datosActualizados.nombre = req.body.nombre;
    if (req.body.precio !== undefined)
      datosActualizados.precio = req.body.precio;
    if (req.body.categoria !== undefined)
      datosActualizados.categoria = req.body.categoria;
    if (req.body.descripcion !== undefined)
      datosActualizados.descripcion = req.body.descripcion;
    if (req.body.habilitado !== undefined) {
      if (req.body.habilitado === "false" || req.body.habilitado === false) {
        datosActualizados.habilitado = false;
      } else {
        datosActualizados.habilitado = true;
      }
    }

    let imagenUrl = productoBuscado.imagen;

    if (req.file) {
      const resultado = await subirImagen(req.file.buffer);
      imagenUrl = resultado.secure_url;
    }

    if (req.file) {
      datosActualizados.imagen = imagenUrl;
    }

    await Productos.findByIdAndUpdate(req.params.id, datosActualizados, {
      new: true,
    });

    res.status(200).json({ mensaje: "El producto fue editado correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al intentar editar el producto" });
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
