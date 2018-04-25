class TestWorld{
  constructor(size){
    this.wall = [];
    this.branch = [];
    this.w = size.w;
    this.h = size.h;
    this.gridX = [];
    this.gridY = [];
    this.wallBranch = {
      wall:this.wall,
      branch:this.branch
    };
    this.loadWorld = true;
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

      drawWall.x = this.snap(mouseX , drawWall.w);
      drawWall.y = this.snap(mouseY, drawWall.h);
      wallType.push(drawWall);
    }
  }



  update(){
    if(testLib.keys().save){
      this.wallBranch.wall = this.wall;
      this.wallBranch.branch = this.branch;
      var myJSON = JSON.stringify(this.wallBranch);
      localStorage.setItem("testJSON", myJSON);
    }
    if(testLib.keys().load && this.loadWorld){
      var text = localStorage.getItem("testJSON");
      var obj = JSON.parse(text);
      console.log(obj);
      this.wall = obj.wall;
      this.loadWorld = false;
    }
    if(!testLib.keys().load){
      this.loadWorld = true;
    }
    if(mouseIsPressed && mouseButton === LEFT){
      if(testLib.keys().s){
        this.addWall(this.branch, {w:4, h:4});
      }else{
        this.addWall(this.wall, {w:this.w, h:this.h});
      }
    }
    if(mouseIsPressed && mouseButton === RIGHT){
      this.delWall();
    }
    this.show(this.wall, color("lightBlue"));
    this.show(this.branch, color(255));
    return {wall:this.wall,branch:this.branch};
  }

  show(wallType, c){
    for(var i = 0; i < wallType.length; i++){
      fill(c);
      rect(wallType[i].x, wallType[i].y, wallType[i].w, wallType[i].h);
    }
  }
  // need to add branch deletion
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

  save(){
  }
}
