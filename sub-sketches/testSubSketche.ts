import p5 = require('p5');
import { P5SubSketch } from "../libs/P5SubSketche";

export class testSubSketche extends P5SubSketch{
    constructor(p : p5.Graphics)
    {
        super(p);
    }

    setup() : void
    {

    }

    draw() : void
    {
        let ctx = this.p;
        ctx.background(0);
        ctx.stroke(255, 204, 0);
        ctx.line(ctx.width * 0.1, ctx.height * 0.1, ctx.width * 0.9, ctx.height * 0.9);
        // ctx.push();
        // let w = ctx.width / 2;
        // let h = ctx.height / 2;
        // ctx.translate( ctx.width / 2, ctx.height / 2);
        // //ctx.translate( 200,200);
        // ctx.fill(255, 204, 0);
        // ctx.circle(0,0,100);
        ctx.pop();
    }
}