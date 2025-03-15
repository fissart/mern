const { Schema, model, ObjectId } = require("mongoose");

const userSchema = new Schema(
  {
    nota: String,
    teacher: {
      type: Schema.Types.ObjectId,
    },
    user: {
      type: Schema.Types.ObjectId,
    },
    curse: {
      type: Schema.Types.ObjectId,
    },
    title: String,
    ciclo: String,
    credito: String,
    especialidad: String,
    year: String,
  },
  {
    timestamps: true
  }
);

module.exports = model("Cursesource", userSchema);
