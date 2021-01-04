// Códigos de keys - aqui vão todos os que forem necessários
var LEFT_ARROW = 37;
var UP_ARROW = 38;
var RIGHT_ARROW = 39;
var DOWN_ARROW = 40;
var SPACE = 32;
var ENTER = 13;

function Keyboard(element) {
   this.element = element;

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
}

Keyboard.prototype = {
   pressed: function(key) {
      return this.presseds[key];
   },
   fired: function(key, callback) {
      this.fireFunctions[key] = callback;
   }
}
