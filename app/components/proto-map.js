import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['map proto-map'],

  mapOptions: {
    zoom: CrashEvents.map.defaultZoom,
    center: new google.maps.LatLng(CrashEvents.map.baseLat, CrashEvents.map.baseLng)
  },

  _addCartoDbLayer: function(map) {
    var layerSQL = "SELECT * FROM " + CrashEvents.cartoDb.tables.accidents + "";

    window.cartodb.createLayer(map, {
      user_name: CrashEvents.cartoDb.user,
      type: CrashEvents.cartoDb.layerType,
      sublayers: [{
        sql: layerSQL,
        cartocss: '#' + CrashEvents.cartoDb.tables.accidents + ' {marker-fill: red;}'
      }]
    })
    .addTo(map, 0)
    .done(function(layer) {
      console.log('added', layer);
    })
      .error(function(error) {
      console.log(error);
      console.log('problem loading cartodb layer');
    });
  },

  _initializeMap: function() {
    var map;
    map = new google.maps.Map(this.$().get(0), this.mapOptions);
    this._addCartoDbLayer(map);
  }.on('didInsertElement')
});
