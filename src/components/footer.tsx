import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { NavLink, Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { FooterRes } from "../typescript/response";
import { Link as LinkRef } from "../typescript/pages";

export default function Footer({ footer, navMenu }: {footer: FooterRes, navMenu: LinkRef[]}) {
  return (
    <footer>
      <div className='max-width footer-div'>
        <div className='col-half'>
          <div className='columns'>
            <nav>
              <ul className='nav-ul'>
                {navMenu.length ? (
                  navMenu?.map((link) => (
                    <li key={link.title} className='footer-nav-li'>
                      <NavLink {...link.$?.title as {}} to={link.href}>
                        {link.title}
                      </NavLink>
                    </li>
                  ))
                ) : (
                  <li className='footer-nav-li'>
                    <Skeleton width={200} />
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
        <div className='col-quarter social-link'>
          { footer.phone?.phone_share && (
            <div className='phone'>
              <img
                  { ...footer.phone?.phone_share.icon.$?.url as {}}
                  src={ footer.phone.phone_share.icon.url }
                  alt='phone number'
                  />
              { footer.phone?.phone_share.number }
            </div>
          )}
          <div className='social-nav'>
            {Object.keys(footer).length ? (
              footer.social.social_share?.map((social) => (
                <a
                  href={social.link.href}
                  title={social.link.title}
                  key={social.link.title}
                >
                  <img
                    {...social.icon.$?.url as {}}
                    src={social.icon.url}
                    alt='social icon'
                  />
                </a>
              ))
            ) : (
              <a>
                <Skeleton width={100} />
              </a>
            )}
          </div>
        </div>
      </div>
      {footer.copyright ? (
        <div className='copyright' {...footer.$?.copyright as {}}>
          {parse(footer.copyright)}
        </div>
      ) : (
        <div className='copyright'>
          <Skeleton width={500} />
        </div>
      )}
    </footer>
  );
}
