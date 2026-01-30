import React from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { CourseInformation as CourseInformationProp } from "../typescript/components";

export default function CourseInformation({ information }: {information:CourseInformationProp}) {
  return (
    <div>
      { information.duration && (
        <div {...(information.$?.duration as {})}>{ information.duration }</div>
      )}
      
      { information?.cost && information?.cost.length > 0 && (
        <div>
        {
          information?.cost.map((c) => (
            <div key={c.title}>
              { c.title } - { c.cost }
            </div>
          ))
        }
        </div>
      )}

      { information?.upcoming_dates && information?.upcoming_dates.length > 0 && (
        <div>
        {
          information?.upcoming_dates.map((d) => (
            <div key={d.dates}>
              { d.dates } - { d.location }
            </div>
          ))
        }
        </div>
      )}              
    </div>
  );
}
