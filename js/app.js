if (typeof app === 'undefined' || !app) {
  var app = {};
}

// Merge url params with settings set up user
// URL params take preference
app.mergeSettings = function() {
  var params = $.url().fparam();

  _.defaults(params, app.opts);

  return params;
};

// Create the map
app.initMap = function() {
  var settings = app.mergeSettings();

  wax.tilejson(settings.tileURL,
  function(tilejson) {
    app.map = new L.Map(settings.mapContainer)
      .addLayer(new wax.leaf.connector(tilejson))
      .setView(new L.LatLng(settings.lat, settings.lng), settings.zoom);

      app.setEvents();
  });
};

app.setEvents = function() {
  app.map
    .on('zoomend', function(e) {
      app.updateURL();
    })
    .on('dragend', function(e) {
      app.updateURL();
    });
};

// Sets lat, lng, and zoom as user pans around maps
app.updateURL = function() {
  //var params = decodeURIComponent(location.hash.substring(1)).trim().split('&');
  var zoom = app.map.getZoom(),
      lat = app.map.getCenter().lat,
      lng = app.map.getCenter().lng,
      params = 'zoom=' + zoom + '&lat=' + lat + '&lng=' + lng;

  location.hash = params;
};