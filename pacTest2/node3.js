class Node3{
  constructor(i, j, col, dim, type){
    this.i = i;
    this.j = j;
    this.col = col;
    this.gCost = 0;
    this.hCost = 0;
    this.fCost = 0;
    this.neighbors = [];
    this.dim = dim;
    this.parrent = undefined;
    this.type = type;
    this.pathNum = -1;
  }
  show(){
    fill(this.col);
    rect(this.i * this.dim, this.j * this.dim, this.dim, this.dim);
    if(this.type === "path"){
      fill(0);
      textSize(16);
      text(this.pathNum, this.i * this.dim + 5, this.j * this.dim + 15);
    }
    // fill(0);
    // textSize(16);
    // text(this.gCost, this.i * this.dim + 5, this.j * this.dim + 15);
    // text(this.hCost, this.i * this.dim + this.dim - 10, this.j * this.dim + 15);
    // textSize(50);
    // text(this.fCost, this.i * this.dim + this.dim / 2 - 15, this.j * this.dim + this.dim / 2 + 20);
  }

  showNeighbors(){
    for(var i = 0; i < this.neighbors.length; i++){
      fill("orange");
      rect(this.neighbors[i].i * this.neighbors[i].dim, this.neighbors[i].j * this.neighbors[i].dim, this.neighbors[i].dim, this.neighbors[i].dim);
    }
  }

 set(col, type){
   this.setCol = col;
   this.setType = type;
 }

  setPath(num){
    this.pathNum = num;
    this.col = "green";
    this.type = "path";
  }

  setFree(){
    this.pathNum = -1;
    this.col = "yellow";
    this.type = "free";
  }

  setG(g){
    this.gCost = g;
  }
  setH(h){
    this.hCost = h;
  }
  setF(f){
    this.fCost = f;
  }
  setCol(col){
    this.col = col;
  }
  setType(type){
    this.type = type;
  }
  setParrent(parrent){
    this.parrent = parrent;
  }
  setToWall(){
    this.type = "wall";
    this.col = "grey";
  }
  resetNode(){
    this.gCost = 0;
    this.hCost = 0;
    this.fCost = 0;
    this.parrent = undefined;
  }

  getNeighbors(){
    return this.neighbors;
  }

  setNeighbors(grid, cols, rows){
    // var cols = Math.sqrt(grid.nodes.length);
    // var rows = Math.sqrt(grid.nodes.length);
    //console.log(cols);
    if(this.i < cols - 1){
      this.neighbors.push(grid.getNode(this.i + 1, this.j));

    }
    if(this.i > 0){
      this.neighbors.push(grid.getNode(this.i - 1, this.j));
    }
    if(this.j < rows - 1){
      this.neighbors.push(grid.getNode(this.i, this.j + 1));
    }
    if(this.j > 0){
      this.neighbors.push(grid.getNode(this.i, this.j - 1));
    }
  }
}
