import { css } from '@emotion/react';
import { lighten } from 'polished';
import { colors } from './colors';

export const postLists = () => css`
  @media (min-width: 795px) {
    .post-card-large {
      flex: 1 0 100%;
      flex-wrap: nowrap;
      flex-direction: row;
      justify-content: space-between;
      padding-bottom: 40px;
      min-height: 180px;
      border-top: 0;
      cursor: pointer;
      overflow: visible;
      &:hover h2 {
        color: #1c6dd0;
        transition: all 0.2s ease-in-out;
      }
      &:hover .post-card-image-link {
        transform: translateY(-3px);
        box-shadow: 0px 7px 25px -3px rgba(0, 0, 0, 0.2);
      }
    }

    .post-card-large .post-card-title {
      margin-top: 0;
      font-size: 2.8rem;
    }

    .post-card-large:not(.no-image) .post-card-header {
      margin-top: 0;
    }

    .post-card-large .post-card-image-link {
      position: relative;
      flex: 0 1 auto;
      margin-bottom: 0;
      min-width: 270px;
      min-height: 180px;
      transition: all 0.2s ease-in-out;
      img {
        border-radius: 10px;
        object-fit: cover;
      }
    }

    .post-card-large .post-card-image {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .post-card-large .post-card-content {
      flex: 0 1 420px;
      /* margin-right: 10rem; */
      justify-content: center;
    }

    .post-card-large .post-card-title {
      margin-top: 0;
      font-size: 2.8rem;
    }

    .post-card-large .post-card-content-link {
      padding: 0 0 0 40px;
    }

    .post-card-large .post-card-meta {
      padding: 0 0 0 40px;
    }

    .post-card-large .post-card-excerpt p {
      margin-bottom: 1.5em;
      font-size: 1.8rem;
      line-height: 1.5em;
      font-weight: 500;
      color: ${lighten('0.001', colors.midgrey)};
    }
  }
  @media (max-width: 795px) {
    .post-card-large {
      cursor: pointer;
      overflow: visible;
      max-height: 150px;
      min-height: 150px;
      padding: 0 40px;
      &:hover h2 {
        color: #1c6dd0;
        transition: all 0.2s ease-in-out;
      }
      &:hover .post-card-image-link {
        transform: translateY(-3px);
        box-shadow: 0px 10px 17px -3px rgba(0, 0, 0, 0.75);
      }
    }
    .post-card-content {
      flex-basis: 100%;
      justify-content: space-between;
      transition: all 0.2s ease-in-out;
      /* order: 2; */
    }
    .post-card-large .post-card-title {
      margin-top: 0;
      margin-bottom: 2rem;
      font-size: 2.4rem;
    }
    .post-card-large .post-card-excerpt p {
      margin-bottom: 1rem;
      color: #738a94;
    }
    .post-card-large .post-card-image-link {
      transition: all 0.2s ease-in-out;
      & > div {
        height: 100%;
      }
      /* order: 1; */
      img {
        width: 45vw;
        object-fit: cover;
      }
    }
  }
  @media (max-width: 600px) {
    .post-card-large {
      padding: 0 24px;
      max-height: 100px;
      min-height: 100px;
      h2 {
        font-size: 2.4rem;
      }
    }
    .post-card-content {
      padding: 0;
      justify-content: center;
    }
    .post-card-large .post-card-title {
      margin-top: 0;
      margin-bottom: 0.5rem;
      font-size: 2rem;
      font-weight: 600;
    }
    .post-card-large .post-card-excerpt p {
      font-size: 1.6rem;
      margin-bottom: 0.5rem;
    }
    .post-card-large .post-card-meta {
      & > .author-list {
        display: none;
      }
    }
    .post-card-large .post-card-byline-content {
      margin: 0;
      & > span:first-of-type {
        display: none;
      }
    }
  }
  @media (max-width: 500px) {
    .post-card-large {
      padding: 0 24px;
      max-height: 100px;
      min-height: 100px;
      h2 {
        font-size: 2rem;
      }
    }
  }
`;
