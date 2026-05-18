const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId
    },
    curse: {
      type: Schema.Types.ObjectId
    },
    title: { type: String },
    idtheme: { type: String },
    description: { type: String},
    task: { type: String },
    dateb: { type: Date },
    datee: { type: Date },
    fechaexa: { type: Date },
    timexa: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Theme", userSchema);
