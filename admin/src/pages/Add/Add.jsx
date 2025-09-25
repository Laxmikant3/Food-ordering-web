import React, { useState, useEffect } from 'react'
import './Add.css'
import { assets } from '../../assets/assets.js'
import axios from "axios"
import { toast } from 'react-toastify';


const Add = ({url}) => {
    // const url= 'http://localhost:4000'
    const [image, setImage] = useState(false)  
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    }) 
    useEffect(() => {
        console.log(data)
    }, [data])
    

    const onChangeHandler=(event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onSubmitHandler= async (event)=>{
        event.preventDefault();
        const formData = new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)

        // --- Add this block for debugging ---
        console.log("Submitting the following FormData:");
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
        // --- End of debugging block ---
        
        const response = await axios.post(`${url}/api/food/add`,formData);

        console.log(data)

        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            })
            setImage(false) 

            toast.success(response.data.message);

        } else {
            toast.error(response.data.message);
        }
    }

  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={ (e)=>setImage(e.target.files[0]) } type="file" id='image' hidden required />
            </div>
            <div className="add-product-name flex-col ">
                <p>Product Name</p>
                <input onChange={onChangeHandler} value={data.name} type="text"  name='name' placeholder='Type here'/>
            </div>
            <div className="add-product-description flex-col">
                <p>Product Description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='Write content here ' required></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select name="category" required onChange={onChangeHandler} value={data.category}>
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="add-price flex-col ">
                    <p>Product price</p>
                    <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$0' />
                </div>
            </div>

        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add
