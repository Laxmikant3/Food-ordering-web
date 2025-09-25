import React, {useState, useEffect} from 'react'
import './Orders.css'
import {toast} from 'react-toastify'
import axios from 'axios'
import {assets} from '../../assets/assets.js'


const Orders = ({url}) => {

  const [orders, setOrders] = useState([])

  const fetchOrders = async()=>{
    const res = await axios.get(url+"/api/order/list") 

    if(res.data.success){
      setOrders(res.data.data)
      console.log(res.data.data)
    }else{
      toast.error("Error in fetching orders")
    }
  }

  const onChangeHandler = async(event, orderId) => {
    const res= await axios.post(url + "/api/order/status", {
    orderId,
    status: event.target.value
    })
    if(res.data.success){
      await fetchOrders();
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [])
  
  return (
<div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select
              onChange={(event)=>onChangeHandler(event,order._id)}
              name="status"
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders
