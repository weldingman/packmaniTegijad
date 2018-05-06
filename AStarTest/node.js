class Node{
  constructor(i, j, dim){
    this.i = i;
    this.j = j;
    this.g = 0;
    this.h = 0;
    this.f = 0;
    this.dim = dim;
    this.neighbors = [];
    this.parrent = null;
  }
  display(col){
    fill(col);
    rect(this.i * this.dim, this.j * this.dim, this.dim, this.dim);
  }

  setValues(start, end, grid){
    this.setGCost(start);
    this.setHCost(end);
    this.setFCost();
    var cols = grid.length;
    var rows = grid[0].length;
    this.addNeighbors(grid, cols, rows);
  }

  setGCost(start){
    this.g = this.manhattanDist(start, this);
  }
  setHCost(end){
    this.h = this.manhattanDist(end, this);
  }
  setFCost(){
    this.f = this.g + this.h;
  }

  manhattanDist(a, b){
    var d = abs(a.i - b.i) + abs(a.j - b.j);
    return d;
  }
  addNeighbors(grid, cols, rows){
    if(this.i < cols - 1){
      this.neighbors.push(grid[this.i + 1][this.j]);
    }
    if(this.i > 0){
      this.neighbors.push(grid[this.i - 1][this.j]);
    }
    if(this.j < rows - 1){
      this.neighbors.push(grid[this.i][this.j + 1]);
    }
    if(this.j > 0){
      this.neighbors.push(grid[this.i][this.j - 1]);
    }
  }
}
