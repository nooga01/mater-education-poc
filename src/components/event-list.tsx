import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import parse from 'html-react-parser';
import { EventDetailRes } from "../typescript/pages";

function EventList({ eventlist }: {eventlist: EventDetailRes}) {
  let body = typeof eventlist.body === 'string' && eventlist.body.substr(0, 300);
  const stringLength = (body as string).lastIndexOf(' ');
  body = `${(body as string).substr(0, Math.min((body as string).length, stringLength))}...`;
  return (
    <div className='blog-list'>
      {eventlist.featured_image && (
        <Link to={eventlist.url}>
          <img className='blog-list-img' src={eventlist.featured_image.url} alt='blog img' />
        </Link>
      )}
      <div className='blog-content'>
        {eventlist.title && (
          <Link to={eventlist.url}>
            <h3>{eventlist.title}</h3>
          </Link>
        )}
        <p>
          {moment(eventlist.date).format('ddd, MMM D YYYY')}
        </p>
        {parse(body)}
        {eventlist.url ? (
          <Link to={eventlist.url}>
            <span>{'Read more -->'}</span>
          </Link>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default EventList;
