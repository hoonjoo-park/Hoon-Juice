import React from 'react';
import { Helmet } from 'react-helmet';
import { Global } from '@emotion/react';
import favicon from '../../src/favicon.ico';
import { reset } from '../styles/reset';

interface IndexProps {
  className?: string;
}

const IndexLayout: React.FC<IndexProps> = props => {
  return (
    <div className={props.className}>
      <Helmet>
        <link rel="icon" href={favicon} type="image/x-icon" />
      </Helmet>
      <Global styles={reset} />
      {props.children}
    </div>
  );
};

export default IndexLayout;
