import React from 'react';
import { Helmet } from 'react-helmet';

import { css } from '@emotion/react';

import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import { PostFullContent } from '../components/PostContent';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  inner,
  outer,
  SiteArchiveHeader,
  SiteHeader,
  SiteMain,
  SiteNavMain,
} from '../styles/shared';
import { NoImage, PostFull, PostFullHeader, PostFullTitle } from '../templates/post';
import { RecoilRoot } from 'recoil';

const PageTemplate = css`
  .site-main {
    margin-top: 64px;
    padding-bottom: 4vw;
  }
`;

const About: React.FC = () => (
  <RecoilRoot>
    <IndexLayout>
      <Helmet>
        <title>About</title>
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
                <PostFullTitle className="post-full-title">About</PostFullTitle>
              </PostFullHeader>

              <PostFullContent className="post-full-content">
                <div className="post-content">
                  <h4>“비즈니스 밸류를 명확하게 이해하고 개발할 수 있는”</h4>
                  <h4>React & Javascript 프론트엔드 엔지니어 박훈주 입니다.</h4>
                  <p>
                    경영학과 프로그래밍의 조화를 통해, 비즈니스 밸류 전달의 길라잡이가 되고싶은
                    React 프론트엔드 개발자입니다. 특히, 꾸준히 성장하고 배우며 사회에 유의미한
                    가치를 창출하는데 일조하고 싶습니다.
                  </p>
                  <p>
                    또한, "끈기가 내 가능성과 한계의 외연을 결정한다."라는 가치관을 갖고 살아가고
                    있습니다. 끈기로운 성장을 위해 1일 1커밋과 일주일에 최소 한 개의 블로그 포스팅을
                    실천하고 있습니다.
                  </p>
                  <p>
                    미약할지라도 사회의 불편 사항들을 해소하고, 선한 영향력을 행사할 수 있는
                    개발자가 되고 싶습니다.
                  </p>
                </div>
              </PostFullContent>
            </article>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  </RecoilRoot>
);

export default About;
