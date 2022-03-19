import { graphql } from 'gatsby';
import React from 'react';
import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import { PostCard } from '../components/PostCard';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  inner,
  outer,
  PostFeed,
  SiteHeader,
  SiteMain,
  SiteNavMain,
  SiteArchiveHeader,
} from '../styles/shared';
import { PageContext } from './post';
import { Helmet } from 'react-helmet';
import config from '../website-config';
import { RecoilRoot } from 'recoil';
import { css } from '@emotion/react';
import { postLists } from '../styles/postLists';
import Pagination from '../components/Pagination';

const PageTemplate = css`
  .site-main {
    margin-top: 64px;
    padding-bottom: 4vw;
  }
`;

interface TagTemplateProps {
  location: Location;
  pageContext: {
    allCategories: string[];
    category: string;
    currentPage: number;
    excerpt: string;
    limit: number;
    numPages: number;
    skip: number;
  };
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: PageContext;
      }>;
    };
  };
}

const Posts = ({ pageContext, data, location }: TagTemplateProps) => {
  const category = pageContext.category ? pageContext.category : '';
  const { edges } = data.allMarkdownRemark;
  console.log(pageContext);
  return (
    <RecoilRoot>
      <IndexLayout css={postLists}>
        <Helmet>
          <html lang={config.lang} />
          <title>
            {category} - {config.title}
          </title>
          <meta name="description" content={config.description} />
          <meta property="og:site_name" content={config.title} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={`${category} - ${config.title}`} />
          <meta property="og:url" content={config.siteUrl + location.pathname} />
        </Helmet>
        <Wrapper css={PageTemplate}>
          <header className="site-archive-header" css={[SiteHeader, SiteArchiveHeader]}>
            <div css={[outer, SiteNavMain]}>
              <div css={inner}>
                <SiteNav isHome={false} />
              </div>
            </div>
          </header>
          <main id="site-main" className="site-main" css={[SiteMain, outer]}>
            <div css={inner}>
              <h2>Categories</h2>
              <div className="wrap" css={[PostFeed]}>
                {edges.map(({ node }) => (
                  <PostCard key={node.fields.slug} post={node} />
                ))}
              </div>
            </div>
            <Pagination currentPage={pageContext.currentPage} numPages={pageContext.numPages} />
          </main>
          <Footer />
        </Wrapper>
      </IndexLayout>
    </RecoilRoot>
  );
};

export default Posts;

export const pageQuery = graphql`
  query blogPostsListByCategory($category: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { in: [$category] } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          frontmatter {
            title
            date
            category
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
        }
      }
    }
  }
`;
