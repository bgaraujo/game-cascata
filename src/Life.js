import React from 'react';

import heartFull from './assets/icons/heart_full.png';
import heart from './assets/icons/heart.png';

const Life = ({life, points}) => {
  return <div className="header_bar">
    <div className='heart'>
      <img src={life>=1?heartFull:heart} />
      <img src={life>=2?heartFull:heart} />
      <img src={life>=3?heartFull:heart} />
    </div>
    <div className='score'>
      Score:{points}
    </div>
  </div>;
}

export default Life;