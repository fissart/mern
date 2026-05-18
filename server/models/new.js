const { Schema, model, ObjectId } = require("mongoose");

const userSchema = new Schema(
  {
    title: String,
    description: String,
    img: String,
    show: String,
    user: {
      type: Schema.Types.ObjectId,
    }
  },
  {
    timestamps: true,
    collation: { locale: 'es' }
  }
);

module.exports = model("New", userSchema);
