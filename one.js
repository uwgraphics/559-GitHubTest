// note that we don't do a global "use strict" because this can create a problem
// if we include another file
// "use strict";

// just to let you know we were here...
console.log("File One is being loaded");

// choose window.onload over document.onload
// https://stackoverflow.com/questions/588040/window-onload-vs-document-onload
//
// also note that we take advantage of function hoisting
// (we use the function declaration even before it is used)
window.onload = startProgram();

// a function that takes care of the action - this is what gets run
// when the program starts - see window.onload above
function startProgram() {
    // this may not be necessary because we try to use ES6 - but just in
    // case
    "use strict";

    // let everyone know we're here
    console.log("Program Started");

    // to show how we can manipulate the DOM, grab the span we made
    // and change its text
    // note that we're using innerText here - we could use innerHTML
    let s1 = document.getElementById("span1");
    s1.innerText = "This text was changed by Javascript.";

    // we can also change style aspects of DOM things
    s1.style["backgroundColor"] = "#CEE";   // CEE = light cyan
    s1.style["color"] = "#008";             // 008 = mid blue  

    // note that if we change aspects of the parent of the element,
    // the child elements have priority
    let d1 = document.getElementById("div1");
    d1.style["color"] = "#800";
    // note that I split this as two lines, rather than writing
    // document.getElementById("div1").style["color"] = "#800";
    // this is equivalent, but harder to debug - if an error
    // occurs, it will be on a specific line

    // let's try to do something with the button
    let b2 = document.getElementById("button2");
    b2.onclick = function() {
        let b2s = document.getElementById("button2span");
        b2s.innerText = "The button was pushed!";
        b2s.style["background"] = "#CEC";
    }

    // Button 3
    // another way to do something with the button
    let b3 = document.getElementById("button3");
    let b3s = document.getElementById("button3span")
    // attach something to the mouse down and up events
    b3.onmousedown = function() {
        // because of closure/scope, we can use b3s from outside
        // rather than trying to do the getElementByID inside the function
        b3s.innerText = "Button is being pressed!";
        b3s.style["background"] = "#FCC";
    }
    // Note That this is fragile! We only get the up event if the mouse stays
    // inside the button
    b3.onmouseup = function() {
        b3s.innerText = "Button was pressed!"
        b3s.innerText += "If you want to break this, move the mouse outside the button before releasing the button.";
        b3s.style["background"] = "#CFC";
    }

    // Button 4 - Button 3 that's harder to break
    let b4 = document.getElementById("button4");
    let b4s = document.getElementById("button4span")
    // attach something to the mouse down and up events
    b4.onmousedown = function() {
        // because of closure/scope, we can use b3s from outside
        // rather than trying to do the getElementByID inside the function
        b4s.innerText = "Button is being pressed!";
        b4s.style["background"] = "#FCC";
    }
    // Note That this is fragile! We only get the up event if the mouse stays
    // inside the button. But we only get the up event if we had gotten the
    // down event
    b4.onclick = function() {
        b4s.innerText = "Button was pressed!"
        b4s.innerText += "This breaks differently.";
        b4s.style["background"] = "#CFC";
    }

    // Button 5 - compare onclick and onmouseup
    let b5mu = document.getElementById("button5mu");
    let b5oc = document.getElementById("button5oc");
    let b5s = document.getElementById("b5s");
   
    // use the same function for both buttons
    // we'll take advantage of the this being "correct"
    function b5down() {
        let mstr = this.innerText + " was pressed and not released yet";
        b5s.innerText = mstr;
        b5s.style["background"] = "#CEC";
    }
    function b5up() {
        let mstr = this.innerText + " was released";
        b5s.innerText = mstr;
        b5s.style["background"] = "#CCE";
    }
    // connect those functions to the appropriate place
    b5mu.onmousedown = b5down;
    b5oc.onmousedown = b5down;
    b5mu.onmouseup = b5up;
    b5oc.onclick = b5up;

    // check for mouse leaving
    // note that we need to keep track
    let b6 = document.getElementById("b6");
    let b6s = document.getElementById("b6s");
    // keep track of whether the button is pressed
    let b6state = 0;
    b6.onmousedown = function() {
        b6state = 1;
        b6s.innerText = "Button 6 down";
    }
    b6.onmouseup = function() {
        if (b6state) {
            b6s.innerText = "Button 6 released (after press)";
        } else {
            b6s.innerText = "Button 6 released (without press)";
        }
        b6state = 0;
    }
    b6.onmouseleave = function() {
        b6state = 0;
        b6s.innerText = "Button 6 left before release";
    }

    // here, we make a button programmatically
    let s7 = document.getElementById("span7")
    let b7 = document.createElement("button"); 
    b7.innerText = "Button 7"
    s7.appendChild(b7);
    b7.onclick = function() {
        let b7s = document.getElementById("b7s");
        b7s.innerText = "Button 7 was pressed."
    }
}