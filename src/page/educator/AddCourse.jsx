import React, { useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid';
import quill from 'quill';
import { assets } from '../../assets/assets';
const AddCourse = () => {
  const editorId = uniqid(null);
  const quillRef = useRef(null);
  const editorRef = useRef(null);


  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [courseImage, setCourseImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [chapterId, setChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false
  });

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new quill(editorRef.current, {
        theme: 'snow'
      });
    }
  })
  return (
    <div className='h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <form >
        <div className='flex flex-col gap-1'>
          <p>Course Title</p>
          <input onChange={e => setCourseTitle(e.target.value)} value={courseTitle} type="text"
            className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500' required placeholder='Type here...' />
        </div>

        <div className='flex flex-col gap-1'>
          <p>Course Description</p>
          <div ref={editorRef}></div>
        </div>

        <div className='flex items-center justify-between flex-wrap'>
          <div className='flex flex-col gap-1'>
            <p>Course Price</p>
            <input onChange={e => setCoursePrice(e.target.value)} value={coursePrice} type="text"
              className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500' required placeholder='Type here...' />
          </div>

          <div className='flex md:flex-row flex-col items-center pt-3 gap-3'>
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage" className='flex items-center gap-3'>
              <img src={assets.file_upload_icon} alt="file_upload_icon" className='p-3 bg-blue-500 rounded' />
              <input type="file" id='thumbnailImage' onChange={e => setCourseImage(e.target.files[0])} accept='image/*' hidden />
              <img src={courseImage ? URL.createObjectURL(courseImage) : ''} alt="" className='max-h-10' />
            </label>
          </div>
        </div>
    
         <div className='flex flex-col gap-1'>
          <p>Discount %</p>
          <input onChange={e => setDiscount(e.target.value)} value={discount} min={0} max={100} type="number"
            className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500' required  />
        </div>

        <div>
          
        </div>

      </form>
    </div>
  );
}
export default AddCourse