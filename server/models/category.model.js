const { Schema, model, ObjectId } = require("mongoose");

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
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Category", userSchema);
