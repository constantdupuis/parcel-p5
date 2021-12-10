import p5 = require('p5');
import { P5SubSketch } from "../libs/P5SubSketche";
import { Grid } from '../libs/Grid';
import SimplexNoise from 'simplex-noise';

export class noiseExperiments extends P5SubSketch{

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
        this.grid = new Grid(400, 400, this.p.width, this.p.height)
        this.p.background(100);
        //this.p.stroke(200);
        this.p.noStroke();
    }

    draw() : void
    {
        // update
        //this.animation += this.animation_speed;

        // draw 
        
        let ctx = this.p;
        let n : number;
        for( let c of this.grid.cells )
        {
            //n = this.add(c.pos.x, c.pos.y);
            //n = this.multiply(c.pos.x, c.pos.y);
            n = this.rotate(c.pos.x, c.pos.y);
            ctx.fill( n * 255 );
            ctx.rect( c.top_left.x, c.top_left.y, c.size.x, c.size.y);
        }
    }

    multiply( x: number, y: number ) : number
    {
        const nbr_samples = 10;
        let n, s, f : number;
        n = 1.0;
        f = 0.001;
        for( let si = 0; si < nbr_samples; si++)
        {
            s = this.sn.noise3D( x * f, y * f, this.animation)
            s = s * 0.5 + 0.5;
            n *= s;
            n *= 1.6;
            f *= 2.5;
        }
        return n;
    }

    add( x: number, y: number ) : number
    {
        const nbr_samples = 10;
        let n, s, f : number;
        n = 0.0;
        f = 0.003;
        for( let si = 0; si < nbr_samples; si++)
        {
            s = this.sn.noise3D(x * f, y * f, this.animation)
            s = s * 0.5 + 0.5;
            n += s / nbr_samples;
            f *= 2.5;
        }
        return n;
    }

    rotate( x: number, y: number ) : number
    {
        const nbr_samples = 2;
        let fbm, sample : number;
        fbm = 0.0;
        let frequency = 0.003;
        let frequency_damp = 2.0;
        let amplitude = 0.5;
        let amplitude_damp = 0.5;
       
        for( let si = 0; si < nbr_samples; si++)
        {
            sample = this.sn.noise3D(x * frequency, y * frequency, this.animation)
            sample = sample * 0.5 + 0.5;
            fbm += sample * amplitude;
            amplitude *= amplitude_damp;
            frequency *= frequency_damp;
        }
        return fbm;
    }
}