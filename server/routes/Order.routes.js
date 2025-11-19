import { createOrder,getMyOrder,getAllOrders,updateOrderStatus} from "../controllers/Order.controllers.js";
import { Router } from "express";
import { verifyJWT,admin } from "../middlwares/auth.middlewares.js";

const router=Router();
router.post('/',verifyJWT,createOrder);
router.get('/myOrder',verifyJWT,getMyOrder)
router.get('/',verifyJWT,admin,getAllOrders)
router.put('/:id',verifyJWT,admin,updateOrderStatus)

export default router;