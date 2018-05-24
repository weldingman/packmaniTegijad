class Agent{
  constructor(cols, rows, dim, walls, start, speed){
    this.lastStart = {i:1, j:1};
    this.rows = rows;
    this.nodeArr = help.createEmptyNodesGrid(cols, rows, dim);
    this.grid = new Grid(this.nodeArr, dim, cols, rows);

    this.dim = dim;
    this.walls = walls;
    this.grid.setNodesNeighbors();
  	this.aStar = new AStar(walls, this.grid, start, {i:5, j:5});
  	this.aStar.setWall(walls);
  	this.aStar.updateWall();
  	this.agent = new Pacman(start, dim);
    this.agent.speed = speed;
  	this.pacPos = this.agent.getPosIJ();
    this.path = [];
    this.mc = true;
    this.showGrid = false;
    this.keys = true;
  }

  update(md, i, j){
    if(this.showGrid){
      this.grid.show();
    }
    this.agent.show();
    if(this.keys){
      var pos = this.moveKeys();
    }
    else{
      var pos = this.followPath();

      if(md && this.mc){
    		if(help.keys().w){
    			this.buildWall();
    		}
    		else if(this.mc){
    			this.updatePath(i,j);
    			this.mc = false;
          console.log("path updated");
    		}
      }
      if(!md){
        this.mc = true;
      }
    }

    return pos;
  }
  moveKeys(){
    var pos = this.agent.getPosXY();
    var wallIn = [];
    var i = help.snap(pos.x, this.dim) / this.dim;
    var j = help.snap(pos.y, this.dim) / this.dim;
    var node = this.grid.getNode(i, j);
    var neighbors = node.getNeighbors();
    for(var k = 0; k < neighbors.length; k++){
      if(neighbors[k].type === "wall"){
        wallIn.push(neighbors[k]);
      }
    }
    this.agent.moveTo(wallIn);
    return {i:i, j:j};
  }

  getWall(wall, i ,j){
    for(var k = 0; k < wall.length; k++){
      // console.log(wall[k].i  + " " + wall[k].j);
      if(wall[k].i === i && wall[k].j === j){
        return true;
      }
    }
    return false;
  }

  followPath(){
    var up = false;
  	if(this.agent.getPosIJ().i != this.pacPos.i || this.agent.getPosIJ().j != this.pacPos.j){
  		this.pacPos = this.agent.getPosIJ();
  		console.log("pc");
      up = true;
  	}

  	var pacI = this.pacPos.i;
  	var pacJ = this.pacPos.j;
  	var node = this.grid.getNode(pacI, pacJ);

  	var neighbors = node.getNeighbors();
  	for(var i = 0; i < neighbors.length; i++){
  		if(neighbors[i].type === "path"){
  			this.setNodeFromArr(this.nodeArr, neighbors[i].i, neighbors[i].j, "purple", rows);
  			this.agent.followPath(neighbors[i].i, neighbors[i].j, neighbors[i].pathNum);
  		}
    }
    return {i:pacI, j:pacJ, u:up};
  }

  updatePath(i, j){
  	var test = help.getIndex(i, j, rows);
  	this.agent.newPath();
  	this.delPath(this.path);
  	this.aStar.targetUpdate({i:this.agent.i, j:this.agent.j}, {i:i,j:j});
  	this.path = this.aStar.calcPath();
  	this.setNodeFromArr(this.nodeArr, i, j, "red", this.rows, "free");
  	if(this.path != undefined){
  		this.setPathNodes(this.path);
  	}
  	var node = this.grid.getNode(i, j);
  	node.showNeighbors();
  	this.lastStart = {i:i, j:j};
  }

  setPathNodes(path){
  	for(var i = 0; i < path.length; i++){
  		path[i].setPath(path.length - i - 1);
  	}
  }

  delPath(path){
  	for(var i = 0; i < path.length; i++){
  		path[i].setFree();
  	}
  }

  setNodeFromArrIndex(nodes, index, col){
    nodes[index].setCol(col);
  }

  setNodeFromArr(nodes, i, j, col, rows, type){
    var index = help.getIndex(i, j, rows);
    nodes[index].set(col, type);
  }
  builWall(){
  	var i = help.snap(mouseX, dim) / dim;
  	var j = help.snap(mouseY, dim) / dim;

  	var node = grid.getNode(i, j);
  	node.setToWall();
  	var test = grid.getNodesByType("wall");
  	this.aStar.setWall(test);
  }

}
