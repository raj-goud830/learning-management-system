import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';
const CoursesSection = () => {
    const { allcourses } = useContext(AppContext);
    return (
        <div className='py-16 md:px-40 px-8'>
            <h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>
            <p className='text-sm md:text-base text-gray-500 mt-3'>Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.</p>

            <div className='md:grid md:grid-cols-4 md:gap-6 mt-10 space-y-6 md:space-y-0'>
                {allcourses.slice(0, 4).map((course, index) => <CourseCard key={index} course={course} />)}
            </div>

            <Link to="/student/courses-list" onClick={() => scrollTo(0, 0)} className='text-gray-500 border border-gray-500/30 px-10 py-3 rounded'>Show all courses</Link>
        </div>
    );
}
export default CoursesSection