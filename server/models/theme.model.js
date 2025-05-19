const { Schema, model, ObjectId } = require("mongoose");

const userSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
    },
    curse: {
      type: Schema.Types.ObjectId,
    },
    title: { type: String },
    theme: { type: String },
    fechaforum: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Ttheme", userSchema);
