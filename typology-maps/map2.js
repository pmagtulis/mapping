var map2 = new mapboxgl.Map({
    container: 'map2',
    style: 'mapbox://styles/pmagtulis07/cl3ugxtww003514jzo7onkcj1',
    zoom: 1,
    maxZoom: 9,
    minZoom: 3,
    center: [-96.23, 40.68],
    projection: 'albers',
});

map2.on("load", function () {
    map2.addLayer(
      {
        id: "police_brutality_data",
        type: "circle",
        source: {
          type: "geojson",
          data: "https://raw.githubusercontent.com/pmagtulis/mapping/main/typology-maps/data/policeBrutality.geojson",
        },
        paint: {
          "circle-radius": 7,
          "circle-color": "#ac1917",
          "circle-stroke-color": "#000000",
          "circle-opacity": 0.7,
        },
      },
      "waterway-label"
    );
    map2.addLayer(
      {
        id: "us_state_outline",
        type: "line",
        source: {
          type: "geojson",
          data: "https://raw.githubusercontent.com/pmagtulis/mapping/main/typology-maps/data/statesElections.geojson",
        },
        paint: {
          "line-color": "#ffffff",
          "line-width": 0.7,
        },
      },
      "police_brutality_data"
    );
  });
  
  map2.on("click", "police_brutality_data", function (e) {
    var stateName = e.features[0].properties.state;
    var cityName = e.features[0].properties.city;
    var date = e.features[0].properties.date;
  
    stateName = stateName.toUpperCase();
    cityName = cityName.toUpperCase();
  
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>' + stateName + ' - ' + '<strong>' + cityName + '</strong>' + date + '</h4>')
      .addTo(map2);
  });
  map2.on("mouseenter", "police_brutality_data", function () {
    map2.getCanvas().style.cursor = "pointer";
  });
  map2.on("mouseleave", "police_brutality_data", function () {
    map2.getCanvas().style.cursor = "";
  });
