import { graphql } from 'gatsby';
import { getSrc, getImage } from 'gatsby-plugin-image';
import React from 'react';
import { Helmet } from 'react-helmet';

import { css } from '@emotion/react';

import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import Pagination from '../components/Pagination';
import { PostCard } from '../components/PostCard';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  inner,
  outer,
  PostFeed,
  Posts,
  SiteDescription,
  SiteHeader,
  SiteHeaderContent,
  SiteMain,
  SiteTitle,
  SiteHeaderStyles,
} from '../styles/shared';
import config from '../website-config';
import { PageContext } from './post';
import styled from '@emotion/styled';
import { RecoilRoot } from 'recoil';
import { lighten } from 'polished';
import { colors } from '../styles/colors';

export interface IndexProps {
  pageContext: {
    currentPage: number;
    numPages: number;
  };
  data: {
    logo: any;
    header: any;
    allMarkdownRemark: {
      edges: Array<{
        node: PageContext;
      }>;
    };
  };
}

const IndexPage: React.FC<IndexProps> = props => {
  const width = getImage(props.data.header)?.width;
  const height = getImage(props.data.header)?.height;
  const latestPosts = props.data.allMarkdownRemark.edges.slice(0, 5);
  return (
    <RecoilRoot>
      <IndexLayout css={HomePosts}>
        <Helmet>
          <html lang={config.lang} />
          <title>{config.title}</title>
          <meta name="description" content={config.description} />
          <meta property="og:site_name" content={config.title} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={config.title} />
          <meta property="og:description" content={config.description} />
          <meta property="og:url" content={config.siteUrl} />
          <meta property="og:image" content={`${config.siteUrl}${getSrc(props.data.header)}`} />
          {config.facebook && <meta property="article:publisher" content={config.facebook} />}
          {config.googleSiteVerification && (
            <meta name="google-site-verification" content={config.googleSiteVerification} />
          )}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={config.title} />
          <meta name="twitter:description" content={config.description} />
          <meta name="twitter:url" content={config.siteUrl} />
          <meta name="twitter:image" content={`${config.siteUrl}${getSrc(props.data.header)}`} />
          {config.twitter && (
            <meta
              name="twitter:site"
              content={`@${config.twitter.split('https://twitter.com/')[1]}`}
            />
          )}
          <meta property="og:image:width" content={width?.toString()} />
          <meta property="og:image:height" content={height?.toString()} />
        </Helmet>
        <Wrapper>
          <div
            css={[outer, SiteHeader, SiteHeaderStyles]}
            className="site-header-background"
            style={{
              backgroundImage: `url('${getSrc(props.data.header)}')`,
            }}
          >
            <div css={inner}>
              <SiteNav isHome />
              <SiteHeaderContent className="site-header-content">
                <SiteTitle className="site-title">
                  {props.data.logo ? (
                    <img
                      style={{ maxHeight: '55px' }}
                      src={getSrc(props.data.logo)}
                      alt={config.title}
                    />
                  ) : (
                    config.title
                  )}
                </SiteTitle>
                <SiteDescription>{config.description}</SiteDescription>
              </SiteHeaderContent>
            </div>
          </div>
          <main id="site-main" css={[SiteMain, outer]}>
            <div css={[inner, Posts]}>
              <LatestPostTitle>최신 포스트</LatestPostTitle>
              <div css={[PostFeed]}>
                {latestPosts.map(
                  post =>
                    // filter out drafts in production
                    (post.node.frontmatter.draft !== true ||
                      process.env.NODE_ENV !== 'production') && (
                      <PostCard key={post.node.fields.slug} post={post.node} large={true} />
                    ),
                )}
              </div>
            </div>
          </main>
          {props.children}
          {props.pageContext.numPages > 1 && (
            <Pagination
              currentPage={props.pageContext.currentPage}
              numPages={props.pageContext.numPages}
            />
          )}
          <Footer />
        </Wrapper>
      </IndexLayout>
    </RecoilRoot>
  );
};

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    logo: file(relativePath: { eq: "img/ghost-logo.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FIXED)
      }
    }
    header: file(relativePath: { eq: "img/blog-cover.png" }) {
      childImageSharp {
        gatsbyImageData(width: 2000, quality: 100, layout: FIXED)
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            tags
            draft
            excerpt
            thumbnail
            # image {
            #   childImageSharp {
            #     gatsbyImageData(layout: FULL_WIDTH)
            #   }
            # }
            author {
              name
              bio
              avatar {
                childImageSharp {
                  gatsbyImageData(layout: FULL_WIDTH, breakpoints: [40, 80, 120])
                }
              }
            }
          }
          excerpt
          fields {
            readingTime {
              text
            }
            layout
            slug
          }
        }
      }
    }
  }
`;

const HomePosts = css`
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
    }
    .post-card-image-link {
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
    }
    .post-card-large .post-card-title {
      margin-top: 0;
      margin-bottom: 1rem;
      font-size: 2rem;
      font-weight: 600;
    }
    .post-card-large .post-card-excerpt p {
      font-size: 1.6rem;
    }
    .post-card-large .post-card-meta {
      & > .author-list {
        display: none;
      }
    }
    .post-card-large .post-card-byline-content {
      margin: 0;
      & > span:first-child {
        display: none;
      }
    }
  }
`;

const LatestPostTitle = styled.h3`
  margin: 80px 0 0 0;
  font-size: 2.8rem;
  font-weight: 700;
  padding: 0 60px;
  @media (max-width: 795px) {
    padding: 0 20px;
  }
  @media (max-width: 600px) {
    margin-top: 60px;
    padding: 0;
    font-size: 2.6rem;
  }
`;

export default IndexPage;
