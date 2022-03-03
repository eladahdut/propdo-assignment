export const createGeoJSONCircle = (
  center: number[],
  radiusInKm: number,
  points?: number
) => {
  points = 64;

  let coords = {
    latitude: center[1],
    longitude: center[0],
  };

  let km = radiusInKm;

  let ret = [];
  let distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
  let distanceY = km / 110.574;

  let theta, x, y;
  for (let i = 0; i < points; i++) {
    theta = (i / points) * (2 * Math.PI);
    x = distanceX * Math.cos(theta);
    y = distanceY * Math.sin(theta);

    ret.push([coords.longitude + x, coords.latitude + y]);
  }
  ret.push(ret[0]);

  return {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: center,
          },
          properties: {},
        },
      ],
    },
  };
};
