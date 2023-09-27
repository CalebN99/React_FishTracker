import React from "react";
import "../css/Map.css";

import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

interface Mark {
  lat: number;
  lng: number;
}

function Map(): JSX.Element {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
  });
  const [map, setMap] = React.useState(null);
  const [markers, setMarkers] = React.useState<Mark[]>([]); // pass empty array as initial state

  const [center, setCenter] = React.useState({ lat: 0, lng: 0 });

  const onLoad = React.useCallback(function callback(map: any) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setMarkers([
            ...markers,
            {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            } as Mark, // add type assertion to fix type error
          ]);
        },
        () => {
          console.log("Error: The Geolocation service failed.");
        }
      );
    } else {
      console.log("Error: Your browser doesn't support geolocation.");
    }
  }, []);

  console.log(markers);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}

      {markers.map((mark) => {
        return <MarkerF position={{ lat: mark.lat, lng: mark.lng }} />;
      })}
    </GoogleMap>
  ) : (
    <div className="map_component">
      <h1>Map</h1>
    </div>
  );
}

export default Map;
