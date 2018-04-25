class Pacman{
  constructor(pos, size, speed, dir){
    this.x = pos.x;
    this.y = pos.y;
    this.w = size.w;
    this.h = size.h;
    this.speed = speed;
    this.speedX = 0;
    this.speedY = 0;
    this.dir = dir;
  }

  update(wall){
    this.show();
    this.move(wall);
    this.y += this.speedY;
    this.x += this.speedX;
  }

  show(){
    fill("yellow");
    ellipse(this.x, this.y, this.w, this.h);
  }

  move(wall){
    if(testLib.keys().r){
      this.dir = "right";
      this.speedX = this.speed;
      this.checkWall(wall, "x");
      //this.speedY = 0;
    }
    else if(testLib.keys().l){
      this.dir = "left";
      this.speedX = -this.speed;
      this.checkWall(wall, "x");
      //this.speedY = 0;
    }
    else{
      this.speedX = 0;
    }
    if(testLib.keys().u){
      this.dir = "up";
      this.speedY = -this.speed;
      this.checkWall(wall, "y");
      //this.speedX = 0;
    }
    else if(testLib.keys().d){
      this.dir = "down";
      this.speedY = this.speed;
      this.checkWall(wall, "y");
      //this.speedX = 0;
    }
    else{
      this.speedY = 0;
    }
  }
  
  checkWall(wall, xy){
    var moveAvailable = {
      l:true,
      r:true,
      u:true,
      d:true
    };
    var pacPos = {
      x:this.x - this.w / 2,
      y:this.y - this.h / 2,
      w:this.w,
      h:this.h
    };
    var pcOffBound = this.getOffsetBound(pacPos);

    for(var i = 0; i < wall.length; i++){

      if(testLib.rectRectCol(wall[i], pcOffBound)){
        if(xy === "x"){
          this.speedX = 0;
        }
        if(xy === "y"){
          this.speedY = 0;
        }
        break;
      }
    }
  }

  getOffsetBound(pacPosition){
    var offRect = {
      x:pacPosition.x + this.speedX,
      y:pacPosition.y + this.speedY,
      w:pacPosition.w,
      h:pacPosition.h
    };
    return offRect;
  }
}
