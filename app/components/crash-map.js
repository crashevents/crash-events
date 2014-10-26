import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['map crash-map'],

  _initializeMap: function() {
    var map = this.createGoogleMap();
    this.addCartoDbLayer(map, 0);
  }.on('didInsertElement'),

  createGoogleMap: function() {
    var map;
    var mapOptions = {
      zoom: CrashEvents.map.defaultZoom,
      center: new window.google.maps.LatLng(
        CrashEvents.map.baseLat,
        CrashEvents.map.baseLng
      )
    };

    map = new window.google.maps.Map(this.$().get(0), mapOptions);
    return map;
  },

  addCartoDbLayer: function(map, position) {
    var table = CrashEvents.cartoDb.tables.accidents;
    var layerSQL = "SELECT * FROM " + table + " ";

    window.cartodb.createLayer(map, {
      user_name: CrashEvents.cartoDb.user,
      type: CrashEvents.cartoDb.layerType,
      sublayers: [{
        sql: layerSQL,
        cartocss: '#' + table + '{marker-fill: #B13B11'; marker-fill-opacity: 0.25; marker-line-color: transparent; marker-allow-overlap: true; marker-width: 7;}'
      }]
    })
    .addTo(map, position)
    .done(function(layer) {
      console.log('>>> added cartodb layer', layer);
    })
    .error(function(error) {
      console.log('>>> problem creating cartodb layer:', error);
    });
  }
});
