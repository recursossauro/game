document.body.onload = function() {
    //Apply some basic styles
    var css = ".draggable{cursor: move;display: inline-block;} .text{display: inline-block; cursor: move;} .text:focus{cursor: auto;} .text-wrapper{width: 100%;position: relative;} .wrap{position: absolute;margin: auto;top: 0;bottom: 0;left: 0;right: 0;}';";
    var style = document.createElement('style');
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName('head')[0].appendChild(style);

    // Select all elements with the 'draggable' class and stores them in the 'elements' variable
    var elements = document.querySelectorAll(".draggable");

    // Creates an additional array of all text elements
    var texts = document.querySelectorAll(".text");

    // Variable to store z index of last moved element
    z = 1;

    // Variable to store if you are currently editing text
    editing = false;

    // Stores the last edited text element
    var editedText;

    // Stores the last edited element
    var tgt;

    var clickTimer = null;

    // Adds the mousedown listener on the body element, to listen for when you click away from an element
    document.body.addEventListener('mousedown', cancel);
    document.body.addEventListener('touchstart', cancel);

    // Stops editing text when you click away from it
    function cancel(evt){
        // If the element clicked on is not text
        if(!event.target.classList.contains("text")){
          editing = false;
          // Else, exit out of the edited text
          if(editing){
            editedText.blur();
          }
        }
    }

    // Adds event listeners to every element that has the draggable class
    for(var i = 0; i < elements.length; i++){
      elements[i].addEventListener('mousedown', drag);
        elements[i].addEventListener('touchstart', handleTouch);
        b = elements[i].getBoundingClientRect();
        // Calculate the initial offset of the element from the top left of the page and stores it as a property of the element
        elements[i].initialOffsetX = b.left + window.pageXOffset;
        elements[i].initialOffsetY = b.top + window.pageYOffset;
        elements[i].x = b.left;
        elements[i].y = b.top;
        elements[i].initialX = b.left;
        elements[i].initialY = b.top;
        elements[i].style.cursor = "move";
      document.addEventListener('mouseup', end);
        document.addEventListener('touchend', end);
    };

    // Adds a mouse event for a doubleclick on the text element and wraps text element in divs
    for(let i = 0; i < texts.length; i++){
        texts[i].addEventListener("dblclick", editText);
        var div = document.createElement("div");
        div.className = "text-wrapper";
        var parent = texts[i].parentNode;
        parent.insertBefore(div,texts[i]);
        div.appendChild(texts[i]);
        div.style.height = outerHeight(texts[i])+"px";
        var div = document.createElement("div");
        div.className = "wrap";
        var parent = texts[i].parentNode;
        parent.insertBefore(div,texts[i]);
        div.appendChild(texts[i]);
        // Lets you edit text
        texts[i].contentEditable = "true";
    }

    // Focuses on the text element
    function editText(evt){
        editedText = evt.target;
        editing = true;
        editedText.focus();
    }
    function handleTouch(evt){
        evt.preventDefault();
        drag(evt);
        if (clickTimer == null) {
            clickTimer = setTimeout(function () {
                clickTimer = null;
            }, 500)
        } else {
            clearTimeout(clickTimer);
            clickTimer = null;
            editText(evt);
        }
    }

    // Main logic, called when the mouse is clicked
    function drag(event) {
      // If the targeted element is not text
      if(!event.target.classList.contains("text")){
          // Set editing to false and lose focus on the text field
          editing = false;
          if(editing){
            editedText.blur();
          }
      }

      // If you are not clicking on a text element that is currently being edited
      if(!editing){
          // Prevent default behavior and increase z index to bring the new element to the front
          event.preventDefault();
          moving = true;
          z = z+1;

          // Identify which element was clicked and store in the 'tgt' element, then get position properties of it
          tgt = event.target;
          tgt.attributeName = 'test';
          b = tgt.getBoundingClientRect();
          var x = b.left + window.pageXOffset;
          var y = b.top + window.pageYOffset;
          offsetX = event.pageX || event.changedTouches[0].pageX;
          offsetY = event.pageY || event.changedTouches[0].pageY;

          document.addEventListener('mousemove',function(e) {
            // If the page has been clicked and an element is being dragged
            if(moving === true){
              // Calculate the new position of the element, relative to the top left of the page
              var dx = e.pageX - offsetX + x - tgt.initialOffsetX;
              var dy = e.pageY - offsetY + y - tgt.initialOffsetY;
              // Apply the styles to the element
              var position = 'transform: translate('+dx+'px, '+dy+'px);z-index:'+z+';';
              tgt.setAttribute('style', position);
            };
          });
          document.addEventListener('touchmove',function(e) {
              var touches = e.changedTouches;
            // If the page has been clicked and an element is being dragged
            if(moving === true){
              for(let i = 0; i < touches.length; i++){
                  // Calculate the new position of the element, relative to the top left of the page
                  var dx = touches[i].pageX - offsetX + x - tgt.initialOffsetX;
                  var dy = touches[i].pageY - offsetY + y - tgt.initialOffsetY;
                  // Apply the styles to the element
                  var position = 'transform: translate('+dx+'px, '+dy+'px);z-index:'+z+';';
                  tgt.setAttribute('style', position);
              }
            };
          });
      }
    };

    function end(evt) {

      // When the mouse is lifted up, set moving to false
      moving = false;

      // Detect hit the target
      detectHitTarget(evt.target);
    };

    function outerHeight(el) {
      var height = el.offsetHeight;
      var style = getComputedStyle(el);

      height += parseInt(style.marginTop) + parseInt(style.marginBottom);
      return height;
    }

    // Set sounds
    var right_audio      = new Audio('/static/sounds/right.mp3');
    var wrong_audio      = new Audio('/static/sounds/wrong.mp3');
    var completed_audio  = new Audio('/static/sounds/completed.mp3');
    var numRightToFinish = document.getElementById('word').innerHTML.length;
    var numRight         = 0;

    function complited() {
      completed_audio.play();
      alert('Congratulations! You have commplited the word '+document.getElementById('word').innerHTML);
      document.getElementById("drag_letters_form").submit();

    }

    function detectHitTarget(draggedElement) {
      // Detect a hit the target when the center of the target caracter is s px size
      // distant of the center of the dragged caracter.

      // Distance formula: d=√((x_2-x_1)²+(y_2-y_1)²)

      s = 5 // px

      // Select all elements with the 'draggable' class and stores them in the 'elements' variable
      targets = document.querySelectorAll(".target");

      right = false;
      for (i=0; i<targets.length; i++) {
        if (targets[i].id == draggedElement.id) {
          // Calculate the center x and y from the target
          xCenterTarget = targets[i].getBoundingClientRect().left + (targets[i].getBoundingClientRect().right-targets[i].getBoundingClientRect().left)/2;
          yCenterTarget = targets[i].getBoundingClientRect().top + (targets[i].getBoundingClientRect().bottom-targets[i].getBoundingClientRect().top)/2;
          // Calculate the center x and y from the dragged element
          xCenterDragged = draggedElement.getBoundingClientRect().left + (draggedElement.getBoundingClientRect().right-draggedElement.getBoundingClientRect().left)/2;
          yCenterDragged = draggedElement.getBoundingClientRect().top + (draggedElement.getBoundingClientRect().bottom-draggedElement.getBoundingClientRect().top)/2;

          distance = Math.sqrt(Math.pow((xCenterTarget-xCenterDragged),2)+Math.pow((yCenterTarget-yCenterDragged),2))

          // Verify if the distance match
          if (distance <= s) {
            // stop the loop for
            i = targets.length;
            right = true;
          }
        }
      }
      if (right) {
        numRight++;
        if (numRight>=numRightToFinish) complited();
        else right_audio.play();
      } else {
        wrong_audio.play();
        // Restore initial position of the element dragged
        var dx = draggedElement.initialX;
        var dy = draggedElement.initialY;
        // Apply the styles to the element
        var position = 'left:'+dx+'; top:'+dy+';';
        draggedElement.setAttribute('style', position);
      }
    }
}
