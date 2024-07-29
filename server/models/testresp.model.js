const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    foreign: {
      type: Schema.Types.ObjectId,
    },
    user: {
      type: Schema.Types.ObjectId,
    },
    curse: {
      type: Schema.Types.ObjectId,
    },
    respuesta: { type: String },
    calification: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Testresp", userSchema);
