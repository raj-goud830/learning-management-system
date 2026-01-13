import React from 'react'
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
    const { currency, calculatinRating } = useContext(AppContext);
    return (
        <Link to={'/course/' + course._id} onClick={() => scrollTo(0, 0)} className='border border-gray-500/30 pb-6 overflow-hidden rounded-md'>
            <div>
                <img src={course.courseThumbnail} alt='thumbnail' className='w-full' />
                <div className='p-3 text-left'>
                    <h3 className='text-base font-semibold'>{course.courseTitle}</h3>
                    <p className='text-gray-500'>{course.educator.name}</p>
                    <div className='flex items-center space-x-2'>
                        <p>{calculatinRating(course)}</p>
                        <div className='flex'>
                            {[...Array(5)].map((_, index) => (<img key={index} src={index < Math.floor(calculatinRating(course)) ? assets.star : assets.star_blank} alt="star" className='w-3.5 h-3.5' />))}
                        </div>
                        <p className='text-gray-500'>{course.courseRatings.length}</p>
                    </div>
                    <p className='text-base font-semibold text-gray-800'>{currency}{(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}</p>
                </div>
            </div>
        </Link>
    );
}
export default CourseCard