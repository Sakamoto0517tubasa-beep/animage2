export type MapPin = {
    id: string;
    lat: number;
    lng: number;
  };
  
  export const MAP_PINS: MapPin[] = [
    { id: '1', lat: 35.3194, lng: 139.5467 }, // 鎌倉高校前踏切
    { id: '2', lat: 35.684,  lng: 139.7197 }, // 須賀神社
    { id: '6', lat: 35.6613, lng: 139.668  }, // 渋谷
    { id: '7', lat: 35.702,  lng: 139.7656 }, // 別スポット
    { id: '8', lat: 35.2,    lng: 139.0247 }, // 江ノ島エリア
  ];