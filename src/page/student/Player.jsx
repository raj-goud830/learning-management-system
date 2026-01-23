import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContextCreate';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
const Player = () => {

  const { studentenrolled, calculatingTime } = useContext(AppContext)
  const { courseId } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [openSection, setOpenSection] = useState({})
  const [player, setPlayer] = useState()

  const getCourseData = () => {
  
    
    if (!Array.isArray(studentenrolled) || studentenrolled.length === 0) {
      
      return;
    }

    const course = studentenrolled.find((item) => item._id === courseId);
    
    setCourseData(course || null);
  }

  const toggleSection = (index) => {
    setOpenSection((prev) => (
      {
        ...prev,
        [index]: !prev[index]
      }
    ))
  }

  useEffect(() => {
    getCourseData()
  }, [studentenrolled, courseId])

  return (
    <>
      <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>
        {/* left view */}
        <div className='text-gray-800'>
          <h1 className='font-semibold text-xl'>Course Structure</h1>

          <div className='pt-5'>
            {courseData && Array.isArray(courseData.courseContent) && courseData.courseContent.length > 0 ? (
              courseData.courseContent.map((chapter, index) => (
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
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className='flex items-start gap-2 py-1'>
                          <img src={false ? assets.blue_tick_icon : assets.play_icon} alt="play icon" className='w-4 h-4 mt-1' />
                          <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                            <p>{lecture.lectureTitle}</p>
                            <div className='flex gap-2'>
                              {lecture.lectureUrl && <p className='text-blue-500 cursor-pointer' onClick={() => setPlayer({
                                ...lecture, chapter: index + 1, lecture: i + 1
                              })}>watch</p>}
                              <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-red-500'>Course not found.</p>
            )}
          </div>
        </div>
        {/* right view */}
        <div className='md:mt-10'>
          {player ? (
            <div>
              <YouTube videoId={player.lectureUrl.split('/').pop()} opts={{
                playerVars: {
                  autoplay: 1
                }
              }} iframeClassName='w-full aspect-video' /> 
              <div className='flex items-center justify-between mt-1'>
                <p>Chapter</p>
                <button className='text-blue-600'>{false ? "Completed" : "Mark Complete"}</button>
              </div>
            </div>
          ) : (
            courseData && courseData.courseThumbnail ? (
              <img src={courseData.courseThumbnail} alt="thumbnail" className='w-full rounded' />
            ) : (
              <div className='text-gray-400'>Select a lecture to watch</div>
            )
          )}
        </div> 
      </div>
    </>
  );
}
export default Player;