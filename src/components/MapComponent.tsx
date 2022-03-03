import React, { useRef, useEffect, useState } from "react";
import mapboxgl, { Map, MapMouseEvent } from "mapbox-gl";
import TextField from "@mui/material/TextField";
import { mapToken } from "../App.const";

mapboxgl.accessToken = mapToken;

export default function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef<Map | undefined>();
  const [lng, setLng] = useState(34.8516);
  const [lat, setLat] = useState(31.0461);
  const [zoom, setZoom] = useState(6);
  const [lngInput, setLngInput] = useState(34.8516);
  const [latInput, setLatInput] = useState(31.0461);

  const handleSetLng = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value >= -180 && +e.target.value <= 180) {
      setLng(+e.target.value);
      setLngInput(+e.target.value);
    }
  };
  const handleSetLat = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value >= -90 && +e.target.value <= 90) {
      setLat(+e.target.value);
      setLatInput(+e.target.value);
    }
  };

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current! as string | HTMLElement,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.on("load", () => {
      map.current!.addSource("myCirlce", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [lng, lat],
              },
              properties: {},
            },
          ],
        },
      });
      map.current!.addLayer({
        id: "cir",
        type: "circle",
        source: "myCirlce",
        paint: {
          "circle-radius": 100,
          "circle-color": "#B42222",
          "circle-opacity": 0.3,
        },
        filter: ["==", "$type", "Point"],
      });
    });
    map.current.on("click", (ev: MapMouseEvent) => {
      const { lat, lng } = ev.lngLat;
      setLatInput(lat);
      setLngInput(lng);
      map.current?.setCenter([lng, lat]);
      map.current!.removeLayer("cir");
      map.current!.removeSource("myCirlce");
      map.current!.addSource("myCirlce", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [lng, lat],
              },
              properties: {},
            },
          ],
        },
      });
      map.current!.addLayer({
        id: "cir",
        type: "circle",
        source: "myCirlce",
        paint: {
          "circle-radius": 100,
          "circle-color": "#B42222",
          "circle-opacity": 0.3,
        },
        filter: ["==", "$type", "Point"],
      });
    });
  }, [lng, lat]);
  return (
    <div className="map-comp-holder">
      <div className="lng-lat-holder">
        <TextField
          onChange={handleSetLng}
          label={"longitude"}
          type={"number"}
          value={lngInput}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            max: 180,
            min: -180,
          }}
        />
        <TextField
          onChange={handleSetLat}
          label={"latitude"}
          type={"number"}
          value={latInput}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            max: 90,
            min: -90,
          }}
        />
      </div>

      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
