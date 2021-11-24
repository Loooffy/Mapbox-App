import * as React from 'react';
import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { update } from '../features/viewportSlice'

import ReactMapGL from 'react-map-gl';
import {
  MapController, Source, Layer, LinearInterpolator,
} from 'react-map-gl';

import pin from './pin.png';

import axios from 'axios';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYmxvY2t0b3duIiwiYSI6ImNrdXBodnZiaTRsM2syd256cWJtMW0zaWYifQ.oi197toUKUr3EyswaghoiQ';
const MAP_STYLE = 'mapbox://styles/blocktown/ckuqg42f21adk17m10glfg2pm';

const getMarkerApi = (centerLat, centerLng, cornerLat, cornerLng, radius, keyword) => {
  const baseUrl = 'https://elife-test.blocktown.city:2096/api/v1/map/marker/search'
  const reqUrl = `${baseUrl}?centerLat=${centerLat}&centerLng=${centerLng}&radius=${radius}&cornerLat=${cornerLat}&cornerLng=${cornerLng}&keyword=${keyword}`;
  return reqUrl;
};

const getBackgroundApi = 'http://192.168.66.53:5000/background';


class MyMapController extends MapController {
  constructor(fetchMarker) {
    super();
    this.fetchMarker = fetchMarker;
  }

  _onPanEnd(e) {
    const mapState = this.getMapState();
    const { latitude, longitude } = mapState._viewportProps;
    this.fetchMarker(latitude, longitude);
  }
};

const layerStyle = {
  id: 'pin',
  type: 'symbol',
  layout: {
    'icon-image': ['image', 'elife'],
    'icon-size': 0.8,
  },
  paint: {
    'icon-color': '#EEEEEE',
  },
};

const backgroundStyle = {
  id: 'background',
  type: 'symbol',
  layout: {
    'icon-image': ['image', 'pin'],
    'icon-size': 0.3,
  },
};

// const locations = [];

// const Markers =  locations.map(location =>
//   <Marker key={location.name} longitude={location.longitude} latitude={location.latitude}>
//     <div>hello</div>
//     {/* eslint-disable-next-line */}
//     <img src={pin} />
//   </Marker>
// );
//
const defaultFeatures = [{
 type: 'Feature',
 geometry: {
   type: 'Point',
   coordinates: [121.5, 25],
 },
 properties: {
   storeName: '好吃水餃',
 },
}];

class Marker {
  constructor(data) {
    this.type = 'FeatureCollection';
    if (data) {
      this.features = data.map((marker) => {
        const latitude = marker.location.lat;
        const longitude = marker.location.lng;
        const storeName = marker.storeName;
        const id = marker.id;
        return {
          geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          properties: {
            id,
            storeName,
          },
        };
      });

    } else {
      this.features = {...defaultFeatures};
    }
  }
}

function Map() {
  const viewport = useSelector((state) => state.viewport);
  const dispatch = useDispatch();
  
  const {...initMarker} = new Marker();
  const [marker, setMarker] = useState(initMarker);
  const [background, setBackground] = useState(initMarker);

  const fetchMarker = async (latitude, longitude) => {
    const cornerLat = latitude + 0.01;
    const cornerLng = longitude + 0.01;
    const markerApi = getMarkerApi(latitude, longitude, cornerLat, cornerLng, 2000, '美食');
    const { data } = await axios(`${markerApi}?latitude=${latitude}&longitude=${longitude}`);
    const {...markers} = new Marker(data.markerList);
    setMarker(markers);
  };

  const mapController = new MyMapController(fetchMarker);

  useEffect(async () => {
    const { data } = await axios(getBackgroundApi);
    setBackground(data);
  }, []);

  const renderOptions = {
    asyncRender: true,
    minZoom: 7,
    scrollZoom: {
      speed: 0.05,
      smooth: false,
    },
    dragPan: {
      inertia: 800,
    },
  };

  // const renderMarker = (locations) => {
  //   return locations.map(location =>
  //     <Marker key={location.name} longitude={location.longitude} latitude={location.latitude}>
  //       <div>hello</div>
  //       {/* eslint-disable-next-line */}
  //       <img src={pin} />
  //     </Marker>
  //   )
  // };

  // eslint-disable-next-line
  // const markers = React.useMemo(() => renderMarker(props.locations), [props.locations]);

  let _onClick = (e) => {
    if (e.features.length !== 0) {
      const { coordinates } = e.features[0].geometry;
      const latitude = coordinates[1];
      const longitude = coordinates[0];
      const zoom = 14;
      dispatch(update({
        latitude,
        longitude,
        zoom,
        isClick: true,
        // transitionDuration: 200,
        // transitionInterpolator: new LinearInterpolator(),
      }));
      const { properties } = e.features[0];
      //window.alert(properties.storeName || properties.name);
    }
  }

  return (
    <ReactMapGL
      mapboxApiAccessToken={MAPBOX_TOKEN}
      mapStyle={MAP_STYLE}
      {...viewport}
      {...renderOptions}
      width='100%'
      height='100vh'
      onViewportChange={(props) => dispatch(update(
        {
          latitude: props.latitude,
          longitude: props.longitude,
          zoom: props.zoom,
        }
      ))}
      controller={mapController}
      interactiveLayerIds={['pin', 'background']}
      onClick={_onClick}
    >
      <Source id='background-data' type='geojson' data={background}>
        <Layer
          {...backgroundStyle}
        />
      </Source>
      <Source id='search-data' type='geojson' data={marker}>
        <Layer
          {...layerStyle}
        />
      </Source>
    </ReactMapGL>
  );
}

export default Map
