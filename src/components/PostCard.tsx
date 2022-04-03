import { format } from 'date-fns';
import { Link, navigate } from 'gatsby';
import _ from 'lodash';
import { lighten } from 'polished';
import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { colors } from '../styles/colors';
import { PageContext } from '../templates/post';
import { AuthorList } from './AuthorList';

export interface PostCardProps {
  post: PageContext;
  large?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ post, large = false }) => {
  const date = new Date(post.frontmatter.date);
  // 2018-08-20
  const datetime = format(date, 'yyyy-MM-dd');
  // 20 AUG 2018
  const displayDatetime = format(date, 'yyyy년 MM월 dd일');
  return (
    <article
      className={`post-card ${post.frontmatter.thumbnail ? '' : 'no-image'} ${
        large ? 'post-card-large' : ''
      }`}
      css={[PostCardStyles, large && PostCardLarge]}
      onClick={() => {
        large && navigate(post.fields.slug);
      }}
    >
      <PostCardContent className="post-card-content">
        {!large && (
          <Link
            className="post-card-image-link"
            css={PostCardImageLink}
            to={'/' + post.fields.slug}
          >
            <PostCardImage className="post-card-image">
              {post.frontmatter?.thumbnail && (
                <img src={post.frontmatter.thumbnail} alt="thumbnail" />
              )}
            </PostCardImage>
          </Link>
        )}
        <div className="post-card-content-link" css={PostCardContentLink}>
          <PostCardHeader
            className="post-card-header"
            onClick={() => navigate('/' + post.fields.slug)}
          >
            <PostCardCategory className="post-card-primary-tag">
              <span>{post.frontmatter.category}</span>
            </PostCardCategory>
            <PostCardTitle className="post-card-title">{post.frontmatter.title}</PostCardTitle>
          </PostCardHeader>
          <PostCardExcerpt className="post-card-excerpt">
            {/* <p>{post.frontmatter.excerpt || post.excerpt}</p> */}
          </PostCardExcerpt>
        </div>
        <PostCardMeta className="post-card-meta">
          <AuthorList authors={post.frontmatter.author} tooltip={null} />
          <PostCardBylineContent className="post-card-byline-content">
            <span>
              {post.frontmatter.author.map((author, index) => (
                <React.Fragment key={author.name}>
                  <span>{author.name}</span>
                  {post.frontmatter.author.length - 1 > index && ', '}
                </React.Fragment>
              ))}
            </span>
            <span className="post-card-byline-date">
              <time dateTime={datetime}>{displayDatetime}</time>{' '}
            </span>
          </PostCardBylineContent>
        </PostCardMeta>
      </PostCardContent>
      {large && (
        <Link className="post-card-image-link" css={PostCardImageLink} to={post.fields.slug}>
          <PostCardImage className="post-card-image">
            {post.frontmatter?.thumbnail && (
              <img src={post.frontmatter.thumbnail} alt="thumbnail" />
            )}
          </PostCardImage>
        </Link>
      )}
    </article>
  );
};

const PostCardStyles = css`
  position: relative;
  flex: 1 1 301px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  min-height: 220px;
  background-size: cover;
`;

const PostCardLarge = css`
  :not(.no-image) .post-card-header {
    margin-top: 0;
  }
  @media (min-width: 795px) {
    flex: 1 1 100%;
    flex-direction: row;
    min-height: 180px;
    border-top: 1px solid #bababa;

    :not(.no-image) .post-card-header {
      margin-top: 0;
    }

    .post-card-image-link {
      position: relative;
      flex: 1 1 auto;
      margin-bottom: 0;
      min-height: 140px;
    }

    .post-card-image {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .post-card-content {
      flex: 0 1 420px;
      justify-content: center;
    }

    .post-card-title {
      margin-top: 0;
      font-size: 3.2rem;
    }

    .post-card-content-link {
    }

    .post-card-meta {
    }

    .post-card-excerpt p {
      margin-bottom: 1.5em;
      font-size: 1.8rem;
      line-height: 1.5em;
    }
  }
`;

const PostCardImageLink = css`
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: 10px;
  &:hover + div > header > h2 {
    color: #1c6dd0;
  }
`;

const PostCardImage = styled.div`
  width: auto;
  height: 200px;
  background: ${colors.lightgrey} no-repeat center center;
  background-size: cover;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
`;

const PostCardContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const PostCardContentLink = css`
  position: relative;
  display: block;
  cursor: pointer;
  :hover {
    text-decoration: none;
  }
  :hover h2 {
    color: #1c6dd0;
  }
`;

const PostCardCategory = styled.div`
  margin: 0 0 0.2em;
  color: #1c6dd0;
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  @media (max-width: 600px) {
    font-size: 1.2rem;
    height: 20px;
    margin: 0 0 0.5em;
  }
`;

const PostCardTitle = styled.h2`
  margin: 0 0 0.4em;
  line-height: 1.15em;
  font-size: 2rem;
  font-weight: 600;
  transition: color 0.2s ease-in-out;
  cursor: pointer;
`;

const PostCardExcerpt = styled.section``;

const PostCardMeta = styled.footer`
  display: flex;
  align-items: flex-start;
  padding: 0;
`;

const PostCardBylineContent = styled.div`
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  margin: 4px 0 0 10px;
  /* color: color(var(--midgrey) l(+10%)); */
  /* color: ${lighten('0.1', colors.midgrey)}; */
  font-size: 1.2rem;
  line-height: 1.4em;
  font-weight: 400;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  span {
    margin: 0;
  }
  a {
    font-weight: 600;
  }
`;

const PostCardHeader = styled.header`
  margin: 15px 0 0;
`;

export const StaticAvatar = css`
  display: block;
  overflow: hidden;
  margin: 0 0 0 -6px;
  width: 34px;
  height: 34px;
  border: #fff 2px solid;
  border-radius: 100%;
`;

export const AuthorProfileImage = css`
  display: block;
  width: 100%;
  height: 100%;
  /* background: color(var(--lightgrey) l(+10%)); */
  background: ${lighten('0.1', colors.lightgrey)};
  border-radius: 100%;
  object-fit: cover;
`;
