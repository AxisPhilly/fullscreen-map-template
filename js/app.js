if (typeof app === 'undefined' || !app) {
  var app = {};
}

// Merge url params with settings set by user
// URL params take preference
app.mergeSettings = function() {
  //var params = decodeURIComponent(location.hash.substring(1)).trim().split('&');
  var params = $.url().fparam();

  _.defaults(params, app.opts);

  return params;
};

// Create the map
app.initMap = function(callback) {
  var settings = app.mergeSettings();

  wax.tilejson(settings.tileURL,
  function(tilejson) {
    app.map = new L.Map(settings.mapContainer)
      .addLayer(new wax.leaf.connector(tilejson))
      .setView(new L.LatLng(settings.lat, settings.lng), settings.zoom);
    
    app.map.attributionControl.addAttribution(
        'Map Data: (c) <a href="http://www.openstreetmap.org">OpenStreetMap</a>'
      );

    app.setEvents();

    if(callback && typeof callback === 'function') { callback(); }
  });
};

// Listen for changes as user pans and zoom on the map
app.setEvents = function() {
  app.map
    .on('zoomend', function(e) {
      app.updateURL();
    })
    .on('dragend', function(e) {
      app.updateURL();
    });
};

// Gets the current map center and zoom and sets
// those values in the url
// i.e. #zoom=12&lat=39.976&lng=-75.172
app.updateURL = function() {
  var zoom = app.map.getZoom(),
      lat = app.map.getCenter().lat.toFixed(3),
      lng = app.map.getCenter().lng.toFixed(3),
      params = 'zoom=' + zoom + '&lat=' + lat + '&lng=' + lng;

  location.hash = params;
};