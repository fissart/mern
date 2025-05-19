const { Schema, model, ObjectId } = require("mongoose");

const userSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
    },
    title: String,
    codigo: String,
    type: String,
    img: String,
    blogspot: String,
    youtube: String,
    instagram: String,
    whatsapp: String,
    facebook: String,
    description: String,
    curse: {
      type: Schema.Types.ObjectId,
    }
    },
  {
    timestamps: true,
  }
);

module.exports = model("Filecursew", userSchema);
