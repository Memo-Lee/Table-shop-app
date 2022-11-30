const Photo = require('../models/Photo');
const fs = require('fs');

exports.getAllPhotos = async (req, res) => {
    const page = req.query.page || 1;
    const PhotoPerPage = 2;
    const totalPhotos = await Photo.find().countDocuments();
    // index sayfasın da dinamik verileri görüntüleme işlemi
    const photos = await Photo.find({})
    .sort('-dateCreated')
    .skip((page-1)*PhotoPerPage)
    .limit(PhotoPerPage)
    res.render('index', {
        photos,
        current : page,
        pages : Math.ceil(totalPhotos / PhotoPerPage)
    });
}

exports.getPhoto = async (req, res) => {
    // console.log(req.params.id);
    // res.render(/photos);
    // Burada tek bir fotoya ait olan bilgi gönderilir.
    const findPhoto = await Photo.findById(req.params.id);
    res.render('photo', {
        photo: findPhoto
    });
}

exports.createPhoto = async (req, res) => {
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
    let uploadPath = __dirname + '/../public/uploads/' + uploadImage.name;

    uploadImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadImage.name,
        });
    });
    res.redirect('/');
}

exports.updatePhoto = async (req, res) => {
    const photo = await Photo.findOne({_id:req.params.id}) // update edilecek photo yakalandı
    photo.title = req.body.title
    photo.description = req.body.description
    photo.save();

    res.redirect(`/photos/${req.params.id}`); // backtick kullanıyor çünkü resmin url uzantısına gitmek istiyoruz.
}

exports.deletePhoto = async (req,res) =>{
    // await Photo.findByIdAndRemove(req.params.id); // alternatif 1 - upload image silmiyor.
    const photo = await Photo.findOne({_id:req.params.id}) // underscoreid ' si = parametreden gelen id
    let deletedImage = __dirname + '/../public' + photo.image; //'/uploads/<imagename>.jpg'
    fs.unlinkSync(deletedImage);
    await Photo.findByIdAndRemove(req.params.id);
    res.redirect('/');
}