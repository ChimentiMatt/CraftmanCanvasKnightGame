CMP.Heat=function(){if(!CMP._heatInstance){CMP._heatInstance=this,this.section=0,this.elapsedTime=0,this.timer=0;var a=String.fromCharCode(65+Math.floor(26*Math.random()));this.userId=a+Date.now(),this.heatTrack=[]}},CMP.Heat.prototype={init:function(){this.stage=CMP.App.stage,CMP.App.addUpdate(this.checkMouse.bind(this)),this.stage.canvas.addEventListener("mousedown",this.mDown.bind(this)),this.stage.canvas.addEventListener("mouseup",this.mUp.bind(this))},progress:function(a){this.section++,this.sectionName=a,this.elapsedTime=0,this.timer=0},mDown:function(a){this.isMouseDown||(this.isMouseDown=!0,this.track(a))},mUp:function(a){this.isMouseDown&&(this.isMouseDown=!1)},track:function(a){var b={};b.userId=this.userId,b.time=this.elapsedTime,b.worldTime=Date.now(),b.section=this.section,this.sectionName&&(b.sectionName=this.sectionName),AppConfig&&AppConfig.VERSION&&(b.version=AppConfig.VERSION),AppConfig&&AppConfig.GAME_ID&&(b.id=AppConfig.GAME_ID),b.x=a.x,b.y=a.y,b.width=this.stage.width,b.height=this.stage.height,"undefined"!=typeof navigator&&navigator.userAgent&&(b.userAgent=navigator.userAgent),this.heatTrack.push(b)},checkMouse:function(a){this.timer+=a.delta,this.elapsedTime+=a.delta,this.timer>2e3&&(this.timer%=2e3,this.heatTrack.length>0&&this.sendData())},sendData:function(){var a=JSON.stringify(this.heatTrack),b=btoa(a),c=new XMLHttpRequest,d="https://cmp-automator.herokuapp.com/heater/?heat="+b;c.open("POST",d,!0),c.setRequestHeader("Content-Type","application/json"),c.send(b),this.heatTrack=[]}},new CMP.Heat;