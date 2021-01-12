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


    for (i in this.word.text) {
      // target
      target = new Target(this.context, this.animation, this.word.text[i], this.word.target[i]!='@', this.acertou);
      position = this.canvas.width/2 - this.word.target.length * (target.width+3)/2;
      target.x = (target.width+3) * i + position;
      target.y = 10;
      this.addObject(target);
      this.collision.newSprite(target);
    }


    // Hero
    hero = new Hero(this.context, new Keyboard(document), this.animation);
    this.addObject(hero);
    this.collision.newSprite(hero);

    // Letter
    letter = new Letter(this.context, this.animation, null, 'F');
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

  acertou: function() {
    // Verifica no array de targets se existe algum target com is_hit == false;
    // Se não existir o jogo acaba.
  },

  pause: function() {},
  over: function() {},
}
