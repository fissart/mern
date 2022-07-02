const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
  {
    nombre: String,
    mensaje: { type: String, required: true },
    id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Chat", noteSchema);
