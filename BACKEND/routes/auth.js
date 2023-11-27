const express = require('express');
const router = express.Router();
const User = require('../DB_models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const secret = 'mohit6317';
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


//create a user at api/auth/createuser using post  

router.post('/createuser' ,[
    body('name','enter a valid name').isLength({min:3}),
    body('email','enter a valid email').isEmail(),
    body('password').isLength({min:5})], async(req,res)=>{
      let status = false;
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ status,errors: errors.array() });
        }
        let user = await User.findOne({email : req.body.email});
        if(user){
          return res.status(400).json({status,"message":"there is a account created already"});
        }
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(req.body.password , salt);
         user =  await User.create({
            name: req.body.name,
            password: pass,
            email: req.body.email,
          });
          const data = {
            user:{
              id:user.id,
            }
          }
          const authtoken = jwt.sign(data,secret);
          status=true;
          res.json({status,authtoken});
      } catch (error) {
        console.error(error.message);
        res.status(500).send(status,"there is an please try again");
      }
})

// login

router.post('/login' , [
  body('email','enter a valid email').isEmail(),
  body('password').isLength({min:5})] , async(req,res)=>{
    let status = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({status,errors: errors.array() });
    }
    const {password , email} = req.body ;
    const user = await User.findOne({email})
    try {
      if(!user){
        return  res.status(400).json({ status,error:"user doesn't exists" });
      }
      const ans = await bcrypt.compare(password , user.password);
      if(!ans){
        return res.status(400).json({ status,error:"invalid credentials"});
      }
      const data = {
        user:{
          id: user.id
        }
      }
      const webtoken = jwt.sign(data,secret);
      status = true;
      res.json({
        status,
        webtoken
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({error:"some internal error"});
    }
    
})

router.post('/getuser',fetchuser,async(req,res)=>{
  try {
    const userid = req.user.id
    const user =await User.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"some internal error"});
  }
})

module.exports = router