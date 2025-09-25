import React, { useState, useContext, useEffect } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext.jsx";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'



const PlaceOrder = () => {

  const { getTotalCartAmount, url, cartItems, token, food_list } = useContext(StoreContext);

  const [data, setData] = useState({
    firsName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event)=>{
      const name = event.target.name 
      const value = event.target.value
      setData(data=>({...data,[name]:value}))     
  }

  const placeOrder= async(event)=>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id] > 0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount: getTotalCartAmount()+2
    }
    let response = await axios.post(url+"/api/order/place", orderData, {headers:{token}})
    if(response.data.success){
      const {session_url}= response.data;
      window.location.replace(session_url)
    }else{
      alert("Error..!")
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if(!token){
      alert("Please login first")
      navigate('/cart')
    }
    else if(getTotalCartAmount() === 0){
      alert("Cart is empty")
      navigate('/cart')
    }
  }, [token])
  
  
  return (
    <>
     <form onSubmit={placeOrder} className="place-order" >
       <div className="place-order-left">
         <p className="title">Delivery Information</p>
         <div className="multi-fields">
           <input
            name="firsName"
            value={data.firsName}
            required
            type="text"
            placeholder="First name"
            onChange={onChangeHandler}
          />
          <input
            name="lastName"
            value={data.lastName}
            required
            type="text"
            placeholder="Last name"
            onChange={onChangeHandler}
          />
        </div>
        <input
          name="email"
          value={data.email}
          required
          type="text"
          placeholder="Email Address"
          onChange={onChangeHandler}
        />
        <input
          name="street"
            value={data.street}
          required
          type="text"
          placeholder="Street"
          onChange={onChangeHandler}
        />
        <div className="multi-fields">
          <input
            name="city"
            value={data.city}
            required
            type="text"
            placeholder="City"
            onChange={onChangeHandler}
          />
          <input
            name="state"
            value={data.state}
            required
            type="text"
            placeholder="State"
            onChange={onChangeHandler}
          />
        </div>
        <div className="multi-fields">
          <input
          name="zipcode"
            value={data.zipcode}
            required
            type="text"
            placeholder="Zip Code"
            onChange={onChangeHandler}
          />
          <input
            name="country"
            value={data.country}
            required
            type="text"
            placeholder="Country"
            onChange={onChangeHandler}
          />
        </div>
        <input
          name="phone"
            value={data.phone}
          required
          type="text"
          placeholder="Phone"
          onChange={onChangeHandler}
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotals</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <div className="button">
            <button onClick={()=>navigate('/cart')}>Back</button>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </div>
    </form>

    </>
  )
}

export default PlaceOrder
