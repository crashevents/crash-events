import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['map crash-map'],
  filterSeasons: ['spring', 'summer', 'autumn', 'winter'],
  filterYears: ['2009', '2010', '2011', '2012', '2013', '2014'],

  _initializeMap: function() {
    var map = this.createGoogleMap();
    this.set('map', map);
    this.addCartoDbLayer(0);
  }.on('didInsertElement'),

  _filtersChanges: function() {
    this.addCartoDbLayer(0);
    console.log(">> update filters");
  }.observes('filterSeasons', 'filterYears'),

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

  addCartoDbLayer: function(position) {
    var map = this.get('map');
    var table = CrashEvents.cartoDb.tables.accidents;
    var seasons = this.get('filterSeasons');
    var seasonsCondition = "season in ('" + seasons.join("','") + "')";
    var years = this.get('filterYears');
    var yearsCondition = "year in ('" + years.join("','") + "')";
    var layerSQL = "SELECT * FROM " + table + " WHERE " + seasonsCondition + " AND " + yearsCondition + "";

    console.log(layerSQL);

    window.cartodb.createLayer(map, {
      user_name: CrashEvents.cartoDb.user,
      type: CrashEvents.cartoDb.layerType,
      sublayers: [{
        sql: layerSQL,
        cartocss: '#' + table + ' {marker-fill: #B13B11;marker-fill-opacity: 0.15;marker-line-color: transparent;marker-allow-overlap: true;marker-width: 15;}'
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
