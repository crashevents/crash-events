import Ember from 'ember';

export default Ember.Controller.extend({
  // seasons
  allSeasons: ['spring', 'summer', 'autumn', 'winter'],
  seasons: ['spring', 'summer', 'autumn', 'winter'],

  spring: true,
  summer: true,
  autumn: true,
  winter: true,

  updateSeasons: function() {
    // update array here
    var s = [];
    var self = this;
    this.allSeasons.forEach(function(item) {
      if (self.get(item) === true){ s.push(item); }
    });
    if (this.get('seasons').length !== s.length) {
      this.set('seasons', s);
    }
  },

  // years
  allYears: ['2009', '2010', '2011', '2012', '2013', '2014'],
  years: ['2009', '2010', '2011', '2012', '2013', '2014'],

  // years
  y2009: true,
  y2010: true,
  y2011: true,
  y2012: true,
  y2013: true,
  y2014: true,

  updateYears: function() {
    // update array here
    var y = [];
    var self = this;
    this.allYears.forEach(function(item) {
      if (self.get("y" + item) === true){ y.push(item); }
    });
    if (this.get('years').length !== y.length) {
      this.set('years', y);
    }
  },

  toggle: function(attr) {
    if(this.get(attr) === true) {
      this.set(attr, false);
    } else {
      this.set(attr, true);
    }
    this.updateSeasons();
    this.updateYears();
  },

  actions: {
    spring: function() {
      this.toggle('spring');
    },
    summer: function() {
      this.toggle('summer');
    },
    autumn: function() {
      this.toggle('autumn');
    },
    winter: function() {
      this.toggle('winter');
    },
    y2009: function() {
      this.toggle('y2009');
    },
    y2010: function() {
      this.toggle('y2010');
    },
    y2011: function() {
      this.toggle('y2011');
    },
    y2012: function() {
      this.toggle('y2012');
    },
    y2013: function() {
      this.toggle('y2013');
    },
    y2014: function() {
      this.toggle('y2014');
    }
  }
});
