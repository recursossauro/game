var Background = function(context, fileLoadingListner=null) {

  this.context = context;
  this.numFilesToLoad = 1;
  this.fileLoadingListner = fileLoadingListner;
  this.alive = true;
  this.x = 0;
  this.y = 0;
  this.width = context.canvas.width;
  this.height = context.canvas.height;

}

Background.prototype = {
  loadFile: function() {
    this.image = new Image();

    var th = this;

    this.image.onload = function() {


      if (th.fileLoadingListner) th.fileLoadingListner.filesLoaded();


    };

    this.image.src =  '/static/images/dragletters2/background.png';
  },

  'update': function() {},

  'draw': function() {


    // middle
    for (a=1; a<9; a++)
      for (i=1; i<7; i++) this.context.drawImage(
         this.image,
         120,
         161,
         40,
         40,
         i*40,
         a*40,
         40,
         40
      );

    // linha superior
    for (i=1; i<7; i++) this.context.drawImage(
       this.image,
       120,
       81,
       40,
       40,
       i*40,
       0,
       40,
       40
    );

    // linha inferior
    for (i=1; i<7; i++) this.context.drawImage(
       this.image,
       120,
       241,
       40,
       40,
       i*40,
       this.context.canvas.height-40,
       40,
       40
    );

    // Canto superior esquerdo
    this.context.drawImage(
       this.image,
       40,
       81,
       40,
       40,
       this.x,
       this.y,
       40,
       40
    );

    // Coluna esquerda
    for (i=1; i<9; i++) this.context.drawImage(
       this.image,
       40,
       161,
       40,
       40,
       0,
       i*40,
       40,
       40
    );

    // Coluna direita
    for (i=1; i<9; i++) this.context.drawImage(
       this.image,
       200,
       161,
       40,
       40,
       this.context.canvas.width-40,
       i*40,
       40,
       40
    );

    // Canto superior direito
    this.context.drawImage(
       this.image,
       200,
       81,
       40,
       40,
       this.context.canvas.width-40,
       this.y,
       40,
       40
    );

    // Canto inferior esquerdo
    this.context.drawImage(
       this.image,
       40,
       241,
       40,
       40,
       0,
       this.context.canvas.height-40,
       40,
       40
    );

    // Canto inferior direito
    this.context.drawImage(
       this.image,
       200,
       241,
       40,
       40,
       this.context.canvas.width-40,
       this.context.canvas.height-40,
       40,
       40
    );
  },
}
