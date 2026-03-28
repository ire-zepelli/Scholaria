import React from "react";
import Navbar from "../Scholarships/NavBar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon broken by Vite's asset handling
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function Scholarships() {
  return (
    <>
      <Navbar />
      <MapContainer
        center={[10.3251, 123.9531]} // UCLM
        zoom={14}
        className="w-full h-[700px]"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={[10.3251, 123.9531]}>
          <Popup>University Of Cebu - Lapu-Lapu and Mandaue.</Popup>
        </Marker>
      </MapContainer>
    </>
  );
}
