import { Router } from "express";
import { signup,login, refreshAccessToken, logout } from "../controllers/User.controllers.js";
import { verifyJWT } from "../middlwares/auth.middlewares.js";

const router=Router();

router.post('/signup',signup);
router.post('/login',login)
router.post('/refreshtoken',refreshAccessToken)
router.post('/logout',verifyJWT,logout)

export default router;