import express from 'express';

const router = express.Router();
//midlewares
import { requireSignin, isAdmin } from '../middlewares/auth.js';
//controllers
import {create, update, remove, liste, read, productsByCategory,} from "../controllers/category.js"
router.post("/category", requireSignin, isAdmin, create);
router.put("/category/:categoryId", requireSignin, isAdmin, update);
router.delete("/category/:categoryId", requireSignin, isAdmin, remove);
router.get("/categories", liste);
router.get("/category/:slug", read);
router.get("/products-by-category/:slug", productsByCategory);

export default router;