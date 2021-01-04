var Animation = function(context) {
  this.ctx = context;
  this.sprites = [];
  this.spritesDelete = [];
  this.on = false;
  this.lastCicle = 0;
  this.elapsed   = 0;
}

Animation.prototype = {
  addSprite: function(sprite) {
    this.sprites.push(sprite);
  },

  turnOn: function() {
    this.on = true;
    this.lastCicle = 0;
    this.next();
  },

  turnOff: function() {
    this.on = false;
  },

  next: function() {

    if ( ! this.on ) return;

    var now = new Date().getTime();
    if (this.lastCicle == 0) this.lastCicle = now;
    this.elapsed = now - this.lastCicle;

    // Update sprites
    for (var i in this.sprites)
      this.sprites[i].update();

    // Draw sprites
    for (var i in this.sprites)
      this.sprites[i].draw();

    // Update the time of next cicle.
    this.lastCicle = now;

    // We call the next cicle.
    var animation = this;
    requestAnimationFrame(function() {
      animation.next();
    });
  },
}
