import React from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { RichText as RichTextProp } from "../typescript/components";

export default function RichText({rich_text}: {rich_text:RichTextProp}) {
  return (
    <div className="rich-text">
        {rich_text.title_h2 && <h2 {...rich_text.$?.title_h2 as {}}>{rich_text.title_h2}</h2>}
        <span dangerouslySetInnerHTML={{__html: rich_text.content}} />
    </div>
  );
}
