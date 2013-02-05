if (typeof app === 'undefined' || !app) {
  var app = {};
}

// Merge url params with settings set up user
// URL params take preference
app.mergeSettings = function() {
  var params = $.url().param();

  _.defaults(params, app.opts);

  return params;
};

// Create the map
app.initMap = function() {
  var settings = app.mergeSettings();

  console.log(settings);

  wax.tilejson(settings.tileURL,
  function(tilejson) {
    var map = new L.Map(settings.mapContainer)
      .addLayer(new wax.leaf.connector(tilejson))
      .setView(new L.LatLng(settings.lat, settings.lng), settings.zoom);
  });
};

// Sets lat, lng, and zoom as user pans around map
app.updateURL = function() {

};