import { Router } from "express";
import { getAllProducts, createProduct, updateProduct, deleteProduct, getProductById } from "../controllers/Product.controllers.js";
import { verifyJWT, admin } from "../middlwares/auth.middlewares.js";   

const router=Router();

router.get('/',getAllProducts);
router.get('/:id',getProductById);

router.post('/add',verifyJWT,admin,createProduct);
router.put('/:id',verifyJWT,admin,updateProduct);
router.delete('/:id',verifyJWT,admin,deleteProduct);

export default router;