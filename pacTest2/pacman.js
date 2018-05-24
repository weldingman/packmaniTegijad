class Pacman{
  constructor(pos, dim){
    this.x = pos.i * dim;
    this.y = pos.j * dim;
    this.i = pos.i;
    this.j = pos.j;
    this.dim = dim;
    this.followPathIndex = 1;
    this.speed = 5;
    this.move = {up:false, down:false, left:false, right:false};
  }
  show(){
    fill("blue");
    rect(this.x ,this.y, this.dim, this.dim);
    fill(0);
    text(this.x + " " + this.y, this.x ,this.y)
  }
  getPosIJ(){
    return {i:this.i, j:this.j};
  }

  getPosXY(){
    return {x:this.x, y:this.y};
  }

  newPath(){
    this.followPathIndex = 1;
  }

  updateIJ(){
    if(this.x < (this.i - 2) * this.dim + this.dim + 1){
      this.followPathIndex += 1;
      this.i -= 1;
    }
    if(this.x + this.dim + 1 > (this.i + 2) * this.dim){
      this.followPathIndex += 1;
      this.i += 1;
    }
    if(this.y - 1 < (this.j - 2) * this.dim + this.dim){
      this.followPathIndex += 1;
      this.j -= 1;
    }
    if(this.y + this.dim + 1 > (this.j + 2) * this.dim){
      this.followPathIndex += 1;
      this.j += 1;
    }
    // console.log(this.j);
  }

  followPath(i,j,index){

    if(this.followPathIndex === index){
      this.updateIJ();
      if(i > this.i){
        this.x += this.speed;
      }
      if(i < this.i || this.move.left){
        this.x -= this.speed;
      }
      if(j > this.j){
        this.y += this.speed;
      }
      if(j < this.j){
        this.y -= this.speed;
      }
    }

  }

  moveTo(walls){
    var mov = this.moveDir();
    var i = help.snap(this.x, this.dim) / this.dim;
    var j = help.snap(this.y, this.dim) / this.dim;
    var wallI = {r:0, l:0};
    if(mov){
      for(var k = 0; k < walls.length; k++){
        if(walls[k].i === i + 1){
          wallI.l = walls[k].i * this.dim + this.dim;
        }
        if(walls[k].i === i - 1){
          wallI.r = walls[k].i * this.dim + this.dim;
        }
        if(walls[k].j === j + 1){
          wallI.d = walls[k].j * this.dim + this.dim;
        }
        if(walls[k].j === j - 1){
          wallI.u = walls[k].j * this.dim + this.dim;
        }
      }
      if(j === this.y / this.dim){
        if(this.x + this.speed > wallI.l){
          if(this.move.right){
            this.x += this.speed;
          }
        }
        if(this.x > wallI.r){
          if(this.move.left){
            this.x -= this.speed;
          }
        }

      }
      if(i === this.x / this.dim){
        if(this.move.down){
          this.y += this.speed;
        }
        if(this.move.up){
          this.y -= this.speed;
        }
      }
  }
}

  moveDir(){
    var mov = false;
    this.move.left = false;
    this.move.down = false;
    this.move.up = false;
    this.move.right = false;
    if(keyIsDown(LEFT_ARROW)){
      this.move.left = true;
      mov = true;
    }
    if(keyIsDown(RIGHT_ARROW)){
      this.move.right = true;
      mov = true;
    }
    if(keyIsDown(UP_ARROW)){
      this.move.up = true;
      mov = true;
    }
    if(keyIsDown(DOWN_ARROW)){
      this.move.down = true;
      mov = true;
    }
    return mov;
  }
}
