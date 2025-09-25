import foodModel from "../models/foodModel.js"
import fs from "fs"


const addFood= async(req, res)=>{
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        image:image_filename,
    })
    try {
        await food.save()
        res.json({success:true, message: "Data added.."})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error..!  "})
    }
}

//Display food list 
const listfood = async (req,res)=>{
    try {
        const foods= await foodModel.find({})
        res.json({success: true, message: "List of data successfuly", data: foods})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

//Remove Foodlist 
const removeFood= async(req,res)=>{
    try {
        const food= await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, ()=>{}) 
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message: "Food Item removed successfuly..!"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error occurs while removing the food..!"})
    }
}
// const removeFood = async (req, res) => {
//   try {
//     let userData = await userModel.findById(req.body.userId);
//     if (userData && userData.role === "admin") {
//       const food = await foodModel.findById(req.body.id);
//       fs.unlink(`uploads/${food.image}`, () => {});
//       await foodModel.findByIdAndDelete(req.body.id);
//       res.json({ success: true, message: "Food Removed" });
//     } else {
//       res.json({ success: false, message: "You are not admin" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };


export {addFood, listfood, removeFood};

