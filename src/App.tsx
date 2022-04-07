import React from 'react';
import { IntlProvider } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import store from './redux/store';
import Theming, { DefaultTheme } from './Theming';

import 'antd/dist/antd.css';
import axios from 'axios';
import Entry from "./components/Entry";
axios.defaults.baseURL = '/api/v1';

function App() {
  useStyles();

  return (
    <Provider store={store}>
      <Theming.ThemeProvider theme={DefaultTheme}>
        <IntlProvider messages={require('./translations/zh-cn.json')} locale="zh-cn">
            <BrowserRouter>
              <Route path="/" component={Entry} />
            </BrowserRouter>
        </IntlProvider>
      </Theming.ThemeProvider>
    </Provider>
  );
}

export default App;

const useStyles = createUseStyles(({ fontSize, color }: typeof DefaultTheme) => ({
  '@global': {
    'html, body, #root': {
      margin: 0,
      padding: 0,
      height: '100%',
      fontFamily: [ 'Avenir', 'PingFangSC', 'Microsoft Yahei' ],
      fontSize: fontSize.text,
      position: 'relative',
    },

    p: {
      margin: 0,
      padding: 0,
    },

    a: {
      color: color.primary,
      textDecoration: 'none',
    },
  },
}), { theming: Theming });
