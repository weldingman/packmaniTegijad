class Pacman{
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

  move(grid, path, end){
    var i = testLib.snap(this.x, this.dim) / this.dim;
    var j = testLib.snap(this.y, this.dim) / this.dim;

    if(this.setI != this.i && this.setJ != this.j && this.setJ != end.j){
      if(this.moveTo(this.setI , this.setJ)){
        var index = this.getIndex(this.i, this.j);
        grid[index].setType("arrived", "red");
        this.arrivedArr.push(grid[index]);
        console.log(this.arrivedArr);
        this.arrived = true;
      }
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
            this.setI = neighbors[k].i;
            this.setJ = this.j;
            console.log("right");
          }
        }
        else{
           this.moveRight = false;
        }
      }
      if(neighbors[k].i < this.i){
        fill("yellow");
        text("on left" ,neighbors[k].i * this.dim + this.dim / 2, neighbors[k].j * this.dim + this.dim /2);
        if(neighbors[k].type === "path"){
          this.moveLeft = true;
          if(this.arrived){
            this.arrived = false;

            this.setI = neighbors[k].i;
            this.setJ = this.j;
            console.log(j);
          }
        }
        else{
           this.moveLeft = false;
        }
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
            // console.log(j);
          }
        }
        else{
           this.moveDown = false;
        }
      }
    }

      // if(neighbors[k].j != j / dim + 1 && neighbors[k].i === i / dim){
      //   j = testLib.snap(this.y + this.dim / 2 - this.speed, this.dim);
      //   neighbors = this.getNeighbors(i / dim, j / dim, grid);
      //   if(neighbors[k].j != j / dim + 1 && neighbors[k].i === i / dim){
      //     if(neighbors[k].type === "wall"){
      //       up = false;
      //       fill("red");
      //     }
      //     if(neighbors[k].type === "path"){
      //       fill("orange");
      //       // this.moveUp = true;
      //     }
      //   }
      // }
      //
      // if(neighbors[k].j != j / dim - 1 && neighbors[k].i === i / dim){
      //   j = testLib.snap(this.y - this.dim / 2 + this.speed - 1, this.dim);
      //   neighbors = this.getNeighbors(i / dim, j / dim, grid);
      //   if(neighbors[k].j != j / dim - 1 && neighbors[k].i === i / dim){
      //     if(neighbors[k].type === "wall"){
      //       down = false;
      //       fill("red");
      //     }
      //     if(neighbors[k].type === "path"){
      //       fill("orange");
      //       // this.moveDown = true;
      //     }
      //
      //   }
      // }
      //
      //   if(neighbors[k].i != i / dim + 1 && neighbors[k].j === j / dim){
      //     i = testLib.snap(this.x + this.dim / 2 - this.speed, this.dim);
      //     neighbors = this.getNeighbors(i / dim, j / dim, grid);
      //     if(neighbors[k].i != i / dim + 1 && neighbors[k].j === j / dim){
      //       if(neighbors[k].type === "wall"){
      //         left = false;
      //         fill("red");
      //       }
      //       if(neighbors[k].type === "path"){
      //         fill("orange");
      //         // this.moveLeft = true;
      //       }
      //
      //       // if(j / dim === path[path.length - 1].j && neighbors[k].i + 1 === path[path.length - 1].i){
      //       //     console.log(this.getIndex(i / dim, j / dim));
      //       //     grid[this.getIndex(i / dim, j / dim)].setType("free", "yellow");
      //       //     path.splice(path.length - 1, 1);
      //       //   }
      //     }
      //   }
      //
      //   if(neighbors[k].i != i / dim - 1 && neighbors[k].j === j / dim){
      //     // console.log(neighbors[k].i);
      //     i = testLib.snap(this.x - this.dim / 2 + this.speed - 1, this.dim);
      //     j = testLib.snap(this.y, this.dim);
      //     neighbors = this.getNeighbors(i / dim, j / dim, grid);
      //     if(neighbors[k].i != i / dim - 1 && neighbors[k].j === j / dim){
      //       if(neighbors[k].type === "wall"){
      //         right = false;
      //         fill("red");
      //       }
      //       if(neighbors[k].type === "path"){
      //         fill("orange");
      //         // this.moveRight = true;
      //       }
      //     }
      //   }
      //
      //
      //   // console.log(testI + " " + path[path.length - 1].i + " " + testJ + " " + path[path.length - 1].j);
      //   // if((testI === path[path.length - 2].i
      //   //  && testJ === path[path.length - 2].j )|| (testI === path[path.length - 1].i
      //   //   && testJ === path[path.length - 1].j)){
      //     // fill("green");
      //     // grid[this.getIndex(path[path.length - 1].i, path[path.length - 1].j)].setType("free", "yellow");
      //     // //grid[this.getIndex(path[path.length - 2].i, path[path.length - 2].j)].setType("free", "yellow");
      //     // path.splice(path.length - 1, 1);
      //     // console.log(testLib.snap(this.x - dim / 2, this.dim) / dim + " " + testLib.snap(this.y - dim / 2, this.dim) / dim);
      //     // if(this.aRight){
      //     //   this.aRight = false;
      //     // }
      //     // if(this.aLeft){
      //     //   this.aLeft = false;
      //     // }
      //     // if(this.aUp){
      //     //   this.aUp = false;
      //     // }
      //     // if(this.aDown){
      //     //   this.aDown = false;
      //     // }
      //   //   this.moveRight = false;
      //   //   this.moveDown = false;
      //   //   this.moveLeft = false;
      //   //   this.moveUp = false;
      //   // }
      //
      //
      // // if(neighbors[k].j != j / dim - 1 && neighbors[k].i === i / dim && neighbors[k].type === "wall"){
      // //   j = testLib.snap(this.y - this.dim / 2 + this.speed - 1, this.dim);
      // //   // console.log("wall");
      // //   neighbors = this.getNeighbors(i / dim, j / dim, grid);
      // //   if(neighbors[k].j != j / dim - 1 && neighbors[k].i === i / dim && neighbors[k].type === "wall"){
      // //
      // //     down = false;
      // //     fill("red");
      // //   }
      // // }
      // //
      // //   if(neighbors[k].i != i / dim + 1 && neighbors[k].j === j / dim && neighbors[k].type === "wall"){
      // //     i = testLib.snap(this.x + this.dim / 2 - this.speed, this.dim);
      // //     neighbors = this.getNeighbors(i / dim, j / dim, grid);
      // //     if(neighbors[k].i != i / dim + 1 && neighbors[k].j === j / dim && neighbors[k].type === "wall"){
      // //       left = false;
      // //       fill("red");
      // //     }
      // //   }
      // //
      // //   if(neighbors[k].i != i / dim - 1 && neighbors[k].j === j / dim && neighbors[k].type === "wall"){
      // //     // console.log(neighbors[k].i);
      // //     i = testLib.snap(this.x - this.dim / 2 + this.speed - 1, this.dim);
      // //     neighbors = this.getNeighbors(i / dim, j / dim, grid);
      // //     if(neighbors[k].i != i / dim - 1 && neighbors[k].j === j / dim && neighbors[k].type === "wall"){
      // //       right = false;
      // //       fill("red");
      // //     }
      // //   }
    //   rect(neighbors[k].i * this.dim, neighbors[k].j * this.dim, this.dim, this.dim);
    // }
      if(i  === this.x / dim){
        if(testLib.keys().u || this.moveUp){
          this.y -= this.speed;
        }
        if(testLib.keys().d || this.moveDown){
          this.y += this.speed;
        }
      }
      if(j === this.y / dim){
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
    fill("yellow");

    // if(this.i - 2 === i){
    //   this.i = i + 1;
    // }
    // if(this.i + 1 === i){
    //   this.i = i;
    // }
    // if(this.j - 2 === j){
    //   this.j = j + 1;
    // }
    // if(this.j + 1 === j){
    //   this.j = j;
    // }

    rect(this.x, this.y, this.dim, this.dim);
    fill("black");
    text(this.i + ", " + this.j, this.x + this.dim / 2 , this.y + this.dim / 2);
    // if(i = )
    //ellipse(this.x + this.dim / 2, this.y + this.dim / 2, 3, 3);
  }
}
