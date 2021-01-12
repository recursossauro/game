var message = '';


var Target = function(context, animation, letter='@', showLetter=true, rightTarget, imageLoadingListner=null) {

  this.context = context;
  this.animation = animation;
  this.hasImageToLoad = true;
  this.imageLoadingListner = imageLoadingListner;
  this.letter = letter;
  this.showLetter = '@';
  if (showLetter) this.showLetter = this.letter;
  //this.showLetter = showLetter;
  this.rightTarget = rightTarget;
  this.isHit = false;

  this.x = 0;
  this.y = 0;
  this.width  = 30;
  this.height = 30;
  this.color = '#202020';

}

Target.prototype = {
  loadImage: function() {

    this.image = new Image();

    var th = this;

    this.image.onload = function() {

      // relation between image.width and image.height.
      factor = th.image.height / th.image.width;
      th.width = th.context.canvas.width/3;
      th.height = th.width * factor;
      th.x = th.context.canvas.width/2-th.width/2;
      th.y = th.context.canvas.height/2-th.height/2;

      if (th.imageLoadingListner) th.imageLoadingListner.imageLoaded();

    };

    this.image.src =  this.imgUrl;
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
