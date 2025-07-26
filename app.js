// Example playlist: replace with your actual song files and data
const playlist = [
    
      
    {
      title: "maragatha naanayam",
      artist: "Pradeep Kumar",
      src:"Nee-Kavithaigala.mp3"

    },
    {
      title:"Dragon",
      artist:"Leon James",
      src:"Maatikkinaaru Ortharu-128kbps.mp3"
    },
    {
      title:"Blue Star",
      artist:"Pradeep Kumar",
      src:"Railin Oligal-128kbps.mp3"
    },
    {
      title:"Power Pandi",
      artist:"Sean Roldan",
      src:"The Romance Of Power Paandi - Venpani Malare Ft. Dhanush From Power Paandi-64kbps.mp3"
    },
    {
      title:"Vada Chennai",
      artist:"Pradeep Kumar",
      src:"Kaarkuzhal Kadavaiye-64kbps.mp3"
    },
    {
    title:"Retro",
    artist:"Santhosh  Narayanan",
    src:"Edharkaga Marubadi Male Version From Retro Side B-128kbps.mp3",
  },{
    title:"Ayothi",
    artist:"Pradeep Kumar",
    src:"Kaatrodu Pattam Pola-64kbps.mp3"
  },


    

  ];
  
  // Element selectors
  const audio = document.getElementById('audio');
  const playBtn = document.getElementById('play');
  const pauseBtn = document.getElementById('pause');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const songTitle = document.getElementById('song-title');
  const songArtist = document.getElementById('song-artist');
  const progress = document.getElementById('progress');
  const currentTimeEl = document.getElementById('current-time');
  const durationEl = document.getElementById('duration');
  const volume = document.getElementById('volume');
  const playlistEl = document.getElementById('playlist');
  const autoplayCheckbox = document.getElementById('autoplay');
  
  let currentSong = 0;
  let isPlaying = false;
  let isAutoplay = false;
  
  // Render playlist
  function renderPlaylist() {
    playlistEl.innerHTML = '';
    playlist.forEach((song, idx) => {
      const li = document.createElement('li');
      li.textContent = `${song.title} - ${song.artist}`;
      if (idx === currentSong) li.classList.add('active');
      li.addEventListener('click', () => {
        loadSong(idx);
        playSong();
      });
      playlistEl.appendChild(li);
    });
  }
  
  // Load song
  function loadSong(idx) {
    currentSong = idx;
    audio.src = playlist[currentSong].src;
    songTitle.textContent = playlist[currentSong].title;
    songArtist.textContent = playlist[currentSong].artist;
    renderPlaylist();
    progress.value = 0;
    currentTimeEl.textContent = "0:00";
    durationEl.textContent = "0:00";
  }
  
  // Play
  function playSong() {
    audio.play();
    isPlaying = true;
    playBtn.style.display = 'none';
    pauseBtn.style.display = '';
  }
  
  // Pause
  function pauseSong() {
    audio.pause();
    isPlaying = false;
    playBtn.style.display = '';
    pauseBtn.style.display = 'none';
  }
  
  // Previous
  function prevSong() {
    currentSong = (currentSong - 1 + playlist.length) % playlist.length;
    loadSong(currentSong);
    playSong();
  }
  
  // Next
  function nextSong() {
    currentSong = (currentSong + 1) % playlist.length;
    loadSong(currentSong);
    playSong();
  }
  
  // Update progress bar
  function updateProgress() {
    if (audio.duration) {
      progress.value = (audio.currentTime / audio.duration) * 100;
      currentTimeEl.textContent = formatTime(audio.currentTime);
      durationEl.textContent = formatTime(audio.duration);
    }
  }
  
  // Seek
  progress.addEventListener('input', () => {
    if (audio.duration) {
      audio.currentTime = (progress.value / 100) * audio.duration;
    }
  });
  
  // Volume control
  volume.addEventListener('input', () => {
    audio.volume = volume.value;
  });
  
  // Play/Pause buttons
  playBtn.addEventListener('click', playSong);
  pauseBtn.addEventListener('click', pauseSong);
  prevBtn.addEventListener('click', prevSong);
  nextBtn.addEventListener('click', nextSong);
  
  // Autoplay
  autoplayCheckbox.addEventListener('change', () => {
    isAutoplay = autoplayCheckbox.checked;
  });
  
  // On song end
  audio.addEventListener('ended', () => {
    if (isAutoplay) {
      nextSong();
    } else {
      pauseSong();
      audio.currentTime = 0;
    }
  });
  
  // On audio time update
  audio.addEventListener('timeupdate', updateProgress);
  
  // Utility: format time
  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }
  
  // On audio loadedmetadata
  audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
  });
  
  // Init
  audio.volume = volume.value;
  loadSong(currentSong);
  renderPlaylist();