function Spritesheet(context, image, rows, cols, width, height) {
   this.context = context;
   this.image = image;
   this.numrows = rows;
   this.numcols = cols;
   this.interval = 0;
   this.row = 0;
   this.col = 0;
   this.endOfCycle = null;
   this.width = width;
   this.height = height;
}
Spritesheet.prototype = {
   nextFrame: function() {
      var now = new Date().getTime();

      // if you don't have the last measured time yet
      if (! this.lastTime) this.lastTime = now;

      // Is it time to change the column?
      if (now - this.lastTime < this.interval) return;

      if (this.col < this.numcols - 1) {
         this.col++;
      }
      else {
         this.col = 0;

         // Warn that a cycle is over!
         if (this.endOfCycle) this.endOfCycle();
      }

      // Save last change time
      this.lastTime = now;
   },
   
   draw: function(x, y) {
      var width = this.image.width / this.numcols;
      var height = this.image.height / this.numrows;

      this.context.drawImage(
         this.image,
         width * this.col,
         height * this.row,
         width,
         height,
         x,
         y,
         this.width,
         this.height
      );
   }
}
