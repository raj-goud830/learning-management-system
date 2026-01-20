import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContextCreate';
import Loading from '../../component/student/Loading';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
const CourseDetail = () => {

  const { id } = useParams();
  const { allcourses, calculatingRating, calculatingTime, courseDuration, calculateLectures } = useContext(AppContext);
  const [courseData, setCourseData] = useState(null)
  const [openSection, setOpenSection] = useState({})

  const fetchCourseData = async () => {
    const findCourse = allcourses.find(course => course._id === id)
    setCourseData(findCourse);
  }

  useEffect(() => {
    fetchCourseData()
  }, [])

  const toggleSection = (index) => {
    setOpenSection((prev) => (
     { ...prev,
        [index]: !prev[index]}
    ))
 }
  return courseData ? (
    <>
      <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left'>
        <div className='absolute top-0 left-0 w-full -z-1 bg-linear-to-b from-cyan-100/70'></div>
        <div className='max-w-xl z-10 text-gray-500'>
          <h1 className='heading-small md:heading-large font-semibold text-gray-800'>{courseData.courseTitle}</h1>
          <p className='pt-4 md:text-base text-sm' dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }}></p>

          <div className='flex items-center space-x-2'>
            <p>{calculatingRating(courseData)}</p>
            <div className='flex'>
              {[...Array(5)].map((_, index) => (<img key={index} src={index < Math.floor(calculatingRating(courseData)) ? assets.star : assets.star_blank} alt="star" className='w-3.5 h-3.5' />))}
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
                  <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={() => toggleSection(index)}>
                    <div className='flex items-center gap-2'>
                      <img className={`transform transition-transform ${openSection[index] ? 'rotate-180' : ''}`} src={assets.down_arrow_icon} alt="down arrow" />
                      <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                    </div>
                    <p className='text-sm md:text-default'>{chapter.chapterContent.length} lecture - {calculatingTime(chapter)}</p>
                  </div>

                  <div className={`overflow-hidden transition-all duration-300 ${openSection[index] ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                      {chapter.chapterContent.map((lecuture, i) => (
                        <li key={i} className='flex items-start gap-2 py-1'>
                          <img src={assets.play_icon} alt="play icon" className='w-4 h-4 mt-1'/>
                          <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                            <p>{ lecuture.lectureTitle}</p>
                            <div className='flex gap-2'>
                              {lecuture.isPreviewFree && <p className='text-blue-500 cursor-pointer'>Preview</p>}
                              <p>{ humanizeDuration(lecuture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='py-20 text-sm md:text-default'>
            <h3 className='text-xl font-semibold text-gray-800'>Course Description</h3>
             <p className='pt-3 rich-text' dangerouslySetInnerHTML={{ __html: courseData.courseDescription}}></p>
          </div>
        </div>
      </div>
    </>
  ) : <Loading />
}
export default CourseDetail