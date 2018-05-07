class Editor{
  constructor(dim, cols, rows){
    this.dim = dim;
    this.cols = cols;
    this.rows = rows;
    this.grid = [];
    this.reference = [];
  }

  createEmptyGrid(){
    for(var i = 0; i < this.cols; i++){
      for(var j = 0; j < this.rows; j++){
        var temp = new Block(i, j, "free", "lightBlue");
        this.grid.push(temp);
      }
    }
  }

  addGridElements(arr,type, col){
    for(var k = 0; k < arr.length; k++){
      var temp = new Block(arr[k].i, arr[k].j, type, col);
      this.grid[this.getIndex(arr[k].i,arr[k].j)] = temp;
    }
  }

  getGrid(){
    return this.grid;
  }

  getNeighbors(i, j){
    var index = this.getIndex(i,j);
    return this.grid[index].neighbors;
  }

  getIndex(i, j){
    //console.log(i * this.rows + j);
    return i * this.rows + j;
  }

  createWall(){
    if(mouseIsPressed){
      var i = testLib.snap(mouseX, this.dim) / dim;
      var j = testLib.snap(mouseY, this.dim) / dim;

      var index = this.getIndex(i, j);
      if(this.grid[index].type != "wall"){
        this.grid[index].type = "wall";
        this.grid[index].col = "lightYellow";
      }
    }
  }
  getWallIJ(){
    var temp = [];
    for(var i = 0; i < grid.length; i++){
      if(this.grid[i].type === "wall"){
        temp.push({i:this.grid[i].i, j:this.grid[i].j});
      }
    }
    return temp;
  }

  isWall(i, j){
    var index = this.getIndex(i, j);
    if(this.grid[index].type === "wall"){
      return true;
    }
    return false;
  }

  getWall(){
    var temp = [];
    for(var i = 0; i < grid.length; i++){
      if(this.grid[i].type === "wall"){
        temp.push(this.grid[i]);
      }
    }
    return temp;
  }

  drawWorld(){
    this.show(this.grid);
  }

  delWall(){
    if(mouseIsPressed && testLib.keys().del){
        this.del(this.grid, "wall");
    }
  }

  getNode(i, j){
    var index = this.getIndex(i, j);
    return this.grid[index];
  }

  setNeighbors(){
    for(var i = 0; i < this.grid.length; i++){
      this.grid[i].setNeighbors(this, this.cols, this.rows);
    }
  }

  del(blocks, type){

    var i = testLib.snap(mouseX, this.dim) / dim;
    var j = testLib.snap(mouseY, this.dim) / dim;

    var index = this.getIndex(i, j);
    if(this.grid[index].type != "free"){
      this.grid[index].type = "free";
      this.grid[index].col = "lightBlue";
    }
  }


  show(blocks){
    for(var k = 0; k < blocks.length; k++){
      var x = blocks[k].i * this.dim;
      var y = blocks[k].j * this.dim;

      fill(blocks[k].col);
      rect(x, y, this.dim, this.dim);
      // fill("black");
      // text(blocks[k].i + ", " + blocks[k].j, x + 3, y +15);
    }
  }
}
