const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    type: String,
    user: {
      type: Schema.Types.ObjectId,
    },
    curse: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Mycurse", userSchema);
