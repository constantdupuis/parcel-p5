import p5 = require('p5');
import Vec2 = require('./Vec2');

class Rectangle {
    x1 : number;
    y1 : number;
    x2 : number;
    y2 : number;

    constructor(x1 : number, y1 : number, x2 : number, y2: number)
    {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    isIn( point : Vec2) : boolean
    {
        if( point.x < this.x1 || point.x > this.x2 || point.y < this.y1 || point.y > this.y2) return false;
        return true;
    }
}

export = Rectangle;