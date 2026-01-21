import React from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import moment from 'moment';
import { NewsArticleRes } from "../typescript/pages";

export default function RelatedNews({ relatednews }: {relatednews:NewsArticleRes[]}) {  
  return (
    <>
      <div className='NewsSection'>
        <div className='NewsSection-head'>
          <h2>Keep reading...</h2>
        </div>        
        <div className='NewsSection-featured'>
          {relatednews?.map((news) => (
            <div className='NewsSection-featured-card' key={news.title}>
              <div className='NewsSection-featured-content'>
                {news.featured_image && <img {...news.featured_image.$?.url as {}} src={news.featured_image.url} alt='' />}

                {news.date && <i {...news.$?.date as {}}>{moment(news.date).format('D MMM')}</i>}              
                {news.title && <h3 {...news.$?.title as {}}>{news.title}</h3>}

                {news.url && (
                  <p><Link to={news.url} className='blogpost-readmore'>
                    {'Read More -->'}
                  </Link></p>
                )}
              </div>
            </div>
          ))}
        </div>      
      </div>
    </>
  );
}
