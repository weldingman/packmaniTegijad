var grid;
var cols = 20;
var rows = 20;
var nodeArr = new Array(cols * rows);
var dim = 50;
var start;
var end;
var openList = [];
var closedList = [];
var choose;
var mc = false;
var current;
var wall = [];

function setup(){
  createCanvas(1200, 1200);
  var counter = 0;
  for(var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){
      nodeArr[counter] = new Node3(i, j, "yellow", dim);
      counter++;
    }
  }
  grid = new Grid(nodeArr, dim);
  for(var i = 0; i < grid.nodes.length; i++){
    grid.nodes[i].setNeighbors(grid);
  }

  start = grid.getNode(1,1);
  end = grid.getNode(8,9);
  start.setCol("green");
  end.setCol("red");
  for(var i = 0; i < grid.nodes.length; i++){
    if(Math.random() < 0.3 && grid.nodes[i] != start && grid.nodes[i] != end){
      grid.nodes[i].setToWall();
      wall.push(i);
    }
  }
  for(var i = 0; i < start.neighbors.length; i++){
    if(!start.neighbors[i].wall){
      start.neighbors[i].setCol("orange");
    }
  }
  // updateNeighborsValues(start);
  // choose = chooseStep(start);
  // choose.setCol("blue");
  openList.push(start);
  grid.show();
  current = start;
  //mc = false;
}

function draw(){
  if(mouseIsPressed && mc){
    mc = false;
    var counter = 0;
    nodeArr = new Array(cols * rows);
    start = new Node3(end.i, end.j, "green", dim);

    for(var i = 0; i < cols; i++){
      for(var j = 0; j < rows; j++){
        nodeArr[counter] = new Node3(i, j, "yellow", dim);
        counter++;
      }
    }
    grid = new Grid(nodeArr, dim);
    grid.setNode(start);

    for(var i = 0; i < grid.nodes.length; i++){
      for(var j = 0; j < wall.length; j++){
        if(i === wall[j]){
          grid.nodes[i].setToWall();
        }
      }
    }
    for(var i = 0; i < grid.nodes.length; i++){
      grid.nodes[i].setNeighbors(grid);
    }
    openList = [];
    closedList = [];
    var i = snap(mouseX, dim) / dim;
    var j = snap(mouseY, dim) / dim;
    //console.log(end);

    //console.log(start);
    end = grid.getNode(i,j);
    start.setCol("green");
    end.setCol("red");
    for(var i = 0; i < start.neighbors.length; i++){
      if(!start.neighbors[i].wall){
        //start.neighbors[i].setCol("orange");
      }
    }
    openList.push(start);
    //console.log(openList);
    grid.show();
  }
    // for(var i = 0; i < openList.length; i++){
    //
    // }
    // current = chooseStep(current);
    if(current != end){
      //console.log(openList);
      current = chooseCurrent(openList);
      //console.log(current);
      // current.setCol("magenta");
      updateNeighborsValues(current);
      delElInList(current, openList);
      closedList.push(current);
      for(var i = 0; i < current.neighbors.length; i++){
        if(!current.neighbors[i].wall){
          // current.neighbors[i].setCol("orange");
        }
      }
    }
    if(current === end){
      console.log("end");
      var pathToStart= path(current, start);
      for(var i = 0; i < pathToStart.length; i++){
        pathToStart[i].setCol("lightBlue");
      }
      grid.show();
    }
    else{
      chooseStep(current);
      for(var i = 0; i < openList.length; i++){
        //openList[i].setCol("green");
      }
      for(var i = 0; i < closedList.length; i++){
        //closedList[i].setCol("red");
      }
      // grid.show();
    }
  //}
}

function snap(val, dim){
  var snapCndidate = dim * Math.floor(val/dim);
  return snapCndidate;
}

function path(from, start){
  var pathToStart = [];
  var current = from;
  while(current != start){
    current = current.parrent;
    pathToStart.push(current);
  }
  return pathToStart;
}

function isInList(list, obj){
  for(var i = 0; i < list.length; i++){
    if(list[i] === obj){
      return true;
    }
  }
  return false;
}

function delElInList(element, list){
  for(var i = 0; i < list.length; i++){
    if(element === list[i]){
      list.splice(i,1);
    }
  }
}

function chooseCurrent(list){
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
function chooseStep(current){
  var lowestF = 1000;
  var node = null;
  var sameFVal = [];
    for(var i = 0; i < current.neighbors.length; i++){
      if(!isInList(closedList, current.neighbors[i])){
        if(!isInList(openList, current.neighbors[i])){
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
            openList.push(current.neighbors[i]);
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

function updateNeighborsValues(current){
  // console.log(current);
  for(var i = 0; i < current.neighbors.length; i++){
    if(!isInList(openList, current.neighbors[i])){
      var g = manhattanDist(current.neighbors[i], start);
      var h = manhattanDist(current.neighbors[i], end);
      current.neighbors[i].setG(g);
      current.neighbors[i].setH(h);
      current.neighbors[i].setF(g + h);
    }
  }
}

function manhattanDist(a, b){

  var d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}

function mouseReleased() {
  mc = true;
}
