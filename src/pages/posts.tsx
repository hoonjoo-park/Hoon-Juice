import React from 'react';
import { Helmet } from 'react-helmet';
import { css } from '@emotion/react';
import { Footer } from '../components/Footer';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  inner,
  NoImage,
  outer,
  SiteArchiveHeader,
  SiteHeader,
  SiteMain,
  SiteNavMain,
} from '../styles/shared';
import { colors } from '../styles/colors';
import { PostFull, PostFullHeader, PostFullTitle } from '../templates/post';
import SiteNav from '../components/header/SiteNav';
import { PostFullContent } from '../components/PostContent';
import { RecoilRoot } from 'recoil';

const PageTemplate = css`
  .site-main {
    margin-top: 64px;
    padding-bottom: 4vw;
    /* background: #fff; */
  }

  @media (prefers-color-scheme: dark) {
    .site-main {
      /* background: var(--darkmode); */
      /* background: ${colors.darkmode}; */
    }
  }
`;

const Posts: React.FC = () => {
  return (
    <RecoilRoot>
      <IndexLayout>
        <Helmet>
          <title>POSTS</title>
        </Helmet>
        <Wrapper css={PageTemplate}>
          <header className="site-archive-header no-image" css={[SiteHeader, SiteArchiveHeader]}>
            <div css={[outer, SiteNavMain]}>
              <div css={inner}>
                <SiteNav isHome={false} />
              </div>
            </div>
          </header>
          <main id="site-main" className="site-main" css={[SiteMain, outer]}>
            <div css={inner}>
              <article className="post page" css={[PostFull, NoImage]}>
                <PostFullHeader className="post-full-header">
                  <PostFullTitle className="post-full-title">POSTS</PostFullTitle>
                </PostFullHeader>

                <PostFullContent className="post-full-content">
                  <div className="post-content">{/* <h5>Posts</h5> */}</div>
                </PostFullContent>
              </article>
            </div>
          </main>
          <Footer />
        </Wrapper>
      </IndexLayout>
    </RecoilRoot>
  );
};

export default Posts;
