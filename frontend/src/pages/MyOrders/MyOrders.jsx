import React,{useState,useContext,useEffect} from 'react'
import './MyOrders.css'
import {StoreContext} from '../../context/StoreContext.jsx'
import axios from "axios";
import {assets} from '../../assets/assets.js'
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
  
  const navigate = useNavigate();
  const {url, token} = useContext(StoreContext)
  const [data, setData] = useState([])

  const fetchOrders= async()=>{
    const response = await axios.post(url+"/api/order/userorders/",{}, {headers:{token}})
    setData(response.data.data)
    console.log(response.data.data)
    console.log(response)
  }
  
  useEffect(() => {
    if(token){
      fetchOrders()
    } 
  }, [token])
  

  return (
    <div className='my-orders'>
      <h1>My orders</h1>
      <div className="container">
        {data.map((order, index)=>{
          return(
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " * " + item.quantity;
                  } else {
                    return item.name + " * " + item.quantity + ",  ";
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span>
                <b> {order.status}</b>
              </p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          )
         })}
      </div>
      <div className='back'>
        <div className='back-button' onClick={() => navigate('/')}>Back</div>
      </div>

    </div>
  )
}

export default MyOrders
