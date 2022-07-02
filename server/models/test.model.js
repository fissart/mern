const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    foreign: {
      type: Schema.Types.ObjectId,
    },
    preguntas: { type: String },
    respuestas: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Test", userSchema);
