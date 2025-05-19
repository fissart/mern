const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    curse: {
      type: Schema.Types.ObjectId,
    },
    user: {
      type: Schema.Types.ObjectId,
    },
    file: { type: String },
    title: { type: String },
    description: { type: String },
    type: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Collection", userSchema);
