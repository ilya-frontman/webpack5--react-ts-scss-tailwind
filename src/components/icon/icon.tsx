import React from 'react';

const Icon = (props: SVGIcon) => {
  const { svg, classnames } = props;

  return (
    <svg
      className={
        classnames instanceof Array<string> ? classnames.join(' ') : classnames
      }
    >
      <use xlinkHref={svg.url} />
    </svg>
  );
};

export default Icon;
