import audios from "./data.js";
import { path, secondsToMinutes } from "./utils.js";
import elements from "./playerElements.js";

export default {
  audioData: audios,
  currentAudio: {},
  currentPlaying: 0,
  isPlaying: false,
  
  start() {
    elements.get.call(this);
    this.update();
  },

  play() {
    this.isPlaying = true;
    this.audio.play();
    this.playPause.innerText = "pause";
  },

  pause() {
    this.isPlaying = false;
    this.audio.pause();
    this.playPause.innerText = "play_arrow";
  },

  previousMusic() {
    if(this.currentPlaying == 0){
      this.setSeek(0);
    }
    else{
      this.isPlaying = false;
      this.audio.pause();

      this.currentPlaying--;

      this.update();
      this.play();
      this.mute.innerText = this.audio.muted ? "volume_off" : "volume_up";
    }
  },

  nextMusic() {
    if(this.currentPlaying == this.audioData.length){ 
      this.restart();
      this.play();
    }
    else{
      this.isPlaying = false;
      this.audio.pause();

      this.currentPlaying++;

      this.update();
      this.play();
      this.mute.innerText = this.audio.muted ? "volume_off" : "volume_up";
    }
  },

  togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  },

  toggleMute() {
    this.audio.muted = !this.audio.muted;
    this.mute.innerText = this.audio.muted ? "volume_off" : "volume_up";
  },

  next() {
    this.currentPlaying++;
    if (this.currentPlaying == this.audioData.length) this.restart();
    this.update();
    this.play();
  },

  setVolume(value) {
    this.audio.volume = value / 100;
  },

  setSeek(value) {
    this.audio.currentTime = value;
  },

  timeUpdate() {
    this.currentDuration.innerText = secondsToMinutes(this.audio.currentTime);
    this.seekbar.value = this.audio.currentTime;
  },

  update() {
    this.currentAudio = this.audioData[this.currentPlaying];
    this.cover.style.background = `url('${path(this.currentAudio.cover)}') no-repeat center center / cover`;
    this.title.innerText = this.currentAudio.title;
    this.artist.innerText = this.currentAudio.artist;
    elements.createAudioElement.call(this, path(this.currentAudio.file));

    this.audio.onloadeddata = () => {
      elements.actions.call(this);
    };
  },

  restart() {
    this.currentPlaying = 0;
    this.update();
  },
};

// Getting keyboard click  
const keyboard = {
  'k' : 'play-pause',
  'K' : 'play-pause',
  'L' : 'skip-next',
  'l' : 'skip-next',
  'j' : 'skip-previous',
  'J' : 'skip-previous',
  'm' : 'mute',
  'M' : 'mute',
  'Enter' : 'play-pause',
  'PageUp' : 'vol-control',
  'PageDown' : 'vol-control',
}
  
const mappingKeyboard = (event) => {
    
  const key = event.key;
  const allowedKey = () => Object.keys(keyboard).indexOf(key) !== -1;

  if(allowedKey()){
    document.getElementById(keyboard[key]).click(); 
  } 
}

document.addEventListener('keydown', mappingKeyboard);  