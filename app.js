class DrumKit {
  constructor() {
    this.playBtn = document.querySelector(".play");
    this.muteBtns = document.querySelectorAll(".mute");
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.bitesAudio = document.querySelector(".bites-sound");
    this.currentKick = "./sound/kick-classic.wav"; //default sounds
    this.currentSnare = "./sound/snare-acoustic01.wav";
    this.currentHihat = "./sound/hihat-acoustic01.wav";
    this.currentBite = "./sound/Dude.wav";
    this.index = 0; //track our track
    this.bpm = 150; //beat per monute
    this.isPlayin = null;
    this.selects = document.querySelectorAll("select"); //grabing selects all of them
  }

  activePad() {
    this.classList.toggle("active");
  }

  repeat() {
    let step = this.index % 10;
    const activeBars = document.querySelectorAll(`.b${step}`);
    //loop over the pads
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`; //2 is itteration count
      //check if pad is active
      if (bar.classList.contains("active")) {
        //check each sound
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.play();
          this.kickAudio.currentTime = 0;
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.play();
          this.snareAudio.currentTime = 0;
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.play();
          this.hihatAudio.currentTime = 0;
        }
        if (bar.classList.contains("bites-pad")) {
          this.bitesAudio.play();
          this.bitesAudio.currentTime = 0;
        }
      }
    });
    this.index++;
  }

  start() {
    console.log(this);
    const interval = (60 / this.bpm) * 1000;
    //check if it is already playing
    //checkin the oposite of NULL
    if (!this.isPlayin) {
      this.isPlayin = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      //removing the interval
      clearInterval(this.isPlayin);
      this.isPlayin = null;
    }
  }

  updateBtn() {
    console.log(this.isPlayin);
    if (!this.isPlayin) {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    }
  }

  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
      case "bites-select":
        this.bitesAudio.src = selectionValue;
        break;
    }
  }

  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
        case "3":
          this.bitesAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
        case "3":
          this.bitesAudio.volume = 1;
          break;
      }
    }
  }
}

const drumKit = new DrumKit();

//event listeners
drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playBtn.addEventListener("click", function () {
  drumKit.updateBtn();
  drumKit.start();
});

drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});

drumKit.muteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumKit.mute(e);
  });
});
