const express = require('express')
const router = express.Router()
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const  jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'harryisagoodboy';

//  Route 1 Create a User using POST "/api/auth" .Doesnt required auth - no Login require:-

router.post('/Createuser', [
    body('name', 'Enter a Valid Name').isLength({ min: 1 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password length must be up to 8 letters').isLength({ min: 8 })
], async (req, res) => {
    let success = false;
    // if there are errors returns bad request : and the Errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }
    // Check wheather the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success, error: "User already exists with this email!" })
        }
        const salt = await bcrypt.genSalt(10);
         const secPass = await bcrypt.hash(req.body.password,salt) ;
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        const data = {
            user: {
                id: user.id
            }
        }
 const authtoken = jwt.sign(data,JWT_SECRET);
success=true;
       res.json({ success,authtoken })
       
    } catch (error) {
        console.error( error.message)
        res.status(500).send(" Internal Server Error occurred")
    }
})
// Route 2  Authenticate a User using POST "/api/auth/login" .Doesnt required auth - no Login require:-

router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success =false;
   // if there are errors returns bad request : and the Errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
        let user =  await User.findOne({ email })
        if( !user) {
              sucess=false;
            return res.status(400).json({success,error: "Please try to login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success=false;
            return res.status(400).json({ success,error: "Please try to login with correct credentials" })
        }    const data = {
            user: {
                id: user.id
            }
        }
 const authtoken = jwt.sign(data,JWT_SECRET);
 success = true;
 res.json({success, authtoken });
    }catch (error) {
        console.error(error.message)
        res.status(500).send(" Internal Server Error occurred")
    }
    // Route 3 Get loggedin User Details using POST "/api/auth/getuser" .Login required :-
    router.post('/getuser', fetchuser, async (req, res) => {
    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
        

    }catch(error) {
        console.error(error.message)
        res.status(500).send(" Internal Server Error occurred")
    }
})
})
module.exports = router