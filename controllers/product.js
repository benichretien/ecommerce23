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
        const products = await Product.find({}).populate('category').select("-photo").limit(10).sort({createdAt: -1});
        res.json(products);
    }catch (err){
        console.log(err);
    }
}

export const read = async (req, res)=>{
    try{
        //trouver un produit selon sa catogorie
        const product = await Product.findOne({slug: req.params.slug}).select(
            "-photo").populate("category");

            res.json(product);

    }catch (err){
        console.log(err)
    }
}

export const photo = async (req, res)=>{
    try{
        //pour trouver l'image d'un produit
        const product = await Product.findById(req.params.productId).select("photo");
        if(product.photo.data){
            //si la photo est la dans le db on le returne
            res.set('Content-Type', product.photo.contentType);
            return res.send(product.photo.data);
        }

    }catch (err){
        console.log(err)
    }
}
//pour delete un produit
export const remove = async (req, res)=>{
    try{
        //trouver le produit par son id pour supprimer
        const product = await Product.findByIdAndDelete(req.params.productId).select("-photo");
        res.json(product);

    }catch (err){
        console.log(err)
    }
}

//pour update un produit
export const update = async(req, res)=>{
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
        //update un produit
        const product = await Product.findByIdAndUpdate(req.params.productId, {
            ...req.fields, slug: slugify(name),
        }, {new: true});
        
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