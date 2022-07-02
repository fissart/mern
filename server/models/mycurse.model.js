const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
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
