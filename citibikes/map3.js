mapboxgl.accessToken = 'pk.eyJ1IjoicG1hZ3R1bGlzMDciLCJhIjoiY2wzdTgyNzh0MjlqNjNjbTl4YWdyczE2aiJ9.OusPbpMc7Ue0YyVgHINiAA';
var map3 = new mapboxgl.Map({
    container: 'map3',
    style: 'mapbox://styles/pmagtulis07/cl4bop9c5000d14qweqz24ghl',
    zoom: 10.2,
    maxZoom: 16,
    minZoom: 10.2,
    center: [-73.947, 40.752],
    projection: 'albers',
});

map3.on("load", function () {
    let layers = map3.getStyle().layers;
      for (var i=0; i<layers.length; i++) {
      console.log(layers[i].id)}

map3.addLayer(
  {
    id: "starts2021",
    type: "circle",
    source: {
      type: "geojson",
      data: "https://raw.githubusercontent.com/pmagtulis/mapping/main/citibikes/data/sept2021Starts.geojson",
    },
    paint: {
      'circle-radius': 3,
      "circle-stroke-color": "#ffffff",
      "circle-stroke-width": 0.7,
      "circle-opacity": 0.7,

      'circle-color': [
        'interpolate',
        ['linear'],
        ['get', 'tripCount'],
        0,
        '#d2f1e4',
        3500,
        '#fbcaef',
        7000,
        '#f865b0',
        10500,
        '#e637bf',
        14000,
        '#48304d'
        ],
    },
    minzoom: 3,
  },
  "settlement-minor-label"
);

});

// Create the popup
map3.on('click', 'starts2021', function (e) {
var stationName = e.features[0].properties.start_station_name;
var tripCount = e.features[0].properties.tripCount.toLocaleString();
new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML('<h3>' + tripCount + ' trips started at ' + stationName + '</h3>'
        )
    .addTo(map3);
});
map3.on('mouseenter', 'starts2021', function () {
map3.getCanvas().style.cursor = 'pointer';
});
map3.on('mouseleave', 'starts2021', function () {
map3.getCanvas().style.cursor = '';
});