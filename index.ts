import p5 from 'p5';
import { P5SubSketch } from './libs/P5SubSketche';
// change this import to change SubSketch
//import { testSubSketche as SubSketche } from './sub-sketches/testSubSketche';
import { testGrid as SubSketche } from './sub-sketches/testGrid';

const settings = {
    width : 2481,
    height: 3510,
    // width : 3510,
    // height: 2481,
    // width : 800,
    // height: 800,
    bg_color : "#F9F5DE"
};

const s = ( s : p5 ) => {

    let canvas : p5.Graphics;
    let scale = 1.0;
    let translate : p5.Vector = s.createVector();
    let canvas_ratio : number;
    let subSketch : P5SubSketch;

    s.setup = () => {
        canvas_ratio = settings.width/settings.height;
        //s.remove(); // used to avoid multiple canvas when reloading index.ts with Parcel
        s.createCanvas(s.windowWidth, s.windowHeight);
        s.pixelDensity(1);
        s.background(settings.bg_color);

        // create drawing surface for P5SubSketch
        canvas = s.createGraphics(settings.width, settings.height);
        canvas.pixelDensity(1);

        // calulate drawing surface translate and ratio
        layoutCanvas();

        // create P5SubSketch
        subSketch = new SubSketche(canvas)
        subSketch.setup();
    };

    s.draw = () => {
        // sub sketch draw
        subSketch.draw();

        // draw subsketch 
        s.push();
        s.translate(translate);
        s.scale(scale);
        s.image(canvas, 0, 0);
        s.pop();
     };

    s.windowResized = () => {
        console.log("windowResized");
        s.resizeCanvas(s.windowWidth, s.windowHeight);
        s.pixelDensity(1);
        s.background(settings.bg_color);
        layoutCanvas();
    };

    const layoutCanvas = () => {
        console.log("layoutCanvas");
        
        if( settings.width > s.windowWidth || settings.height > s.windowHeight)
        {
            let window_ratio = s.windowWidth / s.windowHeight;
            if( window_ratio >= canvas_ratio)
            {
                scale = s.windowHeight/(settings.height);
            }else{
                scale = s.windowWidth/(settings.width);
            }
            scale *= 0.95; // make sure to have margin around drawing surface
            translate.x = (s.windowWidth - (canvas.width*scale)) / 2.0;
            translate.y = (s.windowHeight - (canvas.height*scale)) / 2.0;
        }else{
            scale = 1.0;
            translate.x = (s.windowWidth - canvas.width) / 2.0;
            translate.y = (s.windowHeight - canvas.height) / 2.0;
        }
    }

};

// create P5 sketch
let myp5 = new p5(s);
