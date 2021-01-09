function Collision() {
   this.sprites = [];
   this.atColliding = null;
   this.deleteSprites = [];
}
Collision.prototype = {

   newSprite: function(sprite) {
      this.sprites.push(sprite);
      sprite.Collision = this;
   },

   process: function() {

      // begin with a empty object
      var tested = new Object();

      for (var i in this.sprites) {
         for (var j in this.sprites) {

            // never collide a sprite with than self.
            if (i == j) continue;

            // Do unique strings to sprites.
            var id1 = this.uniqueString(this.sprites[i]);
            var id2 = this.uniqueString(this.sprites[j]);

            // Create the arrays if not exists
            if (! tested[id1]) tested[id1] = [];
            if (! tested[id2]) tested[id2] = [];

            // repetition texts
            if (! (tested[id1].indexOf(id2) >= 0 ||
                   tested[id2].indexOf(id1) >= 0) ) {

               // Abstract collision
               this.collisionTest(this.sprites[i], this.sprites[j]);

               // Register the test
               tested[id1].push(id2);
               tested[id2].push(id1);
            }
         }
      }

      this.deletingProcess();
   },

   collisionTest: function(sprite1, sprite2) {
      // Get the collision rectangles for each sprite
      var recs1 = sprite1.rectanglesCollision();
      var recs2 = sprite2.rectanglesCollision();





      // Collision test between then
      collideds1 = [];
      collideds2 = [];
      for (var i in recs1) {
         for (var j in recs2) {
            // Formule abstracting!
            if (this.CollideRectangles(recs1[i], recs2[j])) {
              // Register the collisions
              if (collideds1.indexOf(j)<0) collideds1.push(j);
              if (collideds2.indexOf(i)<0) collideds2.push(i);

               // general maker
               if (this.atColliding) {

                 this.atColliding(sprite1, sprite2);
               }

               // Não precisa terminar de ver todos os retângulos
               //break collisions;
            }
         }
      }
      if (collideds1.length>0) {

        // They collided, we will notify they.
        sprite1.collidedWith(sprite2, collideds2);
        sprite2.collidedWith(sprite1, collideds1);
      }
   },

   CollideRectangles: function(ret1, ret2) {
      // rectangles intersection formule.

      return (ret1.x + ret1.width) > ret2.x &&
             ret1.x < (ret2.x + ret2.width) &&
             (ret1.y + ret1.height) > ret2.y &&
             ret1.y < (ret2.y + ret2.height);
   },
   uniqueString: function(sprite) {

      var str = '';
      var rectangles = sprite.rectanglesCollision();

      for (var i in rectangles) {
         str += 'x:' + rectangles[i].x + ',' +
                'y:' + rectangles[i].y + ',' +
                'l:' + rectangles[i].width + ',' +
                'a:' + rectangles[i].heigth + '\n';
      }

      return str;
   },

   deleteSprite: function(sprite) {
      this.deleteSprites.push(sprite);
   },

   deletingProcess: function() {
      // Create new array.
      var newArray = [];

      // Add only the elements not deleted.
      for (var i in this.sprites) {
         if (this.deleteSprites.indexOf(this.sprites[i]) == -1)
            newArray.push(this.sprites[i]);
      }

      // Clean the deleting array
      this.deleteSprites = [];

      // switch the old to new array
      this.sprites = newArray;
   }
}
