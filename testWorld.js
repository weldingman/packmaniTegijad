class TestWorld{
  constructor(size){
    this.wall = [];
    this.w = size.w;
    this.h = size.h;
    this.gridX = [];
    this.gridY = [];
  };

  addWall(){

    var test = false;
    var testWall = {
      x:mouseX,
      y:mouseY,
      w:1,
      h:1
    };
    var drawWall = {
      x:mouseX,
      y:mouseY,
      w:this.w,
      h:this.h
    };
    for(var i = 0; i < this.wall.length; i++){
      if(testLib.rectRectCol(testWall, this.wall[i])){
        test = true;
      }
    }
    if(!test){

      drawWall.x = this.snap(mouseX , this.w);
      drawWall.y = this.snap(mouseY, this.h);
      this.wall.push(drawWall);
    }
  }

  update(){
    if(mouseIsPressed && mouseButton === LEFT){
      this.addWall();
    }
    if(mouseIsPressed && mouseButton === RIGHT){
      this.delWall();
    }
    this.show();
    return this.wall;
  }

  show(){
    for(var i = 0; i < this.wall.length; i++){
      fill(255);
      rect(this.wall[i].x, this.wall[i].y, this.wall[i].w, this.wall[i].h);
    }
  }

  delWall(){
    var testWall = {
      x:mouseX,
      y:mouseY,
      w:1,
      h:1
    };

    for(var i = 0; i < this.wall.length; i++){
      if(testLib.rectRectCol(testWall, this.wall[i])){
        this.wall.splice(i, 1);
      }
    }
  }

  snap(val, dim){
    var snapCndidate = dim * Math.floor(val/dim);
    return snapCndidate;
  }
}
