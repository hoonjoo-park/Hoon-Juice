import { Link } from 'gatsby';
import React from 'react';
import { css } from '@emotion/react';

export interface PaginationProps {
  currentPage: number;
  numPages: number;
}

const Pagination: React.FunctionComponent<PaginationProps> = ({ currentPage, numPages }) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? '/posts' : `/posts/page/${(currentPage - 1).toString()}`;
  const nextPage = `/posts/page/${(currentPage + 1).toString()}`;

  return (
    <nav css={navCss}>
      <div>
        {!isFirst && (
          <Link to={prevPage} rel="prev">
            {String.fromCharCode(171)}
          </Link>
        )}

        {Array.from({ length: numPages }, (_, i) => (
          <Link
            key={`pagination-number${i + 1}`}
            className={i + 1 === currentPage ? 'active' : ''}
            to={`/posts/${i === 0 ? '' : `page/${i + 1}`}`}
          >
            {i + 1}
          </Link>
        ))}

        {!isLast && (
          <Link to={nextPage} rel="next">
            {/* >> symbol */}
            {String.fromCharCode(187)}
          </Link>
        )}
      </div>
    </nav>
  );
};

const navCss = css`
  text-align: center;
  div {
    display: inline-block;
  }

  a {
    margin-bottom: 5px;
    width: 35px;
    height: 35px;
    line-height: 35px;
    background: transparent;
    color: var(--font-color);
    font-weight: 500;
    float: left;
    text-decoration: none;
    transition: background-color 0.3s;
    margin: 0 4px;
    border-radius: 50%;

    &.active {
      background-color: #1c6dd0;
      cursor: default;
    }

    &:hover:not(.active) {
      background-color: #bbbbbb;
    }

    &:hover {
      text-decoration: none;
    }
  }
`;

export default Pagination;
