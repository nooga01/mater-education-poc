import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import parse from 'html-react-parser';
import { NewsArticleRes } from "../typescript/pages";

function NewsList({ newslist }: {newslist: NewsArticleRes}) {
  return (
    <div className='NewsSection-featured-card'>
      <div className='NewsSection-featured-content'>
        {newslist.featured_image && (
          <Link to={newslist.url}>
            <img className='blog-list-img' src={newslist.featured_image.url} alt='blog img' />
          </Link>
        )}

        <span className='category'>News</span>
        {newslist.date && <i {...newslist.$?.date as {}}>{moment(newslist.date).format('D MMM')}</i>}              
        {newslist.title && <h3 {...newslist.$?.title as {}}>{newslist.title}</h3>}

        {newslist.url && (
          <p><Link to={newslist.url} className='newssection-readmore'>
            {'Read More -->'}
          </Link></p>
        )}
      </div>
    </div>
  );
}

export default NewsList;
