var WordImage = function(imgUrl, context, fileLoadingListner=null) {
  this.imgUrl = imgUrl;
  this.context = context;
  this.numFilesToLoad = 1;
  this.fileLoadingListner = fileLoadingListner;

}

WordImage.prototype = {
  'loadFile': function() {

    this.image = new Image();
    var th = this;

    this.image.onload = function() {

      // relation between image.width and image.height.
      factor = th.image.height / th.image.width;
      th.width = th.context.canvas.width/3;
      th.height = th.width * factor;
      th.x = th.context.canvas.width/2-th.width/2;
      th.y = th.context.canvas.height/2-th.height/2;

      if (th.fileLoadingListner) th.fileLoadingListner.filesLoaded();
    };

    this.image.src =  this.imgUrl;
  },

  'update': function() {},

  'draw': function() {
    this.context.fillStyle = "#101010";
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
  },
}
