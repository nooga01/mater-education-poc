import React from "react";
import {  CourseFilterRes } from "../typescript/pages";

interface ButtonsProps {
  coursefilter: CourseFilterRes | null;
  filterList: (filterId: string) => void;
}

function Buttons({ coursefilter, filterList }: ButtonsProps) {

  return (
    <div className="course-filter">
      <button className="btn filter-btn" onClick={() => filterList("")}>
        All
      </button>
      {
        coursefilter?.filter.map((f) => (
          <button className="btn filter-btn " key={f.filter_id}
            onClick={() => filterList(f.filter_id)}>
            {f.filter_name}
          </button>
        ))
      }
    </div>
  );
}

export default Buttons;