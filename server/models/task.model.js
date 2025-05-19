const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    theme: {
      type: Schema.Types.ObjectId,
    },
    curse: {
      type: Schema.Types.ObjectId,
    },
    unidad: {
      type: Schema.Types.ObjectId,
    },
    user: {
      type: Schema.Types.ObjectId,
    },
    file: { type: String },
    solution: { type: String },
    task: { type: String },
    dateb: { type: String },
    datee: { type: String },
    note: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Task", userSchema);
