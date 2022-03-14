import { Link } from 'gatsby';
import { darken } from 'polished';
import React, { useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { colors } from '../../styles/colors';
import { SocialLink } from '../../styles/shared';
import config from '../../website-config';
import { SiteNavLogo } from './SiteNavLogo';
import { Github } from '../icons/github';
import { FiSun } from 'react-icons/fi';
import { BsMoonStarsFill } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { themeMode } from '../../recoil';

interface SiteNavProps {
  isHome?: boolean;
  isPost?: boolean;
  post?: any;
}

const SiteNav = ({ isHome, isPost, post }: SiteNavProps) => {
  const titleRef = useRef<HTMLSpanElement | null>(null);
  const [showTitle, setShowTitle] = useState(false);
  const [theme, setTheme] = useRecoilState(themeMode);
  useEffect(() => {
    if (isPost) {
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const onScroll = () => {
    if (!titleRef || !titleRef.current) {
      return;
    }
    requestAnimationFrame(update);
  };

  const update = () => {
    if (!titleRef || !titleRef.current) {
      return;
    }
    const trigger = titleRef.current.getBoundingClientRect().top;
    const triggerOffset = titleRef.current.offsetHeight + 35;
    // show/hide post title
    if (window.scrollY >= trigger + triggerOffset) {
      setShowTitle(true);
    } else {
      setShowTitle(false);
    }
  };
  const handleTheme = () => {
    if (theme === 'DARK') {
      setTheme('LIGHT');
      window.localStorage.setItem('THEME', 'LIGHT');
      return;
    }
    setTheme('DARK');
    window.localStorage.setItem('THEME', 'DARK');
  };
  return (
    <nav css={SiteNavStyles}>
      <SiteNavLeft className={showTitle ? 'site-nav-left showTitle' : 'site-nav-left'}>
        {!isHome && <SiteNavLogo />}
        <SiteNavContent>
          <ul css={NavStyles} role="menu">
            <li role="menuitem">
              <Link to="/" activeClassName="nav-current">
                Home
              </Link>
            </li>
            <li role="menuitem">
              <Link to="/posts" activeClassName="nav-current">
                POSTS
              </Link>
            </li>
            <li role="menuitem">
              <Link to="/about" activeClassName="nav-current">
                About
              </Link>
            </li>
          </ul>
          {isPost && (
            <NavPostTitle ref={titleRef} className="nav-post-title">
              {post.title}
            </NavPostTitle>
          )}
        </SiteNavContent>
      </SiteNavLeft>
      <SiteNavRight>
        <SocialLinks>
          {config.github && (
            <a
              css={SocialLink}
              href={config.github}
              title="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github />
            </a>
          )}
          <DarkLight css={SocialLink} onClick={handleTheme}>
            {theme === 'DARK' ? <BsMoonStarsFill /> : <FiSun />}
          </DarkLight>
        </SocialLinks>
      </SiteNavRight>
    </nav>
  );
};

export const SiteNavMain = css`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  /* background: color(var(--darkgrey) l(-5%)) */
  background: ${darken('0.05', colors.darkgrey)};

  @media (max-width: 700px) {
    padding-right: 0;
    padding-left: 0;
  }
`;

const SiteNavStyles = css`
  position: relative;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  overflow-y: hidden;
  height: 64px;
  font-size: 1.3rem;
`;

const SiteNavLeft = styled.div`
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  margin-right: 10px;
  padding: 10px 0 80px;
  font-weight: 500;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  white-space: nowrap;

  -ms-overflow-scrolling: touch;

  @media (max-width: 700px) {
    margin-right: 0;
    padding-left: 5vw;
  }
  &.showTitle {
    & ul {
      visibility: hidden;
      opacity: 0;
      transform: translateY(-175%);
    }
    & .nav-post-title {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SiteNavContent = styled.div`
  position: relative;
  align-self: flex-start;
`;

const NavStyles = css`
  position: absolute;
  z-index: 1000;
  display: flex;
  margin: 0 0 0 -12px;
  padding: 0;
  list-style: none;
  transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);

  li {
    display: block;
    margin: 0;
    padding: 0;
  }

  li a {
    position: relative;
    display: block;
    padding: 12px 12px;
    color: #fff;
    opacity: 0.8;
    transition: opacity 0.35s ease-in-out;
    font-size: 1.5rem;
    font-weight: 700;
  }

  li a:hover {
    text-decoration: none;
    opacity: 1;
  }

  li a:before {
    content: '';
    position: absolute;
    right: 100%;
    bottom: 8px;
    left: 12px;
    height: 1px;
    background: #fff;
    opacity: 0.25;
    transition: all 0.35s ease-in-out;
  }

  li a:hover:before {
    right: 12px;
    opacity: 0.5;
  }

  .nav-current {
    opacity: 1;
  }
`;

const SiteNavRight = styled.div`
  flex: 0 1 auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 0;
  height: 64px;

  @media (max-width: 700px) {
    display: none;
  }
`;

const SocialLinks = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  & a > svg {
    height: 2rem;
  }
`;
const DarkLight = styled.button`
  background-color: transparent;
  outline: none;
  color: #fff;
  svg {
    height: 2rem;
    font-size: 2rem;
  }
`;

const NavPostTitle = styled.span`
  visibility: hidden;
  position: absolute;
  top: 9px;
  color: #fff;
  font-size: 1.7rem;
  font-weight: 400;
  text-transform: none;
  opacity: 0;
  transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
  transform: translateY(175%);

  .dash {
    left: -25px;
  }

  .dash:before {
    content: '– ';
    opacity: 0.5;
  }
`;

export default SiteNav;
