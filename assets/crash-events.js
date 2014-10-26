eval("//# sourceURL=vendor/ember-cli/loader.js");

;eval("define(\"crash-events/app\", \n  [\"ember\",\"ember/resolver\",\"ember/load-initializers\",\"crash-events/config/environment\",\"exports\"],\n  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n    var Resolver = __dependency2__[\"default\"];\n    var loadInitializers = __dependency3__[\"default\"];\n    var config = __dependency4__[\"default\"];\n\n    Ember.MODEL_FACTORY_INJECTIONS = true;\n\n    var App = Ember.Application.extend({\n      modulePrefix: config.modulePrefix,\n      podModulePrefix: config.podModulePrefix,\n      Resolver: Resolver\n    });\n\n    loadInitializers(App, config.modulePrefix);\n\n    __exports__[\"default\"] = App;\n  });//# sourceURL=crash-events/app.js");

;eval("define(\"crash-events/components/crash-map\", \n  [\"ember\",\"exports\"],\n  function(__dependency1__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n\n    __exports__[\"default\"] = Ember.Component.extend({\n      classNames: [\'map crash-map\'],\n\n      _initializeMap: function() {\n        var map = this.createGoogleMap();\n        this.addCartoDbLayer(map, 0);\n      }.on(\'didInsertElement\'),\n\n      createGoogleMap: function() {\n        var map;\n        var mapOptions = {\n          zoom: CrashEvents.map.defaultZoom,\n          center: new window.google.maps.LatLng(\n            CrashEvents.map.baseLat,\n            CrashEvents.map.baseLng\n          )\n        };\n\n        map = new window.google.maps.Map(this.$().get(0), mapOptions);\n        return map;\n      },\n\n      addCartoDbLayer: function(map, position) {\n        var table = CrashEvents.cartoDb.tables.accidents;\n        var layerSQL = \"SELECT * FROM \" + table + \" \";\n\n        window.cartodb.createLayer(map, {\n          user_name: CrashEvents.cartoDb.user,\n          type: CrashEvents.cartoDb.layerType,\n          sublayers: [{\n            sql: layerSQL,\n            cartocss: \'#\' + table + \' {marker-fill: red;}\'\n          }]\n        })\n        .addTo(map, position)\n        .done(function(layer) {\n          console.log(\'>>> added cartodb layer\', layer);\n        })\n        .error(function(error) {\n          console.log(\'>>> problem creating cartodb layer:\', error);\n        });\n      }\n    });\n  });//# sourceURL=crash-events/components/crash-map.js");

;eval("define(\"crash-events/components/proto-map\", \n  [\"ember\",\"exports\"],\n  function(__dependency1__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n\n    __exports__[\"default\"] = Ember.Component.extend({\n      classNames: [\'map proto-map\'],\n\n      mapOptions: {\n        zoom: CrashEvents.map.defaultZoom,\n        center: new google.maps.LatLng(CrashEvents.map.baseLat, CrashEvents.map.baseLng)\n      },\n\n      _addCartoDbLayer: function(map) {\n        var layerSQL = \"SELECT * FROM \" + CrashEvents.cartoDb.tables.accidents + \"\";\n\n        window.cartodb.createLayer(map, {\n          user_name: CrashEvents.cartoDb.user,\n          type: CrashEvents.cartoDb.layerType,\n          sublayers: [{\n            sql: layerSQL,\n            cartocss: \'#\' + CrashEvents.cartoDb.tables.accidents + \' {marker-fill: red;}\'\n          }]\n        })\n        .addTo(map, 0)\n        .done(function(layer) {\n          console.log(\'added\', layer);\n        })\n          .error(function(error) {\n          console.log(error);\n          console.log(\'problem loading cartodb layer\');\n        });\n      },\n\n      _initializeMap: function() {\n        var map;\n        map = new google.maps.Map(this.$().get(0), this.mapOptions);\n        this._addCartoDbLayer(map);\n      }.on(\'didInsertElement\')\n    });\n  });//# sourceURL=crash-events/components/proto-map.js");

;eval("define(\"crash-events/controllers/index\", \n  [\"ember\",\"exports\"],\n  function(__dependency1__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n\n    __exports__[\"default\"] = Ember.Controller.extend({\n      actions: {\n        spring: function() {\n          console.log(\'spring\');\n        },\n        summer: function() {\n          console.log(\'summer\');\n        },\n        autumn: function() {\n          console.log(\'autumn\');\n        },\n        winter: function() {\n          console.log(\'winter\');\n        }\n      }\n    });\n  });//# sourceURL=crash-events/controllers/index.js");

;eval("define(\"crash-events/initializers/export-application-global\", \n  [\"ember\",\"crash-events/config/environment\",\"exports\"],\n  function(__dependency1__, __dependency2__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n    var config = __dependency2__[\"default\"];\n\n    function initialize(container, application) {\n      var classifiedName = Ember.String.classify(config.modulePrefix);\n\n      if (config.exportApplicationGlobal) {\n        window[classifiedName] = application;\n      }\n    };\n    __exports__.initialize = initialize;\n    __exports__[\"default\"] = {\n      name: \'export-application-global\',\n\n      initialize: initialize\n    };\n  });//# sourceURL=crash-events/initializers/export-application-global.js");

;eval("define(\"crash-events/router\", \n  [\"ember\",\"crash-events/config/environment\",\"exports\"],\n  function(__dependency1__, __dependency2__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n    var config = __dependency2__[\"default\"];\n\n    var Router = Ember.Router.extend({\n      location: config.locationType\n    });\n\n    Router.map(function() {\n      this.route(\'about\');\n      this.route(\'insights\');\n      this.route(\'maps\');\n    });\n\n    __exports__[\"default\"] = Router;\n  });//# sourceURL=crash-events/router.js");

;eval("define(\"crash-events/templates/about\", \n  [\"ember\",\"exports\"],\n  function(__dependency1__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n    __exports__[\"default\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\n    this.compilerInfo = [4,\'>= 1.0.0\'];\n    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n      \n\n\n      data.buffer.push(\"<h1>About</h1>\\n\\n<h2>Purpose</h2>\\n\\n<p>This application was developed during a\\n<a href=\\\"http://hack4reno.com/\\\" target=\\\"_blank\\\">hackathon event in Reno, NV</a>\\non October 25th, 2014.</p>\\n\\n<p>\\nThe reno.crash.report team came together at theHack4Reno event held at the\\nReno Collective on October 25th and 26th of 2014.\\n\\nThe team came together with the goal of utilizing accident data from the\\nReno Police Department to create a web application that can be used to\\nidentify areas of high accidents.\\nThe team collaborated, designed, and implemented this resource in less\\nthan two days.\\n</p>\\n\");\n      \n    });\n  });//# sourceURL=crash-events/templates/about.js");

;eval("define(\"crash-events/templates/application\", \n  [\"ember\",\"exports\"],\n  function(__dependency1__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n    __exports__[\"default\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\n    this.compilerInfo = [4,\'>= 1.0.0\'];\n    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n      var buffer = \'\', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;\n\n    function program1(depth0,data) {\n      \n      \n      data.buffer.push(\"Home\");\n      }\n\n    function program3(depth0,data) {\n      \n      \n      data.buffer.push(\"Maps\");\n      }\n\n    function program5(depth0,data) {\n      \n      \n      data.buffer.push(\"Insights\");\n      }\n\n    function program7(depth0,data) {\n      \n      \n      data.buffer.push(\"About\");\n      }\n\n      data.buffer.push(\"  <nav class=\\\"navbar\\\" role=\\\"navigation\\\">\\n    <div class=\\\"container\\\">\\n      <!-- Brand and toggle get grouped for better mobile display -->\\n      <div class=\\\"navbar-header\\\">\\n        <button type=\\\"button\\\" class=\\\"navbar-toggle collapsed\\\" data-toggle=\\\"collapse\\\" data-target=\\\"#bs-example-navbar-collapse-1\\\">\\n          <span class=\\\"sr-only\\\">Toggle navigation</span>\\n          <span class=\\\"icon-bar\\\"></span>\\n          <span class=\\\"icon-bar\\\"></span>\\n          <span class=\\\"icon-bar\\\"></span>\\n        </button>\\n  \\n        \");\n      stack1 = (helper = helpers[\'link-to\'] || (depth0 && depth0[\'link-to\']),options={hash:{\n        \'class\': (\"navbar-brand\")\n      },hashTypes:{\'class\': \"STRING\"},hashContexts:{\'class\': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:[\"STRING\"],data:data},helper ? helper.call(depth0, \"index\", options) : helperMissing.call(depth0, \"link-to\", \"index\", options));\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"\\n      </div>\\n  \\n      <!-- Collect the nav links, forms, and other content for toggling -->\\n      <div class=\\\"collapse navbar-collapse\\\" id=\\\"bs-example-navbar-collapse-1\\\">\\n        <ul class=\\\"nav navbar-nav navbar-right\\\">\\n          <li>\");\n      stack1 = (helper = helpers[\'link-to\'] || (depth0 && depth0[\'link-to\']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:[\"STRING\"],data:data},helper ? helper.call(depth0, \"maps\", options) : helperMissing.call(depth0, \"link-to\", \"maps\", options));\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"</li>\\n          <li>\");\n      stack1 = (helper = helpers[\'link-to\'] || (depth0 && depth0[\'link-to\']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:[\"STRING\"],data:data},helper ? helper.call(depth0, \"insights\", options) : helperMissing.call(depth0, \"link-to\", \"insights\", options));\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"</li>\\n          <li>\");\n      stack1 = (helper = helpers[\'link-to\'] || (depth0 && depth0[\'link-to\']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:[\"STRING\"],data:data},helper ? helper.call(depth0, \"about\", options) : helperMissing.call(depth0, \"link-to\", \"about\", options));\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"</li>\\n        </ul>\\n      </div><!-- /.navbar-collapse -->\\n    </div>\\n  </nav>\\n\\n  <div class=\\\"container-fluid\\\">\\n    \");\n      stack1 = helpers._triageMustache.call(depth0, \"outlet\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:[\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"\\n  </div>\\n  <footer class=\\\"footer\\\">\\n    <div class=\\\"container\\\">\\n      <p>Hello?? Hella narwhal Cosby sweater McSweeney\'s, salvia kitsch before they sold out High Life.</p>\\n    </div>\\n  </footer>\\n\");\n      return buffer;\n      \n    });\n  });//# sourceURL=crash-events/templates/application.js");

;eval("define(\"crash-events/templates/components/crash-map\", \n  [\"ember\",\"exports\"],\n  function(__dependency1__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n    __exports__[\"default\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\n    this.compilerInfo = [4,\'>= 1.0.0\'];\n    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n      var buffer = \'\', stack1;\n\n\n      stack1 = helpers._triageMustache.call(depth0, \"yield\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:[\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"\\n\");\n      return buffer;\n      \n    });\n  });//# sourceURL=crash-events/templates/components/crash-map.js");

;eval("define(\"crash-events/templates/components/proto-map\", \n  [\"ember\",\"exports\"],\n  function(__dependency1__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n    __exports__[\"default\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\n    this.compilerInfo = [4,\'>= 1.0.0\'];\n    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n      var buffer = \'\', stack1;\n\n\n      data.buffer.push(\"PROTO-MAP\\n\");\n      stack1 = helpers._triageMustache.call(depth0, \"yield\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:[\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"\\n\");\n      return buffer;\n      \n    });\n  });//# sourceURL=crash-events/templates/components/proto-map.js");

;eval("define(\"crash-events/templates/index\", \n  [\"ember\",\"exports\"],\n  function(__dependency1__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n    __exports__[\"default\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\n    this.compilerInfo = [4,\'>= 1.0.0\'];\n    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n      var buffer = \'\', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;\n\n    function program1(depth0,data) {\n      \n      \n      data.buffer.push(\"Try It\");\n      }\n\n    function program3(depth0,data) {\n      \n      \n      data.buffer.push(\"Check Out The Map\");\n      }\n\n      data.buffer.push(\"<div class=\\\"center-block logo-map homepage\\\">\\n  <img src=\\\"/images/homepage-logo.png\\\">\\n  <h1>Reno Crash Events</h1>\\n  <p>Find out when and where <br> accidents are likely to happen</p>\\n  <span class=\\\"cta-button\\\">\");\n      stack1 = (helper = helpers[\'link-to\'] || (depth0 && depth0[\'link-to\']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:[\"STRING\"],data:data},helper ? helper.call(depth0, \"maps\", options) : helperMissing.call(depth0, \"link-to\", \"maps\", options));\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"</span>\\n</div>\\n\\n<div class=\\\"row\\\">\\n	<div class=\\\"col-md-7\\\">\\n		<h2>Leveraging Data for Safe Driving</h2>\\n		<p>\\n		Accidents are no fun, dangerous, and heartbreaking, especially if they\\n		involve injuries.\\n\\n		Use the reno.crash.report to find safe routes and avoid areas where\\n		heavy accidents occur.\\n\\n		Use it to follow your drive to work to find trouble spots and avoid them or\\n		drive with heightened awareness.\\n\\n		Awareness of your surroundings is one of the keys to safe driving -- knowing\\n		where to take extra precaution and drive a little slower or increase\\n		the distance from the car in front of you.\\n		</p>\\n\\n		<p>\\n		There are many ways to leverage the this data for driving:\\n		</p>\\n		<ul>\\n		  <li>Trace your route to work</li>\\n		  <li>Find your child\'s school and browse the surrounding area</li>\\n		  <li>Follow frequently used routes</li>\\n		  <li>Find your home and look at the local area for trouble areas</li>\\n		  <li>Check the data for home locations of friends and family</li>\\n		</ul>\\n	</div>\\n	<div class=\\\"col-md-5 homepage-image\\\">\\n		<img src=\\\"/images/screenshot.png\\\">\\n	</div>\\n</div>\\n\\n<div class=\\\"row\\\">\\n	<div class=\\\"col-md-5 homepage-image\\\">\\n		<img src=\\\"/images/screenshot.png\\\">\\n	</div>\\n	<div class=\\\"col-md-7\\\">\\n		<h2>Built for Reno Citizens, By Reno Citizens</h2>\\n		<p>\\n		This resource was built by your fellow Reno-ites for your benefit!\\n\\n		Five technologists who attended the Hack4Reno event met (some for the\\n		first time) and formed the crash.report team.\\n\\n		The team consists designers, programmers, front-end developers,\\n		and IT professionals with a wide range of experience and skill sets.\\n\\n		Many in the local Reno technology industry are like-minded with the will\\n		to contribute and make a difference.\\n\\n		The efforts of thereno.crash.report team’s creative use of existing\\n		City of Reno data.\\n\\n		This was all made possible by the City of Reno’s efforts to open data\\n		for positive use for the benefit of Reno citizens.\\n		</p>\\n\\n		<p>\\n		The Mayor of Reno signed a proclamation declaring Hack4Reno a 2-day\\n		civic \\\"hack-a-thon\\\" event held at the Reno Collective on\\n		October 25th and 26th of 2014.\\n\\n		The City of Reno is driving the open government initiative to put data\\n		in the hands of local citizens that can put the information to beneficial use.\\n\\n		We are proud to contribute to this noble effort.\\n		</p>\\n	</div>\\n</div>\\n<div class=\\\"cta-button\\\">\");\n      stack1 = (helper = helpers[\'link-to\'] || (depth0 && depth0[\'link-to\']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:[\"STRING\"],data:data},helper ? helper.call(depth0, \"maps\", options) : helperMissing.call(depth0, \"link-to\", \"maps\", options));\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"</div>\\n\\n\");\n      return buffer;\n      \n    });\n  });//# sourceURL=crash-events/templates/index.js");

;eval("define(\"crash-events/templates/insights\", \n  [\"ember\",\"exports\"],\n  function(__dependency1__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n    __exports__[\"default\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\n    this.compilerInfo = [4,\'>= 1.0.0\'];\n    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n      \n\n\n      data.buffer.push(\"<h1>Insights</h1>\\n\\n<p>Here are some key insights that were discovered during data exploration:</p>\\n\\n<section>\\n  <h2>Accident Frequency</h2>\\n</section>\\n\\n<section>\\n  <h2>Notable Intersections</h2>\\n</section>\\n\\n<section>\\n  <h2>Seasonal Correlation</h2>\\n</section>\\n\");\n      \n    });\n  });//# sourceURL=crash-events/templates/insights.js");

;eval("define(\"crash-events/templates/maps\", \n  [\"ember\",\"exports\"],\n  function(__dependency1__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n    __exports__[\"default\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\n    this.compilerInfo = [4,\'>= 1.0.0\'];\n    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n      var buffer = \'\', stack1;\n\n\n      data.buffer.push(\"<div class=\\\"center-block logo-map\\\">\\n  <img src=\\\"/images/logo.png\\\">\\n  <h1>Reno Crash Events</h1>\\n</div>\\n<div class=\\\"row\\\">\\n  <div class=\\\"row\\\">\\n    <div class=\\\"col-md-12 range-container\\\">\\n      <span aria-hidden=\\\"true\\\" class=\\\"icon calendar\\\"></span>\\n      <p class=\\\"label-text range\\\">Range: 2009 - 2014</p>\\n    </div>\\n  </div>\\n  <div class=\\\"col-md-10\\\">\\n    \");\n      stack1 = helpers._triageMustache.call(depth0, \"crash-map\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:[\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"\\n  </div>\\n  <div class=\\\"col-md-2\\\">\\n    <p class=\\\"label-text\\\">Seasons: All</p>\\n    <ul class=\\\"seasons\\\">\\n      <li class=\\\"season\\\"><a href=\\\"#\\\"><img src=\\\"/images/icons/flower.svg\\\" alt=\\\"Spring\\\"></a></li>\\n      <li class=\\\"season\\\"><a href=\\\"#\\\"><img src=\\\"/images/icons/sun.svg\\\" alt=\\\"Summer\\\"></a></li>\\n      <li class=\\\"season\\\"><a href=\\\"#\\\"><img src=\\\"/images/icons/leaf.svg\\\" alt=\\\"Fall\\\"></a></li>\\n      <li class=\\\"season\\\"><a href=\\\"#\\\"><img src=\\\"/images/icons/snow.svg\\\" alt=\\\"Winter\\\"></a></li>\\n    </ul>\\n  </div>\\n</div>\\n\\n<div class=\\\"row\\\">\\n  <ul class=\\\"date-range-controls\\\">\\n    <li>2009</li>\\n    <li>2010</li>\\n    <li>2011</li>\\n    <li>2012</li>\\n    <li>2013</li>\\n    <li>2014</li>\\n  </ul>\\n</div>\\n\\n<div class=\\\"row\\\">\\n  <div class=\\\"col-md-12\\\">\\n    <div class=\\\"pull-left\\\">\\n      <p class=\\\"label-text\\\">Filter By:</p>\\n      <div class=\\\"radio\\\">\\n        <label>\\n          <input type=\\\"radio\\\" name=\\\"optionsRadios\\\" id=\\\"optionsRadios1\\\" value=\\\"option1\\\" checked>\\n          Year\\n        </label>\\n      </div>\\n      <div class=\\\"radio\\\">\\n        <label>\\n          <input type=\\\"radio\\\" name=\\\"optionsRadios\\\" id=\\\"optionsRadios2\\\" value=\\\"option2\\\">\\n          Month\\n        </label>\\n      </div>\\n    </div>\\n  </div>\\n</div>\\n\\n<div class=\\\"row\\\">\\n  <div class=\\\"col-md-8\\\">\\n    <h2>What is this data?</h2>\\n\\n    <p>\\n    The data used in the reno.crash.report project comes from the Reno\\n    Police Department in conjunction with the Hack4Reno annual event.\\n\\n    The City of Reno supported the Hack4Reno through open government\\n    initiatives that puts city data in the hands of able civic minded\\n    technologists, designers, programmers, IT professionals and others to\\n    create productive resources.\\n    </p>\\n\\n    <p>\\n    The data set for this project includes 5 years historical accident\\n    data with address, gps location and date. The years of historical data\\n    are important and used to visually identify high accident areas on an\\n    interactive map.\\n    </p>\\n\\n    <h2>Why did we make this?</h2>\\n\\n    <p>\\n    In one word: <strong>Safety</strong>.\\n\\n    The intention of the reno.crash.report resource is to enable\\n    citizens and city stakeholders with a means to identify heavy\\n    accident areas and take appropriate action.\\n\\n    The reno.crash.report enables people to look at areas they plan to\\n    travel through to see if there are any instances of heavy accidents.\\n\\n    It also allows officials to identify areas of heavy accidents so that\\n    they can take appropriate action.\\n    </p>\\n\\n    <p>\\n    Areas with heavy accidents and avoided or extra caution can be taken.\\n    Enabling citizens to make safer decisions benefits the community as\\n    a whole.\\n    </p>\\n\\n  </div>\\n</div>\\n\");\n      return buffer;\n      \n    });\n  });//# sourceURL=crash-events/templates/maps.js");

;eval("define(\"crash-events/tests/app.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - .\');\n    test(\'app.js should pass jshint\', function() { \n      ok(true, \'app.js should pass jshint.\'); \n    });\n  });//# sourceURL=crash-events/tests/app.jshint.js");

;eval("define(\"crash-events/tests/components/crash-map.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - components\');\n    test(\'components/crash-map.js should pass jshint\', function() { \n      ok(false, \'components/crash-map.js should pass jshint.\\ncomponents/crash-map.js: line 14, col 13, \\\'CrashEvents\\\' is not defined.\\ncomponents/crash-map.js: line 16, col 9, \\\'CrashEvents\\\' is not defined.\\ncomponents/crash-map.js: line 17, col 9, \\\'CrashEvents\\\' is not defined.\\ncomponents/crash-map.js: line 26, col 17, \\\'CrashEvents\\\' is not defined.\\ncomponents/crash-map.js: line 30, col 18, \\\'CrashEvents\\\' is not defined.\\ncomponents/crash-map.js: line 31, col 13, \\\'CrashEvents\\\' is not defined.\\n\\n6 errors\'); \n    });\n  });//# sourceURL=crash-events/tests/components/crash-map.jshint.js");

;eval("define(\"crash-events/tests/components/proto-map.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - components\');\n    test(\'components/proto-map.js should pass jshint\', function() { \n      ok(false, \'components/proto-map.js should pass jshint.\\ncomponents/proto-map.js: line 7, col 11, \\\'CrashEvents\\\' is not defined.\\ncomponents/proto-map.js: line 8, col 17, \\\'google\\\' is not defined.\\ncomponents/proto-map.js: line 8, col 36, \\\'CrashEvents\\\' is not defined.\\ncomponents/proto-map.js: line 8, col 61, \\\'CrashEvents\\\' is not defined.\\ncomponents/proto-map.js: line 12, col 39, \\\'CrashEvents\\\' is not defined.\\ncomponents/proto-map.js: line 15, col 18, \\\'CrashEvents\\\' is not defined.\\ncomponents/proto-map.js: line 16, col 13, \\\'CrashEvents\\\' is not defined.\\ncomponents/proto-map.js: line 19, col 25, \\\'CrashEvents\\\' is not defined.\\ncomponents/proto-map.js: line 34, col 15, \\\'google\\\' is not defined.\\n\\n9 errors\'); \n    });\n  });//# sourceURL=crash-events/tests/components/proto-map.jshint.js");

;eval("define(\"crash-events/tests/controllers/index.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - controllers\');\n    test(\'controllers/index.js should pass jshint\', function() { \n      ok(true, \'controllers/index.js should pass jshint.\'); \n    });\n  });//# sourceURL=crash-events/tests/controllers/index.jshint.js");

;eval("define(\"crash-events/tests/crash-events/tests/helpers/resolver.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - crash-events/tests/helpers\');\n    test(\'crash-events/tests/helpers/resolver.js should pass jshint\', function() { \n      ok(true, \'crash-events/tests/helpers/resolver.js should pass jshint.\'); \n    });\n  });//# sourceURL=crash-events/tests/crash-events/tests/helpers/resolver.jshint.js");

;eval("define(\"crash-events/tests/crash-events/tests/helpers/start-app.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - crash-events/tests/helpers\');\n    test(\'crash-events/tests/helpers/start-app.js should pass jshint\', function() { \n      ok(true, \'crash-events/tests/helpers/start-app.js should pass jshint.\'); \n    });\n  });//# sourceURL=crash-events/tests/crash-events/tests/helpers/start-app.jshint.js");

;eval("define(\"crash-events/tests/crash-events/tests/test-helper.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - crash-events/tests\');\n    test(\'crash-events/tests/test-helper.js should pass jshint\', function() { \n      ok(true, \'crash-events/tests/test-helper.js should pass jshint.\'); \n    });\n  });//# sourceURL=crash-events/tests/crash-events/tests/test-helper.jshint.js");

;eval("define(\"crash-events/tests/crash-events/tests/unit/components/crash-map-test.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - crash-events/tests/unit/components\');\n    test(\'crash-events/tests/unit/components/crash-map-test.js should pass jshint\', function() { \n      ok(true, \'crash-events/tests/unit/components/crash-map-test.js should pass jshint.\'); \n    });\n  });//# sourceURL=crash-events/tests/crash-events/tests/unit/components/crash-map-test.jshint.js");

;eval("define(\"crash-events/tests/crash-events/tests/unit/components/proto-map-test.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - crash-events/tests/unit/components\');\n    test(\'crash-events/tests/unit/components/proto-map-test.js should pass jshint\', function() { \n      ok(true, \'crash-events/tests/unit/components/proto-map-test.js should pass jshint.\'); \n    });\n  });//# sourceURL=crash-events/tests/crash-events/tests/unit/components/proto-map-test.jshint.js");

;eval("define(\"crash-events/tests/crash-events/tests/unit/controllers/index-test.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - crash-events/tests/unit/controllers\');\n    test(\'crash-events/tests/unit/controllers/index-test.js should pass jshint\', function() { \n      ok(true, \'crash-events/tests/unit/controllers/index-test.js should pass jshint.\'); \n    });\n  });//# sourceURL=crash-events/tests/crash-events/tests/unit/controllers/index-test.jshint.js");

;eval("define(\"crash-events/tests/helpers/resolver\", \n  [\"ember/resolver\",\"crash-events/config/environment\",\"exports\"],\n  function(__dependency1__, __dependency2__, __exports__) {\n    \"use strict\";\n    var Resolver = __dependency1__[\"default\"];\n    var config = __dependency2__[\"default\"];\n\n    var resolver = Resolver.create();\n\n    resolver.namespace = {\n      modulePrefix: config.modulePrefix,\n      podModulePrefix: config.podModulePrefix\n    };\n\n    __exports__[\"default\"] = resolver;\n  });//# sourceURL=crash-events/tests/helpers/resolver.js");

;eval("define(\"crash-events/tests/helpers/start-app\", \n  [\"ember\",\"crash-events/app\",\"crash-events/router\",\"crash-events/config/environment\",\"exports\"],\n  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n    var Application = __dependency2__[\"default\"];\n    var Router = __dependency3__[\"default\"];\n    var config = __dependency4__[\"default\"];\n\n    __exports__[\"default\"] = function startApp(attrs) {\n      var App;\n\n      var attributes = Ember.merge({}, config.APP);\n      attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;\n\n      Router.reopen({\n        location: \'none\'\n      });\n\n      Ember.run(function() {\n        App = Application.create(attributes);\n        App.setupForTesting();\n        App.injectTestHelpers();\n      });\n\n      App.reset(); // this shouldn\'t be needed, i want to be able to \"start an app at a specific URL\"\n\n      return App;\n    }\n  });//# sourceURL=crash-events/tests/helpers/start-app.js");

;eval("define(\"crash-events/tests/router.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - .\');\n    test(\'router.js should pass jshint\', function() { \n      ok(true, \'router.js should pass jshint.\'); \n    });\n  });//# sourceURL=crash-events/tests/router.jshint.js");

;eval("define(\"crash-events/tests/test-helper\", \n  [\"crash-events/tests/helpers/resolver\",\"ember-qunit\"],\n  function(__dependency1__, __dependency2__) {\n    \"use strict\";\n    var resolver = __dependency1__[\"default\"];\n    var setResolver = __dependency2__.setResolver;\n\n    setResolver(resolver);\n\n    document.write(\'<div id=\"ember-testing-container\"><div id=\"ember-testing\"></div></div>\');\n\n    QUnit.config.urlConfig.push({ id: \'nocontainer\', label: \'Hide container\'});\n    var containerVisibility = QUnit.urlParams.nocontainer ? \'hidden\' : \'visible\';\n    document.getElementById(\'ember-testing-container\').style.visibility = containerVisibility;\n  });//# sourceURL=crash-events/tests/test-helper.js");

;eval("define(\"crash-events/tests/unit/components/crash-map-test\", \n  [\"ember-qunit\"],\n  function(__dependency1__) {\n    \"use strict\";\n    var moduleForComponent = __dependency1__.moduleForComponent;\n    var test = __dependency1__.test;\n\n    moduleForComponent(\'crash-map\', \'CrashMapComponent\', {\n      // specify the other units that are required for this test\n      // needs: [\'component:foo\', \'helper:bar\']\n    });\n\n    test(\'it renders\', function() {\n      expect(2);\n\n      // creates the component instance\n      var component = this.subject();\n      equal(component._state, \'preRender\');\n\n      // appends the component to the page\n      this.append();\n      equal(component._state, \'inDOM\');\n    });\n  });//# sourceURL=crash-events/tests/unit/components/crash-map-test.js");

;eval("define(\"crash-events/tests/unit/components/proto-map-test\", \n  [\"ember-qunit\"],\n  function(__dependency1__) {\n    \"use strict\";\n    var moduleForComponent = __dependency1__.moduleForComponent;\n    var test = __dependency1__.test;\n\n    moduleForComponent(\'proto-map\', \'ProtoMapComponent\', {\n      // specify the other units that are required for this test\n      // needs: [\'component:foo\', \'helper:bar\']\n    });\n\n    test(\'it renders\', function() {\n      expect(2);\n\n      // creates the component instance\n      var component = this.subject();\n      equal(component._state, \'preRender\');\n\n      // appends the component to the page\n      this.append();\n      equal(component._state, \'inDOM\');\n    });\n  });//# sourceURL=crash-events/tests/unit/components/proto-map-test.js");

;eval("define(\"crash-events/tests/unit/controllers/index-test\", \n  [\"ember-qunit\"],\n  function(__dependency1__) {\n    \"use strict\";\n    var moduleFor = __dependency1__.moduleFor;\n    var test = __dependency1__.test;\n\n    moduleFor(\'controller:index\', \'IndexController\', {\n      // Specify the other units that are required for this test.\n      // needs: [\'controller:foo\']\n    });\n\n    // Replace this with your real tests.\n    test(\'it exists\', function() {\n      var controller = this.subject();\n      ok(controller);\n    });\n  });//# sourceURL=crash-events/tests/unit/controllers/index-test.js");

/* jshint ignore:start */

define('crash-events/config/environment', ['ember'], function(Ember) {
  var prefix = 'crash-events';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */


});

if (runningTests) {
  require('crash-events/tests/test-helper');
} else {
  require('crash-events/app')['default'].create({"map":{"baseLat":39.5272,"baseLng":-119.8219,"defaultZoom":13},"cartoDb":{"user":"ledbelly2142","layerType":"cartodb","tables":{"accidents":"public.reno_traffice_accidents_xls_005wgs84"}},"LOG_ACTIVE_GENERATION":true,"LOG_VIEW_LOOKUPS":true});
}

/* jshint ignore:end */
