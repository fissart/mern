const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    curse: {
      type: Schema.Types.ObjectId,
    },
    link: { type: String },
    file: { type: String },
    name: { type: String },
    type: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Link", userSchema);
