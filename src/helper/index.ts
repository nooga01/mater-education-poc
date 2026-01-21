import { getEntry, getEntryByUrl } from "../sdk/entry";
import { addEditableTags } from "@contentstack/utils";
import { FooterRes, HeaderRes } from "../typescript/response";
import { BlogPostRes, NewsArticleRes, Page, CourseDetailRes, CourseFilterRes, EventDetailRes } from "../typescript/pages";

const liveEdit = process.env.REACT_APP_CONTENTSTACK_LIVE_EDIT_TAGS === "true";

export const getHeaderRes = async (): Promise<HeaderRes> => {
  const response = (await getEntry({
    contentTypeUid: "header",
    referenceFieldPath: [
      "top_menu.page_reference",
      "navigation_menu.page_reference"
    ],
    jsonRtePath: ["notification_bar.announcement_text"],
  })) as HeaderRes[][];
  liveEdit && addEditableTags(response[0][0], "header", true);
  return response[0][0];
};

export const getFooterRes = async (): Promise<FooterRes> => {
  const response = (await getEntry({
    contentTypeUid: "footer",
    jsonRtePath: ["copyright"],
    referenceFieldPath: undefined,
  })) as FooterRes[][];
  liveEdit && addEditableTags(response[0][0], "footer", true);
  return response[0][0];
};

export const getAllEntries = async (): Promise<Page[]> => {
  const response = (await getEntry({
    contentTypeUid: "page",
    jsonRtePath: undefined,
    referenceFieldPath: undefined,
  })) as Page[][];
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, "blog_post", true));
  return response[0];
};

export const getPageRes = async (entryUrl: string): Promise<Page> => {
  const response = (await getEntryByUrl({
    contentTypeUid: "page",
    entryUrl,
    referenceFieldPath: [
      "page_components.from_blog.featured_blogs",
      "page_components.news_section.featured_news",
      "page_components.course_section.featured_courses"
    ],
    jsonRtePath: [
      "page_components.from_blog.featured_blogs.body",
      "page_components.section_with_buckets.buckets.description",
      "page_components.section_with_html_code.description",
    ],
  })) as Page[];
  liveEdit && addEditableTags(response[0], "page", true);
  return response[0];
};

export const getBlogListRes = async (): Promise<{
  archivedBlogs: BlogPostRes[];
  recentBlogs: BlogPostRes[];
}> => {
  const response = (await getEntry({
    contentTypeUid: "blog_post",
    referenceFieldPath: ["author", "related_post"],
    jsonRtePath: ["body"],
  })) as BlogPostRes[][];
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, "blog_post", true));
  const archivedBlogs = [] as BlogPostRes[];
  const recentBlogs = [] as BlogPostRes[];

  response[0].forEach((blogs) => {
    if (blogs.is_archived) {
      archivedBlogs.push(blogs);
    } else {
      recentBlogs.push(blogs);
    }
  });
  return { archivedBlogs, recentBlogs };
};

export const getBlogPostRes = async (
  entryUrl: string
): Promise<BlogPostRes> => {
  const response = (await getEntryByUrl({
    contentTypeUid: "blog_post",
    entryUrl,
    referenceFieldPath: ["author", "related_post"],
    jsonRtePath: ["body", "related_post.body"],
  })) as BlogPostRes[];
  liveEdit && addEditableTags(response[0], "blog_post", true);
  return response[0];
};

export const getNewsListRes = async (): Promise<{
  archivedNewsArticles: NewsArticleRes[];
  recentNewsArticles: NewsArticleRes[];
}> => {
  const response = (await getEntry({
    contentTypeUid: "news_article",
    referenceFieldPath: ["author", "related_news"],
    jsonRtePath: ["body"],
  })) as NewsArticleRes[][];
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, "news_article", true));
  const archivedNewsArticles = [] as NewsArticleRes[];
  const recentNewsArticles = [] as NewsArticleRes[];

  response[0].forEach((newsarticles) => {
    if (newsarticles.is_archived) {
      archivedNewsArticles.push(newsarticles);
    } else {
      recentNewsArticles.push(newsarticles);
    }
  });
  return { archivedNewsArticles, recentNewsArticles };
};

export const getNewsArticleRes = async (
  entryUrl: string
): Promise<NewsArticleRes> => {
  const response = (await getEntryByUrl({
    contentTypeUid: "news_article",
    entryUrl,
    referenceFieldPath: ["author", "related_news"],
    jsonRtePath: ["body", "related_news.body"],
  })) as NewsArticleRes[];
  liveEdit && addEditableTags(response[0], "news_article", true);
  return response[0];
};

export const getCourseListRes = async (): Promise<{
  archivedCourses: CourseDetailRes[];
  recentCourses: CourseDetailRes[];
}> => {
  const response = (await getEntry({
    contentTypeUid: "course",
    referenceFieldPath: undefined,
    jsonRtePath: ["body"],
  })) as CourseDetailRes[][];
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, "course", true));
  const archivedCourses = [] as CourseDetailRes[];
  const recentCourses = [] as CourseDetailRes[];

  response[0].forEach((course) => {
    if (course.is_archived) {
      archivedCourses.push(course);
    } else {
      recentCourses.push(course);
    }
  });
  return { archivedCourses, recentCourses };
};

export const getCourseListResFilter = async (
  filter: string
): Promise<{
  archivedCourses: CourseDetailRes[];
  recentCourses: CourseDetailRes[];
}> => {
  const response = (await getEntry({
    contentTypeUid: "course",
    referenceFieldPath: undefined,
    jsonRtePath: ["body"],
  })) as CourseDetailRes[][];
  liveEdit && response[0].forEach((entry) => addEditableTags(entry, "course", true));
  const archivedCourses = [] as CourseDetailRes[];
  const recentCourses = [] as CourseDetailRes[];

  response[0].forEach((course) => {
    if (filter == "") {
      if (course.is_archived) {
        archivedCourses.push(course);
      } else {
        recentCourses.push(course);
      }
    }
    else {
      if (course.taxonomies[0].term_uid == filter) {
        if (course.is_archived) {
          archivedCourses.push(course);
        } else {
          recentCourses.push(course);
        }
      }
    }
  });
  return { archivedCourses, recentCourses };
};

export const getCourseDetailRes = async (
  entryUrl: string
): Promise<CourseDetailRes> => {
  const response = (await getEntryByUrl({
    contentTypeUid: "course",
    entryUrl,
    referenceFieldPath: undefined,
    jsonRtePath: ["body"],
  })) as CourseDetailRes[];
  liveEdit && addEditableTags(response[0], "course", true);
  return response[0];
};

export const getEventListRes = async (): Promise<{
  archivedEvents: EventDetailRes[];
  recentEvents: EventDetailRes[];
}> => {
  const response = (await getEntry({
    contentTypeUid: "event",
    referenceFieldPath: ["author", "related_post"],
    jsonRtePath: ["body"],
  })) as EventDetailRes[][];
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, "event", true));
  const archivedEvents = [] as EventDetailRes[];
  const recentEvents = [] as EventDetailRes[];

  response[0].forEach((event) => {
    if (event.is_archived) {
      archivedEvents.push(event);
    } else {
      recentEvents.push(event);
    }
  });
  return { archivedEvents, recentEvents };
};

export const getEventDetailRes = async (
  entryUrl: string
): Promise<EventDetailRes> => {
  const response = (await getEntryByUrl({
    contentTypeUid: "event",
    entryUrl,
    referenceFieldPath: undefined,
    jsonRtePath: ["body"],
  })) as BlogPostRes[];
  liveEdit && addEditableTags(response[0], "event", true);
  return response[0];
};

export const getCourseFilterRes = async (): Promise<CourseFilterRes | null> => {
  const response = (await getEntry({
    contentTypeUid: "course_filter",
    referenceFieldPath: undefined,
    jsonRtePath:  undefined,
  })) as CourseFilterRes[][];
  return response[0][0];
};