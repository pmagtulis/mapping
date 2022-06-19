mapboxgl.accessToken = 'pk.eyJ1IjoicG1hZ3R1bGlzMDciLCJhIjoiY2wzdTgyNzh0MjlqNjNjbTl4YWdyczE2aiJ9.OusPbpMc7Ue0YyVgHINiAA';
var map4 = new mapboxgl.Map({
    container: 'map4',
    style: 'mapbox://styles/pmagtulis07/cl4buuedw000n15qe6xt8vglg',
    zoom: 10.2,
    maxZoom: 16,
    minZoom: 10.2,
    center: [-73.947, 40.752],
    projection: 'albers',
});

map4.on("load", function () {
    let layers = map4.getStyle().layers;
      for (var i=0; i<layers.length; i++) {
      console.log(layers[i].id)}

map4.addLayer(
  {
    id: "stops2021",
    type: "circle",
    source: {
      type: "geojson",
      data: "https://raw.githubusercontent.com/pmagtulis/mapping/main/citibikes/data/sept2021Stops.geojson",
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
        '#2e86ab',
        3500,
        '#a23b72',
        7000,
        '#f18f01',
        10500,
        '#c73e1d',
        14000,
        '#3b1f2b'
        ],
    },
    minzoom: 3,
  },
  "settlement-minor-label"
);

});

// Create the popup
map4.on('click', 'stops2021', function (e) {
var stationName = e.features[0].properties.end_station_name;
var tripCount = e.features[0].properties.tripCount.toLocaleString();
new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML('<h3>' + tripCount + ' trips completed at ' + stationName + '</h3>'
        )
    .addTo(map4);
});
map4.on('mouseenter', 'stops2021', function () {
map4.getCanvas().style.cursor = 'pointer';
});
map4.on('mouseleave', 'stops2021', function () {
map4.getCanvas().style.cursor = '';
});