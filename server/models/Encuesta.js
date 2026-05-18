"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    idstudent: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    idteacher: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    idcurso: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    codigo: String,
    year: String,
    ciclo: String,
    mencion: String,
    items: [{}]
})
exports.default = (0, mongoose_1.model)('Encuesta', schema);
