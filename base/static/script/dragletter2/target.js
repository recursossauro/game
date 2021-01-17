var message = '';


var Target = function(context, animation, letter='@', showLetter=true, rightTarget, fileLoadingListner=null) {

  this.context = context;
  this.animation = animation;

  this.numFilesToLoad = 0;
  //Target.numFilesToLoad = 0;
  this.fileLoadingListner = fileLoadingListner;

  this.letter = letter;
  this.showLetter = '☺';
  if (showLetter) this.showLetter = this.letter;

  this.rightTarget = rightTarget;
  this.isHit = false;

  this.x = 0;
  this.y = 0;
  this.width  = 30;
  this.height = 30;
  this.color = '#202020';


}

//Target.numFilesToLoad = 1;
Target.rightSound = new Audio();
Target.rightSound.src =  '/static/sounds/right.mp3';
Target.rightSound.load();

Target.wrongSound = new Audio();
Target.wrongSound.src =  '/static/sounds/wrong.mp3';
Target.wrongSound.load();


Target.prototype = {

  'loadFile': function() {
  },

  rectanglesCollision: function() {

     var rects =
     [
        {x: this.x, y: this.y, width: this.width, height: this.height},
     ];

     return rects;
  },

  collidedWith: function(sprite, collideds) {
    if (sprite instanceof Letter) {
      if (sprite.letter == this.letter) {
        this.isHit = true;
        this.rightTarget.hited(this);
        // play music of righting.
        this.color = 'yellow';
        this.Collision.deleteSprite(this);
        // Show the letter even it was not showing
        this.showLetter = this.letter;
        Target.rightSound.play();
      } else {
        Target.wrongSound.play();
      }
      //
    }
  },

  'update': function() {

  },

  'draw': function() {

    this.context.strokeStyle = '#003000';
    this.context.strokeRect(this.x, this.y, this.width, this.height);
    this.context.fillStyle = this.color;
    this.context.font = "25px comic";
    this.context.fillText(this.showLetter,this.x+8, this.y+this.height-7);
  },

}
