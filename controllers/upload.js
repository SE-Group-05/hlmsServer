const sharp = require('sharp');
const uid = require('uid');
const fs = require('fs');
const Users = require('../models/users');
const Places = require('../models/visitingPlaces')

const uploadFile = async (req, res) => {
    try {
        await upload(req, res);

        console.log(req.file);
        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        }

        return res.send(`File has been uploaded.`);
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload image: ${error}`);
    }
};

const UploadUserImage = async (req, res, next) => {
    try {
        const user_id = req.params._id;
        const user = await Users.findById(user_id);

        let imageUrl;
        if (req.file) {
            imageUrl = `${uid()}__${req.file.originalname}`;
            let filename = `images/userImages/${imageUrl}`;
            let previousImagePath = `images/userImages/${user.image}`;

            const imageExist = fs.existsSync(previousImagePath);
            if (imageExist) {
                deleteImage(previousImagePath);
            }
            await sharp(req.file.path)
                .rotate()
                .resize(500, 500)
                .toFile(filename);

            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.log(err);
                }
            })
        } else {
            imageUrl = 'profile.png';
        }

        user.image = imageUrl;
        await user.save();


        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, message: 'Successfully updated profile picture' });

    } catch (err) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false, message: 'Error while updating profile picture' });
    }
};

const uploadPlaceImage = async (req, res, next) => {
    try {
        const place_id = req.params._id;
        const user = await Places.findById(place_id);

        let imageUrl;
        if (req.file) {
            imageUrl = `${uid()}__${req.file.originalname}`;
            let filename = `images/placeImages/${imageUrl}`;
            let previousImagePath = `images/placeImages/${place.image}`;

            const imageExist = fs.existsSync(previousImagePath);
            if (imageExist) {
                deleteImage(previousImagePath);
            }
            await sharp(req.file.path)
                .rotate()
                .resize(500, 500)
                .toFile(filename);

            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.log(err);
                }
            })
        } else {
            imageUrl = 'image.png';
        }

        place.image = imageUrl;
        await place.save();


        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, message: 'Successfully updated profile picture' });

    } catch (err) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false, message: 'Error while updating profile picture' });
    }
};

exports.UploadUserImage = UploadUserImage;
exports.uploadFile = uploadFile;