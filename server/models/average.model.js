const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
  {
    teacher: { type: String, required: true  },
    teacherid: { type: Schema.Types.ObjectId, required: true  },
    useremail: { type: String, required: true  },
    user: { type: Schema.Types.ObjectId, required: true  },
    curso: { type: Schema.Types.ObjectId, required: true  },
    title: { type: String, required: true },
    ciclo: { type: String, required: true },
    codigo: { type: String, required: true },
    credito: { type: String, required: true },
    mencion: { type: String, required: true },
    nota: { type: String, required: true },
    year: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Average", noteSchema);
