import db from "../config/database.js";
import fs from "fs";

// Get All Products 
export const getProducts = (result) => {
    db.query("SELECT * FROM products", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
 
// Get Single Products
export const getProductById = (id, result) => {
    db.query("SELECT * FROM products WHERE id = ?", [id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });   
}
 
// Insert Product 
export const insertProduct = (data, result) => {
    db.query("INSERT INTO products SET ?", data, (err, results) => {             
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });   
}
 
// Update Product 
export const updateProductById = (data, id, result) => {
    db.query("UPDATE products SET name = ?, price = ?, type = ?, image = ? WHERE id = ?", 
    [data.name, data.price, data.type, data.image, id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
 
// Delete Product 
export const deleteProductById = (id, result) => {
    db.query("SELECT image FROM products WHERE id = ?", [id], (err, results) => {
       if (err) {
            console.log(err)
       } else {
            const img = results[0].image
            db.query("DELETE FROM products WHERE id = ?", [id], (err) => {
                if (err) {
                    console.log(err)
                    result(err, null)
                } else {
                    fs.unlinkSync("../frontend/src/assets/images/uploads/" + img)
                    result(null, results)
                }
            })
       }
    })    
}