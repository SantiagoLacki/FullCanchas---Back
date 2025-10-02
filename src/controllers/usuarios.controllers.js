import generarJWT from "../helpers/generarJWT.js";
import Usuario from "../models/usuarios.js";
import bcrypt from "bcrypt";

export const leerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al leer los usuarios" });
  }
};

export const leerUsuariosPorID = async (req, res) => {
  try {
    const usuarioBuscado = await Usuario.findOne(req.params.id);
    if (!usuarioBuscado)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json(usuarioBuscado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al leer los usuarios" });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const { nombreUsuario, email, password } = req.body;
    const saltos = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, saltos);

    const nuevoUsuario = new Usuario({
      nombreUsuario,
      email,
      password: passwordHash,
      rol: req.rolAsignado,
    });
    await nuevoUsuario.save();
    res.status(201).json({
      mensaje: `El usuario: ${nuevoUsuario.nombreUsuario} fue registrado exitosamente`,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "El email ya está registrado" });
    }
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear el usuario" });
  }
};

export const borrarUsuario = async (req, res) => {
  try {
    const usuarioBorrado = await Usuario.findOneAndDelete(req.params.id);
    if (!usuarioBorrado)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json({ message: "Usuario borrado con exito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al borrar los usuarios" });
  }
};

export const editarUsuario = async (req, res) => {
  try {
    const usuarioEditado = await Usuario.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!usuarioEditado)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json({ message: "Usuario editado con exito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al editar los usuarios" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuarioExistente = await Usuario.findOne({ email });
    if (!usuarioExistente) {
      return res.status(404).json({ mensaje: "No se encontro el usuario" });
    }
    const passwordVerificado = bcrypt.compareSync(
      password,
      usuarioExistente.password
    );
    if (!passwordVerificado) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }
    const token = await generarJWT(
      usuarioExistente.nombreUsuario,
      usuarioExistente.email
    );
    res.status(200).json({
      mensaje: "Login exitoso",
      nombreUsuario: usuarioExistente.nombreUsuario,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al loguear el usuario" });
  }
};
