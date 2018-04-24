class Pacman{
  constructor(pos, size, speed, dir){
    this.x = pos.x;
    this.y = pos.y;
    this.w = size.w;
    this.h = size.h;
    this.speed = speed;
    this.dir = dir;
  }

  update(){
    this.show();
  }

  show(){
    fill("yellow");
    this.move();
    ellipse(this.x, this.y, this.w, this.h);
  }

  move(){
    if(testLib.keys().r){
      this.dir = "right";
      this.x += this.speed;
    }
    if(testLib.keys().l){
      this.dir = "left";
      this.x -= this.speed;
    }
    if(testLib.keys().u){
      this.dir = "up";
      this.y -= this.speed;
    }
    if(testLib.keys().d){
      this.dir = "down";
      this.y += this.speed;
    }
  }

}
