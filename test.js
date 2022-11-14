// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// connect DB
// mongoose.connect('mongodb://localhost/pcat-test-db');

// create schema
// const PhotoSchema = new Schema({
//     title: String,
//     description: String
// });

// const Photo = mongoose.model('Photo', PhotoSchema);

// Create a photo
// Photo.create({
//     title:"Photo title 2",
//     description : 'This is a descrpition' 
// });

// read a photo
// Photo.find({},(err,data)=>{
//     console.log(data);
// });

// update a photo
// id = "6372874cadccaa0b06dbfeae";

// Photo.findByIdAndUpdate(
//     id,
//     {
//         title: 'Photo 1 updateddd',
//         description: 'Description 1 updateddd',
//     },
//     {
//         new: true
//     },

//     (err, data) => {
//         console.log(data);
//     }
// );

// delete a photo
// const id = "637287860800d2c20f07ad6b";
// Photo.findByIdAndDelete(id,(err,data)=>{
//     console.log('Photo is removed...');
// });