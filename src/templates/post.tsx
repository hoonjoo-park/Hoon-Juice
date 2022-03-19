import { format } from 'date-fns';
import { graphql, Link } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import * as _ from 'lodash';
import { lighten } from 'polished';
import React from 'react';
import { Helmet } from 'react-helmet';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Footer } from '../components/Footer';
import SiteNav, { SiteNavMain } from '../components/header/SiteNav';
import PostContent from '../components/PostContent';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import { colors } from '../styles/colors';
import { inner, outer, SiteMain } from '../styles/shared';
import config from '../website-config';
import { AuthorList } from '../components/AuthorList';
import { RecoilRoot } from 'recoil';

export interface Author {
  name: string;
  bio: string;
  avatar: any;
}

interface PageTemplateProps {
  location: Location;
  data: {
    logo: {
      childImageSharp: {
        fixed: any;
      };
    };
    markdownRemark: {
      html: string;
      htmlAst: any;
      excerpt: string;
      frontmatter: {
        title: string;
        date: string;
        image: any;
        thumbnail?: string;
        excerpt: string;
        category: string;
        author: Author[];
      };
    };
  };
  pageContext: {
    prev: PageContext;
    next: PageContext;
  };
}

export interface PageContext {
  excerpt: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    image?: any;
    thumbnail?: string;
    excerpt: string;
    title: string;
    date: string;
    draft?: boolean;
    category: string;
    author: Author[];
  };
}

const PageTemplate = ({ data, location }: PageTemplateProps) => {
  const post = data.markdownRemark;
  let width: number | undefined;
  let height: number | undefined;
  if (post.frontmatter.image) {
    width = getImage(post.frontmatter.image)?.width;
    height = getImage(post.frontmatter.image)?.height;
  }

  const date = new Date(post.frontmatter.date);
  // 2018-08-20
  const datetime = format(date, 'yyyy-MM-dd');
  // 20 AUG 2018
  const displayDatetime = format(date, 'dd LLL yyyy');
  console.log(post.htmlAst);
  return (
    <RecoilRoot>
      <IndexLayout className="post-template">
        <Helmet>
          <html lang={config.lang} />
          <title>{post.frontmatter.title}</title>

          <meta name="description" content={post.frontmatter.excerpt || post.excerpt} />
          <meta property="og:site_name" content={config.title} />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={post.frontmatter.title} />
          <meta property="og:description" content={post.frontmatter.excerpt || post.excerpt} />
          <meta property="og:url" content={config.siteUrl + location.pathname} />
          {post.frontmatter.thumbnail && (
            <meta property="og:image" content={`${post.frontmatter.thumbnail}`} />
          )}
          <meta property="article:published_time" content={post.frontmatter.date} />
          {/* not sure if modified time possible */}
          {/* <meta property="article:modified_time" content="2018-08-20T15:12:00.000Z" /> */}
          {post.frontmatter.category && (
            <meta property="article:category" content={post.frontmatter.category} />
          )}

          {config.facebook && <meta property="article:publisher" content={config.facebook} />}
          {config.facebook && <meta property="article:author" content={config.facebook} />}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={post.frontmatter.title} />
          <meta name="twitter:description" content={post.frontmatter.excerpt || post.excerpt} />
          <meta name="twitter:url" content={config.siteUrl + location.pathname} />
          {post.frontmatter.thumbnail && (
            <meta name="twitter:image" content={`${post.frontmatter.thumbnail}`} />
          )}
          <meta name="twitter:label1" content="Written by" />
          <meta name="twitter:data1" content={post.frontmatter.author[0].name} />
          <meta name="twitter:label2" content="Filed under" />
          {post.frontmatter.category && (
            <meta name="twitter:data2" content={post.frontmatter.category} />
          )}
          {config.twitter && (
            <meta
              name="twitter:site"
              content={`@${config.twitter.split('https://twitter.com/')[1]}`}
            />
          )}
          {config.twitter && (
            <meta
              name="twitter:creator"
              content={`@${config.twitter.split('https://twitter.com/')[1]}`}
            />
          )}
          {width && <meta property="og:image:width" content={width?.toString()} />}
          {height && <meta property="og:image:height" content={height?.toString()} />}
        </Helmet>
        <Wrapper css={PostTemplate}>
          <header className="site-header">
            <div css={[outer, SiteNavMain]}>
              <div css={inner}>
                <SiteNav isPost post={post.frontmatter} />
              </div>
            </div>
          </header>
          <main id="site-main" className="site-main" css={[SiteMain, outer]}>
            <div css={inner}>
              {/* TODO: no-image css tag? */}
              <article css={[PostFull, !post.frontmatter.image && NoImage]}>
                <PostFullHeader className="post-full-header">
                  <PostCategory className="post-full-tags">
                    <Link to={`/posts/${_.kebabCase(post.frontmatter.category)}/`}>
                      {post.frontmatter.category}
                    </Link>
                  </PostCategory>
                  <PostFullTitle className="post-full-title">
                    {post.frontmatter.title}
                  </PostFullTitle>
                  <PostFullCustomExcerpt className="post-full-custom-excerpt">
                    {post.frontmatter.excerpt}
                  </PostFullCustomExcerpt>
                  <PostFullByline className="post-full-byline">
                    <section className="post-full-byline-content">
                      <AuthorList authors={post.frontmatter.author} tooltip="large" />
                      <section className="post-full-byline-meta">
                        <h4 className="author-name">
                          {post.frontmatter.author.map(author => (
                            <Link key={author.name} to={`/author/${_.kebabCase(author.name)}/`}>
                              {author.name}
                            </Link>
                          ))}
                        </h4>
                        <div className="byline-meta-content">
                          <time className="byline-meta-date" dateTime={datetime}>
                            {displayDatetime}
                          </time>
                        </div>
                      </section>
                    </section>
                  </PostFullByline>
                </PostFullHeader>

                {post.frontmatter.thumbnail && (
                  <PostFullImage>
                    <img src={post.frontmatter.thumbnail} alt="thumbnail" />
                  </PostFullImage>
                )}
                <PostContent htmlAst={post.htmlAst} />
              </article>
            </div>
          </main>
          <Footer />
        </Wrapper>
      </IndexLayout>
    </RecoilRoot>
  );
};

const PostTemplate = css`
  .site-main {
    margin-top: 64px;
    /* background: #fff; */
    padding-bottom: 4vw;
  }
`;

export const PostFull = css`
  position: relative;
  z-index: 50;
`;

export const NoImage = css`
  .post-full-content {
    padding-top: 0;
  }

  .post-full-content:before,
  .post-full-content:after {
    display: none;
  }
`;

export const PostFullHeader = styled.header`
  position: relative;
  margin: 0 auto;
  padding: 70px 170px 50px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;

  @media (max-width: 1170px) {
    padding: 60px 11vw 50px;
  }

  @media (max-width: 800px) {
    padding-right: 5vw;
    padding-left: 5vw;
  }

  @media (max-width: 500px) {
    padding: 20px 0 35px;
  }
`;

const PostCategory = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.3rem;
  line-height: 1.4em;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  & > a {
    color: #1c6dd0;
    font-size: 1.6rem;
  }
`;

const PostFullCustomExcerpt = styled.p`
  margin: 20px 0 0;
  color: var(--midgrey);
  font-size: 2.3rem;
  line-height: 1.4em;
  font-weight: 300;

  @media (max-width: 500px) {
    font-size: 1.9rem;
    line-height: 1.5em;
  }
`;

const PostFullByline = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 35px 0 0;
  padding-top: 15px;

  .post-full-byline-content {
    flex-grow: 1;
    display: flex;
    align-items: flex-start;
  }

  .post-full-byline-content .author-list {
    justify-content: flex-start;
    padding: 0 12px 0 0;
  }

  .post-full-byline-meta {
    margin: 2px 0 0;
    font-size: 1.2rem;
    line-height: 1.2em;
    letter-spacing: 0.2px;
    text-transform: uppercase;
  }

  .post-full-byline-meta h4 {
    margin: 0 0 3px;
    font-size: 1.3rem;
    line-height: 1.4em;
    font-weight: 500;
  }

  .post-full-byline-meta h4 a {
    /* color: color(var(--darkgrey) l(+10%)); */
    /* color: ${lighten('0.1', colors.darkgrey)}; */
  }

  .post-full-byline-meta h4 a:hover {
    /* color: var(--darkgrey); */
    color: ${colors.blue};
  }

  .post-full-byline-meta .bull {
    display: inline-block;
    margin: 0 4px;
    opacity: 0.6;
  }
`;

export const PostFullTitle = styled.h1`
  margin: 0 0 0.2em;
  font-size: 3.3rem;
  font-weight: 600;
  @media (max-width: 500px) {
    margin-top: 0.2em;
    font-size: 3.3rem;
  }
`;

const PostFullImage = styled.figure`
  margin: 25px auto 50px;
  /* height: 800px; */
  max-width: 700px;
  background: none;
  border-radius: 5px;
  img {
    border-radius: 5px;
  }
  @media (max-width: 1170px) {
    margin: 25px auto 50px;
    max-width: 1040px;
    padding: 0 11vw;
    background: none;
    border-radius: 0;
  }

  @media (max-width: 800px) {
    max-height: 250px;
    padding: 0 5vw;
  }
  @media (max-width: 500px) {
    margin-bottom: 4vw;
    height: 350px;
    padding: 0;
  }
`;

export const query = graphql`
  query ($slug: String) {
    logo: file(relativePath: { eq: "img/ghost-logo.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FIXED)
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      htmlAst
      excerpt
      frontmatter {
        title
        category
        date
        excerpt
        thumbnail
        author {
          name
          bio
          avatar {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  }
`;

export default PageTemplate;
