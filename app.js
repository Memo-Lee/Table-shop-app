const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageControllers');
const app = express();

// connect DB
mongoose.connect('mongodb://localhost/pcat-test-db');

// TEMPLATE ENGINE
app.set("view engine", "ejs");

//MIDDLEWARES
/* request - response döngüsünün içerisindeki görevi olan her fonksiyona 
middleware denir. Yani herşey request ve responsun 'middle'ında ortasında yapılır. */
app.use(express.static('public'));
// requesti response ederek sonlandırma işlemi için gerekli olan express methodları
// urlencoded url okumamıza yarıyor.
app.use(express.urlencoded({ extended: true }));
// json formatına çevirmeye yarıyor.
app.use(express.json());
app.use(fileUpload());
// post require işlemini put olarak göndermek için method-override modülünü kullanıyoruz.
app.use(methodOverride('_method',{
    methods:['POST','GET']
})); // gerektiğinde metotların override olamasını belirtebiliyoruz.


// ROUTES
app.get('/', photoController.getAllPhotos);

app.post('/photos', photoController.createPhoto);

app.get('/photos/:id', photoController.getPhoto);

app.put('/photos/:id', photoController.updatePhoto);

app.delete('/photos/:id', photoController.deletePhoto);

app.get('/photos/edit/:id', pageController.getEditPage);
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/contact', pageController.getContactPage);


const port = 3000;
app.listen(port, () => {
    console.log(`Pcat app sunucu ${port} portunda başlatıldı...`)
});