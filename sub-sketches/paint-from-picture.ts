import p5 = require('p5');
import { P5SubSketch } from "../libs/P5SubSketche";
import { Grid } from '../libs/Grid';
import Vec2 = require("../libs/Vec2");
import SimplexNoise from 'simplex-noise';

class pixelColor
{
    r : number;
    g : number;
    b : number;
    a : number;

    constructor(r: number, g : number, b : number, a : number)
    {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}

export class PaintFromPicture extends P5SubSketch{

    grid : Grid;
    animation = 1462;
    animation_speed = 0.0002;
    sn : any;
    img : p5.Image;
    loaded : boolean = false;

    constructor(p : p5.Graphics)
    {
        super(p);
    }

    preload() : void
    {
        console.log("preload");
    }

    setup() : void
    {
        console.log("setup");
        let ctx = this.p;
        this.sn = new SimplexNoise();
        this.grid = new Grid(40, 40, ctx.width, ctx.height);
        console.log("load image");
        ctx.loadImage("assets/img/_DSC0050.jpg", img => {
            this.img = img;
            this.img.loadPixels();
            this.loaded = true;
            console.log("image loaded");
        }, 
        ev => {
            console.log("image loaded failed");
            console.log(ev);
        });
        
        
    }

    draw() : void
    {
        if( !this.loaded ) return;
        console.log("draw");
        // Update
        this.animation += this.animation_speed * this.p.deltaTime;

        // Draw
        let ctx = this.p;
        for( let c of this.grid.cells )
        {   
            let col = this.normPickPixel(this.img, c.pos);
            ctx.color( col.r, col.g, col.b, col.a);
            ctx.circle( c.pos.x, c.pos.y, 15);
        }
    }

    normPickPixel( img : p5.Image , pos : Vec2 ) : pixelColor
    {
        let nx = Math.floor(img.width * pos.x);
        let ny = Math.floor(img.height * pos.y);

        let pixelIndex = (nx + ny * img.width) * 4;
        return new pixelColor(img.pixels[pixelIndex], 
                            img.pixels[pixelIndex] + 1,
                            img.pixels[pixelIndex] + 2, 
                            img.pixels[pixelIndex] + 3);
        //console.log(`pixel coord (${nx}x${ny})`);
    }
}