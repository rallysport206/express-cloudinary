require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var multer = require('multer');
var cloudinary = require('cloudinary')
var app = express();

var upload = multer({dest: "./uploads"});
app.set('view engine', 'ejs');
app.use(ejsLayouts);

var images = [];

app.get('/', function(req, res) {
  res.render('index', {images: images, cloudinary: cloudinary}); //look at the public id and display image
});

//cloudinary app post
app.post('/',upload.single('myFile'),function (req, res) {
  cloudinary.uploader.upload(req.file.path, function(result) {
    // res.send(result);
    images.push(result.public_id); //pushes the image by the public id
    res.redirect('/')
  });
});
// app.post("/", upload.single('myFile'), function(req, res) {
//   res.send(req.file);
// });

app.listen(3000);
