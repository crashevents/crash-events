import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    spring: function() {
      console.log('spring');
    },
    summer: function() {
      console.log('summer');
    },
    autumn: function() {
      console.log('autumn');
    },
    winter: function() {
      console.log('winter');
    }
  }
});
