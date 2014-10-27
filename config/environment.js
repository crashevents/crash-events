/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'crash-events',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      map: {
        baseLat: 39.5272,
        baseLng: -119.8219,
        defaultZoom: 13
      },
      cartoDb: {
        user: 'ledbelly2142',
        layerType: 'cartodb',
        tables: {
          accidents: 'public.reno_traffice_accidents_xls_005wgs84'
        }
      }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
    // Set content security policy for local dev
    ENV.contentSecurityPolicy = {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-eval' 'unsafe-inline' *.cartodb.com *.cartocdn.com *.google.com *.google-analytics.com *.gstatic.com *.googleapis.com *.googleusercontent.com",
      'font-src': "'self' *.google.com *.gstatic.com *.googleapis.com *.googleusercontent.com *.bootstrapcdn.com",
      'connect-src': "'self'",
      'img-src': "'self' data: *.fastly.net cartodb.s3.amazonaws.com *.cartodb.com *.cartocdn.com *.google.com *.google-analytics.com *.gstatic.com *.googleapis.com *.googleusercontent.com",
      'style-src': "'self' 'unsafe-inline' *.cartocdn.com *.google.com *.gstatic.com *.googleapis.com *.googleusercontent.com *.bootstrapcdn.com",
      'media-src': "'self'"
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'auto';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
  }

  return ENV;
};
