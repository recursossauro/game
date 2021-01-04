var DragLetters = function (document, canvas, word) {

  this.canvas   = canvas;
  this.context  = canvas.getContext('2d');
  this.word     = word;
  // each element that is drawed on game, like a scenario or a enemy or the hero.
  this.animation = new Animation(this.context);

  this.preparar();

}

DragLetters.prototype = {

  "preparar": function() {
    // load and draw image from Word.
    this.addObject(new WordImage(this.word.imgSrc, this.context, this));
    this.addObject(new Hero(this.context, new Keyboard(document), this.animation));
  },

  "addObject": function(object) {
    this.animation.addSprite(object);
    if (!object.isImageLoaded) object.loadImage();
  },

  imageLoaded: function() {
    this.animation.turnOn();
  },

  pause: function() {},
  over: function() {},
}
