const { Schema, model, ObjectId } = require("mongoose");

const userSchema = new Schema(
  {
    foreign: {
      type: Schema.Types.ObjectId,
    },
    user: { type: Schema.Types.ObjectId },
    comment: { type: String },
    calification: { type: Number },
    likes: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = model("C5", userSchema);
