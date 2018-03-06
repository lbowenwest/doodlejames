function Menu() {
}

Menu.prototype = {
    preload: function () {
    },

    create: function () {
        this.camera.focusOnXY(this.world.centerX, this.world.centerY); 

        var startGame = function startGame() {
            this.state.start('play');
        };

        // var label = this.add.text(this.world.centerX, this.world.centerY - 100,
        //     "Doodle James",
        //     { font: "40px Arial", fill: "#F2F2F2" }
        // );
        // label.anchor.setTo(0.5);

        var points = this.add.sprite(this.world.centerX, this.world.centerY, 'points');
        points.anchor.setTo(0.5);

        
        var startBtn = this.add.button(
            this.world.centerX,
            this.world.y + this.world.height - 50,
            'startBtn',
            startGame,
            this
        );
        startBtn.anchor.set(0.5, 1);
    },

    update: function () {
    }
};

module.exports = Menu;
