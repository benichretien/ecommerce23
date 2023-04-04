import Product from "../models/product.js";
import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";
import Order from "../models/order.js";


dotenv.config();


const gateway = new braintree.BraintreeGateway({
  environment : braintree.Environment.Sandbox,
  merchantId : process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
})

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
                return res.json({error: "Le nom est requis!"});
            case !description.trim():
                return res.json({error: "La description est requise!"});
            case !price.trim():
                return res.json({error: "Le prix est requis!"}); 
            case !category.trim():
                return res.json({error: "La categorie est requise!"});  
            case !quantity.trim():
                return res.json({error: "La quantite est requise!"});
            case !shipping.trim():
                return res.json({error: "Le shipping est requis!"});
            case photo && photo.size > 1000000:
                return res.json({error: "La photo doit etre 1MB de taille"})
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

export const filteredProducts = async (req, res) => {
    try {
      const { checked, radio } = req.body;
  
      let args = {};
      if (checked.length > 0) args.category = checked;
      if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
      console.log("args => ", args);
  
      const products = await Product.find(args);
      console.log("filtered products query => ", products.length);
      res.json(products);
    } catch (err) {
      console.log(err);
    }
  };

  export const productsCount = async (req, res) => {
    try {
      const total = await Product.find({}).estimatedDocumentCount();
      res.json(total);
    } catch (err) {
      console.log(err);
    }
  };

  export const listProducts = async (req, res) => {
    try {
      const perPage = 6;
      const page = req.params.page ? req.params.page : 1;
  
      const products = await Product.find({})
        .select("-photo")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
  
      res.json(products);
    } catch (err) {
      console.log(err);
    }
  };

  export const productsSearch = async (req, res) => {
    try {
      const { keyword } = req.params;
      const results = await Product.find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      }).select("-photo");
  
      res.json(results);
    } catch (err) {
      console.log(err);
    }
  };
  
  export const relatedProducts = async (req, res) => {
    try {
      const { productId, categoryId } = req.params;
      const related = await Product.find({
        category: categoryId,
        _id: { $ne: productId },
      })
        .select("-photo")
        .populate("category")
        .limit(3);
  
      res.json(related);
    } catch (err) {
      console.log(err);
    }
  };
  
  export const getToken = async (req, res) => {
    try {
      gateway.clientToken.generate({}, function (err, response) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(response);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const processPayment = async (req, res) => {
    try {
      // console.log(req.body);
      const { nonce, cart } = req.body;
  
      let total = 0;
      cart.map((i) => {
        total += i.price;
      });
      // console.log("total => ", total);
  
      let newTransaction = gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true,
          },
        },
        function (error, result) {
          if (result) {
            // res.send(result);
            // create order
            const order = new Order({
              products: cart,
              payment: result,
              buyer: req.user._id,
            }).save();
            // decrement quantity
            decrementQuantity(cart);
            // const bulkOps = cart.map((item) => {
            //   return {
            //     updateOne: {
            //       filter: { _id: item._id },
            //       update: { $inc: { quantity: -0, sold: +1 } },
            //     },
            //   };
            // });
  
            // Product.bulkWrite(bulkOps, {});
  
            res.json({ ok: true });
          } else {
            res.status(500).send(error);
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  
  export const decrementQuantity = async (cart) => {
    try {
      // build mongodb query
      const bulkOps = cart.map((item) => {
        return {
          updateOne: {
            filter: { _id: item._id },
            update: { $inc: { quantity: -0, sold: +1 } },
          },
        };
      });
  
      const updated = await Product.bulkWrite(bulkOps, {});
      console.log("blk updated", updated);
    } catch (err) {
      console.log(err);
    }
  };