const soundPaths = {
    //ADD sound in the format below
    error: '../../sound/error-8-206492.mp3',
};

window.SoundPlayer = function(soundType) {
    this.soundType = soundType;
    this.audioFilePath = soundPaths[soundType];

    this.play = function() {
        if (this.audioFilePath) {
            const audio = new Audio(this.audioFilePath);
            audio.play().catch((error) => {
                console.error('Failed to play sound:', error);
            });
        } else {
            console.error(`Sound type "${this.soundType}" does not exist.`);
        }
    };
};


// create instances for sound like below
const errorSoundPlayer = new SoundPlayer('error');

