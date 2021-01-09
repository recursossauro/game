var Sprite = function(context, animation = null, imageLoadingListner=null) {

  this.context = context;
  this.animation = animation;
  this.hasImageToLoad = 0;
  this.imageLoadingListner = imageLoadingListner;

}

Sprite.prototype = {
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

  'update': function() {},

  'draw': function() {
    this.context.fillStyle = "#005500";
    this.context.fillRect(0, 0, 10, 10);
  },
}
