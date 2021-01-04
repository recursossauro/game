var Hero = function(context, keyboard, animation, imageLoadingListner=null) {

  this.context = context;
  this.keyboard = keyboard;
  this.animation = animation;
  this.isImageLoaded = 1;
  this.imageLoadingListner = imageLoadingListner;
  this.width = 30;
  this.height = 30;
  this.x = 10;
  this.y = 10;
  this.vel = 100;


}

Hero.prototype = {
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
      th.isImageLoaded = 1;
      if (th.imageLoadingListner) th.imageLoadingListner.imageLoaded();

    };

    this.image.src =  this.imgUrl;
  },

  'update': function() {
    var increment = this.vel * this.animation.elapsed / 1000;

    if (this.keyboard.pressed(LEFT_ARROW) && this.x > 0)
       this.x -= increment;

    if (this.keyboard.pressed(RIGHT_ARROW) &&
             this.x < this.context.canvas.width - this.width)
       this.x += increment;

    if (this.keyboard.pressed(UP_ARROW) && this.y > 0)
       this.y -= increment;

    if (this.keyboard.pressed(DOWN_ARROW) &&
             this.y < this.context.canvas.height - this.height)
       this.y += increment;
  },

  'draw': function() {
    this.context.fillStyle = "#005500";
    this.context.fillRect(this.x, this.y, this.width, this.height);
  },
}
