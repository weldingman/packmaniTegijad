class Matrix{
	constructor(rows, cols){
		this.rows = rows;
		this.cols = cols;
		this.matrix = [];		//data in Shifmans code
		
		for(var i = 0; i < this.rows; i++){
			this.matrix[i] = [];
			for(var j = 0; j < this.cols; j++){
				this.matrix[i][j] = 0;
			}
		}
	}
	
	randomize(){
		for(var i = 0; i < this.rows; i++){
			for(var j = 0; j < this.cols; j++){
				this.matrix[i][j] = Math.floor(Math.random() * 10);
			}
		}
	}
	
	transpose(){
		let result = new Matrix(this.cols, this.rows);
		for(var i = 0; i < this.rows; i++){
			for(var j = 0; j < this.cols; j++){
				result.matrix[j][i] = this.matrix[i][j];
			}
		}
		return result;
	}
	
	static transpose(m){
		let result = new Matrix(m.cols, m.rows);
		for(var i = 0; i < m.rows; i++){
			for(var j = 0; j < m.cols; j++){
				result.matrix[j][i] = m.matrix[i][j];
			}
		}
		return result;
	}
	
	static multiply(a, b){
		if(a.cols !== b.rows){
				console.log("Colums of A must match rows of B");
				return undefined;
			}
			
		let result = new Matrix(a.rows, b.cols);
		for(let i = 0; i < result.rows; i++){
			for(let j = 0; j < result.cols; j++){
				let sum = 0;
				for(let k = 0; k < a.cols; k++){
					sum = a.matrix[i][k] * b.matrix[k][j];
				}
				result.matrix[i][j] = sum;
			}
		}
		return result;
	}
	
	multiply(n){
		if(n instanceof Matrix){
			
		}
		else{
			for(var i = 0; i < this.rows; i++){
				for(var j = 0; j < this.cols; j++){
					this.matrix[i][j] *= n;
				}
			}
		}	
	}
	
	map(func){
	for(var i = 0; i < this.rows; i++){
			for(var j = 0; j < this.cols; j++){
				let val = this.matrix[i][j];
				this.matrix[i][j] = func(val);
			}
		}
	}
	
	
	add(n){
		if(n instanceof Matrix){
			for(var i = 0; i < this.rows; i++){
				for(var j = 0; j < this.cols; j++){
					this.matrix[i][j] += n.matrix[i][j];
				}
			}
		}
		else{
			for(var i = 0; i < this.rows; i++){
				for(var j = 0; j < this.cols; j++){
					this.matrix[i][j] += n;
				}
			}
		}
		
	}
	
}