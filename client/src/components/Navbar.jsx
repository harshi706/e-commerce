import React from 'react'
import {Link} from 'react-router-dom'
import { IoMenu } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import logo from '../assets/logo.avif'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-2 sticky top-0 z-50'>
        <div><IoMenu size={20}/></div>
        <div className='flex-1 flex justify-center'>
        <img src={logo} alt="Logo" className='h-10 object-contain' />
      </div>
        <div className='flex space-x-4 items-center'>
    <Link to="/search"><IoSearchSharp size={24} className='hover:text-sky-500 cursor-pointer'/></Link>
    <Link to="/wishlist"><FaRegHeart size={24} className='hover:text-sky-500 cursor-pointer'/></Link>
    <Link to="/profile"><FaRegUser size={24} className='hover:text-sky-500 cursor-pointer'/></Link>
    <Link to="/cart"><IoCartOutline size={24} className='hover:text-sky-500 cursor-pointer'/></Link>
  </div>
    </div>
  )
}

export default Navbar