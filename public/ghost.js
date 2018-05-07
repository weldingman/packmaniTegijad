class Ghost{
  constructor(pos, size, speed, dir, ghost){
    this.x = pos.x;
    this.y = pos.y;
    this.w = size.w;
    this.h = size.h;
    this.speed = speed;
    this.speedX = 0;
    this.speedY = 0;
    this.dir = dir;
    this.u = true;
    this.d = false;
    this.r = false;
    this.l = false;
    this.branchFlag = -1;
    this.dirX = 0;
    this.dirY = 0;
    this.ghost = ghost;
  }

  update(world, pac){
    this.show();
    this.move(world, pac);

    this.y += this.speedY;
    this.x += this.speedX;
    return this.getPac(pac);
  }

  show(){
    // strokeWeight(1);
    // stroke(0);
    // fill("red");
    // ellipse(this.x, this.y, this.w, this.h);
    image(this.ghost, this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
  }

  move(wall, pac){
    //console.log(wall.pacTrace);
    if(this.checkBranch(wall, pac)){

    }
    // this.randMove(pac);
    if(this.r){
      this.dir = "right";
      this.speedX = this.speed;
      this.checkWall(wall.wall, "x", pac, wall.pacTrace);
      this.checkBranch(wall.branch, pac, wall.pacTrace);
      //this.speedY = 0;
    }
    else if(this.l){
      this.dir = "left";
      this.speedX = -this.speed;
      this.checkWall(wall.wall, "x", pac, wall.pacTrace);
      this.checkBranch(wall.branch, pac, wall.pacTrace);
      //this.speedY = 0;
    }
    else{
      this.speedX = 0;
    }
    if(this.u){
      this.dir = "up";
      this.speedY = -this.speed;
      this.checkWall(wall.wall, "y", pac, wall.pacTrace);
      this.checkBranch(wall.branch, pac, wall.pacTrace);
      //this.speedX = 0;
    }
    else if(this.d){
      this.dir = "down";
      this.speedY = this.speed;
      this.checkWall(wall.wall, "y", pac, wall.pacTrace);
      this.checkBranch(wall.branch, pac, wall.pacTrace);
      //this.speedX = 0;
    }
    else{
      this.speedY = 0;
    }
  }

  followPath(path){

    var p = this.setPos(path[path.length - 2]);
    var pos = this.getPos(this.dirX, this.dirY);
    // console.log(path[path.length - 2]);
    if(path.length > 1){

      if(path[path.length - 2].i > pos.i){
        this.dir = "right";
        console.log("left");
      }
      if(path[path.length - 2].i < pos.i){
        // this.dirX = 1;
        this.dir = "left";
        console.log("left");
      }
      if(path[path.length - 2].j > pos.j){
        this.dir = "down";
        console.log("down");
      }
      if(path[path.length - 2].j < pos.j){
        // this.dirX = 1;
        this.dir = "up";
        console.log(pos);
         console.log(path);
      }
      // if(this.dir === "up"){
      //   // this.dirY = -1;
      //   this.dirY = -1;
      // }
      // if(this.dir === "down"){
      //   // this.dirY = 1;
      //   this.dirY = 1;
      // }
      // console.log(this.dirX);


        if(this.dir === "left"){
          // this.dirX = -1;
          this.dirX = 1;
        }
        if(this.dir === "right"){
          // this.dirX = 1;
          this.dirX = -1;
        }
        if(this.dir === "up"){
          // this.dirY = -1;
          this.dirY = -1;
        }
        if(this.dir === "down"){
          // this.dirY = 1;
          this.dirY = 1;
        }

        p = this.setPos(path[path.length - 2]);
        pos = this.getPos(this.dirX, this.dirY);


        if(this.dir === "left"){
          // this.dirX = -1;
          this.l = true;
        }
        if(this.dir === "right"){
          // this.dirX = 1;
          this.r = true;
        }
        if(this.dir === "up"){
          // this.dirY = -1;
          this.u = true;
        }
        if(this.dir === "down"){
          // this.dirY = 1;
          this.d = true;
        }
        // if(path[path.length - 2].i > pos.i){
        //   this.r = true;
        // }
        // if(path[path.length - 2].i < pos.i){
        //   this.l = true;
        // }
        // if(path[path.length - 2].j > pos.j){
        //   this.d = true;
        // }
        // if(path[path.length - 2].j < pos.j){
        //   this.u = true;
        // }

      if(path[path.length - 2].i === pos.i && path[path.length - 2].j === pos.j){

           this.r = false;
           this.l = false;
           this.u = false;
           this.d = false;
           return true;
      }
    }
    return false;
  }

  checkWall(wall, xy, pac, trace){
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
        this.branchFlag = -1;
        if(xy === "x"){
          this.speedX = 0;
        }
        if(xy === "y"){
          this.speedY = 0;
        }
        this.randMove(pac);
        var tempTrace = this.tracePacman(trace);
        //console.log(tempTrace);

        if(tempTrace != null){
          this.u = false;
          this.d = false;
          this.r = false;
          this.l = false;
          if(tempTrace === "up"){
            this.u = true;
          }
          if(tempTrace === "down"){
            this.d = true;
          }
          if(tempTrace === "left"){
            this.l = true;
          }
          if(tempTrace === "right"){
            this.r = true;
          }
          break;
        }
        else{
          this.randMove(pac);
        }
        break;
  }
}
}
  checkBranch(wall, pac, trace){
    var moveAvailable = {
      l:true,
      r:true,
      u:true,
      d:true
    };
    var ghostPos = {
      x:this.x - this.w / 2,
      y:this.y - this.h / 2,
      w:this.w,
      h:this.h
    };
    var pcOffBound = this.getOffsetBound(ghostPos);

    for(var i = 0; i < wall.length; i++){
      if(i != this.branchFlag){
        if(testLib.rectRectCol(wall[i], pcOffBound)){
          this.speedX = 0;
          this.speedY = 0;
          this.branchFlag = i;

          var tempTrace = this.tracePacman(trace);
          console.log(tempTrace);

          if(tempTrace != null){
            this.u = false;
            this.d = false;
            this.r = false;
            this.l = false;
            if(tempTrace === "up"){
              this.u = true;
            }
            if(tempTrace === "down"){
              this.d = true;
            }
            if(tempTrace === "left"){
              this.l = true;
            }
            if(tempTrace === "right"){
              this.r = true;
            }
            break;
          }
          else
          if(Math.random()<0.1){
            this.randMove(pac);
          }
          break;
        }
    }
  }
}

  getPac(pacman){
    return testLib.rectRectCol(this, pacman);
  }

  setPos(pos){
    var x = pos.i * this.w;
    var y = pos.j * this.h;
    return ({x:x, y:y, w:this.w, h:this.h});
  }

  getPos(dirX, dirY){
    // if(this.x - dirX > 0 && this.x - dirY > 0){
      var i = snap(this.x - 7 * dirX, this.w) / this.w;
      var j = snap(this.y - 7 * dirY, this.h) / this.h;
      // console.log(i);
      return {i:i, j:j};
    // }
    // return {};
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

  tracePacman(trace){
    for(var i = 0; i < trace.length; i++){
      if(testLib.rectRectCol(trace[i], this)){
        var tempTraceDir = trace[i].pacDir;
        if(tempTraceDir != "random"){
          //console.log(tempTraceDir);
          return tempTraceDir;
        }
        else return null;
      }
    }
  }

  randMove(pcMan){
    this.u = false;
    this.d = false;
    this.r = false;
    this.l = false;

    var pacDir = {
      r:false,
      l:false,
      u:false,
      d:false
    };

    if(pcMan.x >= this.x){
      pacDir.r = true;
    }
    if(pcMan.x <= this.x){
      pacDir.l = true;
    }
    if(pcMan.y <= this.y){
      pacDir.u = true;
    }
    if(pcMan.y >= this.y){
      pacDir.d = true;
    }

    var brobDir = Math.random() * 100;
    // this might be suspicious
    if(brobDir < 30 && !this.u){
      this.u = pacDir.u;
      this.d = pacDir.d;
    }
    else if(brobDir < 60 && !this.r){
      this.r = pacDir.r;
      this.l = pacDir.l;
    }
    else if(brobDir < 80 && !this.d){
      this.u = pacDir.d;
      this.d = pacDir.u;
    }
    else if(!this.l){
      this.r = pacDir.l;
      this.l = pacDir.r;
    }
  }

}
