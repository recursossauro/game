var VisualTouch = function(context, fileLoadingListner=null) {
  this.context = context;
  this.color = 'gray';

  this.x = 0;
  this.y = 0;
  this.width = 100;

  this.numFilesToLoad = 0;
}

VisualTouch.prototype = {
  'update': function() {

  },

  'draw': function() {

  },

  'drawStart': function() {
    this.context.beginPath();
    this.context.strokeStyle = this.color;
    this.context.lineWidth = 5;
    this.context.arc(this.x, this.y, 50, 0, 2 * Math.PI);
    this.context.stroke();

  },

  'drawMove': function() {
    this.drawStart();
    // draw arrow
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.xMove, this.yMove);
    this.context.stroke();
  },

  'drawEnd': function() {},

  'touch': function(type, x=0, y=0) {

    if (type == TOUCH_START) {
      this.x = x;
      this.y = y;
      this.draw = this.drawStart;
    }

    if (type == TOUCH_MOVE) {
      this.xMove = x;
      this.yMove = y;
      this.draw = this.drawMove;
    }

    if (type == TOUCH_END) {
      this.draw = this.drawEnd;
    }

  },
}
