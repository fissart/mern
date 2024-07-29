const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    chapter: {
      type: Schema.Types.ObjectId
    },
    title: { type: String },
    description: { type: String},
    task: { type: String },
    dateb: { type: String },
    datee: { type: String },
    fechaexa: Date,
    timexa: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Theme", userSchema);
