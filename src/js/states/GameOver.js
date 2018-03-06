
var firebase = require("firebase");
var database = firebase.database();

function GameOver() {}

var writeScore = function(name, score) {
    var newRef = database.ref('scores').push({
        name: name,
        score: score
    });
    newRef.setPriority(-score);
};

GameOver.prototype = {

    submitted: false,

    create: function () {
        this.world.x = 0, this.world.y = 0;
        this.camera.focusOnXY(this.world.centerX, this.world.centerY);
        var gameOverLabel = this.add.text(
            this.world.centerX, this.world.centerY - 200, 
            "GAME OVER", 
            { font: "50px Arial", fill: "#F2F2F2" }
        );
        gameOverLabel.anchor.setTo(0.5);

        var scoreLabel = this.add.text(
            this.world.centerX, this.world.centerY + 50,
            "Score: " + this.game.globals.score,
            { font: "40px Arial", fill: "#F2F2F2" }
        );
        scoreLabel.anchor.setTo(0.5);


        var uploadScore = function() {
            console.log(this.game.globals.score);
            if (this.submitted) {
                alert("You've already submitted your score!");
                gameOverLabel.setText("NICE TRY!");
                return;
            }
            var name = prompt("Please enter your name...", "Name");
            if (name && !this.submitted) {
                writeScore(name, this.game.globals.score);
                gameOverLabel.setText("THANK YOU!");
                this.submitted = true;
            }
        };

        var uploadButton = this.add.button(
            this.world.centerX,
            this.world.centerY + 150,
            'uploadBtn',
            uploadScore,
            this
        );

        var restart = function() {
            this.state.start('play', true);
        };

        var restartBtn = this.add.button(
            this.world.centerX - 150, this.world.centerY + 150,
            'restartBtn',
            restart,
            this
        );
    },

    update: function () {

    },

};

module.exports = GameOver;
