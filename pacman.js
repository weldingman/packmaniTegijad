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
    ellipse(this.x, this.y, this.w, this.h);
  }

}
