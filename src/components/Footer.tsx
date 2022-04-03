import { Link } from 'gatsby';
import { setLightness } from 'polished';
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { colors } from '../styles/colors';
import { outer, inner } from '../styles/shared';
import config from '../website-config';

export const Footer: React.FC = () => (
  <footer className="mainFooter" css={[outer, SiteFooter]}>
    <div className="homeInner" css={[inner, SiteFooterContent]}>
      <section className="copyright">
        <Link to="/">{config.title}</Link> &copy; {new Date().getFullYear()}{' '}
        {config.footer && (
          <Link to="/">
            | {config.title} {config.footer}
          </Link>
        )}
      </section>
      <SiteFooterNav>
        <Link to="/">Latest Posts</Link>
        {config.github && (
          <a href={config.github} target="_blank" rel="noopener noreferrer">
            Github
          </a>
        )}
      </SiteFooterNav>
    </div>
  </footer>
);

const SiteFooter = css`
  position: relative;
  padding-top: 40px;
  padding-bottom: 40px;
  color: #fff;
  /* background: ${setLightness('0.0015', colors.darkgrey)}; */
`;

const SiteFooterContent = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  a:hover {
    color: ${colors.blue};
    text-decoration: none;
  }
  @media (max-width: 650px) {
    flex-direction: column;
    padding: 32px 0;
  }
`;

const SiteFooterNav = styled.nav`
  display: flex;

  a {
    position: relative;
    margin-left: 20px;
  }

  a:before {
    content: '';
    position: absolute;
    top: 11px;
    left: -11px;
    display: block;
    width: 2px;
    height: 2px;
    background: #fff;
    border-radius: 100%;
  }

  a:first-of-type:before {
    display: none;
  }
  @media (max-width: 650px) {
    a:first-of-type {
      margin-left: 0;
    }
  }
`;
