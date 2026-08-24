const workGroups = [
  {
    heading: "Early Chamber Works",
    items: [
      {
        title: "Five Kokinshiu Poems",
        year: "1959",
        forces: "Soprano, flute, clarinet, viola, and harp",
        note: "6 min. Formerly Five Japanese Poems. Nicola di Lorenzo Prize, 1959.",
      },
      {
        title: "Serenade",
        year: "1960",
        forces: "Violin and viola",
        note: "15 min. Five movements. New edition, 1997. Nicola di Lorenzo Prize, 1960.",
      },
      {
        title: "String Quartet",
        year: "1960-61",
        forces: "String quartet",
        note: "23 min. Prince Pierre of Monaco Musical Composition Award, 1971.",
      },
      {
        title: "Mandala Music",
        year: "1962",
        forces: "Improvisation schema for three or more performers",
        note: "Variable duration.",
      },
      {
        title: "Piano Music 2",
        year: "1962-63",
        forces: "Two prepared pianos, bells, gongs, and cymbals",
        note: "Variable duration.",
      },
      {
        title: "Hexahedron",
        year: "1962-63",
        forces: "Piano",
        note: "Variable duration.",
      },
      {
        title: "Nexus 16",
        year: "1964",
        forces: "Chamber orchestra",
        note: "13 min. Commissioned by the Fromm Music Foundation and Berkshire Music Center.",
      },
    ],
  },
  {
    heading: "Orchestra, Amplification, And Tape",
    items: [
      {
        title: "dans le sable",
        year: "1967-68",
        forces: "Soprano, speaker, four altos, and chamber orchestra",
        note: "22 min. Orchestral version, 1970.",
      },
      {
        title: "soft music, HARD MUSIC",
        year: "1969-70",
        forces: "Three amplified pianos",
        note: "20+ min.",
      },
      {
        title: "Oh, Susanna",
        year: "1970",
        forces: "Piano",
        note: "9 min.",
      },
      {
        title: "The Cloud Messenger",
        year: "1966-71",
        forces: "Orchestra",
        note: "18 min.",
      },
      {
        title: "A Little Traveling Music",
        year: "1971-73",
        forces: "Enhanced piano with computer-generated four-channel audio playback",
        note: "10.5 min. Commissioned by Dwight Peltzer.",
      },
      {
        title: "Dreaming Susanna",
        year: "1973",
        forces: "Electronically enhanced orchestra and six-channel audio playback",
        note: "20 min. Fantasy on a Theme by Mozart. Commissioned by Niklaus Wyss and the San Francisco Symphony Orchestra.",
      },
      {
        title: "Song and Dance",
        year: "1975",
        forces: "Amplified orchestra with computer-generated four-channel audio playback",
        note: "24 min. Commissioned by Seiji Ozawa and the San Francisco Symphony Orchestra.",
      },
    ],
  },
  {
    heading: "Enhanced Piano And Ungaretti",
    items: [
      {
        title: "Preludes for the Enhanced Piano",
        year: "1970s",
        forces: "Enhanced piano",
        note: "Mattina in seven-limit just intonation; Dolce declina il sole in five-limit just intonation.",
      },
      {
        title: "Giorno d'un uomo",
        year: "1996",
        forces: "Violin and enhanced piano in seven-limit just intonation",
        note: "Part I of IV. Mattina. Commissioned by Daniel Kobialka.",
      },
      {
        title: "Omaggio a Giuseppe Ungaretti",
        year: "1997",
        forces: "Piano",
        note: "14 min. Versions for enhanced piano in five-limit just intonation and equal tempered piano.",
      },
      {
        title: "L'allegria",
        year: "2002",
        forces: "Baritone, violin, cello, and enhanced piano",
        note: "35 min. Five movements. Commissioned by Thomas Buckner.",
      },
    ],
  },
];

const tracks = [
  {
    title: "1. Eterno",
    meta: "6 Piano Preludes (Omaggio a Ungaretti)",
    src: "media/prelude-01-eterno.mp3",
  },
  {
    title: "2. In Memoria",
    meta: "6 Piano Preludes (Omaggio a Ungaretti)",
    src: "media/prelude-02-in-memoria.mp3",
  },
  {
    title: "3. I fiume",
    meta: "6 Piano Preludes (Omaggio a Ungaretti)",
    src: "media/prelude-03-i-fiume.mp3",
  },
  {
    title: "4. Veglia",
    meta: "6 Piano Preludes (Omaggio a Ungaretti)",
    src: "media/prelude-04-veglia.mp3",
  },
  {
    title: "5. Mattina",
    meta: "6 Piano Preludes (Omaggio a Ungaretti)",
    src: "media/prelude-05-mattina.mp3",
  },
  {
    title: "6. Omaggio",
    meta: "6 Piano Preludes (Omaggio a Ungaretti)",
    src: "media/prelude-06-omaggio.mp3",
  },
  {
    title: "Rush - Omaggio Catalano GSVA",
    meta: "Omaggio audio",
    src: "media/rush-omaggio-catalano-gsva.mp3",
  },
  {
    title: "Dans le sable",
    meta: "Orchestra recording",
    src: "media/dans-le-sable.mp3",
  },
  {
    title: "Song and Dance (DePriest)",
    meta: "Orchestra recording",
    src: "media/song-and-dance-depriest.mp3",
  },
  {
    title: "The Cloud Messenger",
    meta: "Orchestra recording",
    src: "media/the-cloud-messenger.mp3",
  },
];

const interviewTrack = {
  title: "Loren Rush - Barney Childs interview, 2016",
  meta: "Interview audio",
  src: "media/loren-rush-barney-childs-interview-2016-audio-1.mp3",
};

const worksList = document.querySelector("[data-works-list]");
const audioList = document.querySelector("[data-audio-list]");
const interviewAudio = document.querySelector("[data-interview-audio]");

workGroups.forEach((group) => {
  const section = document.createElement("section");
  section.className = "work-group";
  section.innerHTML = `<h3 class="work-group__title">${group.heading}</h3>`;

  group.items.forEach((work) => {
    const item = document.createElement("article");
    item.className = "work-item";
    item.innerHTML = `
      <time class="work-year">${work.year}</time>
      <div>
        <h4 class="work-title">${work.title}</h4>
        <p class="work-forces">${work.forces}</p>
        <p class="work-note">${work.note}</p>
      </div>
    `;

    section.append(item);
  });

  worksList.append(section);
});

const renderAudioPlayer = (track, container, options = {}) => {
  const player = document.createElement("article");
  player.className = "audio-player";
  if (options.playlist) {
    player.dataset.playlistPlayer = "true";
  }

  const downloadLink = options.download === false
    ? ""
    : ` <a class="download-link" href="${track.src}" download>Download MP3</a>`;

  player.innerHTML = `
    <button class="play-pause-button" type="button" aria-label="Play ${track.title}" data-track-title="${track.title}">&gt;</button>
    <div>
      <h3 class="audio-title">${track.title}</h3>
      <p class="audio-meta">${track.meta}${downloadLink}</p>
      <div class="progress-bar" role="slider" aria-label="Seek ${track.title}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0">
        <div class="progress"></div>
      </div>
    </div>
    <span class="audio-duration">--:--</span>
    <audio class="audio-element" preload="metadata" src="${track.src}"></audio>
  `;

  container.append(player);
};

tracks.forEach((track) => renderAudioPlayer(track, audioList, { playlist: true }));
renderAudioPlayer(interviewTrack, interviewAudio, { download: false });

const photo = document.querySelector("[data-photo]");

photo.addEventListener("error", () => {
  photo.classList.add("is-missing");
});

const audioPlayers = [...document.querySelectorAll(".audio-player")];
const playlistPlayers = [...document.querySelectorAll("[data-playlist-player]")];
const playAllButton = document.querySelector(".play-all-button");

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return "--:--";
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remaining}`;
};

const setButtonState = (button, isPlaying) => {
  button.textContent = isPlaying ? "||" : ">";
  button.setAttribute("aria-label", `${isPlaying ? "Pause" : "Play"} ${button.dataset.trackTitle}`);
};

const pauseOthers = (currentAudio) => {
  document.querySelectorAll(".audio-element").forEach((audio) => {
    if (audio !== currentAudio) {
      audio.pause();
      setButtonState(audio.closest(".audio-player").querySelector(".play-pause-button"), false);
    }
  });
};

const playAudioByIndex = (index) => {
  if (index >= playlistPlayers.length) return;

  const player = playlistPlayers[index];
  const audio = player.querySelector(".audio-element");
  const button = player.querySelector(".play-pause-button");

  pauseOthers(audio);
  audio.play();
  setButtonState(button, true);
};

audioPlayers.forEach((player, index) => {
  const audio = player.querySelector(".audio-element");
  const button = player.querySelector(".play-pause-button");
  const progress = player.querySelector(".progress");
  const progressBar = player.querySelector(".progress-bar");
  const duration = player.querySelector(".audio-duration");
  const timeTooltip = document.createElement("span");

  timeTooltip.className = "time-tooltip";
  progressBar.append(timeTooltip);

  button.addEventListener("click", () => {
    if (audio.paused) {
      pauseOthers(audio);
      audio.play();
      setButtonState(button, true);
    } else {
      audio.pause();
      setButtonState(button, false);
    }
  });

  audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    if (!Number.isFinite(audio.duration)) return;

    const position = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${position}%`;
    progressBar.setAttribute("aria-valuenow", Math.round(position));
  });

  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    setButtonState(button, false);
    progress.style.width = "0";

    if (player.dataset.playlistPlayer) {
      playAudioByIndex(playlistPlayers.indexOf(player) + 1);
    }
  });

  progressBar.addEventListener("mousemove", (event) => {
    if (!Number.isFinite(audio.duration)) return;

    const rect = progressBar.getBoundingClientRect();
    const hoverPosition = (event.clientX - rect.left) / rect.width;
    timeTooltip.textContent = formatTime(hoverPosition * audio.duration);
    timeTooltip.style.left = `${event.clientX - rect.left}px`;
    timeTooltip.style.display = "block";
  });

  progressBar.addEventListener("mouseleave", () => {
    timeTooltip.style.display = "none";
  });

  progressBar.addEventListener("click", (event) => {
    if (!Number.isFinite(audio.duration)) return;

    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (event.clientX - rect.left) / rect.width;
    audio.currentTime = clickPosition * audio.duration;
  });
});

playAllButton.addEventListener("click", () => playAudioByIndex(0));
