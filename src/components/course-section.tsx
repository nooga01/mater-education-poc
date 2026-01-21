import React from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { CourseSection } from "../typescript/components";

export default function CourseSectionComponent({news:courseSection}: {news:CourseSection}) {
  return (
    <div className='CourseSection'>
      <div className='CourseSection-head'>
        {courseSection.title_h2 && <h2 {...courseSection.$?.title_h2 as {}}>{courseSection.title_h2}</h2>}
      </div>
      <div className='CourseSection-featured'>
        {courseSection.featured_courses.map((course) => (
          <div className='CourseSection-featured-card' key={course.title}>
           <div className='CourseSection-featured-content'>
              {course.featured_image && <img {...course.featured_image.$?.url as {}} src={course.featured_image.url} alt='' />}

              {course.title && <h3 {...course.$?.title as {}}>{course.title}</h3>}

              {course.blurb && <p {...course.$?.blurb as {}}>{course.blurb}</p>}

              {course.url && (
                <Link to={course.url} className='blogpost-readmore'>
                  {'Read More -->'}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {courseSection.view_courses && (
        <Link to={courseSection.view_courses.href} className='btn primary-btn article-btn' {...courseSection.view_courses.$?.title as {}}>
          {courseSection.view_courses.title}
        </Link>
      )}

    </div>
  );
}
