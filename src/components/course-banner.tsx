import React from 'react';

interface CourseBannerProps {
  courseTitle: string;
  courseCode: string;
}

export default function CourseBanner({ courseTitle, courseCode }: CourseBannerProps) {

  return (
    <div className='course-banner'>
        { courseTitle && (
          <h1 {...courseTitle as {}} className='hero-title'>
            {courseTitle}
          </h1>
        )}

        { courseCode && (
          <h4 {...courseCode as {}}>
            { courseCode }
          </h4>
        )}
      </div>
  );
}
