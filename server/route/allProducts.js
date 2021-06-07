const express = require('express')
const router = express.Router()
const product = require("../models/products")
const objectId = require('mongoose').Types.ObjectId;
const isValidObjectId = require('mongoose').isValidObjectId;

// all routes
// Get all products
router.get('/products', async (req, res) => {
    product.find()
        .then((products) => {
            res.json(products);
        })
        .catch((err) => console.log(err));
});

//Post a product
router.post('/product', async (req, res) => {
    if (!req.body.title || req.body.title === "" || req.body.price === null || req.body.imageUrl === "") {
        return res.status(400).json({
            "error": 400
        });
    }
    // Create a product
    const newProduct = new product({
        title: req.body.title,
        price: req.body.price,
        imageUrl: req.body.imageUrl
    })
    newProduct
        .save()
        .then((product) => {
            res.status(201).json(product);
        })
        .catch((err) => console.log(err));
});

// Delete a product
router.delete('/delete/:id', async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({
            "error": 400
        });
    }
    // Delete from Mongo
    product.findOneAndDelete({
            _id: new objectId(req.params.id)
        })
        .then((title) => {
            if (title) {
                res.status(202).json(title);
            } else {
                res.status(404).json({
                    "error": 404
                });
            }
        })
        .catch((err) => console.log(err));
});

// Update a product
router.put('/update/:id', async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({
            "error": 400
        });
    }
    product.findOne({
            _id: new objectId(req.params.id)
        })
        .then((title) => {
            if (title) {
                // Update on Mongo
                product.updateOne({
                        _id: new objectId(req.params.id)
                    }, {
                        title: req.body.title,
                        price: req.body.price,
                        imageUrl: req.body.imageUrl
                    })
                    .then((title) => {
                        res.status(204).json(title);
                    })
                    .catch(err => console.log(err));

            } else {
                res.status(404).json({
                    "error": 404
                });
            }
        })
        .catch((err) => console.log(err));

});

module.exports = router