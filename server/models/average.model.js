const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
  {
    teacher: { type: Schema.Types.ObjectId, },
    user: { type: Schema.Types.ObjectId, },
    curse: { type: Schema.Types.ObjectId, },
    title: { type: String, required: true },
    mensaje: { type: String, required: true },
    ciclo: { type: String, required: true },
    nota: { type: String, required: true },
    year: { type: String, required: true },
    codigo: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Average", noteSchema);
