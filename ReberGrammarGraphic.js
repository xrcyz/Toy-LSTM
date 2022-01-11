
class ReberGrammarGraphic
{
	constructor()
	{
		//see ReberGrammar.js for non-spaghetti code
        
        this.pg = createGraphics(950,450);
		
		this.cellWidth = 130;
		this.marginX = this.cellWidth / 2;
		this.marginY = (this.pg.height - 2 * this.cellWidth) / 2.0;
		
		this.activeNode = -1;
		
		this.entryPoint = [-0.2, 1];
		this.positions = 
		[
			[1, 1],   //node 0
			[2, 0],   //node 1
			[3.5, 0], //node 2*
			[4.5, 1], //node 3*
			[3.5, 2], //node 4*
			[2, 2],   //node 5
			[6, 1], //node 6*
		];
		
		this.links = 
		[
			[0,1,'T'],
			[0,5,'P'],
			[1,1,'S'],
			[1,2,'X'],
			[5,5,'T'],
			[5,4,'V'],
			[2,5,'X'],
			[4,2,'P'],
			[2,3,'S'],
			[4,3,'V'],
			[3,6,'E'],
		];
				
		this.updateGraphic();
	}
	
	updateGraphic()
	{
		//hack in first arrow
		this.pg.stroke(13, 17, 23);
		this.pg.strokeWeight(3);
		let [tx,ty] = [this.marginX + this.positions[0][0] * this.cellWidth - 50, this.marginY + this.positions[0][1] * this.cellWidth];
		
		this.pg.line(this.marginX + this.entryPoint[0] * this.cellWidth, 
								 this.marginY + this.entryPoint[1] * this.cellWidth, 
								 tx, ty);
		//arrow head
		this.pg.beginShape();
		this.pg.vertex(tx, ty);
		let temp = createVector(-1, 0).rotate(PI/6).setMag(5);
		this.pg.vertex(tx + temp.x, ty + temp.y);
		temp.rotate(-PI/3);
		this.pg.vertex(tx + temp.x, ty + temp.y);
		this.pg.endShape(CLOSE);
		//edge label
		//this.pg.fill(201, 209, 217);
		this.pg.fill(13, 17, 23);
		this.pg.stroke(228);
		this.pg.strokeWeight(15);
		this.pg.textSize(24);
		this.pg.textAlign(CENTER, CENTER);
		this.pg.text("B", this.marginX + this.entryPoint[0] * this.cellWidth + 0.45  * this.cellWidth, this.marginY + this.positions[0][1] * this.cellWidth);
		
		//draw arrows
		this.pg.stroke(13, 17, 23);
		this.pg.strokeWeight(3);
		this.pg.noFill();
		for(let link of this.links)
		{
			if(link[0] == link[1]) //loops
			{
				let pos = [this.marginX + this.positions[link[0]][0] * this.cellWidth, this.marginY + this.positions[link[0]][1] * this.cellWidth];
				let r = 35;
				if(link[0] == 1)
				{
					pos[1] -= r;
					this.pg.arc(pos[0], pos[1], 2*r, 2*r, PI - PI/8, PI/8);
					
					//arrow head
					let temp = createVector(0, r).setHeading(PI/8);
					let x = temp.x + pos[0];
					let y = temp.y + pos[1];
					this.pg.beginShape();
					this.pg.vertex(x, y);
					temp.setMag(5).rotate(3*PI/2+PI/6);
					this.pg.vertex(x + temp.x, y + temp.y);
					temp.rotate(-PI/3);
					this.pg.vertex(x + temp.x, y + temp.y);
					this.pg.endShape(CLOSE);
				}
				else
				{
					pos[1] += r;
					this.pg.arc(pos[0], pos[1], 2*r, 2*r, 2*PI-PI/8, PI+PI/8);
					
					//arrow head
					let temp = createVector(0, r).setHeading(2*PI-PI/8);
					let x = temp.x + pos[0];
					let y = temp.y + pos[1];
					this.pg.beginShape();
					this.pg.vertex(x, y);
					temp.setMag(5).rotate(PI/2+PI/6);
					this.pg.vertex(x + temp.x, y + temp.y);
					temp.rotate(-PI/3);
					this.pg.vertex(x + temp.x, y + temp.y);
					this.pg.endShape(CLOSE);
				}
			}
			else //straight arrows
			{
				let pos1 = [this.marginX + this.positions[link[0]][0] * this.cellWidth, this.marginY + this.positions[link[0]][1] * this.cellWidth];
				let pos2 = [this.marginX + this.positions[link[1]][0] * this.cellWidth, this.marginY + this.positions[link[1]][1] * this.cellWidth];

				let inc = createVector(pos2[0] - pos1[0], pos2[1] - pos1[1]).setMag(40);
				pos1[0] += inc.x;
				pos1[1] += inc.y;
				pos2[0] -= inc.x;
				pos2[1] -= inc.y;

				this.pg.line(pos1[0], pos1[1], pos2[0], pos2[1]);

				//arrow head
				this.pg.beginShape();
				this.pg.vertex(pos2[0], pos2[1]);
				inc.setMag(5).rotate(PI+PI/6);
				this.pg.vertex(pos2[0] + inc.x, pos2[1] + inc.y);
				inc.rotate(-PI/3);
				this.pg.vertex(pos2[0] + inc.x, pos2[1] + inc.y);
				this.pg.endShape(CLOSE);
			}
		}
		
		//draw edge labels
		//this.pg.fill(201, 209, 217);
		this.pg.fill(13, 17, 23);
		this.pg.stroke(228);
		this.pg.strokeWeight(16);
		this.pg.textSize(24);
		this.pg.textAlign(CENTER, CENTER);
		for(let link of this.links)
		{
			let x, y;
			if(link[0] == link[1]) //loops
			{
				let pos = [this.marginX + this.positions[link[0]][0] * this.cellWidth, this.marginY + this.positions[link[0]][1] * this.cellWidth];
				if(link[0] == 1)
				{
					x = pos[0];
					y = pos[1] - 70;
				}
				else
				{
					x = pos[0];
					y = pos[1] + 70;
				}
			}
			else
			{
				let pos1 = [this.marginX + this.positions[link[0]][0] * this.cellWidth, this.marginY + this.positions[link[0]][1] * this.cellWidth];
				let pos2 = [this.marginX + this.positions[link[1]][0] * this.cellWidth, this.marginY + this.positions[link[1]][1] * this.cellWidth];

				x = pos1[0] + (pos2[0] - pos1[0])/2;
				y = pos1[1] + (pos2[1] - pos1[1])/2;
				
			}
			this.pg.text(link[2], x, y);
		}
		
		//draw nodes
		this.pg.fill(189, 215, 238);
		this.pg.stroke(66, 139, 201);
		for(let i = 0; i < this.positions.length; i++)
		{
			if(this.activeNode == i)
			{
				this.pg.strokeWeight(5);
			}
			else
			{
				this.pg.strokeWeight(1);
			}
			this.pg.ellipse(this.marginX + this.positions[i][0] * this.cellWidth, this.marginY + this.positions[i][1] * this.cellWidth, 60);
		}
		
		//draw text
		this.pg.fill(255);
		this.pg.stroke(0);
		this.pg.strokeWeight(5);
		this.pg.textSize(30);
		this.pg.textAlign(CENTER, CENTER);
		for(let i = 0; i < this.positions.length; i++)
		{
			this.pg.text(i, this.marginX + this.positions[i][0] * this.cellWidth, this.marginY + this.positions[i][1] * this.cellWidth);
		}
		
	}
	
	draw()
	{
		let s = min(1, width / 2000);
		image(this.pg, width - s * this.pg.width, 50, s * this.pg.width, s * this.pg.height);
	}
}