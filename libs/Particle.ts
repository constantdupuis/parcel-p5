import Vec2 = require('./Vec2');
import Rectangle = require('./Rectangle');

class Particle{
    pos : Vec2;
    acc : Vec2;
    vel : Vec2;
    protected life : Number;
    protected start_life: Number;
    css_color : string | CanvasGradient | CanvasPattern;

    constructor( pos : Vec2)
    {
        this.pos = pos;
        this.life = this.start_life = Number.MAX_SAFE_INTEGER;
        this.vel = new Vec2(0, 0);
        this.acc = new Vec2(0, 0);
    }

    update( deltaTime? : number) : void
    {
        if( this.life <= 0) return;

        let dTime : number = 1.0;
        if( deltaTime !== undefined)
        {
            dTime = deltaTime;
        }
        this.vel.add(this.acc.getMult(dTime));
        this.pos.add(this.vel);
        this.life = +this.life - 1;
    }

    setLife( new_life : Number)
    {
        this.start_life = new_life;   
        this.life = new_life;  
    }

    getLife() : Number
    {
        return this.life;
    }

    isDead() : boolean
    {
        return this.life <= 0;
    }

    isIn( area : Rectangle) : boolean
    {
        return area.isIn( this.pos);
    }

}

export  = Particle;