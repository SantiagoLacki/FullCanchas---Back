import mongoose, { Schema } from "mongoose";

const productoSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  imagen: { type: String, required: true },
});

const Productos = mongoose.model("productos", productosSchema);

export default Productos;
