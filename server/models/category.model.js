const { Schema, model, ObjectId } = require("mongoose");

const userSchema = new Schema(
  {
    nombre: { type: String },
    contenido: { type: String,},
  },
  {
    timestamps: true,
  }
);

module.exports = model("Category", userSchema);
