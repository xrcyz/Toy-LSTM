
let reberGrammar;
let myLSTM;
let myReberStrings = [];
let frames = 0;
let grammar_graphic;
let lstm_graphic;

function setup() 
{
	createCanvas(windowWidth, windowHeight);
	
	grammar_graphic = new ReberGrammarGraphic();
	lstm_graphic = new LSTMGraphic();
	
	reberGrammar = new ReberGrammar();
	myLSTM = new MyLSTM();
	for(let i = 0; i < 50; i++)
	{
		let str = myLSTM.getReberString(50);
		if(!reberGrammar.validateString(str, 50))
		{
			myReberStrings.push(str + " (grammar violation)");
			//break;
		}
		else
		{
			myReberStrings.push(str);
		}
	}
	
	//console.log(reberGrammar.validateString("BTSSSSXSE", 100));
	

}

function draw() 
{
	//background(13, 17, 23);
	background(228);
	fill(13, 17, 23);
	noStroke();
	textSize(16);
	text(myReberStrings.join("\n"), width - 300, height/2);
	
	frames++;
	if(frames > 10)
	{
		frames = 0;
		//myReberStrings.push(myLSTM.getReberString(30));
		//myReberStrings.shift();
		
		lstm_graphic.update();
	}
	
	grammar_graphic.draw();
	lstm_graphic.draw(10, 50);
	
	//noFill();
	//stroke(255);
	//bezier(100, 20, 100, 100, 200, 20, 200, 100);
	//noLoop();
}

function keyPressed()
{
	lstm_graphic.update();
}

function mouseClicked()
{
	lstm_graphic.update();
}