import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import { categories } from '../utils/data';

import logo from '../assets/logo.png';

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-400 hover:text-[#D4D5FA] hover:scale-110 transition-all duration-450 ease-in-out capitalize'
const isActiveStyle = 'flex items-center px-5 gap-3 text-[#D4D5FA] font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize'

function Sidebar({ user, closeToggle }) {

    const handleCloseSidebar = () => {
        if (closeToggle) closeToggle(false);
    }

    return (
        <div className='flex flex-col justify-between bg-[#17063b] text-gray-400 h-full overflow-y-scroll min-w-210 hide-scrollbar'>
            <div className='flex flex-col'>
                <Link
                    to="/"
                    className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'
                    onClick={handleCloseSidebar}
                >
                    <img src={logo} alt='logo' className='w-full' />
                </Link>
                <div className='flex flex-col gap-5'>
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                        onClick={handleCloseSidebar}
                    >
                        <RiHomeFill />
                        Home
                    </NavLink>
                    <h3 className='mt-2 px-5 text-[#17063b] bg-[#D4D5FA] py-2  2xl:text-xl'>Discover Categories</h3>
                    <div className='flex flex-col gap-5 overflow-y-scroll overflow-x-hidden'  style={{height: '460px'}}>
                    {categories.slice(0, categories.length - 1).map((category) => (
                        <NavLink
                            to={`/category/${category.name}`}
                            className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                            onClick={handleCloseSidebar}
                            key={category.name}
                        >
                        <img src={category.image} className='w-10 h-10 rounded-bl-2xl rounded-t-2xl shadow-lg' alt='category' />
                            {category.name}
                        </NavLink>

                    ))}
                    
                </div>
                </div>
            </div>
            {user && (
                <Link
                    to={`user-pofile/${user._id}`}
                    className='flex my-5 mb-3 gap-2 p-1 items-center bg-[#D4D5FA] rounded-lg shadow-lg mx-3'
                    onClick={handleCloseSidebar}
                >
                    <img src={user.image} className='w-10 h-10 rounded-full' alt='user-profile' />
                    <p className='text-[#17063b]'>{user.userName}</p>
                </Link>

            )}
        </div>
    )
}

export default Sidebar