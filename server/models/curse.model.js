const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    title: String,
    description: String,
    img: String,
    especialidad: String,
    mencion: String,
    credito: String,
    ciclo: String,
    meet: String,
    show: String,
    codigo: String,
    requisito: String,
    year: String,
    user: {
      type: Schema.Types.ObjectId,
    },
    category: {
      type: Schema.Types.ObjectId,
    },
    nombre: { type: String },
    contenido: { type: String, required: true },
    tarea: { type: String, required: true },
    test: { type: String, required: true },
    fechaexamen: Date,
    fechatarea: Date,
    timexa: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Curse", userSchema);
