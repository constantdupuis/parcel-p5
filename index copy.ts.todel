import p5 from 'p5';
import { P5SubSketch } from './libs/P5SubSketche';
import { testSubSketche as DrawSurface } from './sub-sketches/testSubSketche';
import Particle = require('./libs/Particle'); 
import Vec2 = require('./libs/Vec2'); 

const settings = {
    // width : 2481,
    // height: 3510
    // width : 3510,
    // height: 2481
    width : 2000,
    height: 2000
};

const s = ( s :p5 ) => {

    let drawSurface : P5SubSketch;
    let cnv : p5.Graphics;
    let canvas_ratio : number;
    //let p : Particle = new Particle( new Vec2(10,10) );

    s.setup = () => {
        s.pixelDensity(1);
        cnv = s.createGraphics(settings.width, settings.height);
        cnv.pixelDensity(1);
        drawSurface = new DrawSurface(cnv);
        canvas_ratio = settings.width/settings.height;
        s.createCanvas(1000,1000);
        layoutCanvas();
        drawSurface.setup();
    };

    s.draw = () => {
        // cnv.background(200,120,20);
        // cnv.stroke(128);
        // cnv.strokeWeight(10);
        // cnv.line(0,0, settings.width, settings.height);

        drawSurface.draw();
        
        s.push();
        s.scale( canvas_ratio );
        cnv.push();
        cnv.scale( 0.01 );
        s.image(cnv, 0,0);
        cnv.pop();
        s.pop();
    };

    s.windowResized = () => {
        layoutCanvas();
    };

    const layoutCanvas = () => {
        let margin = 0.95;
        if( settings.width > s.windowWidth || settings.height > s.windowHeight)
        {
            let window_ratio = s.windowWidth / s.windowHeight;
            if( window_ratio >= canvas_ratio)
            {
                let ratio = s.windowHeight/settings.height;
                ratio *= margin;
                s.resizeCanvas(settings.width * ratio, settings.height * ratio);
            }else{
                let ratio = s.windowWidth/settings.width;
                ratio *= margin;
                s.resizeCanvas(settings.width * ratio, settings.height * ratio);
            }
        }else{
            s.resizeCanvas(settings.width, settings.height);
        }
    };

};

let myp5 = new p5(s);
