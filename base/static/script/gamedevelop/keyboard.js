// Códigos de keys - aqui vão todos os que forem necessários
var LEFT_ARROW = 37;
var UP_ARROW = 38;
var RIGHT_ARROW = 39;
var DOWN_ARROW = 40;
var SPACE = 32;
var ENTER = 13;

function Keyboard(element, canvas) {
   this.element = element;
   this.canvas = canvas;

   // Array of keys pressed
   this.presseds = [];

   // Array of keys fired
   this.fireds = [];

   // registered functions of fire
   this.fireFunctions = [];

   var keyboard = this;

   element.addEventListener('keydown', function(event) {
      var key = event.keyCode;  // more readable ;)
      keyboard.presseds[key] = true;

      // Fire only if it is the first keydown of the key
      if (keyboard.fireFunctions[key] && !keyboard.fireds[key]) {

          keyboard.fireds[key] = true;
          keyboard.fireFunctions[key]();
      }
   });

   element.addEventListener('keyup', function(event) {
      keyboard.presseds[event.keyCode] = false;
      keyboard.fireds[event.keyCode] = false;
   });

   // touches

   this.touchedStartX = '';
   this.touchedStartY = '';
   this.canvas.addEventListener("touchstart", function(e) {keyboard.handleStart(e);});
   this.canvas.addEventListener("touchmove", function(e) {keyboard.handleMove(e);});
   this.canvas.addEventListener("touchend", function(e) {keyboard.handleEnd(e);});
   this.canvas.addEventListener("touchcancel", function(e) {keyboard.handleEnd(e);});
}

Keyboard.prototype = {
   pressed: function(key) {
      return this.presseds[key];
   },
   fired: function(key, callback) {
      this.fireFunctions[key] = callback;
   },

   handleStart: function(e) {
     this.touchedStartX = e.touches[0].pageX;
     this.touchedStartY = e.touches[0].pageY;
   },

   handleMove: function(e) {
     this.handleEnd(e);
     if (e.touches[0].pageX-this.touchedStartX>0) this.presseds[RIGHT_ARROW] = true;
     if (e.touches[0].pageX-this.touchedStartX<0) this.presseds[LEFT_ARROW]  = true;
     if (e.touches[0].pageY-this.touchedStartY>0) this.presseds[DOWN_ARROW]  = true;
     if (e.touches[0].pageY-this.touchedStartY<0) this.presseds[UP_ARROW]    = true;
   },

   handleEnd: function(e) {
     this.presseds[RIGHT_ARROW] = false;
     this.presseds[LEFT_ARROW]  = false;
     this.presseds[UP_ARROW]    = false;
     this.presseds[DOWN_ARROW]  = false;
   },
}
