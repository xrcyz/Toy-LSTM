
let reberGrammar;
let myLSTM;
let myReberStrings = [];
let frames = 0;
let grammar_graphic;
let lstm_graphic;
let autostep = false;

function setup() 
{
	let canvas = createCanvas(windowWidth, windowHeight);
	canvas.style('display', 'block'); 

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
	if(windowWidth < 1000)
	{
		background(13, 17, 23);
		fill(255);
		text("Screen size not supported.", 50, 50);
		return;
	}

	background(228);
	fill(13, 17, 23);
	noStroke();
	textSize(16);
    textAlign(LEFT);
	text(myReberStrings.join("\n"), width - 300, height/2);
	
    textAlign(CENTER);
    text("Use arrow keys to navigate.", width/2, 30);

	frames++;
	if(frames > 5)
	{
		frames = 0;
		//myReberStrings.push(myLSTM.getReberString(30));
		//myReberStrings.shift();
		
		if(autostep) lstm_graphic.update();
	}
	
	grammar_graphic.draw();
	lstm_graphic.draw(10, 50);
	
}

function keyPressed()
{
	if(keyCode == DOWN_ARROW) autostep = true;
	else if(keyCode == UP_ARROW) autostep = false;
	else lstm_graphic.update();
}

function mouseClicked()
{
	lstm_graphic.update();
}