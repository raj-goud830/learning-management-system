import React from 'react'
import Hero from '../../component/student/Hero';
import Companies from '../../component/student/Companies';
import CoursesSection from '../../component/student/CoursesSection';
import TestimonialSection from '../../component/student/TestimonialSection';
import CallToAction from '../../component/student/CallToAction';
import Footer from '../../component/student/Footer';
const Home = () => {
    return (
        <div className='flex flex-col items-center space-y-7 text-center'>
            <Hero />
            <Companies />
            <CoursesSection />
            <TestimonialSection />
            <CallToAction />
            <Footer/>
        </div>
    );
}
export default Home