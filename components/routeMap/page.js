"use client";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { decode, encode } from "@googlemaps/polyline-codec";
import { useEffect, useState } from "react";

function Map({ polyline }) {
  const center = [51.505, -0.09];
  const encoded = polyline.routes[0].polyline;
  //   console.log(decode(encoded, 5));
  //   console.log();
  const destinations = [
    {
      position: [
        polyline.summary.route[0].location.lat,
        polyline.summary.route[0].location.lng,
      ],
      label: "Origin",
    },
    {
      position: [
        polyline.summary.route[1].location.lat,
        polyline.summary.route[1].location.lng,
      ],
      label: "Destination",
    },
  ];

  //   const [tollLocations, setTollLocations] = useState([]);
  const tollLocations = polyline.routes[0].tolls.map((toll) => ({
    position: [toll.lat, toll.lng],
    label: toll.name,
    cash: toll.cashCost,
    tag: toll.tagCost,
    currency: toll.currency,
  }));
  //   useEffect(() => {
  //     if (polyline.routes[0].summary.hasTolls) {
  //       const newTollLocations = polyline.routes[0].tolls.map((toll) => ({
  //         position: [toll.lat, toll.lng],
  //         label: "Toll Location",
  //       }));

  //       setTollLocations((prevTollLocations) => [
  //         ...prevTollLocations,
  //         ...newTollLocations,
  //       ]);
  //     }
  //   }, [polyline]);
  console.log(tollLocations);

  //   console.log(destinations);
  const path = decode(encoded, 5);
  return (
    <div className="rounded-xl">
      <MapContainer
        center={destinations[0].position}
        zoom={13}
        className="rounded-xl"
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Draw the path using Polyline */}
        <Polyline positions={path} color="red" />

        {/* Add a marker at the center */}
        <Marker position={center}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        {destinations.map((dest, index) => (
          <Marker key={index} position={dest.position}>
            <Popup>{dest.label}</Popup>
          </Marker>
        ))}

        {tollLocations.map((dest, index) => (
          <Marker key={index} position={dest.position}>
            <Popup>
              {dest.label} <br />
              Cash: {dest.cash + " " + dest.currency} <br />
              Tag: {dest.tag + " " + dest.currency} <br />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
