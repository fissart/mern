const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, },
    mensaje: { type: String, required: true },
    nombre: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Chat", noteSchema);
