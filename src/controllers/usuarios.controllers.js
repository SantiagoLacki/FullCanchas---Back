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
    const usuarioBuscado = await Usuario.findById(req.params.id);
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
    const usuarioBorrado = await Usuario.findByIdAndDelete(req.params.id);
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
    const { nombreUsuario, email, password } = req.body;
    const datosActualizados = {};
    if (nombreUsuario) datosActualizados.nombreUsuario = nombreUsuario;
    if (email) datosActualizados.email = email;
    if (password) {
      const saltos = bcrypt.genSaltSync(10);
      datosActualizados.password = bcrypt.hashSync(password, saltos);
    }
    if (req.rolAsignado) datosActualizados.rol = req.rolAsignado;

    const usuarioEditado = await Usuario.findByIdAndUpdate(
      req.params.id,
      datosActualizados
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
    if (!usuarioExistente.habilitado) {
      return res.status(403).json({ mensaje: "Usuario deshabilitado" });
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
      id: usuarioExistente.id,
      nombreUsuario: usuarioExistente.nombreUsuario,
      rol: usuarioExistente.rol,
      email: usuarioExistente.email,
      habilitado: usuarioExistente.habilitado,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al loguear el usuario" });
  }
};

export const usuariosPaginacion = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [usuario, total] = await Promise.all([
      Usuario.find().skip(skip).limit(limit),
      Usuario.countDocuments(),
    ]);

    res.status(200).json({
      usuario,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al leer los usuarios" });
  }
};
