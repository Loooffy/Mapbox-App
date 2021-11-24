import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Flex, Box } from 'rebass';

import store from './store'
import { Provider } from 'react-redux'

import Map from './components/Map';
import SearchPanel from './components/SearchPanel';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <Flex p={0} m={0} order-width={0} maxHeight={'100vh'}>
      <Box width={1/4}>
        <SearchPanel />
      </Box>
      <Box width={3/4}>
        <Map />
      </Box>
    </ Flex>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// <Deck />

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
