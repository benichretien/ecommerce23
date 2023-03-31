import Category from "../models/category.js";
import slugify from "slugify";
import Product from "../models/product.js"

// controller le nom 
export const create = async (req, res)=>{
    try{
        const {name} = req.body;
        if(!name.trim()){
            return res.json({error: "Le Nom est obligatoire"})
        }
        const existingCategory = await Category.findOne({name});
        if(existingCategory){
            return res.json({error: "Ce nom existe deja!"})
        }

        const category = await new Category({name, slug: slugify(name)}).save();
        res.json(category);
    } catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}
//fonction update pour le crud
export const update = async (req, res) =>{
    try{
        const {name} = req.body;
        const {categoryId} = req.params;
        //on trouve le category pour le update
        const category = await Category.findByIdAndUpdate(req.params.categoryId, {
            //nouveau nom a update
            name,
            slug: slugify(name),
        }, {new: true});
        res.json(category);

    }catch (err){
        console.log(err);
        return res.status(400).json(err.message);
    }
}
// fonction remove
export const remove = async (req, res) =>{
    try{
        const removed = await Category.findByIdAndDelete(req.params.categoryId);
        res.json(removed);

    }catch (err){
        console.log(err);
        return res.status(400).json(err.message);
    }
}
// fonction liste de tous les categ
export const liste = async (req, res) =>{
    try{
        const all = await Category.find({});
        res.json(all);

    }catch (err){
        console.log(err);
        return res.status(400).json(err.message);
    }
}
// fonction pour lire une simple categorie
export const read = async (req, res) =>{
    try{
        //trouver le category ds le db
        const category = await Category.findOne({slug: req.params.slug});
        res.json(category);

    }catch (err){
        console.log(err);
        return res.status(400).json(err.message);
    }
}
export const productsByCategory = async (req, res) => {
    try {
      const category = await Category.findOne({ slug: req.params.slug });
      const products = await Product.find({ category }).populate("category");
  
      res.json({
        category,
        products,
      });
    } catch (err) {
      console.log(err);
    }
  };