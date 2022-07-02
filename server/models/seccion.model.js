const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    chapter: {
      type: Schema.Types.ObjectId
    },
    nombre: { type: String },
    contenido: { type: String},
    tarea: { type: String },
    fechaexa: Date,
    timexa: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Seccion", userSchema);
