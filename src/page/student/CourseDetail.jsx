import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Loading from '../../component/student/Loading';
const CourseDetail = () => {
 
  const { id } = useParams();
  const { allcourses } = useContext(AppContext);
  const [courseData, setCourseData] = useState(null)
   
  const fetchCourseData = async () => {
    const findCourse = allcourses.find(course => course._id === id)
    setCourseData(findCourse);
  }

  useEffect(() => {
    fetchCourseData()
  },[])
  

return courseData ? (
<div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left'>
  <div className='absolute top-0 left-0 w-full -z-1 bg-linear-to-b from-cyan-100/70'></div>
    <div className='max-w-xl z-10 text-gray-500'>
      <h1 className='font-semibold text-gray-800'>{ courseData.courseTitle }</h1>
      <p dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200)}}></p>
  </div>
  <div>▬</div>
</div>
): <Loading/>
}
export default CourseDetail