import React, { useState, useContext } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from '../../context/StoreContext.jsx'
import { toast } from "react-toastify";
  

const Navbar = ({ setShowLogin }) => {

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const [menu, setMenu] = useState("Home")

  const navigate=useNavigate();

  const logout=()=>{
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logout Successfully")
    navigate("/");
    console.log(token)
  }

  return (
    <div className='navbar  '>
      <img className='logo' src={assets.logo} alt="logo" />
      <ul className='navbar-menu '>
        <Link
          to="/" onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}>
          home
        </Link>

        <a
          href="#explore-menu" onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}>
          menu
        </a>

        <a
          href="#footer" onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}>
          contact us
        </a>
      </ul>

      {/* Navbar Right */}

      <div className='navbar-right'>
        <img src={assets.search_icon} alt="" />
        <div className='navbar-search-icon'>
          <Link to='/cart' ><img src={assets.bag_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? <button onClick={() => setShowLogin(true)} className=''>sign in</button>
          : <div className="navbar-profile">
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                <Link to='/myorders' ><img src={assets.bag_icon} alt=""/><p>Orders</p></Link>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar
