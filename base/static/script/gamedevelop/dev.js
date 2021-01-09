var DragLetters = function (document, canvas, word) {

  this.canvas   = canvas;
  this.context  = canvas.getContext('2d');
  this.word     = word;
  // each element that is drawed on game, like a scenario or a enemy or the hero.
  this.animation = new Animation(this.context);
  this.collision = new Collision();

  this.preparar();

}

DragLetters.prototype = {

  "preparar": function() {
    // load and draw image from Word.
    this.addObject(new WordImage(this.word.imgSrc, this.context, this));

    // Hero
    hero = new Hero(this.context, new Keyboard(document), this.animation);
    this.addObject(hero);
    this.collision.newSprite(hero);

    // Letter
    letter = new Letter(this.context, this.animation);
    this.addObject(letter);
    this.collision.newSprite(letter);

    this.animation.newProcessing(this.collision);
  },

  "addObject": function(object) {
    this.animation.addSprite(object);
    if (object.hasImageToLoad) object.loadImage();
  },

  imageLoaded: function() {
    this.animation.turnOn();
  },

  pause: function() {},
  over: function() {},
}
