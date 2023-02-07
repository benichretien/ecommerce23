import Product from "../models/product.js";
import fs from "fs";
import slugify from "slugify";

export const create = async(req, res)=>{
    try{
        //console.log(req.fields);
        //console.log(req.files);
        const {name, description, price, category,quantity,shipping}= req.fields;
        const {photo} = req.files;
        //la validation
        switch(true){
            case !name.trim():
                res.json({error: "Le nom est requis!"});
            case !description.trim():
                res.json({error: "La description est requise!"});
            case !price.trim():
                res.json({error: "Le prix est requis!"}); 
            case !category.trim():
                res.json({error: "La categorie est requise!"});  
            case !quantity.trim():
                res.json({error: "La quantite est requise!"});
            case !shipping.trim():
                res.json({error: "Le shipping est requis!"});
            case photo && photo.size > 1000000:
                res.json({error: "La photo doit etre 1MB de taille"})
        }
        //creer un produit
        const product = new Product({...req.fields, slug: slugify(name)})
        if(photo){
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.json(product);

    }catch (err){
        console.log(err);
        return res.status(400).json(err.messsage);
    }
}

export const liste = async (req, res)=>{
    try{
        //on trouve juste 10 produits
        const products = await Product.find({}).select("-photo").limit(10).sort({createdAt: -1});
        res.json(products);
    }catch (err){
        console.log(err);
    }
}