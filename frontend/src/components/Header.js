import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { IoSearch } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {

    const user = useSelector(state => state?.user?.user)
    const dispatch = useDispatch()
    const [menuDisplay, setMenuDisplay] = useState(false)
    const context = useContext(Context)
    const navigate = useNavigate()
    const searchInput = useLocation()
    const URLSearch = new URLSearchParams(searchInput?.search)
    const searchQuery = URLSearch.getAll("q")
    const [search, setSearch] = useState(searchQuery)

    const handleLogout = async () => {
        const fetchData = await fetch(SummaryApi.logout_user.url, {
            method: SummaryApi.logout_user.method,
            credentials: 'include'
        })
        const data = await fetchData.json()
        if (data.success) {
            toast.success(data.message)
            dispatch(setUserDetails(null))
            navigate("/")
        }
        if (data.error) {
            toast.error(data.message)
        }
        navigate("/")
        setMenuDisplay(false)

    }
    const handleSearch = (e) => {
        const { value } = e.target
        setSearch(value)
        if (value) {
            navigate(`/search?q=${value}`)
        } else {
            navigate("/search")
        }
    }
    return (
        <header className='h-16 shadow-md bg-white fixed w-full z-40'>
            <div className='h-full container mx-auto flex items-center px-4 justify-between'>
                <div className=''>
                    <Link to={"/"}>
                        <Logo w={100} h={60} />
                    </Link>
                </div>
                <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2 '>
                    <input type='text' placeholder='Search products here ...' className='w-full outline-none' onChange={handleSearch} value={search} />
                    <div className='text-lg min-w-[50px] h-8 bg-red-500 flex items-center justify-center rounded-r-full text-white cursor-pointer hover:bg-red-700'>
                        <IoSearch />
                    </div>
                </div>
                <div className='flex items-center gap-5'>

                    <div className='relative flex justify-center'>
                        {
                            user?._id && (
                                <div className='text-3xl cursor-pointer relative flex justify-center ' onClick={() => setMenuDisplay(preve => !preve)}>
                                    {
                                        user?.profilePic ? (
                                            <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                                        ) : (
                                            <FaUserCircle />
                                        )
                                    }
                                </div>)
                        }

                        {
                            menuDisplay && (<div className='absolute bg-white bottom-0 top-11 h-fit p-3 shadow-lg rounder '>
                                <nav>
                                    <div className='flex flex-col'>
                                        {
                                            user?.role !== ROLE.GENERAL && (<Link to={"admin-panel/all-products"} className='whitespace-nowrap hover:bg-slate-200 p-2' onClick={() => setMenuDisplay(preve => !preve)}> Admin Panel</Link>)
                                        }
                                        <Link to={"/order"} className='whitespace-nowrap hover:bg-slate-200 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Order</Link>
                                    </div>

                                </nav>



                            </div>)
                        }

                    </div>

                    <div className='relative'>
                        {
                            user?._id && (
                                <Link to={"/cart"} className='text-3xl cursor-pointer relative '>
                                    <span>
                                        <IoCart />
                                    </span>
                                    <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                                        <p className='text-xs'>{context?.cartProductCount}</p>
                                    </div>
                                </Link>
                            )
                        }

                    </div>

                    <div>
                        {
                            user?._id ? (
                                <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
                            ) : (<Link to={"login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Login</Link>)
                        }

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header