import React from 'react';
import './Map.css';

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

function Map(): JSX.Element {
    return (
        <div className="map_component">
            <h1>Map</h1>
        </div>
    );
}

export default Map;
