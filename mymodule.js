// Mike's first attempt at using an ES6 module
 'esversion:6';

export function test() {
    console.log("This is a test!");

    let mycanvas = document.getElementById('myCanvas');
    let mycontext = mycanvas.getContext('2d');

    mycontext.beginPath();
    mycontext.rect(50,50,50,50);
    mycontext.fill();

    // try to load data.json
    let request = new XMLHttpRequest();
    request.open("GET","data.json");
    request.onload = function() {
        console.log("Succeeded at loading JSON");
        console.log(request.response);
    }
    request.send();
    console.log("Made request")
    
}

export function barf() {
    console.log("This is a BARF!");
}

