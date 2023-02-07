import express from 'express';
//librairie pour parse les form data des images
import formidable from 'express-formidable';

const router = express.Router();
//midlewares
import { requireSignin, isAdmin } from '../middlewares/auth.js';
//controllers
import {create, liste} from "../controllers/product.js"
//faut etre admin pour creer un produit
router.post('/product', requireSignin, isAdmin, formidable(), create);
router.get('/products', liste)

export default router;