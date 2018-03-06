
const Player = require("../entities/Player");

function Enemy(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'wingman1');
    game.physics.arcade.enable(this);
    game.add.existing(this);

    this.anchor.setTo(0.5);
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {

};

function Play() {}

Play.prototype = {
    
    default_chunk_height: 2000,
    default_broken_chance: 0.3,

    highest_chunk: 0,
    player: {},
    platforms: {},    
    camera_target: {},


    create: function () {
        this.highest_chunk = 0;

        this.camera_target = this.add.sprite(0, 0);
        this.camera.bounds = null;
        this.camera.follow(this.camera_target);
        this.world.bounds.centerOn(this.camera_target.x, this.camera_target.y);

        var sky = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'sky');
        sky.fixedToCamera = true;

        var clouds = this.add.sprite(this.camera_target.x, this.camera_target.y, 'clouds');
        clouds.anchor.setTo(0.5, 0);
        clouds.fixedToCamera = true;
        
        this.platforms = this.add.group();
        this.platforms.enableBody = true;

        this.player = new Player(this.game, 0, 0);

        this.initWorld();

    },
    
    update: function () {
        this.world.bounds.centerOn(this.camera_target.x, this.camera_target.y);

        this.physics.arcade.overlap(this.player, this.platforms, function(player, platform) {
            var onPlatform = Math.abs((player.y + player.height/2) - platform.y) < 5;
            if (player.body.velocity.y > 0 && onPlatform) {
                player.jump();
                if (platform.broken) platform.kill();
            }
        }, null, this);

        if (this.player.y < this.camera_target.y + this.camera.height/3) {
            this.camera_target.y = Math.min(this.player.y, this.camera_target.y);
        }

        if (this.camera_target.y - this.world.height < this.highest_chunk)
            this.createChunk(this.highest_chunk);


    },

    render: function() {
        // this.game.debug.pointer(this.input.pointer3);
    },

    initWorld: function () {
        this.createPlatform(0, 200);
        this.createChunk(this.world.centerY, this.default_chunk_height, 0);
    },

    createPlatform: function(x, y, broken = false) {
        var image;
        if (broken) {
            image = 'ground_grass_broken';
        } else {
            image = 'ground_grass';
        }
        var platform = this.platforms.create(x, y, image);
        platform.broken = broken;
        
        platform.anchor.setTo(0.5, 0);
        platform.checkWorldBounds = true;
        platform.events.onOutOfBounds.add(function(platform) {
            var bounds = platform.game.world.bounds;
            if (platform.y > bounds.y + bounds.height) {
                platform.kill();
            }
        });
        return platform;
    },

    createChunk: function(start, height, broken_chance) {
        // console.log("Creating chunk at: ", start);
        height = typeof(height) == "undefined" ? this.default_chunk_height : height;
        broken_chance = typeof(broken_chance) == "undefined" ? this.default_broken_chance: broken_chance;
        for (var y = start; y > start - height; y -= this.rnd.integerInRange(100, 325)) {
            var x = this.rnd.integerInRange(-this.world.width/2, this.world.width/2);
            if (this.rnd.frac() < broken_chance) {
                this.createPlatform(x, y, true);
            } else {
                this.createPlatform(x, y, false);
            }
        }
        this.highest_chunk = Math.min(y, this.highest_chunk);
    },
};

module.exports = Play;
