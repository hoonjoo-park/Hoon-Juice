import React from 'react';
import { Helmet } from 'react-helmet';
import { Global } from '@emotion/react';
import favicon from '../../src/favicon.ico';
import { reset } from '../styles/reset';
import '../styles/globals.css';

interface IndexProps {
  className?: string;
}

const IndexLayout: React.FC<IndexProps> = props => {
  return (
    <>
      <Global styles={reset} />
      <div className={props.className}>
        <Helmet>
          <link rel="icon" href={favicon} type="image/x-icon" />
        </Helmet>
        {props.children}
      </div>
    </>
  );
};

export default IndexLayout;
