var firebase = require('firebase/app');
var _ = require('lodash');

var database = firebase.database();


var getData = function() {
  var data;
  database.ref('scores/').limitToLast(10).once('value').then(function(snap) {
    var data = _.orderBy(snap.val(), [function(o) {return o.score; }], ['desc']);
  });
  return data;
}

module.exports = {
  getData: getData
};
