import React from 'react';
import { createTheming } from 'react-jss';

import Color from 'color';

export const DefaultTheme = {
  borderRadius: {
    modal: '16px',
    image: '12px',
  },

  fontSize: {
    xxxlarge: '28px',
    xxlarge: '24px',
    xlarge: '20px',
    large: '16px',
    text: '14px',
    small: '12px',
    xsmall: '11px',
  },

  color: {
    text: '#222',
    primary: '#184ff0',
    lighter: Color('#184ff0').mix(Color('white'), .85).hex(),
    inverse: 'white',
    line: '#e1e1e1',
    highlight: '#f43030',
    background: '#f2f2f2',
    positive: '#45c66d',
    disabled: {
      background: '#ccc',
      foreground: '#999',
    },
    selected: '#f8f8f8',
  },

  zIndex: {
    header: 1000,
    backdrop: 5000,
    toast: 8000,
    loading: 10000,
  },
};

export default createTheming(React.createContext(DefaultTheme));
