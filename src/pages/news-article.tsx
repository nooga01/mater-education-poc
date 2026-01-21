import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import parse from "html-react-parser";

import RelatedNews from "../components/related-news";
import RenderComponents from "../components/render-components";
import { getPageRes, getNewsArticleRes } from "../helper";
import Skeleton from "react-loading-skeleton";
import { useLivePreviewCtx } from "../context/live-preview-context-provider";
import { NewsArticleRes, Page } from "../typescript/pages";
import { EntryProps } from "../typescript/components";

export default function NewsArticle({entry}:{entry:({page, newsArticle}:EntryProps)=> void}) {
  const lpTs = useLivePreviewCtx();
  const { newsId } = useParams();
  const history = useNavigate();
  const [getEntry, setEntry] = useState({
    banner: {} as Page,
    article: {} as NewsArticleRes,
  });
  const [error, setError] = useState(false);

  async function fetchData() {
    try {
      const entryUrl = newsId ? `/news/${newsId}` : "/";
      const banner = await getPageRes("/news");
      const article = await getNewsArticleRes(entryUrl);
      (!banner || !article) && setError(true);
      setEntry({ banner, article });
      entry({ page: [banner], newsArticle: [article] });
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }

  useEffect(() => {
    fetchData();
    error && history("/404");
  }, [newsId, lpTs, error]);

  const { article, banner } = getEntry;
  return (
    <>
      {banner ? (
        <RenderComponents
          pageComponents={banner.page_components}
          newsPage
          contentTypeUid='news_article'
          entryUid={banner.uid}
          locale={banner.locale}
        />
      ) : (
        <Skeleton height={400} />
      )}

      <div className='news-article-container'>

          {article.title ? (
            <h1 {...(article.$?.title as {})}>{article.title}</h1>
          ) : (
            <h1>
              <Skeleton />
            </h1>
          )}
          {article.date ? (
            <p {...(article.$?.date as {})}>
              {moment(article.date).format("ddd, MMM D YYYY")},{" "}
              <strong {...(article.author[0].$?.title as {})}>
                {article.author[0].title}
              </strong>
            </p>
          ) : (
            <p>
              <Skeleton width={300} />
            </p>
          )}
          {article.body ? (
            <div {...(article.$?.body as {})}>{parse(article.body)}</div>
          ) : (
            <Skeleton height={800} width={600} />
          )}

          {article.related_news && article.related_news.length > 0 ? (
            <RelatedNews
              {...article.$?.related_news}
              relatednews={article.related_news}
            />
          ) : (
            <Skeleton width={0} height={0} />
          )}
        </div>
    </>
  );
}
