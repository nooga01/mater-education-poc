import React from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import moment from 'moment';
import { NewsSection } from "../typescript/components";

export default function NewsSectionComponent({news:newsSection}: {news:NewsSection}) {
  return (
    <div className='NewsSection'>
      <div className='NewsSection-head'>
        {newsSection.title_h2 && <h2 {...newsSection.$?.title_h2 as {}}>{newsSection.title_h2}</h2>}
      </div>
      <div className='NewsSection-featured'>
        {newsSection.featured_news.map((news) => (
          <div className='NewsSection-featured-card' key={news.title}>
           <div className='NewsSection-featured-content'>
              { news.featured_image && (
                <Link to={news.url}>
                  <img {...news.featured_image.$?.url as {}} src={news.featured_image.url} alt='' />
                </Link>
              )}

              <span className='category'>News</span>
              {news.date && <i {...news.$?.date as {}}>{moment(news.date).format('D MMM')}</i>}              

              { news.title && (
                <Link to={news.url}>
                  <h3 {...news.$?.title as {}}>{news.title}</h3>
                </Link>
              )}

              { news.url && (
                <Link to={news.url} className='newssection-readmore'>
                  {'Read More -->'}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

        {newsSection.view_articles && (
          <Link to={newsSection.view_articles.href} className='btn primary-btn article-btn' {...newsSection.view_articles.$?.title as {}}>
            {newsSection.view_articles.title}
          </Link>
        )}

    </div>
  );
}
