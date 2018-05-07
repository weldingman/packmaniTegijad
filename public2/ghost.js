class Ghost{
  constructor(i, j, dim, rows, cols){
    this.i = i;
    this.j = j;
    this.x = i * dim;
    this.y = j * dim;
    this.dim = dim;
    this.speed = 1;
    this.rows = rows;
    this.cols = cols;
    this.moveUp = false;
    this.moveDown = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.moving = false;
    this.setI = i;
    this.setJ = j;
    this.arrived = false;
    this.lockPos = true;
    this.arrivedArr = [];
  }

  moveTo(iIn, jIn){
    var i = testLib.snap(this.x, this.dim) / this.dim;
    var j = testLib.snap(this.y, this.dim) / this.dim;

    if(this.i === iIn && this.j === jIn){
      return true;
    }
    return false;
  }

  getPathIndex(i, j, path){
    for(var k = 0; k < path.length; k++){
      if(path[k].i === i && path[k].j === j){
        return k;
      }
    }
    return -1;
  }
  setPos(i,j){
    this.i = i;
    this.j = j;
  }
  getPosXY(){
    return {x:this.x, y:this.y};
  }

  getSetIJ(){
    return {i:this.setI, j:this.setJ};
  }

  move(grid, path){
    // console.log(grid);
    var i = testLib.snap(this.x, this.dim) / this.dim;
    var j = testLib.snap(this.y, this.dim) / this.dim;

    if(this.moveTo(this.setI , this.setJ)){
      var index = this.getIndex(this.i, this.j);

      grid[index].setType("arrived", "red");
      // this.arrivedArr.push(grid[index]);

      this.arrived = true;
    }

    if(this.i - 2 === testLib.snap(this.x - 1, this.dim) / this.dim){
      this.i = i;
      console.log("left");
    }

    if(this.i + 1 === i){
      this.i = i;
    }

    if(this.j + 1 === j){
      this.j = j;
      console.log("down");
    }

    if(this.j - 2 === testLib.snap(this.y - 1, this.dim) / this.dim){
      this.j = j;
      console.log(this.j);
    }
    var neighbors = this.getNeighbors(this.i , this.j, grid);
    // console.log(neighbors);
    // path.splice(path.length - 1, 1);
    for(var k = 0; k < neighbors.length; k++){
      // fill("green");
      // rect(neighbors[k].i * this.dim, neighbors[k].j * this.dim, this.dim, this.dim);
      if(neighbors[k].i > this.i){
        fill("yellow");
        text("on right" ,neighbors[k].i * this.dim + this.dim / 2, neighbors[k].j * this.dim + this.dim /2);
        if(neighbors[k].type === "path"){
          this.moveRight = true;
          if(this.arrived){
            this.arrived = false;
            console.log(neighbors[k].i + " " + this.i);
            this.setI = neighbors[k].i;
            this.setJ = this.j;
            console.log("set I at: " + (neighbors[k].i));
          }
        }
        else{
           this.moveRight = false;
        }
      }

      if(neighbors[k].i < this.i){
        // console.log(neighbors[k].i + " - " + this.i);
        // console.log(neighbors[k]);
        fill("yellow");
        text("on left" ,neighbors[k].i * this.dim + this.dim / 2, neighbors[k].j * this.dim + this.dim /2);
        if(neighbors[k].type === "path"){
          this.moveLeft = true;
          if(this.arrived){
            this.arrived = false;
            console.log(neighbors[k].i + " " + this.i);
            this.setI = neighbors[k].i;
            this.setJ = this.j;
            console.log("set I at: " + (neighbors[k].i));
          }
        }
      }
      else{
         this.moveLeft = false;
      }
      if(neighbors[k].j < this.j){
        fill("yellow");
        text("on top" ,neighbors[k].i * this.dim + this.dim / 2, neighbors[k].j * this.dim + this.dim /2);
        if(neighbors[k].type === "path"){
          this.moveUp = true;
          if(this.arrived){
            this.arrived = false;
            this.setI = this.i;
            this.setJ = neighbors[k].j;
            console.log("set J at: " + (neighbors[k].j));
          }
        }
        else{
           this.moveUp = false;
        }
      }
      if(neighbors[k].j > this.j){
        fill("yellow");
        text("on bottom" ,neighbors[k].i * this.dim + this.dim / 2, neighbors[k].j * this.dim + this.dim /2);
        if(neighbors[k].type === "path"){
          this.moveDown = true;
          if(this.arrived){
            this.arrived = false;
            this.setI = this.i;
            this.setJ = neighbors[k].j;
            console.log("set J at: " + (neighbors[k].j));
          }
        }
        else{
           this.moveDown = false;
        }
      }
    }

      if(i  === this.x / dim){

        if(testLib.keys().u || this.moveUp){
          this.y -= this.speed;
        }
        if(testLib.keys().d || this.moveDown){
          this.y += this.speed;
        }
      }
      if(j === this.y / dim){
        // console.log(this.moveLeft);
        // console.log(this.moveRight);
        if(testLib.keys().l || this.moveLeft){
          this.x -= this.speed;
        }
        if(testLib.keys().r || this.moveRight){
          this.x += this.speed;
        }
      }
  }

  getNeighbors(i, j, grid){
    var index = this.getIndex(i,j);
    return grid[index].neighbors;
  }

  getIndex(i, j){
    //console.log(i * this.rows + j);
    return i * this.cols + j;
  }

  getPos(){
    var i = testLib.snap(this.x, this.dim);
    var j = testLib.snap(this.y, this.dim);
    return {i:i, j:j};
  }

  show(){
    var i = testLib.snap(this.x, this.dim) / this.dim;
    var j = testLib.snap(this.y, this.dim) / this.dim;
    fill("red");

    rect(this.x, this.y, this.dim, this.dim);

  }
}
