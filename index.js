const express = require('express');
const fileupload = require('express-fileupload');
const cloudinary = require('cloudinary').v2

const app = express();

cloudinary.config({
    cloud_name: "dxakjslun",
    api_key: "376486964436347",
    api_secret: "F25HIWbHt_WwxV1PcUtbA4-CFOM"
})

app.set("view engine", "ejs");

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));

app.get('/myget', (req, res) => {
    console.log(req.body);

    res.send(req.body);
});
app.post('/mypost',async (req, res) => {
    console.log(req.body);
    console.log(req.files);

    const filesUplode = []

    // single file
    const file = req.files.filesample
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "user"
    })
    result ? filesUplode.push(result) : ""

    // Multiple files
    let multiplefilesArray = []
    for(let i = 0; i < req.files.multiplefilesample.length; i++) {
        const files = req.files.multiplefilesample
        const results = await cloudinary.uploader.upload(files[i].tempFilePath, {
            folder: "user"
        })
        multiplefilesArray.push({
            public_id: results.public_id,
            secure_url: results.secure_url
        })
        results ? filesUplode.push(results) : ""
    }
    
    
    res.send({
        firstname: req.body.firstname, 
        lastname: req.body.lastname,
        filesUplode
    });
});

app.get('/mygetform', (req, res) => {
    res.render('getform')
});

app.get('/mypostform', (req, res) => {
    res.render('postform')
});

app.listen(4000, () => console.log(`server is running at port 4000`));