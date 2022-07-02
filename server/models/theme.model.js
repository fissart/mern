const { Schema, model, ObjectId } = require("mongoose");

const userSchema = new Schema(
  {
    curse: {
      type: Schema.Types.ObjectId,
    },
    theme: { type: String },
    fechaforum: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Theme", userSchema);
