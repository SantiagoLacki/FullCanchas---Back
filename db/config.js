import mongoose from "mongoose";

try {
  mongoose.connect(process.env.MONGODB).then(() => {
    console.log("Conectado a la base de datos");
  });
} catch (error) {
  console.error(error);
}

export default mongoose;
