import React ,{useContext,useEffect} from 'react'
import './Verify.css'
import {useSearchParams, useNavigate } from 'react-router-dom'
import {StoreContext} from '../../context/StoreContext.jsx'
import axios from 'axios'

const Verify = () => {

    const [searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get("success");
    const orderId=searchParams.get("orderId");
    console.log(success, orderId)
    const {url} = useContext(StoreContext);
    const navigate= useNavigate();

    const verifyPayment= async(req, res)=>{
        const response = await axios.post(url+"/api/order/verify", {success,orderId})
        if(response.data.success){
            navigate("/myorders");
            // toast.success("Order Placed Successfully..!");
        }else{
            navigate("/");
            // toast.error("Something went wrong..");
        }
    }
    useEffect(() => {
        verifyPayment()
    }, [])
    

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
