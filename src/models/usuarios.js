import mongoose, { Schema } from "mongoose";

const usuariosSchema = new Schema(
  {
    nombreUsuario: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (valor) => {
          return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
            valor
          );
        },
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 100,
      validate: {
        validator: (valor) => {
          return /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,100}$/.test(
            valor
          );
        },
      },
    },
    rol: {
      type: String,
      enum: ["superAdmin", "admin", "empleado", "user"],
      default: "user",
    },
    habilitado: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Usuarios = mongoose.model("Usuario", usuariosSchema);

export default Usuarios;
