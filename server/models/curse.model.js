const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
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
