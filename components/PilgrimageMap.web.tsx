import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MAP_PINS } from '../data/mapPins';

// Leafletのアイコン画像のバグ修正
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export default function PilgrimageMap() {
  return (
    <MapContainer
      center={[35.6762, 139.6503]}
      zoom={10}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {MAP_PINS.map((pin) => (
        <Marker key={pin.id} position={[pin.lat, pin.lng]}>
          <Popup>スポット {pin.id}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
