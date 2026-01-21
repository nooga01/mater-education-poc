import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import DevTools from "./devtools";
import { getHeaderRes, getFooterRes, getAllEntries } from "../helper";
import { onEntryChange } from "../sdk/entry";
import { EntryProps } from "../typescript/components";
import { FooterRes, HeaderRes, NavigationMenu } from "../typescript/response";
import { Link } from "../typescript/pages";

export default function Layout({ entry }: { entry: EntryProps }) {
  const history = useNavigate();
  const [getLayout, setLayout] = useState({
    header: {} as HeaderRes,
    footer: {} as FooterRes,
    topHeaderList: [] as NavigationMenu[],
    navHeaderList: [] as NavigationMenu[],
    navFooterList: [] as Link[],
  });
  const mergeObjs = (...objs: any) => Object.assign({}, ...objs);
  const jsonObj = mergeObjs(
    { header: getLayout.header },
    { footer: getLayout.footer },
    entry
  );

  const [error, setError] = useState(false);

  async function fetchData() {
    try {
      const header = await getHeaderRes();
      const footer = await getFooterRes();
      const allEntry = await getAllEntries();
      !header || (!footer && setError(true));
      const navHeaderList = header.navigation_menu;
      const topHeaderList = header.top_menu;
      //console.log(topHeaderList);
      const navFooterList = footer.navigation.link;
      if (allEntry.length !== header.navigation_menu.length) {
        allEntry.forEach((entry) => {

          //const hFound = header.navigation_menu.find(
          //  (navLink) => navLink.label === entry.title
          //);
          //if (!hFound) {
          //  navHeaderList.push({
          //    label: 'entry.title',
          //    page_reference: [
          //      { title: entry.title, url: entry.url, uid: entry.uid },
          //    ],
          //  });
          //}

          // Footer Navigation
          //const fFound = footer.navigation.link.find(
          //  (link) => link.title === entry.title
          //);
          //if (!fFound) {
          //  navFooterList.push({
          //    title: entry.title,
          //    href: entry.url
          //  });
          //}
        });
      }

      // Top Navigation
      //allEntry.forEach((entry) => {
      //  const tFound = header.top_menu.find(
      //    (navLink) => navLink.label === entry.title
      //  );
      //  if (!tFound) return;

      //  const existing = topHeaderList.find(
      //    item => item.label === entry.title
      //  );

      //  if (existing) {
      //    // Update existing entry
      //    existing.page_reference = [
      //      { title: entry.title, url: entry.url, uid: entry.uid }
      //    ];
      //  }
      //});

      setLayout({
        header: header,
        footer: footer,
        topHeaderList,
        navHeaderList,
        navFooterList,
      });
    } catch (error) {
      setError(true);
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(fetchData);
  }, []);

  useEffect(() => {
    console.error("error...", error);
    error && history("/error");
  }, [error]);

  return (
    <div className="layout">
      <Header header={getLayout.header} navMenu={getLayout.navHeaderList} topMenu={getLayout.topHeaderList} />
      <DevTools response={jsonObj} />
      <Outlet />
      <Footer footer={getLayout.footer} navMenu={getLayout.navFooterList} />
    </div>
  );
}
