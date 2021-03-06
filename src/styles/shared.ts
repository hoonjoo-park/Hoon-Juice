import { lighten } from 'polished';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { colors } from './colors';

export const outer = css`
  position: relative;
  padding: 0 5vw;
  @media (max-width: 600px) {
    padding: 0 24px;
  }
`;

// Centered content container blocks
export const inner = css`
  margin: 0 auto;
  max-width: 1040px;
  width: 100%;
  &.homeInner {
    max-width: 820px;
  }
`;

export const SiteNavMain = css`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  /* background: color(var(--darkgrey) l(-5%)); */
  background: ${lighten('-0.05', colors.darkgrey)};
`;

export const SiteMain = css`
  flex-grow: 1;
`;

export const SiteTitle = styled.h1`
  z-index: 10;
  margin: 0 0 1rem -2px;
  padding: 0;
  font-size: 4rem;
  line-height: 1em;
  font-weight: 900;

  @media (max-width: 600px) {
    font-size: 2.8rem;
  }
`;

export const SiteDescription = styled.h2`
  z-index: 10;
  margin: 0;
  padding: 5px 0;
  font-size: 2.1rem;
  line-height: 1.4em;
  font-weight: 400;
  opacity: 0.8;

  @media (max-width: 500px) {
    font-size: 1.8rem;
  }
`;

export const Posts = css`
  overflow-x: hidden;
`;

export const PostFeed = css`
  &.wrap {
    flex-direction: row;
    flex-wrap: wrap;
  }
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  padding: 80px 0 5vw;
  @media (max-width: 600px) {
    padding: 60px 0 5vw;
  }
  @media (max-width: 500px) {
    padding: 40px 0 5vw;
  }
`;

export const SocialLink = css`
  display: inline-block;
  margin: 0;
  padding: 10px;
  opacity: 0.8;

  :hover {
    opacity: 1;
  }

  svg {
    height: 1.8rem;
    fill: #fff;
  }
`;

export const SocialLinkFb = css`
  svg {
    height: 1.6rem;
  }
`;

export const SiteHeader = css``;

export const SiteHeaderContent = styled.div`
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6vw 3vw;
  min-height: 200px;
  max-height: 340px;
`;

export const SiteHeaderStyles = css`
  position: relative;
  /* margin-top: 64px; */
  padding-bottom: 12px;
  color: #fff;
  /* background: color(var(--darkgrey) l(-5%)) no-repeat center center; */
  background: ${lighten('-0.05', colors.darkgrey)} no-repeat center center;
  background-size: cover;
  background-position: 50% 15%;

  :before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    display: block;
    background: rgba(0, 0, 0, 0.18);
  }
  :after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: auto;
    left: 0;
    z-index: 10;
    display: block;
    background: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0));
  }
`;

export const AuthorProfileImage = css`
  flex: 0 0 60px;
  margin: 0;
  width: 60px;
  height: 60px;
  border: none;
`;

// tag and author post lists
export const SiteArchiveHeader = css`
  .site-header-content {
    position: relative;
    align-items: stretch;
    padding: 12vw 0 20px;
    min-height: 200px;
    max-height: 600px;
  }
`;

export const SiteHeaderBackground = css`
  margin-top: 64px;
`;

export const ResponsiveHeaderBackground = styled.div<{ backgroundImage?: string }>`
  ${p =>
    p.backgroundImage &&
    `
    position: relative;
    margin-top: 64px;
    padding-bottom: 12px;
    color: #fff;
    background-size: cover;
    /* background: color(var(--darkgrey) l(-5%)) no-repeat center center; */
    background: #090a0b no-repeat 50%;
    background-image: url(${p.backgroundImage});

    :before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 10;
      display: block;
      background: rgba(0, 0, 0, 0.18);
    }

    :after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: auto;
      left: 0;
      z-index: 10;
      display: block;
      height: 140px;
      background: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0));
    }
  `}

  ${p =>
    !p.backgroundImage &&
    `

    padding-top: 0;
    padding-bottom: 0;
    /* color: var(--darkgrey); */
    color: ${colors.darkgrey};
    background: #fff;
    opacity: 1;


  .site-description {
    /* color: var(--midgrey); */
    color: ${colors.midgrey};
    opacity: 1;
  }

  .site-header-content {
    padding: 5vw 0 10px;
    /* border-bottom: 1px solid color(var(--lightgrey) l(+12%)); */
    border-bottom: 1px solid ${lighten('0.12', colors.lightgrey)};
  }

  .author-bio {
    /* color: var(--midgrey); */
    color: ${colors.midgrey};
    opacity: 1;
  }

  .author-meta {
    /* color: var(--midgrey); */
    color: ${colors.midgrey};
    opacity: 1;
  }

  .author-social-link a {
    /* color: var(--darkgrey); */
    color: ${colors.darkgrey};
  }

  .author-social-link a:before {
    /* color: var(--midgrey); */
    color: ${colors.midgrey};
  }

  .author-location + .author-stats:before,
  .author-stats + .author-social-link:before,
  .author-social-link + .author-social-link:before {
    /* color: var(--midgrey); */
    color: ${colors.midgrey};
  }

  .author-header {
    padding-bottom: 20px;
  }

  @media (max-width: 500px) {
    .site-header-content {
      flex-direction: column;
      align-items: center;
      min-height: unset;
    }

    .site-title {
      font-size: 4.2rem;
      text-align: center;
    }

    .site-header-content {
      padding: 12vw 0 20px;
    }

    .author-header {
      padding-bottom: 10px;
    }
  }
  `}
`;

export const NoImage = css`
  .no-image {
    padding-top: 0;
    padding-bottom: 0;
    /* color: var(--darkgrey); */
    color: ${colors.darkgrey};
    background: #fff;
    opacity: 1;
  }

  .no-image .site-description {
    /* color: var(--midgrey); */
    color: ${colors.midgrey};
    opacity: 1;
  }

  .no-image .site-header-content {
    padding: 5vw 0 10px;
    /* border-bottom: 1px solid color(var(--lightgrey) l(+12%)); */
    border-bottom: 1px solid ${lighten('0.12', colors.lightgrey)};
  }

  .no-image .author-bio {
    /* color: var(--midgrey); */
    color: ${colors.midgrey};
    opacity: 1;
  }

  .no-image .author-meta {
    /* color: var(--midgrey); */
    color: ${colors.midgrey};
    opacity: 1;
  }

  .no-image .author-social-link a {
    /* color: var(--darkgrey); */
    color: ${colors.darkgrey};
  }

  .no-image .author-social-link a:before {
    /* color: var(--midgrey); */
    color: ${colors.midgrey};
  }

  .no-image .author-location + .author-stats:before,
  .no-image .author-stats + .author-social-link:before,
  .no-image .author-social-link + .author-social-link:before {
    /* color: var(--midgrey); */
    color: ${colors.midgrey};
  }

  @media (max-width: 500px) {
    .site-header-content {
      flex-direction: column;
      align-items: center;
      min-height: unset;
    }

    .site-title {
      font-size: 4.2rem;
      text-align: center;
    }

    .no-image .site-header-content {
      padding: 12vw 0 20px;
    }
  }
`;
