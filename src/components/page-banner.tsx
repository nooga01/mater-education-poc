import React from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { PageBanner as PageBannerProp } from "../typescript/components";

export default function PageBanner({page_banner}: {page_banner:PageBannerProp}) {
  return (
    <div className="page-banner">
        {page_banner.banner_title && <h1 {...page_banner.$?.banner_title as {}}>{page_banner.banner_title}</h1>}
    </div>
  );
}
