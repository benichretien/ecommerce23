import express from 'express';
//librairie pour parse les form data des images
import formidable from 'express-formidable';

const router = express.Router();
//midlewares
import { requireSignin, isAdmin } from '../middlewares/auth.js';
//controllers
import {create, liste, read, photo, remove, update, filteredProducts, 
    productsCount, listProducts, productsSearch, relatedProducts, processPayment, getToken
} from "../controllers/product.js"
//faut etre admin pour creer un produit
router.post('/product', requireSignin, isAdmin, formidable(), create);
router.get('/products', liste);
//route pour lire un produit
router.get('/product/:slug', read)
//route pour envoyer une photo pour chaque produit
router.get('/product/photo/:productId', photo);
//route pour supprimer un produit pour l'admin
router.delete('/product/:productId', requireSignin, isAdmin, remove);
//route pour update produit
router.put('/product/:productId', requireSignin, isAdmin, formidable(), update);
router.post("/filtered-products", filteredProducts);
router.get("/products-count", productsCount);
router.get("/list-products/:page", listProducts);
router.get("/products/search/:keyword", productsSearch);
router.get("/related-products/:productId/:categoryId", relatedProducts);
router.get("/braintree/token", getToken);
router.post("/braintree/payment", processPayment);

export default router;