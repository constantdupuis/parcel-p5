import p5 = require('p5');
import { P5SubSketch } from "../libs/P5SubSketche";
import { Grid } from '../libs/Grid';

export class testGrid extends P5SubSketch{

    grid : Grid;
    constructor(p : p5.Graphics)
    {
        super(p);
    }

    setup() : void
    {
        this.grid = new Grid(10, 10, this.p.width, this.p.height)
        this.p.background(100);
    }

    draw() : void
    {
        let ctx = this.p;

        ctx.stroke(200);
        ctx.fill( "red" );

        for( let c of this.grid.cells )
        {
            //console.log(`cell (${c.pos.x}x${c.pos.y}) `);
            ctx.circle( c.pos.x, c.pos.y, 50);
        }
    }
}