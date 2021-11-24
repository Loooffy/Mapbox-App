import React, {useState} from 'react';
import DeckGL, {IconLayer} from 'deck.gl';
import ReactMapGL from 'react-map-gl';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYmxvY2t0b3duIiwiYSI6ImNrdXBodnZiaTRsM2syd256cWJtMW0zaWYifQ.oi197toUKUr3EyswaghoiQ';
const MAP_STYLE="mapbox://styles/blocktown/ckuqg42f21adk17m10glfg2pm"

const INITIAL_VIEW_STATE = {
  latitude: 25,
  longitude: 121.5,
  zoom: 15,
  bearing: 0,
};

const ICON_MAPPING = {
  marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
};

const data = [];

for (let i=0; i<200; i++) {
  const latitude = 25 + Math.random() * i * Math.pow(-1, i) * 0.0005;
  const longitude = 121.5 + Math.random() * i * Math.pow(-1, i) * 0.0005;
  data.push(
    {
      message: i.toString(),
      position: [longitude, latitude],
    }
  );
}

const renderOptions = {
  minZoom: 7,
  scrollZoom: {
    speed: 0.1,
    smooth: false,
  },
  dragPan: {
    inertia: 800,
  },
};

function Deck() {
  const [hoverInfo, setHoverInfo] = useState(0);

  const layers = [
    new IconLayer({
      id: 'line-layer',
      data,
      pickable: true,
      iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
      iconMapping: ICON_MAPPING,
      getSize: d => 30,
      getColor: [0, 0, 0],
      getPosition: d => d.position,
      getIcon: d => 'marker',
      onHover: info => setHoverInfo(info),
    })
  ];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      {hoverInfo.object && (
        <div style={{position: 'absolute', zIndex: 1, pointerEvents: 'none', left: hoverInfo.x, top: hoverInfo.y}}>
          { hoverInfo.object.message }
        </div>
      )}
      <ReactMapGL
        {...renderOptions}
        width="100vw"
        height="100vh"
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={MAP_STYLE}
      >
      </ReactMapGL>
    </DeckGL>
  );
}

export default Deck
