import p5 = require('p5');


class Vec2 {
    x: number;
    y: number;

    static fromP5Vector( src : p5.Vector ) : Vec2
    {
        return new Vec2(src.x, src.y);
    }

    constructor(x: number = 0, y: number = 0)
    {
        this.x = x;
        this.y = y;
    }

    
    add(vec : Vec2) : void
    {
        this.x += vec.x;
        this.y += vec.y;
    }

    getAdd(vec : Vec2) : Vec2
    {
        var ret : Vec2 = new Vec2(this.x, this.y);
        ret.add( vec );
        return ret;
    }

    mult(factor : number | Vec2) : void
    {
        if( typeof factor == "number" )
        {
            this.x *= factor;
            this.y *= factor;
        }else{
            this.x *= factor.x;
            this.y *= factor.y;
        }
    }

    div(factor : number | Vec2) : void
    {
        if( typeof factor == "number")
        {
            this.x /= factor;
            this.y /= factor;
        }else{
            this.x /= factor.x;
            this.y /= factor.y;
        }
    }

    getMult(factor : number | Vec2) : Vec2
    {
        var ret : Vec2 = new Vec2(this.x, this.y);
        ret.mult(factor);
        return ret;
    }

    getDiv(factor : number | Vec2) : Vec2
    {
        var ret : Vec2 = new Vec2(this.x, this.y);
        ret.div(factor);
        return ret;
    }
}

export = Vec2;