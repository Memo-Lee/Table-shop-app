const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();

// TEMPLATE ENGINE
app.set("view engine","ejs");

//MIDDLEWARES
/* request - response döngüsünün içerisindeki görevi olan her fonksiyona 
middleware denir. Yani herşey request ve responsun 'middle'ında ortasında yapılır. */
app.use(express.static('public'))

// ROUTES
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/add', (req, res) => {
    res.render('add');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Pcat app sunucu ${port} portunda başlatıldı...`)
});