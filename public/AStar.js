class AStar{
  constructor(cols, rows, dim, wall){
    this.arrDim = cols * rows;
    this.dim = dim;
    this.wall = wall;
    this.openList = [];
    this.closedList = [];
    this.nodeArr = new Array(this.arrDim);
    var counter = 0;
    for(var i = 0; i < cols; i++){
      for(var j = 0; j < rows; j++){
        this.nodeArr[counter] = new Node3(i, j, "yellow", dim);
        counter++;
      }
    }
    this.grid = new Grid(this.nodeArr, dim);
    for(var i = 0; i < this.grid.nodes.length; i++){
      this.grid.nodes[i].setNeighbors(this.grid, cols, rows);
    }
    this.start = this.grid.getNode(2,2);
    this.end = this.grid.getNode(5,5);
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
      // var i = snap(mouseX, dim) / dim;
      // var j = snap(mouseY, dim) / dim;
      this.openList.push(this.start);
  }

  calcPath(){
    var loop = true;
    while(loop){
      var current = this.chooseCurrent(this.openList);

      this.updateNeighborsValues(current);
      this.delElInList(current, this.openList);
      this.closedList.push(current);
      //console.log(this.start);
      //console.log(this.end.i + " " + this.end.j);
      if(current === this.end){
        //console.log("end");
        return this.path(current, this.start);
      }
      else{
        this.chooseStep(current);
      }
      if(this.openList.length <= 0){
        loop = false
        console.log(current);
        //console.log(this.openList);
        console.log("no solutions.");
      }
    }
    return undefined;
  }


  updateWall(){
    for(var i = 0; i < this.grid.nodes.length; i++){
      for(var j = 0; j < this.wall.length; j++){
        if(this.grid.nodes[i].i === this.wall[j].i && this.grid.nodes[i].j === this.wall[j].j){
          this.grid.nodes[i].setToWall();
        }
      }
    }
  }

  snap(val, dim){
    var snapCndidate = dim * Math.floor(val/dim);
    return snapCndidate;
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
            if(!current.neighbors[i].wall){
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
