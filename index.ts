import p5 from 'p5';

const settings = {
    // width : 2481,
    // height: 3510,
    width : 3510,
    height: 2481,
    // width : 800,
    // height: 800,
    bg_color : "white"
};

const s = ( s : p5 ) => {

    let canvas : p5.Graphics;
    let scale = 1.0;
    let translate : p5.Vector = s.createVector();
    let canvas_ratio : number;

    s.setup = () => {
        layoutCanvas();
    };

    s.draw = () => {
        canvas.background(0);
        canvas.stroke(128);
        canvas.strokeWeight(10);
        canvas.line(settings.width * 0.1, settings.height * 0.1, settings.width * 0.9, settings.height * 0.9);

        s.push();
        s.scale(scale);
        s.translate(translate);
        s.image(canvas, 0, 0);
        s.pop();
     };

    s.windowResized = () => {
        layoutCanvas();
    };

    const layoutCanvas = () => {
        canvas_ratio = settings.width/settings.height;
        s.pixelDensity(1);
        s.createCanvas(s.windowWidth, s.windowHeight);
        s.background(settings.bg_color);

        canvas = s.createGraphics(settings.width, settings.height);
        canvas.pixelDensity(1);
        
        if( settings.width > s.windowWidth || settings.height > s.windowHeight)
        {
            let window_ratio = s.windowWidth / s.windowHeight;
            if( window_ratio >= canvas_ratio)
            {
                scale = s.windowHeight/(settings.height);
            }else{
                scale = s.windowWidth/(settings.width);
            }
            translate.x = (s.windowWidth - (canvas.width*scale)) / 2.0;
            translate.y = (s.windowHeight - (canvas.height*scale)) / 2.0;
        }else{
            scale = 1.0;
            translate.x = (s.windowWidth - canvas.width) / 2.0;
            translate.y = (s.windowHeight - canvas.height) / 2.0;
        }
    }

};

let myp5 = new p5(s);
