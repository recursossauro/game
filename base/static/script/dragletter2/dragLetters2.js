//'/static/sounds/completed.mp3'
var DragLetters = function (document, canvas, word) {

  this.canvas   = canvas;
  this.context  = canvas.getContext('2d');
  this.word     = word;
  // each element that is drawed on game, like a scenario or a enemy or the hero.
  this.animation = new Animation(this.context);
  this.collision = new Collision();
  this.numHited = [];
  this.numFilesToLoad = 0;
  this.numFilesLoaded = 0;

  this.prepare();

}

DragLetters.prototype = {

  prepare: function() {
    // load action-music
    this.actionMusic = new Audio();
    this.actionMusic.src = '/static/sounds/musica-acao.mp3';
    this.actionMusic.load();
    this.actionMusic.volume = 0.8;
    this.actionMusic.loop   = true;

    // load completedAudio
    this.completedAudio = new Audio();
    this.completedAudio.src = '/static/sounds/completed.mp3';
    this.completedAudio.load();

    this.addObject(new Background(this.context, this));

    // load and draw image from Word.
    this.addObject(new WordImage(this.word.imgSrc, this.context, this));


    for (i in this.word.text) {
      // target
      target = new Target(this.context, this.animation, this.word.text[i], this.word.target[i]!='☺', this);
      position = this.canvas.width/2 - this.word.target.length * (target.width+3)/2;
      target.x = (target.width+3) * i + position;
      target.y = 10;
      this.addObject(target);
      this.collision.newSprite(target);
    }

    keyboard = new Keyboard(document, this.canvas);

    // Hero
    hero = new Hero(this.context, keyboard, this.animation, this);
    hero.x = this.canvas.width/2 - hero.width/2;
    hero.y = this.canvas.height - hero.height;
    this.addObject(hero);
    this.collision.newSprite(hero);
    keyboard.addTouchListner(hero);

    // VisualTouch
    visualTouch = new VisualTouch(this.context);
    this.addObject(visualTouch);
    keyboard.addTouchListner(visualTouch);

    // Letter
    for (i in this.word.randomWord) {
      // target
      letter = new Letter(this.context, this.animation, null, this.word.randomWord[i]);
      position = this.canvas.width/2 - this.word.text.length * (letter.width+3)/2;
      letter.x = (letter.width+3) * i + position;
      letter.y = this.canvas.height-(letter.height + 40);
      this.addObject(letter);
      this.collision.newSprite(letter);
    }

    this.animation.newProcessing(this.collision);
  },

  addObject: function(object) {

    this.animation.addSprite(object);
    if (object.numFilesToLoad > 0) {

      this.numFilesToLoad += object.numFilesToLoad;
      object.loadFile();
    }
  },

  filesLoaded: function() {
    this.numFilesLoaded++;

    if (this.numFilesToLoad==this.numFilesLoaded) {
      this.actionMusic.play();
      this.animation.turnOn();
    }
  },

  hited: function(sprite) {

    if (this.numHited.indexOf(sprite)==-1) this.numHited.push(sprite);

    if (this.numHited.length == this.word.text.length) {
      var th = this;
      this.animation.newProcessing({
        process: function() {
          th.addObject(new SpriteOver(th.context, th.animation, null, th, th.word.text, th.completedAudio));
          this.animation.deleteProcessing(this);
        },
      })

    }
  },

  pause: function() {},
  over: function() {
    // animation stop;
    this.animation.on = false;
    conclude();
  },
}
