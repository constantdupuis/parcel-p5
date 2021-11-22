import p5 from 'p5';
import Particle = require('../../libs/Particle'); 
import Vec2 = require('../../libs/Vec2'); 

const settings = {
    width : 3510,
    height: 2481
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
        canvas_ratio = settings.width/settings.height;

        let margin = 0.9;
        if( (settings.width * margin) > s.windowWidth || (settings.height * margin) > s.windowHeight)
        {
            let window_ratio = s.windowWidth / s.windowHeight;
            
            if( window_ratio >= canvas_ratio)
            {
                let ratio = s.windowHeight/settings.height;
                s.createCanvas(settings.width * ratio, settings.height * ratio);
            }else{
                let ratio = s.windowWidth/settings.width;
                s.createCanvas(settings.width * ratio, settings.height * ratio);
            }

        }else{
            s.createCanvas(settings.width, settings.height);
        }

        // let view_height = s.windowHeight * 0.8; //canvas_ratio;
        // let view_width = view_height * canvas_ratio;
        // s.createCanvas(view_width, view_height);

        // let view_ratio = s.windowWidth/s.windowHeight;
        // if( view_ratio > 0) // view is landscape
        // {
            
        // }else if(view_ratio < 0) // view is portrait
        // {

        // } else { // view is square

        // }
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

    const layoutCanvas = (s : p5) => {
        
    };

};

let myp5 = new p5(s);

console.log('TOTO');