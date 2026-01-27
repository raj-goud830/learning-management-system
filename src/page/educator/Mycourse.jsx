import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContextCreate';
import Loading from '../../component/student/Loading';
const Mycourse = () => {

  const { currency, allcourses } = useContext(AppContext);
  const [course, setcourse] = useState(null)

  const fetchEducatorCourse = async () => {
    setcourse(allcourses);
  }

  useEffect(() => {
    fetchEducatorCourse()
  }, [])

  return course ? (
    <>
      <div className='h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
        <div className='w-full'>
          <h2 className='pb-4 text-lg font-medium'>MY COURSES</h2>
          <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>
            <table className='md:table-auto table-fixed w-full overflow-hidden'>
              <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
                <tr>
                  <th className='px-4 py-3 font-semibold truncate'>All Courses</th>
                  <th className='px-4 py-3 font-semibold truncate'>Earnings</th>
                  <th className='px-4 py-3 font-semibold truncate'>Students</th>
                  <th className='px-4 py-3 font-semibold truncate'>Published On</th>
                </tr>
              </thead>
              <tbody>
                {course.map((course) => (
                  <tr className='border-b border-gray-500/20' key={course._id}>
                    <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate'>
                      <img src={course.courseThumbnail} alt="course thumbnail" className='w-16' />
                      <span className='truncate hidden md:block'>{course.courseTitle}</span>
                    </td>

                    <td className='px-4 py-3'>
                      {currency}{Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount * course.coursePrice / 100))}
                    </td>

                    <td className='px-4 py-3'>{course.enrolledStudents.length}</td>
                    <td className='px-4 py-3'>{new Date(course.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  ) : <Loading />
}
export default Mycourse