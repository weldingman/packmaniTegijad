class Ghost{
  constructor(pos, size, speed, dir){
    this.x = pos.x;
    this.y = pos.y;
    this.w = size.w;
    this.h = size.h;
    this.speed = speed;
    this.speedX = 0;
    this.speedY = 0;
    this.dir = dir;
    this.u = false;
    this.d = false;
    this.r = true;
    this.l = false;
    this.branchFlag = -1;
  }

  update(world, pac){
    this.show();
    this.move(world, pac);

    this.y += this.speedY;
    this.x += this.speedX;
    return this.getPac(pac);
  }

  show(){
    strokeWeight(1);
    stroke(0);
    fill("red");
    ellipse(this.x, this.y, this.w, this.h);
  }

  move(wall, pac){
    //console.log(wall.pacTrace);
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
          else if(Math.random()<0.1){
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
