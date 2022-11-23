const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const Photo = require('./models/Photo');

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
app.get('/', async (req, res) => {
    // index sayfasın da dinamik verileri görüntüleme işlemi
    const photos = await Photo.find({}).sort('-dateCreated');
    // .sort('-dateCreated')
    res.render('index', {
        photos
    });
});
app.get('/photos/:id', async (req, res) => {
    // console.log(req.params.id);
    // res.render(/photos);
    // Burada tek bir fotoya ait olan bilgi gönderilir.
    const findPhoto = await Photo.findById(req.params.id);
    res.render('photo', {
        photo:findPhoto
    });
});

app.post('/photos', async (req, res) => {
    // console.log(req.body) -> forma girdiğimiz string bilgileri alıyoruz
    // await Photo.create(req.body);
    // console.log(req.file.image) -> dosyanın bilg alıyoruz
    // res.redirect('/'); ->     // posttan sonra yönlendirme

    const uploadDir = 'public/uploads';
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir)
    }

    // __dirname projenin kökü , uploadImage dosya , uploadPath dosya yolu
    let uploadImage = req.files.image;
    let uploadPath = __dirname + '/public/uploads/' + uploadImage.name;

    uploadImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadImage.name,
        });
    });
    res.redirect('/');
});
app.get('/photos/edit/:id', async (req, res) => {
    const photo = await Photo.findOne({_id:req.params.id}) //paramsdan gelen underscore id ile eşleşmesi
    res.render('edit',{
        photo
    }); // seçtiğimiz image'i template gönderme
    // 2. parametre göndermek istediğimiz bilgi
});
app.put('/photos/:id', async (req, res) => {
    const photo = await Photo.findOne({_id:req.params.id}) // update edilecek photo yakalandı
    photo.title = req.body.title
    photo.description = req.body.description
    photo.save();

    res.redirect(`/photos/${req.params.id}`); // backtick kullanıyor çünkü resmin url uzantısına gitmek istiyoruz.
});
app.delete('/photos/:id', async (req,res) =>{
    // await Photo.findByIdAndRemove(req.params.id); // alternatif 1 - upload image silmiyor.
    const photo = await Photo.findOne({_id:req.params.id}) // underscoreid ' si = parametreden gelen id
    let deletedImage = __dirname + '/public' + photo.image; //'/uploads/<imagename>.jpg'
    fs.unlinkSync(deletedImage);
    await Photo.findByIdAndRemove(req.params.id);
    res.redirect('/');
});

app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/add', (req, res) => {
    res.render('add');
});
app.get('/contact', (req, res) => {
    res.render('contact');
});


const port = 3000;
app.listen(port, () => {
    console.log(`Pcat app sunucu ${port} portunda başlatıldı...`)
});