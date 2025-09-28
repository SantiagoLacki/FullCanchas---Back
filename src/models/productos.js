import mongoose, { Schema } from "mongoose";

const productoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 100,
    unique: true,
  },
  precio: { type: Number, required: true, min: 1, max: 1000000 },
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
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\.(jpg|jpeg|png|webp))$/.test(
          valor
        );
      },
    },
  },
  descripcion: { type: String, required: true, minLength: 10, maxLength: 500 },
});

const Productos = mongoose.model("producto", productoSchema);

export default Productos;
