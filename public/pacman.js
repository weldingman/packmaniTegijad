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

    if(this.checkWall(wall, "x")){
      this.speedX = 0;
    }
    if(testLib.keys().r){
      this.speedX = this.speed;
      if(!this.checkWall(wall, "x")){
          this.dir = "right";
      }
      else{
          this.dir = this.moveDir("right");
      }
    }

    if(testLib.keys().l){
      this.speedX = -this.speed;
      if(!this.checkWall(wall, "x")){
        this.dir = "left";
      }
      else{
          this.dir = this.moveDir("left");
      }
    }

    if(this.checkWall(wall, "Y")){
      this.speedY = 0;
    }

    if(testLib.keys().u){
      this.speedY = -this.speed;
      if(!this.checkWall(wall, "y")){
        this.dir = "up";
      }
      else{
          this.dir = this.moveDir("up");
      }
    }

    if(testLib.keys().d){
      this.speedY = this.speed;
      if(!this.checkWall(wall, "y")){
        this.dir = "down";
      }
      else{
          this.dir = this.moveDir("down");
      }
    }
  }

  moveDir(exclude){
    if(exclude != "down"){
      if(testLib.keys().d){
        return "down";
      }
    }
    if(exclude != "up"){
      if(testLib.keys().u){
        return "up";
      }
    }
    if(exclude != "left"){
      if(testLib.keys().l){
        return "left";
      }
    }
    if(exclude != "right"){
      if(testLib.keys().r){
        return "right";
      }
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
        return true;
      }
    }
    return false;
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
