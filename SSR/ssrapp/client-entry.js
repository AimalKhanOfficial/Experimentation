import React from 'react';
import { hydrate } from 'react-dom';    

import HelloWorld from '../ssrapp/components/HelloWorld'

export const runApp = () => {
    hydrate(
        <HelloWorld />,
        document.getElementById('root'));  
};
  
runApp();