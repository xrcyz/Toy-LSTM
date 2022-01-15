
class LSTMGraphic
{
	constructor() 
	{	
		//see LSTM.js for non-spaghetti code
		
		this.pink   = color(247, 205, 233);
		this.green  = color(198, 224, 180);
		this.blue   = color(189, 215, 238);
		this.yellow = color(255, 230, 153);
		
		this.stringInProgress = 'B';
		this.prediction = '';
		this.selection = '';
		this.formulaText = 'eraser[0] = 0;';
		this.tokens = "BTSXPVE";
		
		this.input = 0;
		this.memory = 1;
		this.eraser = 2;
		this.writer = 3;
		this.filter = 4;
		this.memory2 = 5;
		this.reader = 6;
		this.filter2 = 7;
		this.readout = 8;
		
		this.rows = [3, 6, 8, 9, 10, 12, 15, 16, 17];
		
		this.rowLabels = 
		[
			[0, "string"],
			[3, "input"],
			[6, "memory"],
			[8, "eraser"],
			[9, "writer"],
			[10, "filter"],
			[12, "memory"],
			[15, "reader"],
			[16, "filter"],
			[17, "readout"],
			[19, "prediction"],
			[21, "selection"],
		];
		
		this.arrays = 
		[
			[1,0,0,0,0,0,0],
			[0,0,0,0,0,0],
			[0,0,0,0,0,0],
			[0,0,0,0,0,0],
			[1,1,1,1,1,1],
			[0,0,0,0,0,0],
			[0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0],
		];
		
		let [B,T,S,X,P,V,E] = [0,1,2,3,4,5,6];
		this.cell = 0;
		this.gridlinks = 
		[
			{ row: this.eraser,  col: 0, precedents: [  ] },
			{ row: this.writer,  col: 0, precedents: [ { row: this.input, col: B } ] },
			{ row: this.filter,  col: 0, precedents: [  ] },
			{ row: this.memory2, col: 0, precedents: [ { row: this.eraser, col: 0 }, { row: this.writer, col: 0 }, { row: this.filter, col: 0 } ] },
			
			{ row: this.eraser,  col: 1, precedents: [ { row: this.input, col: X }, { row: this.input, col: V }, { row: this.input, col: P } ] },
			{ row: this.writer,  col: 1, precedents: [ { row: this.input, col: B }, { row: this.input, col: T }, { row: this.input, col: S } ] },
			{ row: this.filter,  col: 1, precedents: [ { row: this.memory, col: 5 } ] },
			{ row: this.memory2, col: 1, precedents: [ { row: this.eraser, col: 1 }, { row: this.writer, col: 1 }, { row: this.filter, col: 1 } ] },
			
			{ row: this.eraser,  col: 2, precedents: [ { row: this.memory, col: 2 } ] },
			{ row: this.writer,  col: 2, precedents: [ { row: this.input, col: T }, { row: this.input, col: X }, { row: this.input, col: P } ] },
			{ row: this.filter,  col: 2, precedents: [ { row: this.memory, col: 5 } ] },
			{ row: this.memory2, col: 2, precedents: [ { row: this.eraser, col: 2 }, { row: this.writer, col: 2 }, { row: this.filter, col: 2 } ] },
			
			{ row: this.eraser,  col: 3, precedents: [ { row: this.input, col: P } ] },
			{ row: this.writer,  col: 3, precedents: [ { row: this.input, col: S }, { row: this.input, col: V } ] },
			{ row: this.filter,  col: 3, precedents: [ { row: this.memory, col: 1 } ] },
			{ row: this.memory2, col: 3, precedents: [ { row: this.eraser, col: 3 }, { row: this.writer, col: 3 }, { row: this.filter, col: 3 } ] },
			
			{ row: this.eraser,  col: 4, precedents: [ { row: this.memory, col: 4 } ] },
			{ row: this.writer,  col: 4, precedents: [ { row: this.input, col: V } ] },
			{ row: this.filter,  col: 4, precedents: [ { row: this.memory, col: 4 } ] },
			{ row: this.memory2, col: 4, precedents: [ { row: this.eraser, col: 4 }, { row: this.writer, col: 4 }, { row: this.filter, col: 4 } ] },
			
			{ row: this.eraser,  col: 5, precedents: [ { row: this.input, col: S }, { row: this.input, col: V } ] },
			{ row: this.writer,  col: 5, precedents: [ { row: this.input, col: B }, { row: this.input, col: P }, { row: this.input, col: X } ] },
			{ row: this.filter,  col: 5, precedents: [ { row: this.memory, col: 1 } ] },
			{ row: this.memory2, col: 5, precedents: [ { row: this.eraser, col: 5 }, { row: this.writer, col: 5 }, { row: this.filter, col: 5 } ] },
			
			{ row: this.reader,  col: 0, precedents: [  ] },
			{ row: this.reader,  col: 1, precedents: [ { row: this.memory2, col: 0 }, { row: this.memory2, col: 5 } ] },
			{ row: this.reader,  col: 2, precedents: [ { row: this.memory2, col: 1 }, { row: this.memory2, col: 2 } ] },
			{ row: this.reader,  col: 3, precedents: [ { row: this.memory2, col: 1 }, { row: this.memory2, col: 2 } ] },
			{ row: this.reader,  col: 4, precedents: [ { row: this.memory2, col: 0 }, { row: this.memory2, col: 4 } ] },
			{ row: this.reader,  col: 5, precedents: [ { row: this.memory2, col: 4 }, { row: this.memory2, col: 5 } ] },
			{ row: this.reader,  col: 6, precedents: [ { row: this.memory2, col: 3 } ] },
			
			{ row: this.readout, col: 0, precedents: [ { row: this.reader, col: 0 }, { row: this.filter2, col: 0 } ] },
			{ row: this.readout, col: 1, precedents: [ { row: this.reader, col: 1 }, { row: this.filter2, col: 1 } ] },
			{ row: this.readout, col: 2, precedents: [ { row: this.reader, col: 2 }, { row: this.filter2, col: 2 } ] },
			{ row: this.readout, col: 3, precedents: [ { row: this.reader, col: 3 }, { row: this.filter2, col: 3 } ] },
			{ row: this.readout, col: 4, precedents: [ { row: this.reader, col: 4 }, { row: this.filter2, col: 4 } ] },
			{ row: this.readout, col: 5, precedents: [ { row: this.reader, col: 5 }, { row: this.filter2, col: 5 } ] },
			{ row: this.readout, col: 6, precedents: [ { row: this.reader, col: 6 }, { row: this.filter2, col: 6 } ] },
		];
		
		this.misclinks = 
		[
			{ id: "prediction", irow: 19, icol: 1 },
			{ id: "selection",  irow: 21, icol: 1, prevrow: 19, prevcol: 1 },
			{ id: "string",     irow: 0,  icol: 1, prevrow: 21, prevcol: 1 },
			{ id: "input",      irow: 3,  icol: 1, prevrow: 0,  prevcol: 1 },
			{ id: "memory",     irow: 6,  icol: 6,  prevrow: 12,  prevcol: 6},
		];
		
		this.colors = 
		[
			this.green, 
			this.blue, 
			this.yellow, 
			this.yellow, 
			this.yellow, 
			this.blue, 
			this.green,
			this.green, 
			this.green
		];
		
		this.colWidth = 110;
		this.rowHeight = 36;
		this.pg = createGraphics(9 * this.colWidth, 22 * this.rowHeight );
		
		this.updateGraphic();
	}
	
	update()
	{
		if(this.stringInProgress[this.stringInProgress.length - 1] == 'E') return;
		
        if(keyCode === LEFT_ARROW)
		{
            if(this.cell >= this.gridlinks.length)
			{
				
			}
			else
			{
				this.cell = (this.cell + this.gridlinks.length + this.misclinks.length - 1) % (this.gridlinks.length + this.misclinks.length);
				
				if(this.cell < this.gridlinks.length) 
				{
					this.updateDataCell(this.gridlinks[this.cell].row, this.gridlinks[this.cell].col);
				}
			}
		}
		else
		{
			this.cell = (this.cell + 1) % (this.gridlinks.length + this.misclinks.length);

            if(this.cell < this.gridlinks.length) 
            {
                this.updateDataCell(this.gridlinks[this.cell].row, this.gridlinks[this.cell].col);
            }
            else
            {
                let id = this.misclinks[this.cell % this.gridlinks.length].id; 
                this.updateMiscCell(id);
            }
		}
		
		this.updateGraphic();
	}
	
	updateDataCell(drow, dcol)
	{
		let B = this.arrays[this.input][0];
		let T = this.arrays[this.input][1];
		let S = this.arrays[this.input][2];
		let X = this.arrays[this.input][3];
		let P = this.arrays[this.input][4];
		let V = this.arrays[this.input][5];
		let E = this.arrays[this.input][6];
		
		const populateEraser = 
		[
			() => { this.arrays[drow][dcol] = 0; },
			() => { this.arrays[drow][dcol] = 1 / (1 + exp(-10 * (0.5 - X))); },
			() => { this.arrays[drow][dcol] = 1 / (1 + exp(-30 * (0.65 - this.arrays[this.memory][2]))); },
			() => { this.arrays[drow][dcol] = 1 / (1 + exp(-10 * (0.5 - P))); },
			() => { this.arrays[drow][dcol] = 1 / (1 + exp(-10 * (0.6 - this.arrays[this.memory][4]))); },
			() => { this.arrays[drow][dcol] = 1 / (1 + exp(-10 * (0.5 - V))); },
		];
		
		const eraserFormulas = 
		[
			"eraser[0] = 0;",
			"eraser[1] = 1 / (1 + exp(-10 * (0.5 - X)));",
			"eraser[2] = 1 / (1 + exp(-30 * (0.65 - memory[2])));",
			"eraser[3] = 1 / (1 + exp(-10 * (0.5 - P)));",
			"eraser[4] = 1 / (1 + exp(-10 * (0.6 - memory[4])));",
			"eraser[5] = 1 / (1 + exp(-10 * (0.5 - V)));",
		];
		
		const populateWriter = 
		[
			() => { this.arrays[drow][dcol] = Math.tanh(5 * B); },
			() => { this.arrays[drow][dcol] = Math.tanh(5 * T); },
			() => { this.arrays[drow][dcol] = Math.tanh(0.55 * (T + X + P)); },
			() => { this.arrays[drow][dcol] = Math.tanh(3.0 * S + 0.55 * V); },
			() => { this.arrays[drow][dcol] = Math.tanh(5 * V); },
			() => { this.arrays[drow][dcol] = Math.tanh(0.55 * B + 0.7 * P + 5 * X) },
		];
		
		const writerFormulas = 
		[
			"writer[0] = Math.tanh(5 * B);",
			"writer[1] = Math.tanh(5 * T);",
			"writer[2] = Math.tanh(0.55 * (T + X + P));",
			"writer[3] = Math.tanh(3.0 * S + 0.55 * V);",
			"writer[4] = Math.tanh(5 * V);",
			"writer[5] = Math.tanh(0.55 * B + 0.7 * P + 5 * X);",
		];
		
		const populateFilter = 
		[
			() => { this.arrays[drow][dcol] = 1; },
			() => { this.arrays[drow][dcol] = 1 / (1 + exp(-30 * (0.75 - this.arrays[this.memory][5]))); },
			() => { this.arrays[drow][dcol] = 1 / (1 + exp(-30 * (0.65 - this.arrays[this.memory][5]))); },
			() => { this.arrays[drow][dcol] = 1 / (1 + exp(-10 * (0.7  - this.arrays[this.memory][1]))); },
			() => { this.arrays[drow][dcol] = 1 / (1 + exp(-10 * (0.6  - this.arrays[this.memory][4]))); },
			() => { this.arrays[drow][dcol] = 1 / (1 + exp(-30 * (0.65 - this.arrays[this.memory][1]))); },
		];
		
		const filterFormulas = 
		[
			"filter[0] = 1;",
			"filter[1] = 1 / (1 + exp(-30 * (0.75 - memory[5])));",
			"filter[2] = 1 / (1 + exp(-30 * (0.65 - memory[5]))); ",
			"filter[3] = 1 / (1 + exp(-10 * (0.7 - memory[1])));",
			"filter[4] = 1 / (1 + exp(-10 * (0.6 - memory[4])));",
			"filter[5] = 1 / (1 + exp(-30 * (0.65 - memory[1])));",
		];
		
		//read the updated memory
		//memory = this.arrays[this.memory2];
		
		const populateReader = 
		[
			() => { this.arrays[drow][dcol] = 0.0; },
			() => { this.arrays[drow][dcol] = Math.tanh(5 * (this.arrays[this.memory2][0] + this.arrays[this.memory2][5] - 0.7)); },
			() => { this.arrays[drow][dcol] = Math.tanh(5 * (this.arrays[this.memory2][1] + this.arrays[this.memory2][2] - 0.7)); },
			() => { this.arrays[drow][dcol] = Math.tanh(5 * (this.arrays[this.memory2][1] + this.arrays[this.memory2][2] - 0.7)); },
			() => { this.arrays[drow][dcol] = Math.tanh(5 * (this.arrays[this.memory2][0] + this.arrays[this.memory2][4] - 0.7)); },
			() => { this.arrays[drow][dcol] = Math.tanh(5 * (this.arrays[this.memory2][4] + this.arrays[this.memory2][5] - 0.7)); },
			() => { this.arrays[drow][dcol] = Math.tanh(5 * (this.arrays[this.memory2][3]             - 0.7)); },
		];
				
		const readerFormulas = 
		[
			"reader[0] = 0;",
			"reader[1] = Math.tanh(5 * (memory[0] + memory[5] - 0.7));",
			"reader[2] = Math.tanh(5 * (memory[1] + memory[2] - 0.7));",
			"reader[3] = Math.tanh(5 * (memory[1] + memory[2] - 0.7));",
			"reader[4] = Math.tanh(5 * (memory[0] + memory[4] - 0.7));",
			"reader[5] = Math.tanh(5 * (memory[4] + memory[5] - 0.7));",
			"reader[6] = Math.tanh(5 * (memory[3] - 0.7));",
		];
		
		if(drow == this.eraser)      { populateEraser[dcol](); this.formulaText = eraserFormulas[dcol]; }
		else if(drow == this.writer) { populateWriter[dcol](); this.formulaText = writerFormulas[dcol]; }
		else if(drow == this.filter) { populateFilter[dcol](); this.formulaText = filterFormulas[dcol]; }
		else if(drow == this.memory2) 
		{
			this.arrays[drow][dcol] = this.arrays[this.memory][dcol] * this.arrays[this.eraser][dcol]  + this.arrays[this.writer][dcol] * this.arrays[this.filter][dcol];
			this.formulaText = `memory[${dcol}] = memory[${dcol}] * eraser[${dcol}] + writer[${dcol}] * filter[${dcol}];`;
			
			
		}
		else if(drow == this.reader) 
		{ 
			populateReader[dcol](); this.formulaText = readerFormulas[dcol];
			
			if(dcol == 0)
			{
				//hack in the active node on the graphic
				grammar_graphic.activeNode = 0;
				let max = this.arrays[this.memory2][0];
				for(let i = 1; i < this.arrays[this.memory2].length; i++) 
				{
					if(this.arrays[this.memory2][i] > max) 
					{
						max = this.arrays[this.memory2][i];
						grammar_graphic.activeNode = i;
					}
				}
				grammar_graphic.updateGraphic();
			}
		}
		else if(drow == this.filter2) { this.arrays[drow][dcol] = 1; this.formulaText = "filter[" + dcol + "] = 1;";}
		else if(drow == this.readout) { this.arrays[drow][dcol] = this.arrays[this.reader][dcol]; this.formulaText = `readout[${dcol}] = reader[${dcol}] * filter[${dcol}];`;}
		
	}
	
	updateMiscCell(id)
	{
		let predictions = this.arrays[this.readout]
				.map((e, i) => [e, i]) 		
				.filter(e => e[0] > 0.5) 	
				.map(e => e[1]);
			
		if(id == "prediction")
		{
			this.prediction = predictions.map(e => this.tokens[e]).join();
			this.formulaText = "predictions = readout.filter(activation => activation > 0.5).join()"
		}
		else if(id == "selection")
		{
			//if(predictions[0] == 1) this.selection ='T';
			//else if(predictions[1] == 3) this.selection = 'X';
			this.selectionIndex = random(predictions);
			this.selection = this.tokens[this.selectionIndex];
			
			this.formulaText = "selection = random(predictions);"
		}
		else if(id == "string")
		{
			this.stringInProgress += this.selection;
			this.formulaText = "string += selection:";
		}
		else if(id == "input")
		{
			for(let i = 0; i < this.arrays[this.input].length; i++) 
			{ 
				this.arrays[this.input][i] = (this.tokens[i] == this.selection) ? 1 : 0; 
			}
			this.prediction = "";
			this.selection = "";
			this.formulaText = "//update input";
		}
		else if(id == "memory")
		{
			for(let i = 0; i < this.arrays[this.memory].length; i++) { this.arrays[this.memory][i] = this.arrays[this.memory2][i]; }
			this.formulaText = "//update memory";
			
			
		}
		
	}
	
	updateGraphic()
	{
		this.pg.clear();
		this.pg.noStroke();
		
		let yoff = 3;
		let w = this.colWidth - 8;
		let h = this.rowHeight - 8;
		
		
		//top box
		this.pg.stroke(13, 17, 23);
		//this.pg.stroke(100);
		this.pg.fill(this.pink);
		this.pg.rect(this.colWidth, yoff, 2 * this.colWidth - 8, h, 5, 5, 5, 5);
		
		this.pg.textAlign(LEFT,CENTER);
		this.pg.textSize(20);
		this.pg.fill(0);
		this.pg.noStroke(); 
		this.pg.text(this.stringInProgress, this.colWidth + 8, yoff + h/2);
								 
		//grid
		this.pg.textAlign(CENTER,CENTER);
		this.pg.textSize(20);
		
		for(let j = 0; j < this.arrays.length; j++)
		{
			let y = yoff + (this.rows[j]) * this.rowHeight;
			for(let i = 0; i < this.arrays[j].length; i++)
			{
				let x = (i + 1.5) * this.colWidth;
				
				this.pg.stroke(13, 17, 23);
				this.pg.fill(this.colors[j]);
				this.pg.rect(x - w/2, y, w, h, 5, 5, 5, 5);
				
				this.pg.noStroke();
				this.pg.fill(0);
				this.pg.text(this.arrays[j][i] < 0.005 ? 0 : round(this.arrays[j][i], 2), x, y + h/2);
				//if(j == this.reader && i == this.arrays[j].length - 1)console.log(this.arrays[j][i]);
			}
		}
		
		//output boxes
		this.pg.fill(this.pink);
		this.pg.stroke(13, 17, 23);
		this.pg.rect(this.colWidth, yoff + 19 * this.rowHeight, w, h, 5, 5, 5, 5);
		this.pg.rect(this.colWidth, yoff + 21 * this.rowHeight, w, h, 5, 5, 5, 5);
		
		this.pg.fill(255);
		this.pg.rect(2.5 * this.colWidth, yoff + 19 * this.rowHeight, 5.5 * this.colWidth - 8, 3 * this.rowHeight - 8, 5, 5, 5, 5);
		
		this.pg.textAlign(LEFT, TOP);
		this.pg.textSize(16); 
		this.pg.fill(0);
		this.pg.noStroke(); 
		this.pg.text(this.formulaText, 2.5 * this.colWidth + 16, yoff + 19 * this.rowHeight + 12);
		
		this.pg.textAlign(CENTER,CENTER);
		this.pg.textSize(20);
		this.pg.fill(0);
		this.pg.noStroke(); 
		this.pg.text(this.prediction, this.colWidth + w/2, yoff + 19 * this.rowHeight + h/2);
		this.pg.text(this.selection,  this.colWidth + w/2, yoff + 21 * this.rowHeight + h/2);
		
		//row labels
		this.pg.textAlign(RIGHT,CENTER);
		this.pg.textSize(20);
		//this.pg.fill(201, 209, 217);
		this.pg.fill(13, 17, 23);
		for(let i = 0; i < this.rowLabels.length; i++)
		{
			this.pg.text(this.rowLabels[i][1], this.colWidth - 8, yoff + this.rowLabels[i][0] * this.rowHeight + h/2);
		}
		
		//column labels
		this.pg.textAlign(CENTER,CENTER);
		for(let i = 0; i < this.tokens.length; i++)
		{
			this.pg.text(this.tokens[i], (1.5+i) * this.colWidth, yoff + 2 * this.rowHeight + h/2 + 5);
			this.pg.text(this.tokens[i], (1.5+i) * this.colWidth, yoff + 14 * this.rowHeight + h/2 + 5);
		}
		for(let i = 0; i < this.arrays[1].length; i++)
		{
			this.pg.text("node[" + i + "]", (1.5+i) * this.colWidth, yoff + 5 * this.rowHeight + h/2 + 2);
		}
		
		//selected cell
		if(this.cell < this.gridlinks.length)
		{
			this.pg.stroke(13, 17, 23);
			this.pg.strokeWeight(3);
			this.pg.noFill();
			let col = this.gridlinks[this.cell].col;
			let row = this.gridlinks[this.cell].row;	
			let x4 = (col+1) * this.colWidth + (this.colWidth - w)/2;
			let y4 = yoff + (this.rows[row]) * this.rowHeight;
			this.pg.rect(x4,y4,w, h,6,6,6,6);
		}
		//beziers
		this.pg.stroke(13, 17, 23);
		this.pg.strokeWeight(1.2);
		
		if(this.cell < this.gridlinks.length)
		{
			if(this.gridlinks[this.cell].precedents.length == 0)
			{
				this.pg.fill(13, 17, 23);
				let col = this.gridlinks[this.cell].col;
				let row = this.gridlinks[this.cell].row;	
				let x4 = (col + 1.5) * this.colWidth;
				let y4 = yoff + (this.rows[row]) * this.rowHeight;
				this.pg.ellipse(x4,y4,6);
			}
			
			for(let i = 0; i < this.gridlinks[this.cell].precedents.length; i++)
			{
				let col = this.gridlinks[this.cell].precedents[i].col;
				let row = this.gridlinks[this.cell].precedents[i].row;
				let x1 = (col + 1.5) * this.colWidth;
				let y1 = yoff + (this.rows[row]) * this.rowHeight + h;
				col = this.gridlinks[this.cell].col;
				row = this.gridlinks[this.cell].row;
				let x4 = (col + 1.5) * this.colWidth;
				let y4 = yoff + (this.rows[row]) * this.rowHeight;

				let x2 = x1;
				let y2 = y1 + (y4 - y1)*0.6;
				let x3 = x4;
				let y3 = y4 - (y4 - y1)*0.6;

				this.pg.noFill();
				this.pg.bezier(x1,y1,x2,y2,x3,y3,x4,y4);
				this.pg.fill(13, 17, 23);
				this.pg.ellipse(x1,y1,6);
				this.pg.ellipse(x4,y4,6);
			}
		}
		else
		{
			let c = this.cell % this.gridlinks.length;
			let link = this.misclinks[c]; 
			
			let x1 = 0;
			let y1 = 0;
			let x4 = 0;
			let y4 = 0;
			let x2 = 0;
			let y2 = 0;
			let x3 = 0;
			let y3 = 0;
			
			switch(link.id)
			{
				case 'prediction':
					let predictions = this.arrays[this.readout]
						.map((e, i) => [e, i]) 		
						.filter(e => e[0] > 0.5) 	
						.map(e => e[1]);
					
					
					for(let col of predictions)
					{
						x1 = (col + 1.5) * this.colWidth ;
						y1 = yoff + this.rows[this.readout] * this.rowHeight + h;
						x4 = (link.icol + 0.5) * this.colWidth ;
						y4 = yoff + link.irow * this.rowHeight ;
						x2 = x1;
						y2 = y1 + (y4 - y1)*0.6;
						x3 = x4;
						y3 = y4 - (y4 - y1)*0.6;
						
						this.pg.noFill();
						this.pg.bezier(x1,y1,x2,y2,x3,y3,x4,y4);
						this.pg.fill(13, 17, 23);
						this.pg.ellipse(x1,y1,6);
						this.pg.ellipse(x4,y4,6);
					}
					
					break;
				case 'selection':
					this.pg.line(link.prevcol * this.colWidth + w/2, yoff + link.prevrow * this.rowHeight  + h, link.icol * this.colWidth + w/2, yoff + link.irow * this.rowHeight);
					this.pg.ellipse(link.prevcol * this.colWidth + w/2, yoff + link.prevrow * this.rowHeight + h,6);
					this.pg.ellipse(link.icol * this.colWidth + w/2, yoff + link.irow * this.rowHeight,6);
					
					break;
				case 'string':
					x1 = link.prevcol * this.colWidth + w;
					y1 = yoff + link.prevrow * this.rowHeight + h/2;
					x4 = link.icol * this.colWidth + 2 * this.colWidth - 8;
					y4 = yoff + link.irow * this.rowHeight + h/2;
					x2 = x1 + 500;
					y2 = y1;
					x3 = x4 + 300;
					y3 = y4;
					
					this.pg.noFill();
					this.pg.bezier(x1,y1,x2,y2,x3,y3,x4,y4);
					this.pg.fill(13, 17, 23);
					this.pg.ellipse(x1,y1,6);
					this.pg.ellipse(x4,y4,6);
					
					break;
				case 'input':
					x1 = link.prevcol * this.colWidth + w;
					y1 = yoff + link.prevrow * this.rowHeight + h;
					x4 = (this.selectionIndex + 1.5) * this.colWidth;
					y4 = yoff + link.irow * this.rowHeight;
					x2 = x1;
					y2 = y1 + (y4 - y1)*0.6;
					x3 = x4;
					y3 = y4 - (y4 - y1)*0.6;
					
					this.pg.noFill();
					this.pg.bezier(x1,y1,x2,y2,x3,y3,x4,y4);
					this.pg.fill(13, 17, 23);
					this.pg.ellipse(x1,y1,6);
					this.pg.ellipse(x4,y4,6);
					
					break;
				case 'memory':
					
					x1 = link.prevcol * this.colWidth + w + (this.colWidth-w)/2;
					y1 = yoff + link.prevrow * this.rowHeight + h/2;
					x4 = link.icol * this.colWidth + w + 4;
					y4 = yoff + link.irow * this.rowHeight + h/2;
					x2 = x1 + 150;
					y2 = y1;
					x3 = x4 + 150;
					y3 = y4;
					
					this.pg.noFill();
					this.pg.bezier(x1,y1,x2,y2,x3,y3,x4,y4);
					this.pg.fill(13, 17, 23);
					this.pg.ellipse(x1,y1,6);
					this.pg.ellipse(x4,y4,6);
					
					break;
				default:
					console.log("System.OutToLunchException: Employee reference not set to an instance of an employee.");
			}
		}
	}
	
	draw(x, y)
	{
		//1919/916
		let s = min(1, width / 2000);
		image(this.pg, x, y, s * this.pg.width, s * this.pg.height);
	}
	
}