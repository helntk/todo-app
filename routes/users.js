const express = require('express');
const router = express.Router()
const User = require('../models/User')
const auth = require('../middleware/auth')
const validateProfileInput = require('../validation/validateSignUp')
const validateLoginInput = require('../validation/validateLogin')
const bcrypt = require('bcryptjs')
//create user
//acess public
router.post('/users',async (req,res)=>{
    const {errors, isValid} = validateProfileInput(req.body)

    try{     
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    User.findOne({email: req.body.email}, (err,user)=>{
        if(user){
            errors.email = 'user with this email already exists'
            return res.status(400).json(errors);
        }
        else return 
       
    })
    
    const user = new User(req.body)

    await user.save();
    res.status(201).send(user)
    }
    catch(e){
        res.status(400).send(e);
    }

})

//login user
//access public
router.post('/users/login', async (req,res)=>{
    const {errors,isValid} = validateLoginInput(req.body);

    try{

    if(!isValid){
        return res.status(400).json(errors)
    }
    const user = await User.findOne({email: req.body.email});

    if(!user){
     errors.email = 'email incorret'
     return res.status(400).json(errors)
    }
 
    const passwordMatch = await bcrypt.compareSync(req.body.password,user.password)
 
    if(!passwordMatch){
     errors.password = 'password incorret'
     return res.status(400).json(errors)
 }

    
     
    const token = await user.generateAuth();

     res.status(200).send(token)
    }

    catch(e){
    res.status(400).send(e);
    }
})


//logout user
//access public
router.post('/users/logout',auth, async (req,res)=>{
    const user = req.user;
    try{
        req.user.token = ' '
    
        await user.save()
        res.send(req.user.token)
    }
    catch(e){
       res.send(e)
    }
  
})


//get user logged
//access private

router.get('/users/me',auth,(req,res)=>{
    res.status(200).send(req.token)
    
})


//patch user logged
//access private

router.patch('/users/me',auth,(req,res)=>{
    const user = req.user;
    const updates = Object.keys(req.body);
     
    updates.forEach((field)=>{
        user[field] = req.body[field];
    })

    user.save();
    res.send(user);

       
})


//delete user logged
//access private

router.delete('/users/me',auth, async (req,res)=>{
    try{
    await req.user.remove()
    res.send(req.user)
    }
    catch(e){
     res.status(400).send(e)
    }
})



module.exports = router;