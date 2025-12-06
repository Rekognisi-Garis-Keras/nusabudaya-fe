"use client";

import React, { useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import indonesianData from "../../../public/id.json";
import { GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Cloud from "./Cloud";
import { PROVINCE_MARKERS } from "@/constants/MarkerPositions";

const MapComponent = () => {
  const [activeProv, setActiveProv] = useState(null);

  const defaultIcon = L.icon({
    iconUrl: "/sumatera.webp",
    iconSize: [43, 43],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: "rounded-full",
  });

  // boundary indonesia
  const bounds = [
    [-13.92, 90.01],
    [9.91, 145.97],
  ];
  const boundsPath = {
    color: "red",
    fillColor: "red",
    fillOpacity: 0,
    opacity: 0,
  };

  // [Styling GeoJSON]
  const geoJsonStyle = {
    fillColor: "#8a07fe", // Warna isi
    fillOpacity: 0.5, // Transparansi isi
    color: "#8a07fe", // Warna garis batas
    weight: 3, // Tebal garis
    className: "geo-fade-in", // class buat animasi
  };

  return (
    <main className="h-screen w-full relative">
      <MapContainer
        center={[-3.2889889859501693, 118.94523262448598]} // koordinat awal
        zoom={6} // level zoom awal
        minZoom={5.5} // batas untuk zoom out
        maxZoom={9}
        className="w-full h-full" // class map
        maxBounds={bounds}
        maxBoundsViscosity={11}
        zoomSnap={0.5}
        wheelPxPerZoomLevel={500}
      >
        {/* <GeoJSON data={indonesianData} style={geoJsonStyle} /> */}
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />

        {activeProv && (
          <GeoJSON
            key={activeProv.properties.id || Math.random()}
            data={activeProv}
            style={geoJsonStyle}
          />
        )}

        {PROVINCE_MARKERS.map((prov) => (
          <Marker
            key={prov.originalIndex}
            position={prov.position}
            icon={defaultIcon}
            eventHandlers={{
              mouseover: () => {
                const feature = indonesianData.features[prov.originalIndex];
                setActiveProv(feature);
              },
              mouseout: () => setActiveProv(null),
            }}
          >
            <Popup>{prov.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
      <Cloud />
    </main>
  );
};

export default MapComponent;
