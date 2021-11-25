import p5 = require('p5');
import { P5SubSketch } from "../libs/P5SubSketche";
import { Grid } from '../libs/Grid';
import SimplexNoise from 'simplex-noise';

export class pFlowFeather extends P5SubSketch{

    grid : Grid;
    animation = 1462;
    animation_speed = 0.05;
    sn : any;
    constructor(p : p5.Graphics)
    {
        super(p);
    }

    setup() : void
    {
        this.sn = new SimplexNoise();
        this.grid = new Grid(100, 100, this.p.width, this.p.height)
        this.p.background(100);
        this.p.noStroke();
        this.p.noiseDetail(2,0.5);
    }

    draw() : void
    {
        // Update
        this.animation += this.animation_speed;

        // Draw
        let ctx = this.p;
        for( let c of this.grid.cells )
        {   
            //let n = ctx.noise( c.pos.x * 0.01, c.pos.y * 0.01, this.animation)
            let n = this.sn.noise3D( c.pos.x * 0.003, c.pos.y * 0.003, this.animation)
            n = (n * .5) + .5;
            ctx.fill(n*255);
            ctx.rect( c.top_left.x, c.top_left.y, c.size.x, c.size.y);
        }
    }
}