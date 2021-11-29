import express from "express";
import userCtrl from '../controllers/userCtrl.js';
const router = express.Router();

router.post('/signup', userCtrl.signUp);
router.post('/signin', userCtrl.signIn);
router.get('/getinfo', userCtrl.getinfo);
router.delete('/deleteuser', userCtrl.deleteUser);

export default router;