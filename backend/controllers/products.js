import fs from "fs";
import {
    getProducts,
    getProductById,
    insertProduct,
    updateProductById,
    deleteProductById
} from "../models/productsModel.js";

// Get All Students
export const showProducts = (req, res) => {
    getProducts((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
 
// Get Single Products
export const showProductsById = (req, res) => {
    getProductById(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
 
// Create Products
export const createProduct = (req, res) => {
    const data = {
        name: req.body.name,
        price: parseInt(req.body.price),
        type: req.body.type,
        image: req.file.filename
    }

    insertProduct(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
            console.log("\nSuccesfully Created Data");
        }
    });
}
 
// Update Products
export const updateProduct = (req, res) => {
    const id = req.params.id;
    let newImage = '';
    if (req.file) {
        newImage = req.file.filename;
        try {
            fs.unlinkSync('../frontend/src/assets/images/uploads/' + req.body.oldImage);
        } catch (err) {
            console.log(err);
        }
    } else {
        newImage = req.body.oldImage;
    }

    const updateData = {
        name: req.body.name,
        price: parseInt(req.body.price),
        type: req.body.type,
        image: newImage
    };
    
    updateProductById(updateData, id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
            console.log("\nSuccessfully Updated Product With ID : ", id);
        }
    });
}
 
// Delete Products
export const deleteProduct = (req, res) => {
    const id = req.params.id
    deleteProductById(id, (err, results) => {
        if (err) {
            res.send(err)
        } else {
            res.json(results)
            console.log("\nSuccessfully Deleted Data With ID : ", id)
        }
    })
}
