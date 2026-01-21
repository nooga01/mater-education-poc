import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArchiveRelative from "../components/archive-relative";
import RenderComponents from "../components/render-components";
import CourseList from "../components/course-list";
import { getCourseListRes, getCourseListResFilter, getPageRes, getCourseFilterRes } from "../helper";
import Skeleton from "react-loading-skeleton";
import { useLivePreviewCtx } from "../context/live-preview-context-provider";
import { CourseDetailRes, CourseFilterRes, Page } from "../typescript/pages";
import { EntryProps } from "../typescript/components";
import Buttons from "../components/buttons";

export default function Courses({ entry }:{entry:({page, course}:EntryProps)=> void}) {
  const history = useNavigate();
  const [getEntry, setEntry] = useState({} as Page);
  const [getList, setList] = useState({
    archive: [] as CourseDetailRes[],
    list: [] as CourseDetailRes[],
    filteredarchive: [] as CourseDetailRes[],
    filteredlist: [] as CourseDetailRes[],

  });
const [getFilter, setFilter] = useState<{
  courseFilter: CourseFilterRes | null;
}>({
  courseFilter: null
});

  const [error, setError] = useState(false);
  const lpTs = useLivePreviewCtx();

  const filter = "";

  async function fetchData(filter : string) {
    try {
      const courseFilter = await getCourseFilterRes();
      const course = await getPageRes("/courses");
      const {archivedCourses,recentCourses} = await getCourseListRes();
      setEntry(course);
      setList({ archive: archivedCourses, list: recentCourses, filteredarchive: archivedCourses, filteredlist: recentCourses});
      const courseList = recentCourses.concat(archivedCourses)
      setFilter({ courseFilter });
      entry({ page: [course], course: courseList});
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }

  useEffect(() => {
    fetchData(filter);
    error && history("/404");
  }, [error, lpTs]);

  const filterList = (filterId: string) => {
    if (filterId === "")
    {
      setList({ archive: getList.archive, list: getList.list, filteredarchive: getList.archive, filteredlist: getList.list});
    }
    else
    {
      //console.log(filterId);
      const newfilteredarchive =  getList.archive.filter((c) => c.taxonomies[0].term_uid === filterId);
      const newfilteredlist =  getList.list.filter((c) => c.taxonomies[0].term_uid === filterId);
      setList({ archive: getList.archive, list: getList.list, filteredarchive: newfilteredarchive, filteredlist: newfilteredlist});
    }
  }

  return (
    <>
      {Object.keys(getEntry).length ? (
        <RenderComponents
          pageComponents={getEntry.page_components}
          coursePage
          contentTypeUid='page'
          entryUid={getEntry.uid}
          locale={getEntry.locale}
        />
      ) : (
        <Skeleton height={400} />
      )}
      <div className='course-container'>

          <Buttons
            coursefilter={ getFilter.courseFilter }
            filterList={ filterList }
          />

        <div className='course-cards'>
          <div className='CourseSection'>
            <div className='CourseSection-featured'>
              {Object.keys(getList.list).length ? (
                getList.filteredlist.map((courselist, index) => (
                  <CourseList courselist={courselist} key={index} />
                ))
              ) : (
                <Skeleton height={400} width={400} count={3} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
