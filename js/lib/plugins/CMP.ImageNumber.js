ImageNumber = function (params)
{
	this.construct(params);

	this.init();
};

ImageNumber.prototype =
{

	init: function()
	{
		if(!this.color)
		{
			this.color = 'white'; 
		}
		this.generateText(this.number);
	},

	generateText: function(number)
	{
		if(this.currentNumber == number){return}
		if(this.numberContainer)
		{
			this.numberContainer.markForRemoval();
		}
		this.numberContainer = this.addChild(new CMP.DisplayObjectContainer({}));

		let x = 0;

		number = "" +number;
		for(let i = 0; i < number.length; i++)
		{
			let nextNum = number[i];
			let y = 0;
			if(nextNum === ',')
			{
				x -= 45;
			}
			if(nextNum === '1')
			{
				x -= 20;
			}
			let num = this.numberContainer.addChild(new CMP.Sprite({
				x:x,
				y:y,
				image:this.color + "_" + nextNum
			}));
			x += num.width - 20;
			if(nextNum === '1')
			{
				x -= 20;
			}
			if(nextNum === ',')
			{
				x -= 25;
			} 
		}
		if(this.align === 'center')
		{
			this.numberContainer.x = -x/2;
		}
		else if(this.align === 'right')
		{
			this.numberContainer.x = -x;
		}

		this.currentNumber = number;
	}
};
extend("ImageNumber", "CMP.DisplayObjectContainer");