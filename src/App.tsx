import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/index";
import Blog from "./pages/blog";
import BlogPost from "./pages/blog-post";
import News from "./pages/news";
import NewsArticle from "./pages/news-article";
import Courses from "./pages/courses";
import CourseDetail from "./pages/course-detail";
import EventDetail from "./pages/event-detail";
import Error from "./pages/error";
//import "./styles/third-party.css";
//import "./styles/style.css";
//import "./styles/modal.css";
import "./fe/css/styles.min.css";
import "@contentstack/live-preview-utils/dist/main.css";
import "react-loading-skeleton/dist/skeleton.css";
import { EntryProps } from "./typescript/components";

function App() {
  const [getEntry, setEntry] = useState({} as EntryProps );

  function getPageRes(response: EntryProps) {
    setEntry(response);
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout entry={getEntry} />}>
          <Route index element={<Home entry={getPageRes} />} />
          <Route path="/:page" element={<Home entry={getPageRes} />} />
          <Route path="/blog" element={<Blog entry={getPageRes} />} />
          <Route path="/news" element={<News entry={getPageRes} />} />
          <Route path="/courses" element={<Courses entry={getPageRes} />} />
          <Route
            path="/blog/:blogId"
            element={<BlogPost entry={getPageRes} />}
          />
          <Route
            path="/news/:newsId"
            element={<NewsArticle entry={getPageRes} />}
          />
          <Route
            path="/courses/:courseId"
            element={<CourseDetail entry={getPageRes} />}
          />  
          <Route
            path="/events/:eventId"
            element={<EventDetail entry={getPageRes} />}
          />             
          <Route path="/404" element={<Error />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
