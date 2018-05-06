var grid;
var openList = [];
var closedList = [];
var dim = 20;
var start = null;
var end = null;
var cameFrom = [];

function setup() {
	createCanvas(640, 480);
  var col = width / dim;
  var row = height / dim;
  grid = new Array(col);
  for(var i = 0; i < col; i++){
    grid[i] = new Array(row);
  }
  for(var i = 0; i < col; i++){
    for(var j = 0; j < row; j++){
      grid[i][j] = new Node(i, j, dim);
    }
  }

  start = grid[0][0];
  end = grid[20][20];
  drawGrid(grid);
  for(var i = 0; i < col; i++){
    for(var j = 0; j < row; j++){
      grid[i][j].setValues(start, end, grid);
    }
  }
  openList.push(start);
  console.log(grid[0][0]);
}

 function draw() {
   if(openList.length > 0){
    var currentIndex = -1;
    var max = 1000;
    //var min = -1;
    for(var i = 0; i < openList.length; i++){
      if(openList[i].f < max){
        max = openList[i].f;
        currentIndex = i;
      }
    }
    var current = openList[currentIndex];
    //console.log(current);
    openList.splice(currentIndex,1);

    closedList.push(current);
    if(current === end){
      console.log(current);
      console.log(reconstructPath(start, end))

    }
    //console.log(current);
    //console.log(current.neighbors);
    //console.log(current.neighbors.length);
    for(var i = 0; i < current.neighbors.length; i++){
       // add if neighbour is trversable

       if(containsObject(current.neighbors[i], closedList)){
         //console.log("is in closed list.");
         continue;
       }
         if(!containsObject(current.neighbors[i], openList)){
           //console.log("is in open list.");
           openList.push(current.neighbors[i]);
           //console.log(current.neighbors[i]);
         }
         var tentativeGScore = current.g + 1;
         if(tentativeGScore >= current.neighbors[i].g){
           continue;
         }
         current.neighbors[i].parrent = current;
         console.log(current.neighbors[i].parrent);
         current.neighbors[i].g = tentativeGScore;
         current.neighbors[i].f =  current.neighbors[i].g +  current.neighbors[i].h;
     }
   }
 }

function reconstructPath(cameFrom, current){
  var totalPath = [];

  while(current != cameFrom){
    totalPath.push(current);
    console.log(current);
    current = current.parrent;
  }
  return totalPath;
}

function containsObject(obj, list) {
  var i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
        return true;
      }
    }
    return false;
 }

function drawGrid(grid){
  for(var i = 0; i < grid.length; i++){
    for(var j = 0; j < grid[0].length; j++){
      grid[i][j].display("yellow");
    }
  }
}
