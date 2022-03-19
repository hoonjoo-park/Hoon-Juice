import { graphql } from 'gatsby';
import { getSrc, getImage } from 'gatsby-plugin-image';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
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
import { postLists } from '../styles/postLists';

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
      <IndexLayout css={postLists}>
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
          <Footer />
        </Wrapper>
      </IndexLayout>
    </RecoilRoot>
  );
};

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    header: file(relativePath: { eq: "img/blog-cover.jpeg" }) {
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
            draft
            excerpt
            thumbnail
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
            layout
            slug
          }
        }
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
  @media (max-width: 500px) {
    margin-top: 40px;
    padding: 0;
    font-size: 2.4rem;
  }
`;

export default IndexPage;
