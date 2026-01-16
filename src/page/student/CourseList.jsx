import React, { useContext, useMemo } from 'react'
import SearchBar from '../../component/student/SearchBar';
import { AppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import CourseCard from '../../component/student/CourseCard';
import { assets } from '../../assets/assets';
const CourseList = () => {
  const { navigate, allcourses } = useContext(AppContext);
  const { input } = useParams()

  const filteredCourses = useMemo(() => {
    if (allcourses && allcourses.length > 0) {
      const tempcourse = allcourses.slice();
      return input ?
        tempcourse.filter(item => item.courseTitle.toLowerCase().includes(input.toLowerCase()))
        : tempcourse
    }
    return [];
  }, [allcourses, input])

  return (
    <>
      <div className='relative md:px-36 px-8 pt-20 text-left'>
        <div className='flex md:flex-row flex-col gap-6 items-start justify-between w-full' >
          <div>
            <h1 className='text-4xl font-semibold text-gray-800'>Course List</h1>
            <p className='text-gray-500'> <span className='text-blue-600 cursor-pointer'
              onClick={() => navigate('/')}>Home </span> / <span>Course List</span></p>
          </div>
          <SearchBar data={input} />
        </div>
        {input && <div className='inline-flex items-center gap-4 px-4
        py-2 border mt-8 -mb-8 text-gray-600'>
          <p>{input}</p>
          <img src={assets.cross_icon} alt="clear search" className='cursor-pointer' onClick={() => navigate('/course-list')} />
        </div>}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0'>
          {filteredCourses.map((course, index) => <CourseCard key={index} course={course} />)}
        </div>
      </div>
    </>
  );
}
export default CourseList