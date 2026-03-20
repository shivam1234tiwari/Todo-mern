import express from 'express';
import {createTodo, getTodo,updatetodo,deletetodo} from '../controllers/todoController.js';
import isAuth from '../middleware/auth.js';
const router=express.Router();

router.post('/',isAuth,createTodo);
router.get('/todos',getTodo);
router.put('/:todoId',isAuth,updatetodo);
router.delete('/:deletetodo',isAuth,deletetodo);

export default router;