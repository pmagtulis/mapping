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
      id: "us_counties_centroids",
      type: "circle",
      source: {
        type: "geojson",
        data: "data/countiesPoints.geojson",
      },
      paint: {
        'circle-radius':
        ['interpolate', ['linear'], ['zoom'],
            3, ['max', ['/', ['sqrt', ['abs', ['-', ['get', 'Trump'], ['get', 'Biden']]]], 40], 1],
            9, ['max', ['/', ['sqrt', ['abs', ['-', ['get', 'Trump'], ['get', 'Biden']]]], 15], 5],
        ],
        "circle-color": [
          "match",
          ["get", "Winner"],
          "Donald J Trump",
          "#cf635d",
          "Joseph R Biden Jr",
          "#6193c7",
          "Other",
          "#91b66e",
          "#ffffff",
        ],
        "circle-stroke-color": "#ffffff",
        "circle-stroke-width": 0.5,
        "circle-opacity": [
          "step",
          ["get", "WnrPerc"],
          0.3,
          0.4,
          0.5,
          0.5,
          0.7,
          0.6,
          0.9,
        ],
      },
      minzoom: 1,
    },
    "waterway-label"
);

    map2.addLayer(
        {
        id: "us_states_elections_outline",
        type: "line",
        source: {
            type: "geojson",
            data: "data/statesElections.geojson",
        },
        paint: {
            "line-color": "#ffffff",
            "line-width": 0.7,
        },
        },
        "us_counties_centroids"
    );
    map2.addLayer(
        {
        id: "us_counties_elections_outline",
        type: "line",
        source: {
            type: "geojson",
            data: "data/countiesElections.geojson",
        },
        minzoom: 6,
        paint: {
            "line-color": "#ffffff",
            "line-width": 0.25,
        },
        },
        "us_states_elections_outline"
    );
});

map2.on('click', 'us_counties_centroids', function (e) {
    var stateName = e.features[0].properties.State;
    var countyName = e.features[0].properties.County;
    var winner = e.features[0].properties.Winner;
    var wnrPerc = e.features[0].properties.WnrPerc;
    var totalVotes = e.features[0].properties.Total;
    wnrPerc = (wnrPerc * 100).toFixed(0);
    totalVotes = totalVotes.toLocaleString();
    stateName = stateName.toUpperCase();
    countyName = countyName.toUpperCase();
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>' + countyName + ' - ' + stateName + '</h4>'
            + '<h2>' + winner + '</h2>'
            + '<p>' + wnrPerc + '% - (' + totalVotes + ' votes)</p>')
        .addTo(map2);
});
map2.on('mouseenter', 'us_counties_centroids', function () {
    map2.getCanvas().style.cursor = 'pointer';
});
map2.on('mouseleave', 'us_counties_centroids', function () {
    map2.getCanvas().style.cursor = '';
});