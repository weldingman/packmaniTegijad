class TestWorld{
  constructor(size, wall = [], branch = []){
    this.wall = wall;
    this.branch = branch;
    this.w = size.w;
    this.h = size.h;
    this.wallBranch = [];
    this.loadWorld = true;
    this.saveWorld = true;
    this.showWorld = false;
    this.sW = true;
    this.pacTrace = [];
  };

  addWall(wallType, size){
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
      w:size.w,
      h:size.h,
    };
    for(var i = 0; i < wallType.length; i++){
      if(testLib.rectRectCol(testWall, wallType[i])){
        test = true;
      }
    }
    if(!test){
      drawWall.x = this.snap(mouseX , size.w);
      drawWall.y = this.snap(mouseY, size.h);
      wallType.push(drawWall);
    }
  }
  update(){
    if(mouseIsPressed && mouseButton === LEFT){
      if(testLib.keys().s){
        this.addWall(this.branch, {w:20, h:20});
      }
      else if(testLib.keys().pt){
        this.addWall(this.pacTrace, {w:20, h:20});
      }
      else{
        this.addWall(this.wall, {w:this.w, h:this.h});
      }
    }
    if(mouseIsPressed && mouseButton === RIGHT){
      this.delWall(this.wall);
      this.delWall(this.branch);
      this.delWall(this.pacTrace);
    }
    if(this.showWorld){
      this.show(this.wall, color("lightBlue"));
      this.show(this.branch, color(255));
      this.show(this.pacTrace, color("red"));
    }
    if(this.sW && testLib.keys().w){
      console.log("shwing/hiding world");
      this.showWorld = !this.showWorld;
      this.sW = false;
    }
    if(!testLib.keys().w){
      this.sW = true;
    }
    return {wall:this.wall,branch:this.branch};
  }

  updatePacTrace(pacman){

  }

  show(wallType, c){
    //console.log(wallType);
    for(var i = 0; i < wallType.length; i++){
      fill(c);
      rect(wallType[i].x, wallType[i].y, wallType[i].w, wallType[i].h);
    }
  }
  // need to add branch deletion
  delWall(wallType){
    var testWall = {
      x:mouseX,
      y:mouseY,
      w:1,
      h:1
    };

    for(var i = 0; i < wallType.length; i++){
      if(testLib.rectRectCol(testWall, wallType[i])){
        wallType.splice(i, 1);
      }
    }
  }

  snap(val, dim){
    var snapCndidate = dim * Math.floor(val/dim);
    return snapCndidate;
  }
}
