// note that we don't do a global "use strict" because this can create a problem
// if we include another file
// "use strict";

// we do enable typescript type checking - see
// http://graphics.cs.wisc.edu/WP/cs559-sp2019/typed-js/
// and
// https://github.com/Microsoft/TypeScript/wiki/Type-Checking-JavaScript-Files
// @ts-check

/* Set options for jshint (my preferred linter)
 * disable the warning about using bracket rather than dot
 * even though dot is better 
 * https://stackoverflow.com/questions/13192466/how-to-suppress-variable-is-better-written-in-dot-notation
 */
/* jshint -W069, esversion:6 */

console.log("Before the mymodule import!");

// test that import works
import * as mymodule from "./mymodule.js";

// just to let you know we were here...
console.log("File One is being loaded");

// choose window.onload over document.onload
// https://stackoverflow.com/questions/588040/window-onload-vs-document-onload
//
// also note that we take advantage of function hoisting
// (we use the function declaration even before it is used)
window.onload = startProgram;

// a function that takes care of the action - this is what gets run
// when the program starts - see window.onload above
function startProgram() {
    // this may not be necessary because we try to use ES6 - but just in
    // case
    "use strict";

    // let everyone know we're here
    console.log("Program Started");

    // the pattern will be:
    // find an element in the DOM
    //  I will use getElementById - since I made the web page,
    //      I know that the Ids are unique
    //  I could have used querySelector (or querySelectorAll)
    //      that would let me pick things out by other attributes

    // to show how we can manipulate the DOM, grab the span we made
    // and change its text
    // note that we're using innerText here - we could use innerHTML
    let span1 = document.getElementById("span1");
    span1.innerText = "This text was changed by Javascript.";

    // we can also change style aspects of DOM things
    span1.style["backgroundColor"] = "#CEE";   // CEE = light cyan
    span1.style["color"] = "#008";             // 008 = mid blue  

    // note that if we change aspects of the parent of the element,
    // the child elements have priority
    let d1 = document.getElementById("div1");
    d1.style["color"] = "#800";
    // note that I split this as two lines, rather than writing
    // document.getElementById("div1").style["color"] = "#800";
    // this is equivalent, but harder to debug - if an error
    // occurs, it will be on a specific line


    /////////////////////////////////////////////////////////
    // Button Examples

    // let's try to do something with the button
    let b2 = document.getElementById("button2");
    b2.onclick = function() {
        let b2s = document.getElementById("button2span");
        b2s.innerText = "The button was pushed!";
        b2s.style["background"] = "#CEC";
    };

    // Button 3
    // another way to do something with the button
    let b3 = document.getElementById("button3");
    let b3s = document.getElementById("button3span");
    // attach something to the mouse down and up events
    b3.onmousedown = function() {
        // because of closure/scope, we can use b3s from outside
        // rather than trying to do the getElementByID inside the function
        b3s.innerText = "Button is being pressed!";
        b3s.style["background"] = "#FCC";
    };
    // Note That this is fragile! We only get the up event if the mouse stays
    // inside the button
    b3.onmouseup = function() {
        b3s.innerText = "Button was pressed!";
        b3s.innerText += "If you want to break this, move the mouse outside the button before releasing the button.";
        b3s.style["background"] = "#CFC";
    };

    // Button 4 - Button 3 that's harder to break
    let b4 = document.getElementById("button4");
    let b4s = document.getElementById("button4span");
    // attach something to the mouse down and up events
    b4.onmousedown = function() {
        // because of closure/scope, we can use b3s from outside
        // rather than trying to do the getElementByID inside the function
        b4s.innerText = "Button is being pressed!";
        b4s.style["background"] = "#FCC";
    };
    // Note That this is fragile! We only get the up event if the mouse stays
    // inside the button. But we only get the up event if we had gotten the
    // down event
    b4.onclick = function() {
        b4s.innerText = "Button was pressed!";
        b4s.innerText += "This breaks differently.";
        b4s.style["background"] = "#CFC";
    };

    // Button 5 - compare onclick and onmouseup
    let b5mu = document.getElementById("button5mu");
    let b5oc = document.getElementById("button5oc");
    let b5s = document.getElementById("b5s");
   
    // use the same function for both buttons
    // normally, I'd take advantage of the this being "correct"
    // but that's unsafe (who knows who will call these functions!)
    // (it's still officially un-typesafe since currentTarget might not have an innerText)
    function b5down(event) {
        let mstr = event.currentTarget.innerText + " was pressed and not released yet";
        b5s.innerText = mstr;
        b5s.style["background"] = "#CEC";
    }
    function b5up(event) {
        let mstr = event.currentTarget.innerTextinnerText + " was released";
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
    };
    b6.onmouseup = function() {
        if (b6state) {
            b6s.innerText = "Button 6 released (after press)";
        } else {
            b6s.innerText = "Button 6 released (without press)";
        }
        b6state = 0;
    };
    b6.onmouseleave = function() {
        b6state = 0;
        b6s.innerText = "Button 6 left before release";
    };

    // here, we make a button programmatically
    let span7 = document.getElementById("span7");
    let b7 = document.createElement("button"); 
    b7.innerText = "Button 7";
    span7.appendChild(b7);
    b7.onclick = function() {
        let b7s = document.getElementById("b7s");
        b7s.innerText = "Button 7 was pressed.";
    };

    /////////////////////////////////////////////////////////
    // Slider Demos

    // the slider demo
    // make a slider and try out some different events
    /** @type {HTMLInputElement} */
    let slider2 = (/** @type {HTMLInputElement} */document.getElementById("sl2"));
    if (! (slider2 instanceof HTMLInputElement)) {
        throw("Expected Slider - but got something else!");
    }
    let sl2a = document.getElementById("sl2a");
    let sl2b = document.getElementById("sl2b");
    let sl2c = document.getElementById("sl2c");
    let sl2d = document.getElementById("sl2d");

    slider2.onchange = function() {
        sl2a.innerText = "Slider Change to " + slider2.value;
    };
    slider2.onclick = function() {
        sl2b.innerText = "Slider Click at " + slider2.value;
    };
    slider2.onmousedown = function() {
        sl2c.innerText = "Slider Mousedown at " + slider2.value;
    };
    slider2.oninput = function() {
        sl2d.innerText = "Slider OnInput at " + slider2.value;
    };


    // the second slider demo - #1 tied to number 2 and 3
    /** @type{HTMLInputElement} */ let slider3 =  (/** @type{HTMLInputElement} */ document.getElementById("sl3"));
    /** @type{HTMLInputElement} */ let slider3a = (/** @type{HTMLInputElement} */ document.getElementById("sl3a"));
    /** @type{HTMLInputElement} */ let slider3b = (/** @type{HTMLInputElement} */ document.getElementById("sl3b"));
    let sp3 = document.getElementById("sl3s");

    slider3.oninput = function() {
        slider3a.value = slider3.value;
    };
    slider3.onchange = function() {
        slider3b.value = slider3.value;
    };
    slider3.onmousedown = function() {
        sp3.innerText = "Slider 3 being dragged";
    };
    // use chaining to set both of these
    slider3a.onmousedown = slider3b.onmousedown = function() {
        sp3.innerText = "Slider not connected to anything";
    };

    /////////////////////////////////////////////////////////
    // requestAnimationFrame examples
    
    // use request animation frame to do something 16ms
    // in the future - this kindof one off usage is a little
    // weird
    let timestamp = performance.now();
    window.requestAnimationFrame(function() {
        let span = document.getElementById("rs1");
        span.innerText = "Hello from "+(performance.now()-timestamp)+"ms in the future";
    });

    let rs2 = document.getElementById("rs2");
    window.requestAnimationFrame(function() {
        // this is the function for the first request
        rs2.innerText = "Hello from First. ";
        // remember when this happened
        let ts1 = performance.now();
        // now queue up the second one, even farther in the future
        window.requestAnimationFrame(function() {
            // this is the function forthe second request
            // not that I am adding to innertext
            let now = performance.now();
            // remember that we can see the variable ts1 from the outer
            // function (thanks to closure!)
            rs2.innerText += " Hello from Second "+(now-ts1)+" ms after First.";
        });
    });

    // a more typical usage of request animation frame
    // a function schedules itself to be called in order to
    // make a loop
    /** @type{HTMLInputElement} */ let slr1 = (/** @type{HTMLInputElement} */ document.getElementById("slr1"));
    function advanceSLR1() {
        // add 1, roll over to zero if we hit the max
        // note that the value of the slider is a string,
        // so we have to convert it to a number
        // The more obvious 1+"1" = "11" - thanks to JavaScripts
        // aggressive coercion rules
        let newValue = (Number(slr1.value)+1) % 100;
        slr1.value = newValue.toString();
        // ask for this to be called again 16ms in the future
        window.requestAnimationFrame(advanceSLR1);
    }
    // note that just defined the function, now we need to call it
    // to start the loop
    advanceSLR1();

    // this example is really similar to the first - notice how
    // both sliders can work, even though neither generates
    // any events. everything happens by "polling."
    /** @type{HTMLInputElement} */ let slr2 = (/** @type{HTMLInputElement} */ document.getElementById("slr2"));
    /** @type{HTMLInputElement} */ let slr2b = (/** @type{HTMLInputElement} */ document.getElementById("slr2b"));
    function advanceSLR2() {
        // add speed, roll over to zero if we hit the max
        // note that the value of the slider is a string,
        // so we have to convert it to a number
        // The more obvious 1+"1" = "11" - thanks to JavaScripts
        // aggressive coercion rules
        let speed = Number(slr2.value);
        let newValue = (Number(slr2b.value)+speed) % 100;
        if (newValue<0) newValue=100;
        slr2b.value = newValue.toString();
        // ask for this to be called again 16ms in the future
        window.requestAnimationFrame(advanceSLR2);
    }
    // note that just defined the function, now we need to call it
    // to start the loop
    advanceSLR2();
}

