class Block{
  constructor(i, j, type, col){
    this.i = i;
    this.j = j;
    this.type = type;
    this.col = col;
    this.neighbors = [];
  }

  setNeighbors(grid, cols, rows){
    this.neighbors = [];
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

  setType(type, col){
    this.type = type;
    this.col = col;
  }
}
