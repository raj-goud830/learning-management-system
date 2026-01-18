import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Loading from '../../component/student/Loading';
import { assets } from '../../assets/assets';
const CourseDetail = () => {

  const { id } = useParams();
  const { allcourses, calculatinRating, calculatingTime, courseDuration, calculateLactures } = useContext(AppContext);
  const [courseData, setCourseData] = useState(null)

  const fetchCourseData = async () => {
    const findCourse = allcourses.find(course => course._id === id)
    setCourseData(findCourse);
  }

  useEffect(() => {
    fetchCourseData()
  }, [])


  return courseData ? (
    <>
      <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left'>
        <div className='absolute top-0 left-0 w-full -z-1 bg-linear-to-b from-cyan-100/70'></div>
        <div className='max-w-xl z-10 text-gray-500'>
          <h1 className='heading-small md:heading-large font-semibold text-gray-800'>{courseData.courseTitle}</h1>
          <p className='pt-4 md:text-base text-sm' dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }}></p>

          <div className='flex items-center space-x-2'>
            <p>{calculatinRating(courseData)}</p>
            <div className='flex'>
              {[...Array(5)].map((_, index) => (<img key={index} src={index < Math.floor(calculatinRating(courseData)) ? assets.star : assets.star_blank} alt="star" className='w-3.5 h-3.5' />))}
            </div>
            <p className='text-gray-500'>{courseData.courseRatings.length}</p>
            <p className='text-blue-600'>({courseData.courseRatings.length}{courseData.courseRatings.length > 1 ? ' ratings' : ' rating'})</p>
            <p className='text-blue-600'>({courseData.enrolledStudents.length}{courseData.enrolledStudents.length > 1 ? ' students' : ' student'})</p>
          </div>
          <p className='text-sm'>Course By <span className='text-blue-600 underline'>ME</span></p>
          
          <div className='pt-8 text-gray-800'>
            <h2 className='text-xl font-semibold'>Course Structure</h2>

            <div className='pt-5'>
              {courseData.courseContent.map((chapter, index) => (
                <div key={index} className='border border-gray-300 bg-white mb-3 rounded'>
                  <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none'>
                    <div className='flex items-center gap-2'>
                      <img src={assets.down_arrow_icon} alt="down arrow" />
                      <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                    </div>
                    <p>{chapter.calculateLactures.length} lecture - {calculatingTime(chapter)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : <Loading />
}
export default CourseDetail