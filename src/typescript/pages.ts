import {
  Widget,
  Section,
  OurTeam,
  FromBlog,
  HeroBanner,
  SectionWithCards,
  SectionWithBuckets,
  SectionWithHtmlCode,
  PageBanner,
  RichText,
  NewsSection,
  CourseSection,

  CourseInformation,
} from "./components";

export type SEO = {
  enable_search_indexing: boolean;
  keywords: string;
  meta_description: string;
  meta_title: string;
  $: SEO;
};

export type Img = {
  url: string;
  uid: string;
  title: string;
  filename: string;
  $: Img;
};

export type Link = {
  title: string;
  href: string;
  $?: Link;
};

export type ComponentsProps = {
  widget: Widget;
  section: Section;
  our_team: OurTeam;
  from_blog: FromBlog;
  hero_banner: HeroBanner;
  section_with_cards: SectionWithCards;
  section_with_buckets: SectionWithBuckets;
  section_with_html_code: SectionWithHtmlCode;
  page_banner: PageBanner;
  rich_text: RichText;
  news_section: NewsSection;
  course_section: CourseSection;
};

export type CourseComponentsProps = {
  information: CourseInformation;
};

export type Page = {
  $: Page;
  title: string;
  url: string;
  seo: SEO;
  uid: string;
  locale: string;
  page_components: ComponentsProps[];
};

export type BlogPostRes = {
  title: string;
  url: string;
  seo: SEO;
  uid: string;
  body: string;
  locale: string;
  author: [{ $: { uid: string; title: string }; uid: string; title: string }];
  date: string;
  featured_image: Img;
  related_post: BlogPostRes[];
  is_archived: boolean;
  $: BlogPostRes;
};

export type NewsArticleRes = {
  title: string;
  url: string;
  seo: SEO;
  uid: string;
  body: string;
  locale: string;
  author: [{ $: { uid: string; title: string }; uid: string; title: string }];
  date: string;
  featured_image: Img;
  related_news: NewsArticleRes[];
  is_archived: boolean;
  $: NewsArticleRes;
};

export type CourseDetailRes = {
  title: string;
  url: string;
  seo: SEO;
  uid: string;
  course_code: string;
  duration: string;
  body: string;
  blurb: string;
  featured_image: Img;
  locale: string;
  is_archived: boolean;
  page_components: CourseComponentsProps[];
  page_components_2: {
    details: CourseInformation;
  }
  taxonomies: [{ $: { taxonomy_uid: string; term_uid: string }; taxonomy_uid: string; term_uid: string }];
  $: CourseDetailRes;
};

export type EventDetailRes = {
  title: string;
  url: string;
  seo: SEO;
  uid: string;
  body: string;
  locale: string;
  date: string;
  featured_image: Img;
  is_archived: boolean;
  $: EventDetailRes;
};

export type CourseFilterRes = {
  title: string;
  uid: string;
  filter: [ $: { filter_name: string, filter_id: string }]
  $: CourseFilterRes;
};