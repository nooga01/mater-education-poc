import React from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { CourseInformation as CourseInformationProp } from "../typescript/components";

export default function CourseInformation({ information }: {information:CourseInformationProp}) {
  return (
    <div>
      <div className="course-infomation-table">
        { information.duration && (
          <div className="table-row-group">
            <div className="table-row">
              <div className="table-cell"><img src="https://images.contentstack.io/v3/assets/blt453905795f62a7e6/bltd9bc17eff4dccb0e/697d858105a38babdd7b7a9a/clock.svg" /></div>
              <div className="table-cell"><h2>Duration</h2></div>
              <div className="table-cell"></div>
            </div>
              <div className="table-row">
                <div className="table-cell"></div>
                { information?.duration ? (
                  <div className="table-cell" {...information.$ && information?.$.duration as {}}>
                    { information?.duration }
                  </div>
                ) : <div/> }
                <div className="table-cell"></div>
              </div>            
          </div>
        )}

        { information?.cost && information?.cost.length > 0 && (
          <div className="table-row-group">
            <div className="table-row">
              <div className="table-cell"><img src="https://images.contentstack.io/v3/assets/blt453905795f62a7e6/bltf1bc092d2dbd9a51/697d8581774b80e8688f8c39/dollar-circle.svg" /></div>
              <div className="table-cell"><h2>Cost</h2></div>
              <div className="table-cell"></div>
            </div>
          {
            information?.cost.map((c) => (
              <div className="table-row" key={c.title}>
                <div className="table-cell"></div>
                { c?.title ? (
                  <div className="table-cell" {...c.$ && c?.$.title as {}}>
                    { c?.title }
                  </div>
                ) : <div/> }
                { c?.cost ? (
                  <div className="table-cell" {...c.$ && c?.$.cost as {}}>
                    <b>{ c?.cost }</b>
                  </div>
                ) : <div/> }                
              </div>
            ))
          }
          </div>
        )}


        { information?.upcoming_dates && information?.upcoming_dates.length > 0 && (
          <div className="table-row-group">
            <div className="table-row">
              <div className="table-cell"><img src="https://images.contentstack.io/v3/assets/blt453905795f62a7e6/blt354c2474204027e9/697d8581774b80893c8f8c37/calendar-alt.svg" /></div>
              <div className="table-cell"><h2>Upcoming dates</h2></div>
              <div className="table-cell"></div>
            </div>

          {
            information?.upcoming_dates.map((d) => (
              <div className="table-row" key={d.dates}>
                <div className="table-cell"></div>
                { d?.dates ? (
                  <div className="table-cell" {...d.$ && d?.$.dates as {}}>
                    { d?.dates }
                  </div>
                ) : <div/> }                
                { d?.location ? (
                  <div className="table-cell" {...d.$ && d?.$.location as {}}>
                    { d?.location }
                  </div>
                ) : <div/> }
              </div>
            ))
          }            
          </div>
        )}         

      </div>

    </div>
  );
}
