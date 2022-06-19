mapboxgl.accessToken = 'pk.eyJ1IjoicG1hZ3R1bGlzMDciLCJhIjoiY2wzdTgyNzh0MjlqNjNjbTl4YWdyczE2aiJ9.OusPbpMc7Ue0YyVgHINiAA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/pmagtulis07/cl4095bq6000p14mv90bsqztx',
    zoom: 3,
    maxZoom: 9,
    minZoom: 3,
    center: [-96.23, 40.68],
    projection: 'albers',
});

map.on("load", function () {
    map.addLayer({
      id: "us_county_outline",
      type: "line",
      source: {
        type: "geojson",
        data: "https://raw.githubusercontent.com/pmagtulis/mapping/main/typology-maps/data/countyTypologyCodes.geojson",
      },
      paint: {
        "line-color": "#ffffff",
        "line-width": 0.7,
      },
    });
    map.addLayer({
      id: "low_employment",
      type: "fill",
      source: {
        type: "geojson",
        data: "https://raw.githubusercontent.com/pmagtulis/mapping/main/typology-maps/data/countyTypologyCodes.geojson",
      },
      maxzoom: 6,
      paint: {
        "fill-color": [
          "match",
          ["get", "Low_Employment_Cnty_2008_2012_25_64"],
          1, "#d8b365",
          0, "#f5f5f5",
          "#ffffff",
        ]
      },
    }, "waterway-label");

    map.addLayer(
        {
          id: "us_counties_outline",
          type: "line",
          source: {
            type: "geojson",
            data: "https://raw.githubusercontent.com/pmagtulis/mapping/main/typology-maps/data/countyTypologyCodes.geojson",
          },
          minzoom: 6,
          paint: {
            "line-color": "#ffffff",
            "line-width": 0.25,
          },
        },
        "low_employment"
      );
      map.addLayer(
        {
          id: "low_employment_counties",
          type: "fill",
          source: {
            type: "geojson",
            data: "https://raw.githubusercontent.com/pmagtulis/mapping/main/typology-maps/data/countyTypologyCodes.geojson",
          },
          minzoom: 6,
          paint: {
            "fill-color": [
              "match",
              ["get", "Low_Employment_Cnty_2008_2012_25_64"],
              1,
              "#d8b365",
              0,
              "#f5f5f5",
              "#ffffff",
            ],
  
          },
        },
        "us_counties_outline"
      );
  });


// Create the popup
map.on('click', 'low_employment', function (e) {
    var stateName = e.features[0].properties.STATE_NAME;
    var countyName = e.features[0].properties.NAMELSAD;
    countyName = countyName.toUpperCase();
    stateName = stateName.toUpperCase();
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>' + countyName + ' - ' + '<strong>' + stateName + '</strong>' + '</h4>')
        .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the us_states_elections layer.
map.on('mouseenter', 'low_employment', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'low_employment', function () {
    map.getCanvas().style.cursor = '';
});

map.on('click', 'low_employment_counties', function (e) {
    var stateName = e.features[0].properties.STATE_NAME;
    var countyName = e.features[0].properties.NAMELSAD;
    stateName = stateName.toUpperCase();
    countyName = countyName.toUpperCase();
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>' + countyName + ' - ' + '<strong>' + stateName + '</strong>' + '</h4>')
        .addTo(map)
});
map.on('mouseenter', 'low_employment_counties', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'low_employment_counties', function () {
    map.getCanvas().style.cursor = '';
});