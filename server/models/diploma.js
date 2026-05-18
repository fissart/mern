const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    title: { type: String },
    institute: { type: String },
    faculty: { type: String },
    scola: { type: String },
    user: {
      type: Schema.Types.ObjectId,
    },
    username: { type: String },
    code: { type: String },
    description: { type: String },
    nota: { type: String },
    ip: { type: [] },
    units: { type: [] },
    Módulos: { type: String },
    Número: { type: String },
    QR: { type: String },
    type: { type: String },
    dateb: { type: String },
    datee: { type: String },
    signature1: { type: String },
    signature2: { type: String },
    signature3: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Certificate", userSchema);
