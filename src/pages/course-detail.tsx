import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import parse from "html-react-parser";

import ArchiveRelative from "../components/archive-relative";
import RenderComponents from "../components/render-components";
import { getPageRes, getCourseDetailRes } from "../helper";
import Skeleton from "react-loading-skeleton";
import { useLivePreviewCtx } from "../context/live-preview-context-provider";
import { CourseDetailRes, Page } from "../typescript/pages";
import { EntryProps } from "../typescript/components";

export default function CourseDetail({entry}:{entry:({page, course}:EntryProps)=> void}) {
  const lpTs = useLivePreviewCtx();
  const { courseId } = useParams();
  const history = useNavigate();
  const [getEntry, setEntry] = useState({
    banner: {} as Page,
    course: {} as CourseDetailRes,
  });
  const [error, setError] = useState(false);

  async function fetchData() {
    try {
      const entryUrl = courseId ? `/courses/${courseId}` : "/";
      const banner = await getPageRes("/courses");
      const course = await getCourseDetailRes(entryUrl);
      (!banner || !course) && setError(true);
      setEntry({ banner, course });
      entry({ page: [banner], course: [course] });
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }

  useEffect(() => {
    fetchData();
    error && history("/404");
  }, [courseId, lpTs, error]);

  const { course, banner } = getEntry;
  const locations = course.taxonomies?.filter(t => t.taxonomy_uid === "course_location");

  return (
    <>
      {banner ? (
        <RenderComponents
          pageComponents={banner.page_components}
          coursePage
          contentTypeUid='course'
          entryUid={banner.uid}
          locale={banner.locale}
        />
      ) : (
        <Skeleton height={400} />
      )}

      <div className='course-detail-container'>

          {course.title ? (
            <h1 {...(course.$?.title as {})}>{course.title}</h1>
          ) : (
            <h1>
              <Skeleton />
            </h1>
          )}

          {course.course_code ? (
            <i {...(course.$?.course_code as {})}>{course.course_code}</i>
          ) : (
              <Skeleton />
          )}


          {locations?.length > 0 && (
            <>
            <h3>Locations</h3>
            <ul>
                {locations.map(t => (
                  <li key={t.term_uid}>{t.term_uid}</li>
                ))}
            </ul>
            </>
          )}

          {course.duration && (
            <>
            <h3>Duration</h3>
            <p {...(course.$?.duration as {})}>{ course.duration }</p>
            </>
          )} 

          {course.body && (
            <>
            <h3>Description</h3>
            <div {...(course.$?.body as {})}>{parse(course.body)}</div>
            </>
          )}
      </div>
    </>
  );
}
