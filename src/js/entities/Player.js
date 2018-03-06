
function Player(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'player');
    game.physics.arcade.enable(this);
    game.add.existing(this);

    this.anchor.setTo(0.5);
    this.cursors = game.input.keyboard.createCursorKeys();
    this.heading_left = false;

    this.acceleration_abs = 750;
    this.deceleration_abs = 250;
    this.jump_velocity = 600;

    this.body.gravity.y = 500;

    this.body.maxVelocityX = 500;
    this.body.maxVelocityY = 1000;

    this.world_bounds = this.game.world.bounds;
    this.checkWorldBounds = true;
    this.events.onOutOfBounds.add(this.outOfBounds, this);

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;


Player.prototype.update = function() {

    // if holding an arrow key, accelerate in that direction, else slow down
    if (this.cursors.left.isDown) {
        this.goLeft();
    } else if (this.cursors.right.isDown) {
        this.goRight();
    } else {
        this.slowDown();
    }
    
    // check pointer so works on mobile
    if (this.game.input.pointer1.isDown) {
        var LEFT = 0, RIGHT = 1;
        // console.log(this.game.input.x / (this.world_bounds.width));
        if (Math.round(this.game.input.x / this.world_bounds.width) == LEFT)
            this.goLeft();
        else if (Math.round(this.game.input.x / this.world_bounds.width) == RIGHT)
            this.goRight();
    };

    // flip the sprite so we look left when heading left
    if (this.heading_left) { this.scale.x = -Math.abs(this.scale.x); } 
    else { this.scale.x = Math.abs(this.scale.x); }

};

Player.prototype.goLeft = function(accel) {
    accel = typeof(accel) == "undefined" ? this.acceleration_abs : accel;
    this.body.acceleration.x = -accel;
    this.heading_left = true;
};

Player.prototype.goRight = function(accel) {
    accel = typeof(accel) == "undefined" ? this.acceleration_abs : accel;
    this.body.acceleration.x = accel;
    this.heading_left = false;
};

Player.prototype.slowDown = function(decel) {
    decel = typeof(decel) == "undefined" ? this.deceleration_abs : decel;
    if (this.body.velocity.x > 0) 
        this.body.acceleration.x = -decel;
    else
        this.body.acceleration.x = decel;
};

Player.prototype.jump = function(v) {
    v = typeof(v) == "undefined" ? this.jump_velocity : v;
    this.body.velocity.y = -v;
}

Player.prototype.outOfBounds = function() {
    // we fell down
    if (this.y > this.world_bounds.y + this.world_bounds.height) {
        this.game.globals.score = Math.floor(Math.abs(this.world_bounds.y));
        // console.log("Score: ", this.game.globals.score);
        this.game.state.start('gameover', true);
    };

    // went off the side swap to the other
    if (this.x > this.world_bounds.x + this.world_bounds.width) {
        this.x = this.world_bounds.x - this.width/2;
    } else if (this.x < this.world_bounds.x) {
        this.x = this.world_bounds.x + this.world_bounds.width - this.width/2;
    }

};

module.exports = Player;
