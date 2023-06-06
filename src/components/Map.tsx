import React, { useRef, useEffect } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%",
};

interface MapContainerProps {
  google: any;
  country: any;
}

const MapContainer: React.FC<MapContainerProps> = ({ google, country }) => {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (mapRef.current && country && country.capitalInfo) {
      const map = mapRef.current.map;
      let lat;
      let lng;

      if (country.capitalInfo.latlng && country.capitalInfo.latlng.length > 1) {
        lat = country.capitalInfo.latlng[0];
        lng = country.capitalInfo.latlng[1];
      } else if (country.latlng && country.latlng.length > 1) {
        lat = country.latlng[0];
        lng = country.latlng[1];
      }

      if (
        typeof lat === "number" &&
        typeof lng === "number" &&
        isFinite(lat) &&
        isFinite(lng)
      ) {
        map.panTo({ lat, lng });
        map.setZoom(8);

        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        const marker = new google.maps.Marker({
          position: { lat, lng },
          map: map,

          animation: google.maps.Animation.DROP,
        });

        markerRef.current = marker;
      }
    }
  }, [country, google]);

  return (
    <div>
      <Map
        google={google}
        style={mapStyles}
        initialCenter={{ lat: 51.5074, lng: -0.1278 }}
        ref={mapRef}
      />
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDNx9Gq8nClx0KDU1xBVVCE4oYGeVjetZk",
})(MapContainer);
