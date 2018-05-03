var rows = 40;
var cols = 40;
var dim = 15;
var wall = [];
var wallToSave = [];
var aStar;
var path1 = [];
var path2 = [];
var mc = false;
var saveWorld = false;
var preWall;
var me;
var preloadWall = true;

function preload(){
  if(preloadWall){
    preWall = loadJSON("wall2.json");
    me = new Wall(preWall);
    console.log(me);
  }
}

function setup(){
  createCanvas(600, 600);
  aStar = new AStar(cols, rows, dim, wall);
  if(preloadWall){
    for(var i = 0; i < me.wall.wall.length; i++){
      var temp = aStar.grid.getNode(me.wall.wall[i].i, me.wall.wall[i].j);
      wallToSave.push({i:me.wall.wall[i].i, j:me.wall.wall[i].j});
      wall.push(temp);
      //aStar.addWall(temp);
      aStar.updateWall();
    }
    // console.log(aStar.wall);
  }
  //aStar.targetUpdate({i:0,j:0}, {i:19, j:9});
  //path = aStar.calcPath();
}


function draw(){
  background(80);
  frameRate(10);
  lS();
  if(mouseIsPressed){
    mc = false;
    var i = snap(mouseX, dim) / dim;
    var j = snap(mouseY, dim) / dim;
    var temp = aStar.grid.getNode(i, j);
    wall.push(temp);
    wallToSave.push({i:i, j:j})
    aStar.updateWall();
  }
  drawWorld();
  for(var t = 0; t < 7; t++){
    var i = Math.floor(Math.random() * Math.floor(39));
    var j = Math.floor(Math.random() * Math.floor(39));
    var k = Math.floor(Math.random() * Math.floor(39));
    var l = Math.floor(Math.random() * Math.floor(39));
    var check = false;
    var r = Math.floor(Math.random() * Math.floor(255));
    var g = Math.floor(Math.random() * Math.floor(255));
    var b = Math.floor(Math.random() * Math.floor(255));

    for(var m = 0; m < wall.length; m++){
      if(wall[m].i === i && wall[m].j === j){
        check = true;
      }
      if(wall[m].i === k && wall[m].j === l){
        check = true;
      }
    }
    if(!check){
      aStar.targetUpdate({i:k,j:l}, {i:i, j:j});
      path1 = aStar.calcPath();
      drawPath(path1, color(r,g,b));
    }
  }

}

function lS(){
	if(testLib.keys().save && saveWorld){
		saveWorld = false;
    var me = new Wall(wallToSave);
		saveJSON(me, "wall.json");
	}
	if(!testLib.keys().save){
		saveWorld = true;
	}
}

function drawPath(path, col){
  for(var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){
      for(var k = 0; k < path.length; k++){
        if(path[k].i === i && path[k].j === j){
          fill(col);
          rect(i * dim, j * dim, dim, dim);
        }
      }
    }
  }
}

function drawWorld(){
  for(var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){
      fill("yellow");
      //console.log(path);

      for(var k = 0; k < wall.length; k++){
        if(wall[k].i === i && wall[k].j === j){
          fill("black");
        }
      }
      rect(i * dim, j * dim, dim, dim);
    }
  }
}

function snap(val, dim){
  var snapCndidate = dim * Math.floor(val/dim);
  return snapCndidate;
}

function mouseReleased() {
  mc = true;
}
