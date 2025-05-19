const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    curse: {
      type: Schema.Types.ObjectId,
    },
    nombre: { type: String },
    contenido: { type: String },
    test: { type: String },
    fechaexa: { type: Date },
    timexa: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Chapter", userSchema);
