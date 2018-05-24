class AStar{
  constructor(wall, grid, startP, targetP){
    // this.arrDim = cols * rows;
    // this.dim = dim;
    this.wall = wall;
    this.openList = [];
    this.closedList = [];
    this.grid = grid;

    this.start = this.grid.getNode(startP.i, startP.j);
    this.end = this.grid.getNode(targetP.i, targetP.j);
    for(var i = 0; i < this.grid.nodes.length; i++){
      for(var j = 0; j < this.wall.length; j++){
        if(i === this.wall[j]){
          this.grid.nodes[i].setToWall();
        }
      }
    }
    this.openList.push(this.start);
  }

  targetUpdate(startPos, targetPos){
      this.grid.resetNodesVal();
      this.start = this.grid.getNode(startPos.i, startPos.j);
      this.end = this.grid.getNode(targetPos.i, targetPos.j);
      this.openList = [];
      this.closedList = [];
      this.openList.push(this.start);
  }

  calcPath(){
    var loop = true;
    while(loop){
      var current = this.chooseCurrent(this.openList);

      this.updateNeighborsValues(current);
      this.delElInList(current, this.openList);
      this.closedList.push(current);
      if(current === this.end){
        return this.path(current, this.start);
      }
      else{
        this.chooseStep(current);
      }
      if(this.openList.length <= 0){
        loop = false
        console.log(current);
        console.log("no solutions.");
      }
    }
    return undefined;
  }

  setWall(wallIn){
    this.wall = wallIn;
  }

  updateWall(){
    console.log(this.wall.length);
    for(var i = 0; i < this.grid.nodes.length; i++){
      for(var j = 0; j < this.wall.length; j++){
        if(this.grid.nodes[i].i === this.wall[j].i && this.grid.nodes[i].j === this.wall[j].j){
          this.grid.nodes[i].setToWall();

        }
      }
    }
  }


  path(from, start){
    var pathToStart = [];
    var current = from;
    pathToStart.push(from);
    while(current != start){
      current = current.parrent;
      pathToStart.push(current);
    }

    return pathToStart;
  }

  isInList(list, obj){
    for(var i = 0; i < list.length; i++){
      if(list[i] === obj){
        return true;
      }
    }
    return false;
  }

  delElInList(element, list){
    for(var i = 0; i < list.length; i++){
      if(element === list[i]){
        list.splice(i,1);
      }
    }
  }

  chooseCurrent(list){
    var lowestF = 1000;
    var node = null;
    var sameFVal = [];
      for(var i = 0; i <list.length; i++){
        if(list[i].fCost === lowestF){
          sameFVal.push(list[i]);
        }
        if(list[i].fCost < lowestF){
          sameFVal = [];
          lowestF = list[i].fCost;
          node = list[i];
          sameFVal.push(node);
        }
      }
      // console.log(sameFVal);
      var lowestH = 1000;
      for(var i = 0; i < sameFVal.length; i++){
        if(sameFVal[i].hCost < lowestH){
          lowestH = sameFVal[i].hCost;
          node = sameFVal[i];
        }
      }
      return node;
  }
  chooseStep(current){
    var lowestF = 1000;
    var node = null;
    var sameFVal = [];
      for(var i = 0; i < current.neighbors.length; i++){
        if(!this.isInList(this.closedList, current.neighbors[i])){
          if(!this.isInList(this.openList, current.neighbors[i])){
            if(current.neighbors[i].type != "wall"){
              if(current.neighbors[i].fCost === lowestF){
                sameFVal.push(current.neighbors[i]);
              }
              if(current.neighbors[i].fCost < lowestF){
                sameFVal = [];
                lowestF = current.neighbors[i].fCost;
                node = current.neighbors[i];
                sameFVal.push(node);
              }
              current.neighbors[i].setParrent(current);
              this.openList.push(current.neighbors[i]);
            }
          }
        }
      }
      // console.log(sameFVal);
      var lowestH = 1000;
      for(var i = 0; i < sameFVal.length; i++){
        if(sameFVal[i].hCost < lowestH){
          lowestH = sameFVal[i].hCost;
          node = sameFVal[i];
        }
      }
      return node;
  }

  updateNeighborsValues(current){
     //console.log(current);
    for(var i = 0; i < current.neighbors.length; i++){
      if(!this.isInList(this.openList, current.neighbors[i])){
        var g = this.manhattanDist(current.neighbors[i], this.start);
        var h = this.manhattanDist(current.neighbors[i], this.end);
        current.neighbors[i].setG(g);
        current.neighbors[i].setH(h);
        current.neighbors[i].setF(g + h);
      }
    }
  }

  manhattanDist(a, b){
    var d = abs(a.i - b.i) + abs(a.j - b.j);
    return d;
  }

}
