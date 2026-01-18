import { createContext, useEffect, useState } from 'react';
import { dummyCourses } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import hamanizeDuration from 'humanize-duration';
import { AppContext } from './AppContextCreate';

export const AppContextProvider = (props) => {
    const currency = import.meta.env.VITE_CURRENCY || '$';

    const navigate = useNavigate();
    
    const [allcourses, setAllCourses] = useState([]);
    const [isEducator, setIsEducator] = useState(true);
    
    const calculatinRating = (course) => {
        if (course.courseRatings.length === 0) {
            return 0;
        }
        let totalRating = 0;
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating;
        });
        return (totalRating / course.courseRatings.length).toFixed(1);
    }
    
    const calculatingTime = (chapter) => {
        let time = 0;
        chapter.chapterContent.map((lecture) => time += lecture.lectureDuration);
        return hamanizeDuration(time * 60 * 1000, { units: ['h', 'm'] });
    }

    const courseDuration = (course) => {
        let time = 0;
        course.courseDuration.map((chapter) => chapter.chapterContent.map((lecture) => time += lecture.lectureDuration));
        return hamanizeDuration(time * 60 * 1000, { units: ['h', 'm'] });
    }

    const calculateLactures = (course) => {
        let lectures = 0;
        course.courseContent.forEach((chapter) => {
            if (Array.isArray(chapter.chapterContent)) {
                lectures += chapter.chapterContent.length;
            }
        });
 
        useEffect(() => {
            const fetchAllCourse = async () => {
                await Promise.resolve();
                setAllCourses(dummyCourses);
            };

            fetchAllCourse();
        }, []);

        const value = {
            currency, allcourses, navigate, calculatinRating, isEducator, setIsEducator, calculatingTime, courseDuration, calculateLactures
        };
        return (
            <AppContext.Provider value={value} >
                {props.children}
            </AppContext.Provider>
        )
    }
}