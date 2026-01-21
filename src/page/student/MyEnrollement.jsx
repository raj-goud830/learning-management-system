import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContextCreate';
const MyEnrollement = () => {
  const { studentenrolled, courseDuration, navigate } = useContext(AppContext);
  const [progress, setProgress] = useState([
    { lectureCompleted: 4, totallectures: 10 },
    { lectureCompleted: 2, totallectures: 8 },
    { lectureCompleted: 1, totallectures: 6 },
    { lectureCompleted: 8, totallectures: 8 },
    { lectureCompleted: 4, totallectures: 10 },
    { lectureCompleted: 5, totallectures: 9 },
    { lectureCompleted: 0, totallectures: 12 },
    { lectureCompleted: 5, totallectures: 5 },
  ])
  return (
    <>
      <div className='md:px-36 px-8 pt-10'>
        <h1 className='text-2xl font-semibold'>My Enrollment</h1>
        <table className='md:table-auto table-fixed w-full overflow-hidden border mt-10'>
          <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
            <tr>
              <th className='px-3 py-4 font-semibold truncate'>Course</th>
              <th className='px-3 py-4 font-semibold truncate'>Duration</th>
              <th className='px-3 py-4 font-semibold truncate'>Complete</th>
              <th className='px-3 py-4 font-semibold truncate'>Status</th>
            </tr>
          </thead>

          <tbody className='text-gray-700'>
            {studentenrolled.map((course, index) => (
              <tr key={index} className='border-b border-gray-500/20 hover:bg-gray-100/50'>
                <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'>
                  <img src={course.courseThumbnail} alt="thumbnail" className='w-14 sm:w-24 md:w-28' />
                  <div className='flex-1'>
                    <p className='mb-1 max-sm:text-sm'>{course.courseTitle}</p>
                  </div>
                </td>
                <td className='px-4 py-3 max-sm:hidden'>
                  {courseDuration(course)}
                </td>
                <td className='px-4 py-3 max-sm:hidden'>
                  { progress[index] && `${progress[index].lectureCompleted} / ${progress[index].totallectures}`} <span>lectures</span>
                </td>
                <td className='px-4 py-3 max-sm:text-right'>
                  <button onClick={() => navigate('/player' + course._id)} className='px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs cursor-pointer text-white rounded-md'>
                      { progress[index] && progress[index].lectureCompleted / progress[index].totallectures === 1 ? 'Completed' : 'On Going'}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default MyEnrollement