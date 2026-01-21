import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArchiveRelative from "../components/archive-relative";
import RenderComponents from "../components/render-components";
import NewsList from "../components/news-list";
import EventList from "../components/event-list";
import { getNewsListRes, getEventListRes, getPageRes } from "../helper";
import Skeleton from "react-loading-skeleton";
import { useLivePreviewCtx } from "../context/live-preview-context-provider";
import { NewsArticleRes, Page, EventDetailRes } from "../typescript/pages";
import { EntryProps } from "../typescript/components";

export default function News({ entry }:{entry:({page, newsArticle}:EntryProps)=> void}) {
  const history = useNavigate();
  const [getEntry, setEntry] = useState({} as Page);
  const [getList, setList] = useState({
    newsarchive: [] as NewsArticleRes[],
    newslist: [] as NewsArticleRes[],
    eventarchive: [] as EventDetailRes[],
    eventlist: [] as EventDetailRes[],
  });
  const [error, setError] = useState(false);
  const lpTs = useLivePreviewCtx();

  async function fetchData() {
    try {
      const news = await getPageRes("/news");
      const {archivedNewsArticles,recentNewsArticles} = await getNewsListRes();
      const {archivedEvents,recentEvents} = await getEventListRes();
      setEntry(news);
      setList({ newsarchive: archivedNewsArticles, newslist: recentNewsArticles, eventarchive: archivedEvents, eventlist: recentEvents });
      const newsList = recentNewsArticles.concat(archivedNewsArticles)
      entry({ page: [news], newsArticle: newsList });
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }

  useEffect(() => {
    fetchData();
    error && history("/404");
  }, [error, lpTs]);

  return (
    <>
      {Object.keys(getEntry).length ? (
        <RenderComponents
          pageComponents={getEntry.page_components}
          newsPage
          contentTypeUid='page'
          entryUid={getEntry.uid}
          locale={getEntry.locale}
        />
      ) : (
        <Skeleton height={400} />
      )}
      <div className='news-container'>
        <div className='news-column-left'>
          <div className='NewsSection'>
            <div className='NewsSection-featured'>
              {Object.keys(getList.newslist).length ? (
                getList.newslist.map((newslist, index) => (
                  <NewsList newslist={newslist} key={index} />
                ))
              ) : (
                <Skeleton height={400} width={400} count={3} />
              )}
            </div>
          </div>
        </div>
        <div className='news-column-right'>
        </div>
      </div>
    </>
  );
}
