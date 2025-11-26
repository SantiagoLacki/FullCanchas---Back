import mongoose, { Schema } from "mongoose";

const canchasSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
    trim: true,
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
  tipoDeSuperficie: {
    type: String,
    required: true,
    enum: ["Césped", "Césped artificial", "Tierra", "Pista dura"],
  },
  precioPorHora: {
    type: Number,
    required: true,
    min: 0,
    max: 1000000,
  },
  habilitado: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Canchas = mongoose.model("Cancha", canchasSchema);

export default Canchas;
