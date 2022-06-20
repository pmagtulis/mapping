mapboxgl.accessToken = 'pk.eyJ1IjoicG1hZ3R1bGlzMDciLCJhIjoiY2wzdTgyNzh0MjlqNjNjbTl4YWdyczE2aiJ9.OusPbpMc7Ue0YyVgHINiAA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/pmagtulis07/cl4bop9c5000d14qweqz24ghl',
    zoom: 1,
    maxZoom: 6,
    minZoom: 1,
    center: [3.157, 24.797],
    projection: 'winkelTripel'
});

map.on("load", function () {
  map.resize();
    map.addLayer({
      id: "world_outline",
      type: "line",
      source: {
        type: "geojson",
        data: "https://raw.githubusercontent.com/pmagtulis/mapping/main/oil/data/countries_oil.geojson",
      },
      paint: {
        "line-color": "#ffffff",
        "line-width": 0.7,
      },
    });
    map.addLayer({
      id: "world_numbers",
      type: "fill",
      source: {
        type: "geojson",
        data: "https://raw.githubusercontent.com/pmagtulis/mapping/main/oil/data/countries_oil.geojson",
      },
      maxzoom: 5, 
      minzoom: 1,
      "paint": {
        "fill-color": {
            property: "oil_energy",
            stops: [[0, '#f2e926'],
                    [16, '#efd124'],
                    [31, '#ebb822'],
                    [46, '#e8a01f'],
                    [61, '#e5871d'],
                    [76, '#e16f1b'],
                    [91, '#d72514']]
        }
    }
    }, "waterway-label");
  });

  


// Create the popup
map.on('click', 'world_numbers', function (e) {
    var countryName = e.features[0].properties.country;
    var oilAmount = e.features[0].properties.oil_energy.toLocaleString('en-US');
    var incomeGroup = e.features[0].properties.income_grp;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h2>'+ '<strong>' + countryName + '</strong>' + '</h2>'
            + '<h2>' + 'Income group:' + " " + incomeGroup + '</h2>'
            +'<h1>' + '% of oil in energy production:' + " " + '<strong>' + oilAmount + '</strong>' + '</h1>')
        .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the us_states_elections layer.
map.on('mouseenter', 'world_numbers', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'world_numbers', function () {
    map.getCanvas().style.cursor = '';
});