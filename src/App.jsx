import React from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import Home from './page/student/Home.jsx'
import CourseList from './page/student/CourseList.jsx'
import CouseDetail from './page/student/CourseDetail.jsx'
import MyEnrollment from './page/student/MyEnrollement.jsx'
import Player from './page/student/Player.jsx'
import Loading from './component/student/Loading.jsx'
import Educator from './page/educator/Educator.jsx'
import Dashboard from './page/educator/Dashboard.jsx'
import AddCourse from './page/educator/AddCourse.jsx'
import MyCourse from './page/educator/MyCourse.jsx'
import StudentEnrolled from './page/educator/StudentEnrolled.jsx'
import Navbar from './component/student/Navbar.jsx'
import { AppContextProvider } from './context/AppContext.jsx'
 const App = () => {
    const isEducator = useMatch('/educator/*');
    return (
   <AppContextProvider>
   <div className='min-h-screen text-default bg-white'>
       {!isEducator && <Navbar />}
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/course-list' element={<CourseList />} />
            <Route path='/course-list/:input' element={<CourseList />} />
            <Route path='/course/:id' element={<CouseDetail />} />
            <Route path='/myenrollment' element={<MyEnrollment />} />
            <Route path='/player/:courseId' element={<Player />} />
            <Route path='/loading/:path' element={<Loading />} />
            <Route path='/educator' element={<Educator />} >
               <Route path='dashboard' element={<Dashboard />} />
               <Route path='addcourse' element={<AddCourse />} />
               <Route path='mycourse' element={<MyCourse />} />
               <Route path='studentenrolled' element={<StudentEnrolled />} />
            </Route>
     </Routes>
</div>
</AppContextProvider>
);
}
export default App