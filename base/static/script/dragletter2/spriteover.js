var SpriteOver = function (context, animation , fileLoadingListner=null, game, word='', completedAudio) {
  this.context = context;
  this.game = game;
  this.width = 10;
  this.height = 10;
  this.executionCount = 0;
  this.lastCicle = 0;
  this.interval = 10;
  this.initialTime = 0;
  this.totalTime = 2000;
  this.word = word;
  this.completedAudio = completedAudio;
}

SpriteOver.prototype = {
  update: function() {

    var now = new Date().getTime();

    if (this.initialTime == 0) this.initialTime = now;

    if (this.totalTime <= now - this.initialTime) this.game.over();

    if (this.lastCicle == 0) this.lastCicle = now;

    this.elapsed = now - this.lastCicle;

    if (this.interval <= this.elapsed)
      this.executionCount++;

    this.lastCicle = now;
  },

  draw: function() {

    if (this.executionCount < 10) {
      this.width += this.executionCount * 20;
      this.height += this.executionCount * 3;
    }

    this.x = this.context.canvas.width/2 - this.width/2;
    this.y = this.context.canvas.height/2 - this.height/2;

    this.context.fillStyle = "darkgray";
    this.context.fillRect(this.x, this.y, this.width, this.height);



    if (this.executionCount > 6) {
      this.context.fillStyle = 'red';
      this.context.font = "25px comic";
      msg = "Congratulations!";
      this.context.fillText(msg, this.context.canvas.width/2-(msg.length*13)/2, this.y+40);
      msg = "You have commplited";
      this.context.fillText(msg, this.context.canvas.width/2-(msg.length*13)/2, this.y+64);
      msg = "the word";
      this.context.fillText(msg, this.context.canvas.width/2-(msg.length*13)/2, this.y+88);
      msg = this.word;
      this.context.fillText(msg, this.context.canvas.width/2-(msg.length*13)/2, this.y+112);
    }

    if (this.executionCount==15) this.completedAudio.play();

  },
}
