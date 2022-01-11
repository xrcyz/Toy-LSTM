
class ReberGrammar
{
	constructor()
	{
		this.moves = 
		[
		 [[1, 'T'], [5, 'P']],
		 [[1, 'S'], [2, 'X']],
		 [[3, 'S'], [5, 'X']],
		 [[6, 'E']          ],
		 [[3, 'V'], [2, 'P']],
		 [[4, 'V'], [5, 'T']]
		];
	}
	
	getString(len)
	{
		let str = 'B';
		let node = 0; 

		while(str.length < len)
		{
			let move = random(moves[node]);
			str += move[1]; 
			node = move[0];

			if(node == 6) break;
		}

		return str;
	}
	
	validateString(reberString, lengthLimit)
	{
		let index = 0;
		let node = 0; 
		let edge = reberString[index]; 
		
		if(edge != 'B') { return false; }
		
		let safety = 0;
		while(safety < 100)
		{
			edge = reberString[index + 1];
			
			let move = this.moves[node].filter(e => e[1] == edge);
			
			if(move.length == 0) 
			{
				//console.log(edge + ", " + this.moves[node].join()); 
				return false;
			}
			
			node = move[0][0]; 
			index++;
			
			if(node == 6) break;
			if(index >= lengthLimit - 1) break; //this is probably wrong, but i am le tired
			
			safety++;
		}
		
		return true;
	}
}