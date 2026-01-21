import React from 'react';
import { HeroBanner } from "../typescript/components";

export default function NewsBanner({ news_banner }: {news_banner : HeroBanner}) {

  return (
    <div className='page-banner'>
        {news_banner.banner_title && (
          <h1 {...news_banner.$?.banner_title as {}} className='hero-title'>
            {news_banner.banner_title}
          </h1>
        )}

        {news_banner.banner_description && (
          <p {...news_banner.$?.banner_description as {}} className='hero-description'>
            {news_banner.banner_description}
          </p>
        )}
    </div>
  );
}
