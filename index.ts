import p5 from 'p5';


const settings = {
    // width : 2481,
    // height: 3510
    // width : 3510,
    // height: 2481
    width : 500,
    height: 500
};

let canvasWidth = 1000;
let drawSurfaceWidth = 500;

const s = ( s :p5 ) => {


    let ds : p5.Graphics;
    let canvas_ratio : number;
    //let p : Particle = new Particle( new Vec2(10,10) );

    s.setup = () => {
        s.pixelDensity(1);
        ds = s.createGraphics(drawSurfaceWidth, drawSurfaceWidth);
        ds.pixelDensity(1);
        s.createCanvas(canvasWidth, canvasWidth);

        ds.background(200);
        let steps : 10;
        let step_width = drawSurfaceWidth / steps;
        for( let i = 0; i < steps; i++)
        {
            ds.strokeWeight(4);
            ds.stroke(0);
            ds.line(step_width*i, 0, step_width*i, drawSurfaceWidth);
            ds.line(0, step_width*i, drawSurfaceWidth, step_width*i );
        }
    };

    s.draw = () => {
        s.background(200,120,20);
        s.stroke(0,255,0);
        s.line( s.width * 0.1, s.height * 0.1, s.width * 0.9, s.height * 0.9);
        
        

        
        s.push();
        s.scale(1);
        s.image(ds, 0, 0);
        s.pop();
        

        // cnv.stroke(128);
        // cnv.strokeWeight(10);
        // cnv.line(0,0, settings.width, settings.height);
     };

    s.windowResized = () => {
        
    };



};

let myp5 = new p5(s);
