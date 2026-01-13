import React, { useState } from 'react'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
const SearchBar = ({ data }) => {
  const navigate = useNavigate()
  const [input, setInput] = useState(data ? data : '')

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/course-list/' + input)
  }
  return (
    < div >
      <form className='max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded' onSubmit={handleSubmit}>
        <img src={assets.search_icon} alt="search icon" className='md:w-auto w-10 px-3' />
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder='Search for course' className='w-full h-full outline-none text-gray-500/80' />
        <button type='submit' className='bg-blue-600 rounded-md text-white  md:py-4 py-3 md:px-10 px-7 mx-1' >Search</button>
      </form>
    </div >
  );
}
export default SearchBar