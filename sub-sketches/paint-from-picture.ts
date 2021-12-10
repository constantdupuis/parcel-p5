import p5 = require('p5');
import { P5SubSketch } from "../libs/P5SubSketche";
import { Grid } from '../libs/Grid';
import Vec2 = require("../libs/Vec2");
import Particle = require("../libs/Particle");
import SimplexNoise from 'simplex-noise';
import Rectangle = require('../libs/Rectangle');

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

class Pencil extends Particle
{
    width : number = 15;

    constructor( pos : Vec2)
    {
       super(pos); 
    }
}

export class PaintFromPicture extends P5SubSketch{

    // override static to force our prefered canvas settings to be used
    static usePreferedCanvasSize : boolean = true;
    static preferedCanvasSize : Vec2 = new Vec2(1600,1066);
    
    grid : Grid;
    animation = 1462;
    animation_speed = 0.0002;
    sn : any;
    noise_freq : number = 0.0009;
    img : p5.Image;
    loaded : boolean = false;
    pencils_nbr : number = 1000;
    pencils : Array<Pencil> = new Array<Pencil>();
    area : Rectangle;

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
        //this.grid = new Grid(100, 100, ctx.width, ctx.height);

        ctx.angleMode( ctx.RADIANS);

        console.log("load image");
        ctx.loadImage("img/_DSC0050.jpg", img => {

            this.img = img;
            this.img.loadPixels();
            this.loaded = true;
            console.log("image loaded");

            let imgWidth = this.img.width;
            let imgHeight = this.img.height;
            this.area = new Rectangle(0,0,imgWidth, imgHeight);
            for( let pi = 0; pi < this.pencils_nbr; pi ++ )
            {
                let p = new Pencil( new Vec2(ctx.random(imgWidth), ctx.random(imgHeight)));
                this.birthPencil( p );
                // p.vel.x = ctx.random();
                // p.vel.y = ctx.random();
                // p.setLife(ctx.random(100));
                this.pencils.push( p );   
            }
        }, 
        ev => {
            console.log("image loaded failed");
            console.log(ev);
        });
        
       
    }

    draw() : void
    {
        if( !this.loaded ) return;
        //console.log("draw");
        // Update
        this.animation += this.animation_speed * this.p.deltaTime;

        // Draw
        let ctx = this.p;

        ctx.noStroke();
        // this.pencils.forEach( pencil => {
        //     if( pencil.isDead())
        //     {
        //         this.birthPencil( pencil );
        //     }
        //     let col = this.pickPixel(this.img, pencil.pos);
        //     ctx.fill( col.r, col.g, col.b, col.a);
        //     ctx.circle( pencil.pos.x, pencil.pos.y, pencil.width);
        //     pencil.update();
        // });

        this.pencils.forEach( pencil => {
            if( pencil.isDead() || !this.area.isIn(pencil.pos))
            {
                this.birthPencil( pencil );
            }
            let col = this.pickPixel(this.img, pencil.pos);
            ctx.fill( col.r, col.g, col.b, col.a);
            ctx.circle( pencil.pos.x, pencil.pos.y, pencil.width);
            let n = this.sn.noise3D( pencil.pos.x * this.noise_freq, pencil.pos.y * this.noise_freq, this.animation)
            n = (n * .5) + .5;
            n *= ctx.TWO_PI;
            let rx = ctx.sin(n)
            let ry = ctx.cos(n)
            pencil.vel.x = rx * 4.0;
            pencil.vel.y = ry * 4.0;
            pencil.update();
        });

        //ctx.image(this.img, 10, 10);
        // for( let c of this.grid.cells )
        // {   
        //     let col = this.normPickPixel(this.img, c.norm_pos);
        //     ctx.noStroke();
        //     ctx.fill( col.r, col.g, col.b, col.a);
        //     ctx.circle( c.pos.x, c.pos.y, 15);
        // }
    }

    birthPencil( pencil : Pencil) : void
    {
        let ctx = this.p;
        pencil.width = 1 + ctx.random(20);
        //pencil.width = 2;
        pencil.pos.x = ctx.random(this.img.width);
        pencil.pos.y = ctx.random(this.img.height);
        pencil.vel = Vec2.fromP5Vector( p5.Vector.random2D() );
        pencil.setLife( 20);
    }

    normPickPixel( img : p5.Image , pos : Vec2 ) : pixelColor
    {
        let nx = Math.floor(img.width * pos.x);
        let ny = Math.floor(img.height * pos.y);
        let c = img.get(nx,ny);
        return new pixelColor(c[0], c[1], c[2], c[3]);
    }

    pickPixel( img : p5.Image , pos : Vec2 ) : pixelColor
    {
        let c = img.get(pos.x,pos.y);
        return new pixelColor(c[0], c[1], c[2], c[3]);
    }
}