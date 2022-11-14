const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Photo = require('./models/Photo');

const app = express();

// connect DB
mongoose.connect('mongodb://localhost/pcat-test-db');

// TEMPLATE ENGINE
app.set("view engine","ejs");

//MIDDLEWARES
/* request - response döngüsünün içerisindeki görevi olan her fonksiyona 
middleware denir. Yani herşey request ve responsun 'middle'ında ortasında yapılır. */
app.use(express.static('public'));
// requesti response ederek sonlandırma işlemi için gerekli olan express methodları
// urlencoded url okumamıza yarıyor.
app.use(express.urlencoded({extended:true}));
// json formatına çevirmeye yarıyor.
app.use(express.json());

// ROUTES
app.get('/', async (req, res) => {
    // index sayfasın da dinamik verileri görüntüleme işlemi
    const photos = await Photo.find({});
    res.render('index',{
        photos
    });
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/add', (req, res) => {
    res.render('add');
});
app.post('/photos', async (req, res) => {
    // forma girdiğimiz bilgileri yazdırıyoruz
    // console.log(req.body);
    await Photo.create(req.body);
    // posttan sonra yönlendirme
    res.redirect('/');
});
app.get('/contact', (req, res) => {
    res.render('contact');
});


const port = 3000;
app.listen(port, () => {
    console.log(`Pcat app sunucu ${port} portunda başlatıldı...`)
});