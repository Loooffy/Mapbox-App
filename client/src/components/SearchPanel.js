import * as React from 'react';
import {useState, useEffect} from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { update } from '../features/viewportSlice'

import {
  Input, Card, SideBar, CardInfo
} from './base';

import axios from 'axios';

const imgUrl = 'https://cdn.vox-cdn.com/thumbor/pOMbzDvdEWS8NIeUuhxp23wi_cU=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/19700731/googlemaps.png'

const getStoreApi = (centerLat, centerLng, cornerLat, cornerLng, radius, keyword) => {
  const baseUrl = 'https://elife-test.blocktown.city:2096/api/v1/map/storeInfo/search'
  const reqUrl = `${baseUrl}?centerLat=${centerLat}&centerLng=${centerLng}&radius=${radius}&cornerLat=${cornerLat}&cornerLng=${cornerLng}&keyword=${keyword}`;
  return reqUrl;
};

function StoreCard(props) {
  const { info } = props;

  return (
    <Card onClick={() => window.alert('card')}>
      <img src={imgUrl} height={'20px'} />
      <CardInfo>{info.storeName}</CardInfo>
    </Card>
  )
};

function StoreCardList(props) {
  const { storeList } = props.data;
  if (storeList && storeList.length) {
    const { storeList } = props.data;
    return Object.entries(storeList).map((info) => {
      return <StoreCard key={info[0]} info={info[1]} />
    });
  } else {
    return <div></div>;
  }
};

function SearchPanel() {
  const [data, setData] = useState([]);
  const viewport = useSelector((state) => state.viewport);
  const dispatch = useDispatch();

  const fetchData = async (latitude, longitude) => {
    const cornerLat = latitude + 0.01;
    const cornerLng = longitude + 0.01;
    const storeInfoApi = getStoreApi(latitude, longitude, cornerLat, cornerLng, 2000, '美食');
    const { data } = await axios(`${storeInfoApi}`);
    setData(data);
  };

  const sendSearchReq = (e) => {
    if (e.key === 'Enter') {
      const { latitude, longitude } = viewport;
      fetchData(latitude, longitude);
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
