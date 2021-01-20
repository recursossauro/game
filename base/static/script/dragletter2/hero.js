var Hero = function(context, keyboard, animation, fileLoadingListner=null) {

  this.context = context;
  this.keyboard = keyboard;
  this.animation = animation;
  this.numFilesToLoad = 1;
  this.fileLoadingListner = fileLoadingListner;
  this.width = 30;
  this.height = 30;
  this.x = 10;
  this.y = 10;
  this.vel = 100;
  this.alive = true;
  this.spritesheetInterval = 10;

}

Hero.prototype = {

  loadFile: function() {

    this.image = new Image();

    var th = this;

    this.image.onload = function() {

      if (th.fileLoadingListner) th.fileLoadingListner.filesLoaded();

    };

    this.image.src =  '/static/images/dragletters2/herosprite.png';
    this.spritesheet = new Spritesheet(this.context, this.image, 8, 12, this.width, this.height);
    this.spritesheet.row = 0;
    this.spritesheet.interval = 100000;
  },

  rectanglesCollision: function() {

     var rects =
     [
        {x: this.x, y: this.y, width: this.width, height: this.height},

     ];
     return rects;
  },

  collidedWith: function(sprite) {
    if (sprite instanceof Letter) ;
  },

  'update': function() {
    var increment = this.vel * this.animation.elapsed / 1000;

    this.spritesheet.interval = 100000; // infinite

    if (this.keyboard.pressed(LEFT_ARROW) && this.x > 0) {
       this.x -= increment;
       this.spritesheet.row = 3;
       this.spritesheet.interval = this.spritesheetInterval;
     }

    if (this.keyboard.pressed(RIGHT_ARROW) &&
             this.x < this.context.canvas.width - this.width) {
       this.x += increment;
       this.spritesheet.row = 1;
       this.spritesheet.interval = this.spritesheetInterval;
     }

    if (this.keyboard.pressed(UP_ARROW) && this.y > 0) {
       this.y -= increment;
       this.spritesheet.row = 0;
       this.spritesheet.interval = this.spritesheetInterval;
     }

    if (this.keyboard.pressed(DOWN_ARROW) &&
             this.y < this.context.canvas.height - this.height) {
       this.y += increment;
       this.spritesheet.row = 2;
       this.spritesheet.interval = this.spritesheetInterval;
     }

  },

  'draw': function() {
    this.spritesheet.draw(this.x, this.y);
    this.spritesheet.nextFrame();
  },


}
