const { Schema, model, ObjectId } = require("mongoose");

const userSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
    },
    curse: {
      type: Schema.Types.ObjectId,
    },
    units: { type: [] },
    unlikes: { type: [] },
    likes: { type: [] },
    type: { type: String },
    title: { type: String },
    detail: { type: String },
    theme: { type: String },
    fechaforum: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Foro", userSchema);
