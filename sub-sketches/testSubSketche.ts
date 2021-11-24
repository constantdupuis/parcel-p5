import p5 = require('p5');
import { P5SubSketch } from "../libs/P5SubSketche";

export class testSubSketche extends P5SubSketch{
    step_nbr = 10;

    constructor(p : p5.Graphics)
    {
        super(p);
    }

    setup() : void
    {
        this.p.background(100);
    }

    draw() : void
    {
        let ctx = this.p;
        let step_width = ctx.width / this.step_nbr;
        let step_height = ctx.height / this.step_nbr;

        ctx.stroke(200);
        for( let i = 0; i<this.step_nbr; i++)
        {
            ctx.line( step_width * i, 0, step_width * i, ctx.height  );
            ctx.line( 0, step_height * i, ctx.width, step_height * i  );
        }
        ctx.line(ctx.width * 0.1, ctx.height * 0.1, ctx.width * 0.9, ctx.height * 0.9);
    }
}