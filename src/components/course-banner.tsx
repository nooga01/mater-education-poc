import React from 'react';
import { CourseDetailRes, Page } from "../typescript/pages";


export default function CourseBanner({course}: {course:CourseDetailRes}) {

  return (
    <div className='course-banner'>
        { course.title ? (
          <h1 {...course.$ && course?.$.title as {}} className='hero-title'>
            { course?.title }
          </h1>
        ): null }

        { course.course_code ? (
          <h4 {...course.$ && course?.$.course_code as {}}>
            { course?.course_code }
          </h4>
        ): null }        
      </div>
  );
}
