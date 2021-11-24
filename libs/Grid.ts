import Vec2 from "./Vec2";

export class GridCell
{
    pos : Vec2;
    size : Vec2;
    top_left : Vec2;
    constructor(pos : Vec2, size : Vec2, top_left : Vec2)
    {
        this.pos = pos;
        this.size = size;
        this.top_left = top_left;
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

        let size = new Vec2(this.cell_width, this.cell_height);
        for( let i = 0 ; i < this.cols; i++)
            for( let j = 0; j< this.rows; j++)
            {
                let top_left = new Vec2(i*this.cell_width, j*this.cell_height);
                let c = new GridCell( 
                    top_left.getAdd( size.getMult(this.pos_in_cell)), 
                    size , 
                    top_left );
                this.cells.push(c);
            }
    }

}