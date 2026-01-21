import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import parse from "html-react-parser";

import ArchiveRelative from "../components/archive-relative";
import RenderComponents from "../components/render-components";
import { getEventDetailRes } from "../helper";
import Skeleton from "react-loading-skeleton";
import { useLivePreviewCtx } from "../context/live-preview-context-provider";
import { EventDetailRes } from "../typescript/pages";
import { EntryProps } from "../typescript/components";

export default function EventDetail({entry}:{entry:({event}:EntryProps)=> void}) {
  const lpTs = useLivePreviewCtx();
  const { eventId } = useParams();
  const history = useNavigate();
  const [getEntry, setEntry] = useState({
    event: {} as EventDetailRes,
  });
  const [error, setError] = useState(false);

  async function fetchData() {
    try {
      const entryUrl = eventId ? `/events/${eventId}` : "/";
      const event = await getEventDetailRes(entryUrl);
      (!event) && setError(true);
      setEntry({ event });
      entry({ event: [event] });
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }

  useEffect(() => {
    fetchData();
    error && history("/404");
  }, [eventId, lpTs, error]);

  const { event } = getEntry;
  return (
    <>
      <div className='blog-container'>
        <article className='blog-detail'>
          {event.title ? (
            <h2 {...(event.$?.title as {})}>{event.title}</h2>
          ) : (
            <h2>
              <Skeleton />
            </h2>
          )}
          {event.body ? (
            <div {...(event.$?.body as {})}>{parse(event.body)}</div>
          ) : (
            <Skeleton height={800} width={600} />
          )}
        </article>
      </div>
    </>
  );
}
