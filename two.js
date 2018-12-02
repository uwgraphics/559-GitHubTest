"use strict";

window.onload = start();

function start()
{
    // draw into the first canvas
    // first we need to get the canvas element and then find the drawing context inside it
    let canvas1 = document.getElementById("canvas1");
    let context1 = canvas1.getContext('2d');

    // now that we have the context, we can use it to issue drawing commands
    // the results appear "immediately"
    context1.beginPath();
    context1.rect(50,50,50,50);
    context1.fill();


    // add a square to the first SVG
    let svg1 = document.getElementById("svg1");

    // now we can create a square to add
    // note that in practice, we'd use a library to make this (see https://svgjs.com/ for example)
    // less clunky
    // the next two lines make a square object - but since
    // it's a special object, we need to tell the browser that its
    // SVG (so we need to declare a name space)
    const svgns = "http://www.w3.org/2000/svg";
    let square1 = document.createElementNS(svgns, 'rect');
    square1.setAttribute("x", 50);
    square1.setAttribute("y", 50);
    square1.setAttribute("width", 50);
    square1.setAttribute("height", 50);
    square1.setAttribute("fill", "#000");

    // now add the square to the svg, like any other DOM element
    svg1.appendChild(square1);


    // 
    // do the same thing in the second set of spaces
    // this time, make the squares move

    // first create an initial square, this should look like
    // the code above
    let canvas2 = document.getElementById("canvas2");
    let context2 = canvas2.getContext('2d');
    context2.beginPath();
    context2.rect(50,50,50,50);
    context2.fill();
    //
    let square2 = document.createElementNS(svgns, 'rect');
    let svg2 = document.getElementById("svg2");
    square2.setAttribute("x", 50);
    square2.setAttribute("y", 50);
    square2.setAttribute("width", 50);
    square2.setAttribute("height", 50);
    square2.setAttribute("fill", "#000");
    svg2.appendChild(square2);

    // remember what time it is, since we'll use that to
    // figure out where to draw
    let startTime = performance.now()

    function onTick() {
        // put both squares at the same place:
        let newX = (50 + (performance.now() - startTime)/5) % 250;

        // when we animate the canvas, we have to redraw things 
        // thanks to closure, we can remember the context
        // first we need to clear the window... we can do it explicitly
        // or, we can do it by setting the canvas size (even if it doesn't change)
        // the size changing trick is faster, so we do it that way
        //context.clearRect(0, 0, canvas.width, canvas.height);
        canvas2.width = canvas2.width;
        // now redraw the square
        context2.beginPath();
        context2.rect(newX,50,50,50);
        context2.fill();

        // for the SVG object, the square is an object - we
        // just need to move it
        square2.setAttribute("x",newX);
        
        // schedule the next redraw
        window.requestAnimationFrame(onTick);
    }
    // start the "loop" by doing the initial iteration
    // (which will schedule the second iteration, ...)
    onTick();

    ///////////////////////////
    // using the SVG rectangles
    //
    // move an SVG rectangle 
    let rect1 = document.getElementById("svgrect1");
    function r1tick() {
        let newX = (50 + (performance.now() - startTime)/5) % 250;
        rect1.setAttribute("x",newX);
        window.requestAnimationFrame(r1tick);
    }
    r1tick();

    // it's a DOM element - it can handle events too!
    let rect2 = document.getElementById("svgrect2");
    rect2.onmouseenter = function() {
        //rect2.className.baseVal = "lightbluewithborder";
        rect2.setAttribute("fill","#F00");
    }
    rect2.onmouseleave = function() {
        rect2.setAttribute("fill","#00F");
    }
    
    // or we can use the events to change classes, but
    // this is tricky since className is not a string for an SVG element
    // because the property might be animated (!?!)
    let rect3 = document.getElementById("svgrect3");
    rect3.onmouseenter = function() {
        rect3.className.baseVal = "lightredwithborder";
    }
    rect3.onmouseleave = function() {
        rect3.className.baseVal = "lightbluewithborder";
    }


}