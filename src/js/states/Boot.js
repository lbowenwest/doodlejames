function Boot() {}

Boot.prototype = {
    preload: function () {
    },

    create: function () {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.windowConstraints = "layout";
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;

        this.game.stage.backgroundColor = 0x4c95b5;
      
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.state.start('preload');
    },
    
    update: function () {
    }
};

module.exports = Boot;
