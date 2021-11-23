import p5 from 'p5';
import Particle = require('../../libs/Particle'); 
import Vec2 = require('../../libs/Vec2'); 

const settings = {
    width : 2481,
    height: 3510
    // width : 3510,
    // height: 2481
    // width : 500,
    // height: 500
};

const s = ( s :p5 ) => {

    let x = 100;
    let y = 100;

    let cnv : p5.Graphics;
    let canvas_ratio : number;

    let p : Particle = new Particle( new Vec2(10,10) );

    s.setup = () => {
        cnv = s.createGraphics(settings.width, settings.height);

        s.createCanvas(1000,1000);

        canvas_ratio = settings.width/settings.height;

        layoutCanvas();
        
    };

    s.draw = () => {

        cnv.background(200,120,20);
        cnv.stroke(128);
        cnv.strokeWeight(10);
        cnv.line(0,0, settings.width, settings.height);
        
        s.push();
        s.scale( canvas_ratio );
        s.image(cnv, 0,0);
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

console.log('TOTO');