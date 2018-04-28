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

  addWall(wallType, size, traceDir){
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
      pacDir:traceDir
    };
    for(var i = 0; i < wallType.length; i++){
      if(testLib.rectRectCol(testWall, wallType[i])){
        test = true;
      }
    }
    if(!test){
      drawWall.x = this.snap(mouseX , size.w);
      drawWall.y = this.snap(mouseY, size.h);
      if(traceDir)
      wallType.push(drawWall);
    }
  }

  update(pacman){
    this.updatePacTrace(pacman);

    if(mouseIsPressed && mouseButton === LEFT){
      if(testLib.keys().s){
        this.addWall(this.branch, {w:20, h:20}, null);
      }
      else if(testLib.keys().pt){
        this.addWall(this.pacTrace, {w:20, h:20}, "random");
      }
      else{
        this.addWall(this.wall, {w:this.w, h:this.h}, null);
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
      console.log("showing/hiding the world");
      this.showWorld = !this.showWorld;
      this.sW = false;
    }
    if(!testLib.keys().w){
      this.sW = true;
    }
    return {wall:this.wall, branch:this.branch, pacTrace:this.pacTrace};
  }

  updatePacTrace(pacman){
    for(var i = 0; i < this.pacTrace.length; i++){
      if(testLib.rectRectCol(pacman, this.pacTrace[i])){
        this.pacTrace[i].pacDir = pacman.dir;
        console.log(this.pacTrace[i].pacDir);
      }
    }
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
