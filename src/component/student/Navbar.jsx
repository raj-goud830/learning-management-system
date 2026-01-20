import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContextCreate';
import { useClerk, useUser, UserButton } from '@clerk/clerk-react'
import Educator from '../../page/educator/Educator';
const Navbar = () => {
    const isCourseListed = window.location.pathname.includes('/course-list');
    const { user } = useUser();
    const { openSignIn } = useClerk();

    const { navigate, isEducator } = useContext(AppContext);

    return (
        <div className={`flex justify-between items-center px-5 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 shadow-md ${isCourseListed ? 'bg-white' : 'bg-cyan-100/70'}`}>
            <img onClick={() => navigate('/')} src={assets.logo} alt="logo" className='w-28 lg:w-32 cursor-pointer' />
            <div className='hidden md:flex items-center gap-5 text-gray-600'>
                <div className='flex items-center justify-center gap-3'>
                    {user && <>
                        <button onClick={() => navigate('/Educator')}>{isEducator ? 'Educator Dashboard' : 'Become an Educator'}</button>
                        | <Link to='/my-enrollment'>My Enrollment</Link>
                    </>
                    }
                </div>
                {user ? <UserButton /> : <button onClick={openSignIn} className='bg-blue-600 cursor-pointer rounded-lg px-3 py-3 text-white'>Create account</button>}
            </div>

            <div className='md:hidden flex items-center gap-5  text-gray-600'>
                <div className='flex items-center sm:text-sm justify-center gap-3'>
                    {user && <>
                        <button onClick={() => navigate('/educator')}>{isEducator ? 'Educator Dashboard' : 'Become an Educator'}</button>
                        | <Link to='/my-enrollment'>My Enrollment</Link>
                    </>
                    }
                </div>
                {user ? <UserButton /> : <button onClick={openSignIn}><img src={assets.user_icon} alt="user" className='cursor-pointer ' /></button>}
            </div>
        </div>
    );
}
export default Navbar