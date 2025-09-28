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
    enum: ["césped", "césped artificial", "tierra", "pista dura"],
    trim: true,
  },
  precioPorHora: {
    type: Number,
    required: true,
    min: 0,
  },
  disponibilidad: { type: String, enum: [true, false], default: true },
});

const Canchas = mongoose.model("Cancha", canchasSchema);

export default Canchas;
