const { Schema, model, ObjectId } = require("mongoose");

const userSchema = new Schema(
  {
    title: { type: String },
    theme: { type: String },
    type: { type: String },
    curse: {
      type: Schema.Types.ObjectId,
    },
    theme: {
      type: Schema.Types.ObjectId,
    },
    foreign: {
      type: Schema.Types.ObjectId,
    },
    identificadortema: {
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

module.exports = model("Comment", userSchema);
