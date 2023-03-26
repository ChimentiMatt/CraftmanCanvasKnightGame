AudioManager = function (params)
{
    this.construct(params);
	this.init();
};

AudioManager.prototype =
{
    audio: {
    },

    currentPlaying: [
    ],

    init: function()
    {
    },

    compileAudio: function(scenes)
    {
        // go thru all scenes and compile custom assets/opts
        for(let i=0; i<SceneConfig.scenes.length; i++) {
            let scene = SceneConfig.scenes[i]
            this.audio[scene.name] = scene.audio;
        }

        CMP.Log(CMP.Log.INFO,'master audio', this.audio);
    },

    goToScene: function(scene)
    {
        CMP.Log(CMP.Log.EXTRA,'audio in', scene, this.audio[scene])
        // remove old audio
        for(let i=this.currentPlaying.length-1; i>=0; i--) {
            let foundAudio = this.audio[scene].find(audio => audio.id == this.currentPlaying[i].id);
            if(typeof foundAudio !== 'undefined') { // exists in next scene
                CMP.Log(CMP.Log.EXTRA,'set',foundAudio.id,'loop',foundAudio.loop)
                this.currentPlaying[i].setLoop(foundAudio.loop)
            }
            else {
                // proper way to remove audio?
                this.currentPlaying[i].stop();
                this.currentPlaying[i].markForRemoval();
                this.currentPlaying.splice(i,1);
            }
        }
        // create new audio
        for(let i=0; i<this.audio[scene].length; i++) {
            let foundAudio = this.currentPlaying.find(audio => audio.id == this.audio[scene][i].id);
            if(typeof foundAudio == 'undefined') {
                let newAudio = new CMP.Audio({ id: this.audio[scene][i].id })
                newAudio.setLoop(this.audio[scene][i].loop);
                newAudio.play()

                this.currentPlaying.push(newAudio);
            }
        }
    }
};
extend("AudioManager", "CMP.DisplayObjectContainer");
