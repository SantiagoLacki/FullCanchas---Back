import mongoose, { Schema } from "mongoose";

const reservasSchema = new Schema(
  {
    idUsuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuarios",
      required: true,
    },
    idCancha: {
      type: Schema.Types.ObjectId,
      ref: "Canchas",
      required: true,
    },
    dia: { type: Date, required: true },
    hora: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Reservas = mongoose.model("Reserva", reservasSchema);

export default Reservas;
