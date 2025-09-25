import userModel from '../models/userModel.js'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


//user Login const
const loginUser = async(req, res) => {
    const {email, password} = req.body;

    try {
        //Checking whether user is exist or not 
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success : false, message : "User dosen't exist..!"})
        }
        
        //Maching password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success:false, message: "Invalid Credentials..!"})
        }
        
        //creating token and sending a response
        const token = createToken(user._id)
        res.json({success:true, token})
    } 
    catch (error) {
        console.log(error)
        res.json({success:false, message:"Error occurs while Login user..!"})
    }
}

const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET )
}

//Register User 
const registerUser = async(req, res) => {

    const {name , password, email}= req.body;

    try {

        //checking that User already exist or not 
        const exist = await userModel.findOne({email});
        if(exist){
            return res.json({success:false, message: "User already exist in the DB..!"})
        }

        //validating email format & srong password 
        if(!validator.isEmail(email)){
            return res.json({success:false, message: "Please enter a valid Email..!"})
        } 

        //strong password check
        if (password.length<8) {
            return res.json({success:false, message: "Please enter a strong password ..!"})            
        }

        //Hashing the password 
        const salt = await bcrypt.genSalt(9);
        const hashPassword = await bcrypt.hash(password , salt)


        const newUser = new userModel({
            name: name,
            email: email,
            password: hashPassword,
        })

        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({success:true, token})

    } 
    catch (error){
        console.log(error)
        res.json({success:false, message:"Error occurs while registering the user..! "})
    }
}

export {loginUser, registerUser}
