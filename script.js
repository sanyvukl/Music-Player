const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "911d6df8c8mshac89478e0372b05p1f1015jsn82880a20a4e2",
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
  },
};
const getMusicData = async () => {
  const music = await fetch(
    "https://shazam.p.rapidapi.com/search?term=kiss%20the%20rain&locale=en-US&offset=0&limit=5",
    options
  );
  return await music.json();
};
window.onload = () => {
  const songs = [
    {
      name: "jacinto-1",
      displayName: "Electric Chill Machine",
      author: "jacinto",
    },
    {
      name: "jacinto-2",
      displayName: "Seven Nation Army (Remix)",
      author: "jacinto",
    },
    {
      name: "jacinto-3",
      displayName: "Goodnight, Disco Queen",
      author: "jacinto",
    },
    {
      name: "metric-1",
      displayName: "Front Row (Remix)",
      author: "metric",
    },
  ];
  const music = document.getElementById("audio");
  const image = document.getElementById("image");

  const playButton = document.getElementById("play");
  const nextButton = document.getElementById("next");
  const prevButton = document.getElementById("prev");

  const progressContainer = document.getElementById("progress-container");
  const progress = document.getElementById("progress");
  const progressLine = document.getElementById("progress-line");
  const currentTime = document.getElementById("current-time");
  const duration = document.getElementById("duration");

  const title = document.getElementById("title");
  const artist = document.getElementById("artist");

  let isPlaying = false;
  let songIndex = 0;
  const progressLineWidth = progressLine.clientWidth;

  const playSong = () => {
    music.play();
    isPlaying = true;
    playButton.setAttribute("title", "Pause");
    playButton.classList.replace("fa-play", "fa-pause");
  };
  const pauseSong = () => {
    music.pause();
    isPlaying = false;
    playButton.setAttribute("title", "Play");
    playButton.classList.replace("fa-pause", "fa-play");
  };

  playButton.addEventListener("click", () =>
    isPlaying ? pauseSong() : playSong()
  );

  const loadSong = (song) => {
    title.textContent = song.displayName;
    artist.textContent = song.author;
    image.src = `img/${song.name}.jpg`;
    music.src = `music/${song.name}.mp3`;
  };
  const nextSong = () => {
    pauseSong();
    songIndex++;
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
    loadSong(songs[songIndex]);
    setTimeout(playSong, 400);
  };
  const prevSong = () => {
    pauseSong();
    songIndex--;
    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    setTimeout(playSong, 400);
  };
  nextButton.addEventListener("click", nextSong);
  prevButton.addEventListener("click", prevSong);
  const setProgressLine = (time, duration) => {
    const progressLineLevel = (time / duration) * 100;
    progress.style.width = `${progressLineLevel}%`;
  };
  const setProggressTime = (newTime, newDuration) => {
    const durationTime =
      Math.floor(newDuration / 60) +
      ":" +
      (newDuration % 60 < 10 ? "0" : "") +
      Math.floor(newDuration % 60);

    const minutes = Math.floor(newTime / 60);
    const seconds = Math.floor(newTime % 60);

    const showTime = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

    duration.textContent = durationTime;
    currentTime.textContent = showTime;

    setProgressLine(newTime, newDuration);
  };
  const updateProgressBar = (e) => {
    if (isPlaying) {
      const time = e.target.currentTime;
      const duration = e.target.duration;

      setProggressTime(time, duration);

      // progressLine.addEventListener("click", (e) => {
      //   const progressLevel = e.offsetX / progressLineWidth;
      //   music.currentTime = Math.floor(music.duration * progressLevel);
      // });
    }
  };
  music.addEventListener("timeupdate", updateProgressBar);
  progressLine.addEventListener("click", (e) => {
    if (isPlaying) {
      const progressLevel = e.offsetX / progressLineWidth;
      music.currentTime = Math.floor(music.duration * progressLevel);
    } else {
      const progressLevel = e.offsetX / progressLineWidth;
      music.currentTime = Math.floor(music.duration * progressLevel);
      setProggressTime(music.currentTime, music.duration);
    }
  });
};
