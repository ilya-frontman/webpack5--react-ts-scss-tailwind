import React from 'react';
import Home from 'Svg/home-fill.svg';
import Mail from 'Svg/mail-fill.svg';

import Icon from '../icon/icon';

const App = () => {
  const message = 'Hello React on webpack rails';

  // console.log('test');

  return (
    <>
      <h1>{message}</h1>
      <Icon classnames={['icon', 'icon--white']} svg={Home} />
      <Icon classnames="icon icon--white" svg={Mail} />
    </>
  );
};

export default App;
