class Pacman{
  constructor(pos, dim){
    this.x = pos.i * dim;
    this.y = pos.j * dim;
    this.i = pos.i;
    this.j = pos.j;
    this.dim = dim;
    this.followPathIndex = 1;
  }
  show(){
    fill("blue");
    rect(this.x ,this.y, this.dim, this.dim);
  }
  getPosIJ(){
    return {i:this.i, j:this.j};
  }

  newPath(){
    this.followPathIndex = 0;
  }

  updateIJ(){
    if(this.x < (this.i - 2) * this.dim + this.dim){
      this.followPathIndex += 1;
      this.i -= 1;
    }
    if(this.x + this.dim > (this.i + 2) * this.dim){
      this.followPathIndex += 1;
      this.i += 1;
    }
    if(this.y < (this.j - 2) * this.dim + this.dim){
      this.followPathIndex += 1;
      this.j -= 1;
    }
    if(this.x + this.dim > (this.i + 2) * this.dim){
      this.followPathIndex += 1;
      this.j += 1;
    }
    // console.log(this.j);
  }

  followPath(i,j,index){
    console.log(index);
    this.updateIJ();
    if(this.followPathIndex === index){
      if(i > this.i){
        this.x += 1;
      }
      if(i < this.i){
        this.x -= 1;
      }
      if(j > this.j){
        this.y += 1;
      }
      if(j < this.j){
        this.y -= 1;
      }
    }
  }
}
