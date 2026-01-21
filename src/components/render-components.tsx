import React from "react";

import Section from "./section";
import HeroBanner from "./hero-banner";
import BlogBanner from "./blog-banner";
import NewsBanner from "./news-banner";
import CourseBanner from "./course-banner";
import CardSection from "./card-section";
import TeamSection from "./team-section";
import BlogSection from "./blog-section";
import SectionBucket from "./section-bucket";
import AboutSectionBucket from "./about-section-bucket";
import SectionWithHtmlCode from "./section-with-html-code";
import PageBanner from "./page-banner";
import RichText from "./rich-text";
import NewsSectionComponent from "./news-section";
import CourseSectionComponent from "./course-section";
import { ComponentsProps } from "../typescript/pages";

type RenderComponentsProps ={
  pageComponents:ComponentsProps[]
  blogsPage?: boolean
  contentTypeUid:string
  entryUid:string
  locale:string
  newsPage?: boolean
  coursePage?: boolean
}

export default function RenderComponents({ pageComponents, blogsPage, contentTypeUid, entryUid, locale, newsPage, coursePage }:RenderComponentsProps) {
    
  return (
    <div data-pageref={entryUid} data-contenttype={contentTypeUid} data-locale={locale}>
      {pageComponents?.map((component, key: number) => {
        if (component.hero_banner) {
          return blogsPage ? (
            <BlogBanner
              blog_banner={component.hero_banner}
              key={`component-${key}`}
            />
          ) : newsPage ? (
            <NewsBanner
              news_banner={component.hero_banner}
              key={`component-${key}`}
            />           
          ) : coursePage ? (
            <CourseBanner
              course_banner={component.hero_banner}
              key={`component-${key}`}
            />
          ) : (
            <HeroBanner
              hero_banner={component.hero_banner}
              key={`component-${key}`}
            />
          );
        }
        if (component.section) {
          return (
            <Section section={component.section} key={`component-${key}`} />
          );
        }
        if (component.section_with_buckets) {
          return component.section_with_buckets.bucket_tabular ? (
            <AboutSectionBucket
              sectionWithBuckets={component.section_with_buckets}
              key={`component-${key}`}
            />
          ) : (
            <SectionBucket
              section={component.section_with_buckets}
              key={`component-${key}`}
            />
          );
        }
        if (component.from_blog) {
          return (
            <BlogSection blogs={component.from_blog} key={`component-${key}`} />
          );
        }
        if (component.section_with_cards) {
          return (
            <CardSection
              section={component.section_with_cards}
              key={`component-${key}`}
            />
          );
        }
        if (component.section_with_html_code) {
          return (
            <SectionWithHtmlCode
              embedObject={component.section_with_html_code}
              key={`component-${key}`}
            />
          );
        }
        if (component.our_team) {
          return (
            <TeamSection
              ourTeam={component.our_team}
              key={`component-${key}`}
            />
          );
        }
        if (component.page_banner) {
          return (
            <PageBanner
              page_banner={component.page_banner}
              key={`component-${key}`}
            />
          );
        }
        if (component.rich_text) {
          return (
            <RichText
              rich_text={component.rich_text}
              key={`component-${key}`}
            />
          );
        }
        if (component.news_section) {
          return (
            <NewsSectionComponent news={component.news_section} key={`component-${key}`} />
          );
        }
        if (component.course_section) {
          return (
            <CourseSectionComponent news={component.course_section} key={`component-${key}`} />
          );
        }                
      })}
    </div>
  );
}
