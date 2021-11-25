import p5 = require('p5');
import { P5SubSketch } from "../libs/P5SubSketche";

export class testSubSketche extends P5SubSketch{
    step_nbr = 10;
    anim_speed : p5.Vector;
    anim_pos : p5.Vector;


    constructor(p : p5.Graphics)
    {
        super(p);
        
    }

    setup() : void
    {
        this.p.background(100);
        this.anim_pos = this.p.createVector(0,0);
        this.anim_speed = this.p.createVector(10,11);
    }

    draw() : void
    {
        this.p.background(100);
        
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

        this.anim_pos= this.anim_pos.add( this.anim_speed );
        ctx.stroke('yellow');
        ctx.fill('red');
        ctx.circle( this.anim_pos.x, this.anim_pos.y, ctx.width * 0.1);

        if( this.anim_pos.x < 0 || this.anim_pos.x > ctx.width)
        {
            this.anim_speed.x *= -1;
        }
        else if( this.anim_pos.y < 0 || this.anim_pos.y > ctx.height)
        {
            this.anim_speed.y *= -1;
        }
    }
}