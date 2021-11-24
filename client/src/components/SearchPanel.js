import * as React from 'react';
import {useState, useEffect} from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { update } from '../features/viewportSlice'

import {
  Input, Card, SideBar, CardInfo
} from './base';

import axios from 'axios';

const getStoreApi = 'http://127.0.0.1:5000/stores';
const imgUrl = 'https://cdn.vox-cdn.com/thumbor/pOMbzDvdEWS8NIeUuhxp23wi_cU=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/19700731/googlemaps.png'

function StoreCard(props) {
  const { info } = props;

  return (
    <Card onClick={() => window.alert('card')}>
      <img src={imgUrl} height={'20px'} />
      <CardInfo>{info.title}</CardInfo>
      <CardInfo>{info.distance}</CardInfo>
      <CardInfo>{info.priceRange}</CardInfo>
      <CardInfo>{info.isOpen}</CardInfo>
    </Card>
  )
};

function StoreCardList(props) {
  const { data } = props;

  return Object.entries(data).map((info) => {
    return <StoreCard key={info[0]} info={info[1]} />
  });
};

function SearchPanel() {
  const [data, setData] = useState([
    {
      title: '好吃水餃',
      isOpen: '營業中',
      distance: 100,
      priceRange: '100 ~ 500',
    }
  ]);
  const viewport = useSelector((state) => state.viewport);
  const dispatch = useDispatch();

  const fetchData = async () => {
    const { data } = await axios(`${getStoreApi}`);
    setData(data);
  };

  const sendSearchReq = (e) => {
    if (e.key === 'Enter') {
      fetchData();
      const newViewport = {
        latitude: 25,
        longitude: 121.501,
        zoom: 12,
        bearing: 0,
      };
      dispatch(update(newViewport));
    }
  };

  return (
    <SideBar width={1/4} p={3} pt={30}>
      <Input
        mb={20}
        id='search'
        name='search'
        type='search'
        placeholder='美食'
        onKeyDown={sendSearchReq}
      />
      <StoreCardList width={1} mt={3} data={data} />
    </SideBar>
  );
}

export default SearchPanel
