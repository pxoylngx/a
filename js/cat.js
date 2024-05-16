function CreateFish()
{
	fish = {};	
	
	var imgnode = document.createElement('img');
	imgnode.setAttribute('src', 'icon/cat6.png');
	imgnode.style.position = 'absolute';
	
	var leftDiv = document.getElementById("container");
	leftDiv.appendChild(imgnode);
	
	fish.Img = imgnode;
	
	RefreshFish(fish);
	
	return fish;
}

function RefreshFish(fish)
{
	var leftDiv = document.getElementById("container");
	
	fish.Pos = 
		[Math.random() * (leftDiv.offsetWidth - fish.Img.offsetWidth),
		Math.random() * (leftDiv.offsetHeight - fish.Img.offsetHeight)];

	fish.Img.style.left = fish.Pos[0];
	fish.Img.style.top = fish.Pos[1];
}

function CreateCat()
{
	var cat = {};
	cat.Pos = [0, 0];
	cat.Speed = [0, 0];

	var imgnode = document.createElement('img');
	imgnode.setAttribute('src', 'icon/cat0.png');
	imgnode.style.position = 'absolute';
	
	var leftDiv = document.getElementById("container");
	leftDiv.appendChild(imgnode);
	
	cat.Img = imgnode;
	UpdateCatPos(cat);
	
	return cat;
}

function UpdateCatPos(cat)
{
	var image = cat.Img;
	var leftDiv = document.getElementById("container");
	
	if (cat.Pos[0] > 0 && cat.Pos[0] < leftDiv.offsetWidth - image.offsetWidth)
		image.style.left = cat.Pos[0];
	if (cat.Pos[1] > 0 && cat.Pos[1] < leftDiv.offsetHeight - image.offsetHeight)
		image.style.top = cat.Pos[1];
}

function UpdateCat(cat)
{
	const ACC = 70;
	
	var acc = GetAcc(cat);
	acc = V2Normal(acc);
	acc = V2Times(acc, ACC);
	
	console.log(acc);
	
	var now = new Date().getTime();
	var delta = (now - cat.LastUpdate) / 1000;
	
	var move = V2Times(cat.Speed, delta);
	var speedAdd = V2Times(acc, delta);
	
	//console.log(delta, move, speedAdd);
	
	cat.Pos = V2Add(cat.Pos, move);
	cat.Speed = V2Add(cat.Speed, speedAdd);	
	
	if (cat.Pos[0] < 0)
	{	
		cat.Pos[0] = 0;
		//cat.Speed[0] = 0;		
	}
	if (cat.Pos[0] > leftDiv.offsetWidth - cat.Img.offsetWidth)
	{	
		cat.Pos[0] = leftDiv.offsetWidth - cat.Img.offsetWidth;
		//cat.Speed[0] = 0;		
	}
	if (cat.Pos[1] < 0)
	{	
		cat.Pos[1] = 0;
		//cat.Speed[1] = 0;		
	}
	if (cat.Pos[1] > leftDiv.offsetHeight - cat.Img.offsetHeight)
	{	
		cat.Pos[1] = leftDiv.offsetHeight - cat.Img.offsetHeight;
		//cat.Speed[1] = 0;		
	}
	UpdateCatPos(cat);
	
	if (V2Dis(cat.Pos, Fish.Pos) < 5)
		RefreshFish(Fish);
	
	cat.LastUpdate = new Date().getTime();
}

function GetAcc(cat)
{
	var toTarget = V2Minus(Fish.Pos, cat.Pos);
	var speed = V2Length(cat.Speed);	
	var dot = 1;
	if (speed > 1)
		dot = V2Dot(toTarget, cat.Speed);
	if (dot > 0.998)
		acc = V2Normal(toTarget);
	else
		acc = V2Times(V2Normal(cat.Speed), -1);
	
	return acc;
}