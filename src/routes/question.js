const questionController = require("../controllers/questionController");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require('multer');
const firebase = require('firebase/compat/app');
require('firebase/compat/auth');
require('firebase/compat/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyAK3DhqpNWJIYy_ooocUitdedZCIiVtBKM",
    authDomain: "academic-8240e.firebaseapp.com",
    projectId: "academic-8240e",
    storageBucket: "academic-8240e.appspot.com",
    messagingSenderId: "520452064137",
    appId: "1:520452064137:web:813f84b77a7e651ba8d758",
    measurementId: "G-V2T7QTJMHB"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const storage = getStorage();

const upload = multer({ storage: multer.memoryStorage() });

const router = require("express").Router();

//ADD NEW A question
router.post("/", questionController.create_question);

//GET ALL QUESTION
router.get("/", questionController.getQuestion);

//UPDATE A QUESTION
router.put('/:id', questionController.update_question);

router.delete('/:id', questionController.delete_question);

router.post('/upload-profile-pic', upload.single('profile_pic'), async (req, res) => {
    try {
        console.log('voo')
        const dateTime = giveCurrentDateTime();
        const storageRef = ref(storage, `file/${req.file.originalname + "     " + dateTime}`);
        // create metadata including the content type
        const metadata = {
            contentType: req.file.mimetype,
        }
        // upload the file in the bucket storage 
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        //Grab the public url
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('file successfully uploaded.');
        return res.send({
            message: "file uploaded to firebase storage",
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })
    } catch (error) {
        console.log("loi");
        console.log(error);
    }
})

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDay();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime
}
// router.get('/question', APIController.question);
// router.post('/create-question', APIController.create_question);
// router.put('/update-question', APIController.update_question);
// router.delete('/delete-question/:id', APIController.delete_question);
// router.get('/', APIController.getHomepage);
// router.get('/upload', APIController.getUploadFilePage);

// //UPDATE A question
// router.put("/:id", questionController.updatequestion);

// //DELETE A question 
// router.delete("/:id", questionController.deleteAquestion)

//Get question by userid and partnerid
// router.get("/partner", questionController.getPartnerById);

module.exports = router;

// import express from "express";
// // import multer from 'multer';
// // import path from 'path'
// let router = express.Router();
// import APIController from '../controllers/APIController';




// // let upload = multer({ storage: storage, fileFilter: imageFilter });

// const initApiroute = (app) => {
//     router.get('/question', APIController.question);
//     router.post('/create-question', APIController.create_question);
//     router.put('/update-question', APIController.update_question);
//     router.delete('/delete-question/:id', APIController.delete_question);
//     // router.post('/upload-profile-pic', upload.single('profile_pic'), APIController.handleUploadFile);
//     router.get('/', APIController.getHomepage);
//     router.get('/upload', APIController.getUploadFilePage);

//     return app.use('/api/v1/', router)
// }

// export default initApiroute;