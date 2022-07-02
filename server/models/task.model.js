const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
    },
    section: {
      type: Schema.Types.ObjectId,
    },
    chapter: {
      type: Schema.Types.ObjectId,
    },
    curse: {
      type: Schema.Types.ObjectId,
    },
    file: { type: String },
    content: { type: String },
    note: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Task", userSchema);
