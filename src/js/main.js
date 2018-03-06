var firebase = require("firebase/app");
require('firebase/database');

var _ = require('lodash');

// Initialize Firebase
var firebaseConfig = require('./configurations/firebase');
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var leaderboard = require('./leaderboard');

var gameConfig = require('./configurations/game');

window.onload = function(){
    'use strict';

    if (document.getElementById('game')) {
      var game = new Phaser.Game(gameConfig.width, gameConfig.height, Phaser.AUTO, 'game');

      game.globals = { score: 0 };

      game.state.add('boot', require('./states/Boot'));
      game.state.add('menu', require('./states/Menu'));
      game.state.add('play', require('./states/Play'));
      game.state.add('preload', require('./states/Preload'));
      game.state.add('gameover', require('./states/GameOver'));

      game.state.start('boot');    
    }

    if (document.getElementById('leaderboard')) {
      var data;
      database.ref('scores/').limitToLast(10).once('value').then(function(snap) {
        data = _.orderBy(snap.val(), [function(o) {return o.score; }], ['desc']);
        console.log(data);
      }, data);
    }
};
