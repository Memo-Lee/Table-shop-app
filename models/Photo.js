const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const PhotoSchema = new Schema({
    // Schemanın enitityleri formdan dolduruluyor.
    title: String,
    description: String,
    image : String,
    dateCreated : {
        type:Date,
        default : Date.now
    }
});
// model oluşturuluyor ve dataya yazdılıyor.
const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;