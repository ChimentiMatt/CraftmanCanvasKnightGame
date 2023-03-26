CMP.FileCatcher = function () {
    this.init();
};

CMP.FileCatcher.prototype = {
    init: function() {
        this.subscribers = [];
        let canvas = document.getElementById('gcanvas');
        canvas.addEventListener('drop',this.ondrop.bind(this));
        canvas.addEventListener('dragover',this.ondragover.bind(this), false);
        canvas.addEventListener("dragleave", this.ondragover.bind(this), false);
        canvas.addEventListener("dragend", this.ondragover.bind(this), false);
        CMP.Listen('FileCatcherSubscribe', this.FileCatcherSubscribe.bind(this));
        console.log("CMP FileCatcher is online");

        // Add the following line to classes with _onDragOver, _onDragOut, _onFileDrop 
        // in order to subscribe to file catching. 
        // CMP.Dispatch({type:'FileCatcherSubscribe',data:this})
    },

    FileCatcherSubscribe: function({data})
    {
        this.subscribers.push(data);
    },

    cleanEvent: function(event){
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    },

    ondragover: function(event){
        this.cleanEvent(event);
        this.dispatchOnEvent(event,'_onDragOver','_onDragOut');
    },

    ondrop: function(event){
        this.cleanEvent(event);
        let files = event.dataTransfer.files;
        if(files.length > 0)
        {
            this.dispatchOnEvent(event,'_onFileDrop');
        }
    },

    dispatchOnEvent: function(event,functionName,failCase)
    {
        for (let i = this.subscribers.length - 1; i >= 0; i--) {
            if(!this.subscribers[i] || this.subscribers[i]._markedForRemoval)
            {
                this.subscribers.splice(i,-1);
            }
            else
            {
                let target = this.subscribers[i];
                if(typeof target[functionName] == "function")
                {
                    let local = target.globalToLocal(event.clientX * 1.25,event.clientY * 1.25);
                    if(target.hitTest(local.x,local.y))
                    {
                        target[functionName](event);
                        target._dragState = true;
                    }
                    else if(failCase && typeof target[failCase] == "function" && target._dragState)
                    {
                        target[failCase]();
                        target._dragState = false;
                    }
                }
            }
        }
    }
};