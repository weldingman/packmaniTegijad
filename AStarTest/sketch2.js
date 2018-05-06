function setup(){

}

function draw(){

}

function createWorld()
{
  console.log('Creating world...');

  // create emptiness
  for (var x=0; x < worldWidth; x++)
  {
    world[x] = [];

    for (var y=0; y < worldHeight; y++)
    {
      world[x][y] = 0;
    }
  }

  // scatter some walls
  for (var x=0; x < worldWidth; x++)
  {
    for (var y=0; y < worldHeight; y++)
    {
      if (Math.random() > 0.75)
        world[x][y] = 1;
    }
  }

  // calculate initial possible path
  // note: unlikely but possible to never find one...
  currentPath = [];
  while (currentPath.length == 0)
  {
    pathStart = [Math.floor(Math.random()*worldWidth),Math.floor(Math.random()*worldHeight)];
    pathEnd = [Math.floor(Math.random()*worldWidth),Math.floor(Math.random()*worldHeight)];
    if (world[pathStart[0]][pathStart[1]] == 0)
      currentPath = findPath(world,pathStart,pathEnd,'Manhattan');
  }
  redraw();

}

function canvasClick(e)
{
  var x;
  var y;

  // grab html page coords
  if (e.pageX != undefined && e.pageY != undefined)
  {
    x = e.pageX;
    y = e.pageY;
  }
  else
  {
    x = e.clientX + document.body.scrollLeft +
      document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop +
      document.documentElement.scrollTop;
  }

  // make them relative to the canvas only
  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  // return tile x,y that we clicked
  var cell =
      [
        Math.floor(x/tileWidth),
        Math.floor(y/tileHeight)
      ];

  // now we know while tile we clicked
  console.log('we clicked tile '+cell[0]+','+cell[1]);

  pathStart = pathEnd;
  pathEnd = cell;

  // calculate path
  currentPath = findPath(world,pathStart,pathEnd);
  redraw();
}



function calculatePath()
	{
		// create Nodes from the Start and End x,y coordinates
		var	mypathStart = Node(null, {x:pathStart[0], y:pathStart[1]});
		var mypathEnd = Node(null, {x:pathEnd[0], y:pathEnd[1]});
		// create an array that will contain all world cells
		var AStar = new Array(worldSize);
		// list of currently open Nodes
		var Open = [mypathStart];
		// list of closed Nodes
		var Closed = [];
		// list of the final output array
		var result = [];
		// reference to a Node (that is nearby)
		var myNeighbours;
		// reference to a Node (that we are considering now)
		var myNode;
		// reference to a Node (that starts a path in question)
		var myPath;
		// temp integer variables used in the calculations
		var length, max, min, i, j;
		// iterate through the open list until none are left
		while(length = Open.length)
		{
			max = worldSize;
			min = -1;
			for(i = 0; i < length; i++)
			{
				if(Open[i].f < max)
				{
					max = Open[i].f;
					min = i;
				}
			}
			// grab the next node and remove it from Open array
			myNode = Open.splice(min, 1)[0];
			// is it the destination node?
			if(myNode.value === mypathEnd.value)
			{
				myPath = Closed[Closed.push(myNode) - 1];
				do
				{
					result.push([myPath.x, myPath.y]);
				}
				while (myPath = myPath.Parent);
				// clear the working arrays
				AStar = Closed = Open = [];
				// we want to return start to finish
				result.reverse();
			}
			else // not the destination
			{
				// find which nearby nodes are walkable
				myNeighbours = Neighbours(myNode.x, myNode.y);
				// test each one that hasn't been tried already
				for(i = 0, j = myNeighbours.length; i < j; i++)
				{
					myPath = Node(myNode, myNeighbours[i]);
					if (!AStar[myPath.value])
					{
						// estimated cost of this particular route so far
						myPath.g = myNode.g + ManhattanDistance(myNeighbours[i], myNode);
						// estimated cost of entire guessed route to the destination
						myPath.f = myPath.g + ManhattanDistance(myNeighbours[i], mypathEnd);
						// remember this new path for testing above
						Open.push(myPath);
						// mark this node in the world graph as visited
						AStar[myPath.value] = true;
					}
				}
				// remember this route as having no more untested options
				Closed.push(myNode);
			}
		} // keep iterating until until the Open list is empty
		return result;
	}


  function Neighbours(x, y)
  	{
  		var	N = y - 1,
  		S = y + 1,
  		E = x + 1,
  		W = x - 1,
  		myN = N > -1 && canWalkHere(x, N),
  		myS = S < worldHeight && canWalkHere(x, S),
  		myE = E < worldWidth && canWalkHere(E, y),
  		myW = W > -1 && canWalkHere(W, y),
  		result = [];
  		if(myN)
  		result.push({x:x, y:N});
  		if(myE)
  		result.push({x:E, y:y});
  		if(myS)
  		result.push({x:x, y:S});
  		if(myW)
  		result.push({x:W, y:y});
  		findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
  		return result;
  	}

  	// returns every available North East, South East,
  	// South West or North West cell - no squeezing through
  	// "cracks" between two diagonals
  	function DiagonalNeighbours(myN, myS, myE, myW, N, S, E, W, result)
  	{
  		if(myN)
  		{
  			if(myE && canWalkHere(E, N))
  			result.push({x:E, y:N});
  			if(myW && canWalkHere(W, N))
  			result.push({x:W, y:N});
  		}
  		if(myS)
  		{
  			if(myE && canWalkHere(E, S))
  			result.push({x:E, y:S});
  			if(myW && canWalkHere(W, S))
  			result.push({x:W, y:S});
  		}
  	}

  	// returns every available North East, South East,
  	// South West or North West cell including the times that
  	// you would be squeezing through a "crack"
  	function DiagonalNeighboursFree(myN, myS, myE, myW, N, S, E, W, result)
  	{
  		myN = N > -1;
  		myS = S < worldHeight;
  		myE = E < worldWidth;
  		myW = W > -1;
  		if(myE)
  		{
  			if(myN && canWalkHere(E, N))
  			result.push({x:E, y:N});
  			if(myS && canWalkHere(E, S))
  			result.push({x:E, y:S});
  		}
  		if(myW)
  		{
  			if(myN && canWalkHere(W, N))
  			result.push({x:W, y:N});
  			if(myS && canWalkHere(W, S))
  			result.push({x:W, y:S});
  		}
  	}

function canWalkHere(x, y)
  {
  return ((world[x] != null) &&
  		    (world[x][y] != null) &&
  	      (world[x][y] <= maxWalkableTileNum));
}
function Node(Parent, Point){
	var newNode = {
		// pointer to another Node object
		Parent:Parent,
		// array index of this Node in the world linear array
		value:Point.x + (Point.y * worldWidth),
		// the location coordinates of this Node
		x:Point.x,
		y:Point.y,
		// the distanceFunction cost to get
		// TO this Node from the START
		f:0,
		// the distanceFunction cost to get
		// from this Node to the GOAL
		g:0
}

		return newNode;
	}
  function ManhattanDistance(Point, Goal)
	{	// linear movement - no diagonals - just cardinal directions (NSEW)
		return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
	}
