import express from 'express';
import * as jwt from 'jsonwebtoken';


const router = express.Router();


function signup(req,res){
    let user = req.body;    
    //TODO: some checks on the user values;
    console.log(user);  
    res.json(user);
}


function login(req,res){
    let user = req.body;
    //TODO: implement some checks on the user
    console.log(user);
    res.json(user);
}

router.post('/signup',signup);
router.post('/login',login);

export default router;