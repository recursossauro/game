var Animation = function(context) {
  this.ctx = context;
  this.sprites = [];
  this.spritesDelete = [];
  this.processings = [];
  this.processingsDelete = [];
  this.on = false;
  this.lastCicle = 0;
  this.elapsed   = 0;
  this.message = '';
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

    // Generals processing
    for (var i in this.processings)
       this.processings[i].process();

    // deletion processing
    this.processDeletings();

    if (this.message) {
      this.ctx.fillStyle = 'red';
      this.ctx.font = "25px comic";
      this.ctx.fillText(this.message, 0, 20);
    }

    // Update the time of next cicle.
    this.lastCicle = now;

    // We call the next cicle.
    var animation = this;
    requestAnimationFrame(function() {
      animation.next();
    });
  },

  newProcessing: function(processing) {

    this.processings.push(processing);
    processing.animation = this;
  },

  deleteSprite: function(sprite) {
     this.spritesDelete.push(sprite);
  },

  deleteProcessing: function(processing) {
     this.processingsDelete.push(processing);
  },

  processDeletings: function() {
     // Create new arrays
     var newSprites = [];
     var newProcessings = [];

     // Add if it is not on deleted array.
     for (var i in this.sprites) {
        if (this.spritesDelete.indexOf(this.sprites[i]) == -1)
           newSprites.push(this.sprites[i]);
     }

     for (var i in this.processings) {
        if (this.processingsDelete.indexOf(this.processings[i])
            == -1)
           newProcessings.push(this.processings[i]);
     }

     // Limpar os arrays de exclusões
     this.spritesDelete = [];
     this.processingsDelete = [];

     // Substituir os arrays velhos pelos novos
     this.sprites = newSprites;
     this.processings = newProcessings;
  }
}
