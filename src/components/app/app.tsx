import React from 'react';
import Home from 'Svg/home-fill.svg';
import Mail from 'Svg/mail-fill.svg';

const App = () => {
  const message = 'Hello React on webpack rails';

  // console.log('test');

  return (
    <>
      <h1>{message}</h1>
      <svg className="icon">
        <use xlinkHref={Home} />
      </svg>
      <svg className="icon">
        <use xlinkHref={Mail} />
      </svg>
    </>
  );
};

export default App;
