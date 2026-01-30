import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import parse from 'html-react-parser';
import { CourseDetailRes } from "../typescript/pages";

function CourseList({ courselist }: {courselist: CourseDetailRes}) {
  let body = typeof courselist.body === 'string' && courselist.body.substr(0, 300);
  const stringLength = (body as string).lastIndexOf(' ');
  body = `${(body as string).substr(0, Math.min((body as string).length, stringLength))}...`;
  return (
    <div className='CourseSection-featured-card'>
      <div className='CourseSection-featured-content'>
        { courselist.featured_image && (
          <Link to={courselist.url} >
            <img {...courselist.featured_image.$?.url as {}} src={courselist.featured_image.url} alt='' />
          </Link>
        )}

        { courselist.title && (
          <Link to={courselist.url} >
            <h3 {...courselist.$?.title as {}}>{courselist.title}</h3>
          </Link>
        )}

        {courselist.blurb && <p {...courselist.$?.blurb as {}}>{courselist.blurb}</p>}

        { courselist.url && (
          <Link to={courselist.url} className='coursesection-readmore'>
            {'Read More -->'}
          </Link>
        )}
      </div>
    </div>
  );
}

export default CourseList;
