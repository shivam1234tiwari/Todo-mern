import express from 'express'
import {Signup,Login, logout} from '../controllers/userController.js';
const router=express.Router();

router.post('/Signup',Signup);
router.post('/Login',Login);
router.get('/logout',logout);
export default router;