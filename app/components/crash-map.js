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
    var seasonsCondition = "a.season in ('" + seasons.join("','") + "')";
    var years = this.get('filterYears');
    var yearsCondition = "a.year in ('" + years.join("','") + "')";
    var layerSQL = "SELECT * FROM " + table + " a WHERE " + seasonsCondition + " AND " + yearsCondition + "";

    // example query to limit points, with totals within DWithin (meters?)
    //    var layerSQL = "SELECT a.the_geom, a.year, a.season, count(a.*) as accidents, a.the_geom_webmercator FROM " + "public." + table + " AS a, " + "public." + table + " AS b WHERE ST_DWithin(a.the_geom, b.the_geom,100) AND (" + seasonsCondition + ") AND (" + yearsCondition + ") GROUP BY a.the_geom_webmercator, a.the_geom, a.year, a.season " + "";

    //console.log(layerSQL);

    var alias = "foo";
    var layerCSS = "#" + alias + "{marker-fill:#fff;marker-fill-opacity:0.40;marker-line-color:transparent;marker-allow-overlap:true;marker-width:12;marker-comp-op:soft-light;}";
    layerCSS = layerCSS + "#" + alias + "[season='spring']{marker-fill:#70B69C;}";
    layerCSS = layerCSS + "#" + alias + "[season='summer']{marker-fill:#EAEF54;}";
    layerCSS = layerCSS + "#" + alias + "[season='autumn']{marker-fill:#997A65;}";
    layerCSS = layerCSS + "#" + alias + "[season='winter']{marker-fill:#56A1EC;}";

    //console.log(layerCSS);

    window.cartodb.createLayer(map, {
      user_name: CrashEvents.cartoDb.user,
      type: CrashEvents.cartoDb.layerType,
      sublayers: [{
        sql: layerSQL,
        cartocss: layerCSS
      }]
    })
    .addTo(map, position)
    .done(function(layer) {
      // console.log('>>> added cartodb layer', layer);
    })
    .error(function(error) {
      console.log('>>> problem creating cartodb layer:', error);
    });
  }
});
