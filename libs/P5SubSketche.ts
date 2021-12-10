import p5 = require('p5');
import Vec2 = require("../libs/Vec2");

export class P5SubSketch
{
    static usePreferedCanvasSize : boolean = false;
    static preferedCanvasSize : Vec2;

    p : p5.Graphics;
    constructor( p : p5.Graphics){
        this.p = p;
    }

    setup() : void
    {

    }

    draw() : void
    {

    }
}