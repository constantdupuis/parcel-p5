import p5 = require('p5');
import { P5SubSketch } from "../libs/P5SubSketche";
import { Grid } from '../libs/Grid';
import SimplexNoise from 'simplex-noise';

export class pFlowFeather extends P5SubSketch{

    grid : Grid;
    animation = 1462;
    animation_speed = 0.0002;
    sn : any;
    constructor(p : p5.Graphics)
    {
        super(p);
    }

    setup() : void
    {
        let ctx = this.p;
        this.sn = new SimplexNoise();
        this.grid = new Grid(40, 40, this.p.width, this.p.height)
        ctx.background(100);
        ctx.noStroke();
        ctx.noiseDetail(2,0.5);
        ctx.rectMode( ctx.CENTER);
        ctx.ellipseMode( ctx.CENTER);
    }

    draw() : void
    {
        // Update
        this.animation += this.animation_speed * this.p.deltaTime;

        // Draw
        let ctx = this.p;
        for( let c of this.grid.cells )
        {   
            //let n = ctx.noise( c.pos.x * 0.003, c.pos.y * 0.003, this.animation)
            let n = this.sn.noise3D( c.pos.x * 0.003, c.pos.y * 0.003, this.animation)
            n = (n * .5) + .5;

            ctx.stroke(128);
            ctx.fill(n*255);

            
            ctx.push();
            ctx.translate( c.pos.x, c.pos.y);
            ctx.rotate( n * ctx.TWO_PI );
            ctx.rect(0,0, 100, 20);
            //ctx.ellipse(0,0, 100, 20);
            ctx.pop();

            //ctx.fill(n*255);
            //ctx.rect( c.top_left.x, c.top_left.y, c.size.x, c.size.y);
        }
    }
}