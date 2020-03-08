const { Schema, model } = require('mongoose');

//Esquema con el cual se van a guardar los datos en MongoDB
const BookSchema = new Schema ({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true },
    imagePath: { type:String },
    created_at: { type: Date, default: Date.now }
});

module.exports = model('Book', BookSchema);