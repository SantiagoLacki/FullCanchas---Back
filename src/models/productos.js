import mongoose, { Schema } from "mongoose";

const productoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
    unique: true,
  },
  precio: { type: Number, required: true, min: 0, max: 1000000 },
  categoria: {
    type: String,
    required: true,
    enum: ["Remeras", "Bebidas", "Snacks", "Pelotas"],
  },
  imagen: {
    type: String,
    required: true,
    validate: {
      validator: (valor) => {
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\.(jpg|jpeg|gif|png|webp))$/.test(
          valor
        );
      },
    },
  },
  descripcion: { type: String, required: true, minLength: 10, maxLength: 500 },
  habilitado: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Productos = mongoose.model("Producto", productoSchema);

export default Productos;
