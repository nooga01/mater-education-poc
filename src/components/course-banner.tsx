import React from 'react';
import { HeroBanner } from "../typescript/components";

export default function CourseBanner({ course_banner }: {course_banner : HeroBanner}) {

  return (
    <div className='page-banner'>
        {course_banner.banner_title && (
          <h1 {...course_banner.$?.banner_title as {}} className='hero-title'>
            {course_banner.banner_title}
          </h1>
        )}

        {course_banner.banner_description && (
          <p {...course_banner.$?.banner_description as {}} className='hero-description'>
            {course_banner.banner_description}
          </p>
        )}
      </div>
  );
}
