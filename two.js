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
    const svgns = "http://www.w3.org/2000/svg";
    let square1 = document.createElementNS(svgns, 'rect');
    square1.setAttributeNS(null,"x", 50);
    square1.setAttribute("y", 50);
    square1.setAttribute("width", 50);
    square1.setAttribute("height", 50);
    square1.setAttributeNS(null, "fill", "#000");

    // now add the square to the svg, like any other DOM element
    svg1.appendChild(square1);
}