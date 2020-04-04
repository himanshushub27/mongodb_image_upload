const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const upload = require("./setup/Gridfs");
const connection = require("./setup/mongo");

const app = express();
app.use(bodyParser.json());

let gfs;
connection.once("open", () => {
  //initialize Stream changes username
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection("uploadImage");
});

app.post("/imageupload", upload.single("imageFromReact1"), (req, res) => {
  res.send({ file: req.file });
  // console.log(req);
  // res.redirect( '/redirect'); doesnt work on post request
});

app.get("/files", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({ err: "no files" });
    }
    return res.send(files);
  });
});

app.get("/files/:filename", (req, res) => {
  gfs.files.findOne(
    { metadata: { originalname: req.params.filename } },
    (err, file) => {
      //Here in findOne() we are passing
      // object{object} so basically we are saying look for "originalname" prop
      // which is prop of "metadata"
      if (!file || file.length === 0) {
        return res.status(404).json({ err: "no file exists" });
      }
      return res.send(file);
    }
  );
});

// Read image from mongoDb name passed in URL
// we need this route to display the image on the React side
// in the src/others/GetImage.js file in the react side we have a img tag
// in which we have specified the url to be the this URL with filename in the URL
// app.get('/image', (req, res)=> {
//   // console.log(req.body);
//   gfs.files.findOne({metadata:{originalname: req.query.filename}},(err, file)=> {//Here in findOne() we are passing
//     // object{object} so basically we are saying look for "originalname" prop
//     // which is prop of "metadata"
//     if(!file || file.length === 0){
//       return res.status(404).json({err: 'no file exists'});
//     }
//     if(file.contentType === 'image/png'){
//       // Pass that image to React
//       // console.log(file);
//       const readstream = gfs.createReadStream(file.filename);// we have to pass "file.filename" to read the Image
//       readstream.pipe(res);
//     }else{
//       res.status(404).json({err: 'no image exist'});
//     }
//   });
// });

//Read Image from mongo name passed from User
app.post("/image", (req, res) => {
  // console.log(req.body);
  // Read image from mongoDb name passed in URL
  // we need this route to display the image on the React side
  // in the src/others/GetImage.js file in the react side we have a img tag
  // in which we have specified the url to be the this URL with filename in the URL
  app.get("/image/:filename", (req, res) => {
    console.log("body from image search",req.body);
    console.log("params from image search",req.params.filename);
    console.log("query from image search",req.query.filename);
    gfs.files.findOne(
      { metadata: { originalname: req.params.filename } },
      (err, file) => {
        //Here in findOne() we are passing
        // object{object} so basically we are saying look for "originalname" prop
        // which is prop of "metadata"
        if (!file || file.length === 0) {
          return res.status(404).json({ err: "no file exists" });
        }
        if (["image/png","image/jpeg", "image/jpg"].includes(file.contentType)) {
          // Pass that image to React
          // console.log(file);
          const readstream = gfs.createReadStream(file.filename); // we have to pass "file.filename" to read the Image
          readstream.pipe(res);
        } else {
          res.status(404).json({ err: "no image exist" });
        }
      }
    );
  });

  // console.log(req.body);
  // gfs.files.findOne({metadata:{originalname: req.body.ImageSearchName}},(err, file)=> {//Here in findOne() we are passing
  //   // object{object} so basically we are saying look for "originalname" prop
  //   // which is prop of "metadata"
  //   if(!file || file.length === 0){
  //     return res.status(404).json({err: 'no file exists'});
  //   }
  //   if(file.contentType === 'image/png'){
  //     // Pass that image to React
  //     // console.log(file);
  //     // const readstream = gfs.createReadStream(file.filename);// we have to pass "file.filename" to read the Image
  //     // readstream.pipe(res);
  //     res.send(file);
  //   }else{
  //     res.status(404).json({err: 'no image exist'});
  //   }
  // });
  res.send(req.body);
});

app.get("/check", (req, res) => {
  console.log("checked");
  res.send({ Check: "check" });
  // res.redirect('/redirect');
});

app.listen("4000", () => {
  console.log("server started at port 4000");
});
