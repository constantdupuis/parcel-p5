import Vec2 from "./Vec2";

export class GridCell
{
    constructor()
    {

    }
}

export class Grid {
    
    cols : number;
    rows : number;
    cell_width : number;
    cell_height : number;
    width : number;
    height : number;
    pos_in_cell : Vec2;
    cells : Array<GridCell> = new Array<GridCell>();

    constructor( cols : number, rows : number, width : number, height : number, pos_in_cell? : Vec2)
    {
        this.cols = cols;
        this.rows = rows;
        this.width = width;
        this.height = height;
        this.cell_width = width / cols;
        this.cell_height = height / rows;

        if( pos_in_cell == undefined)
        {
            this.pos_in_cell = new Vec2( 0.5,0.5);
        }else{
            this.pos_in_cell = pos_in_cell;
        }
    }

}