const Photo = require('../models/Photo');

exports.getAboutPage = (req, res) => {
    res.render('about');
}
exports.getAddPage = (req, res) => {
    res.render('add');
}
exports.getContactPage =  (req, res) => {
    res.render('contact');
}
exports.getEditPage = async (req, res) => {
    const photo = await Photo.findOne({_id:req.params.id}) //paramsdan gelen underscore id ile eşleşmesi
    res.render('edit',{
        photo
    }); // seçtiğimiz image'i template gönderme
    // 2. parametre göndermek istediğimiz bilgi
}