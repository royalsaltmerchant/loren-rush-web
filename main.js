const driveFolderUrl =
  "https://drive.google.com/drive/folders/192hnJQZ0KXqQuud_xw9EzDqHjtDPhfjj";

const resources = [
  {
    title: "Works list",
    note: "Catalog of compositions and related materials.",
    url: "documents/loren-works-list-annotated.pdf",
  },
  {
    title: "6 Piano Preludes (Omaggio a Ungaretti)",
    note: "Drive folder for the piano solo materials.",
    url: "https://drive.google.com/drive/folders/12_ePLcTM1rlTlV5JaenJdQy_sdFNafSS",
  },
  {
    title: "Orchestra scores",
    note: "Score PDFs can be added here when available.",
    url: "https://drive.google.com/drive/folders/1Fl2UlSuWMVozsqJ-XD139zBENuUQoOxP",
  },
  {
    title: "Full Drive folder",
    note: "Original shared Google Drive archive.",
    url: driveFolderUrl,
  },
];

const tracks = [
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

const list = document.querySelector("[data-resource-list]");
const audioList = document.querySelector("[data-audio-list]");
const interviewAudio = document.querySelector("[data-interview-audio]");

resources.forEach((resource, index) => {
  const link = document.createElement("a");
  link.className = "resource";
  link.style.animationDelay = `${120 + index * 55}ms`;
  link.href = resource.url;
  link.target = resource.url.startsWith("http") ? "_blank" : "_self";
  link.rel = resource.url.startsWith("http") ? "noreferrer" : "";

  link.innerHTML = `
    <span>
      <span class="resource__title">${resource.title}</span>
      <span class="resource__note">${resource.note}</span>
    </span>
    <span class="resource__arrow" aria-hidden="true">-&gt;</span>
  `;

  list.append(link);
});

const renderAudioPlayer = (track, container) => {
  const player = document.createElement("article");
  player.className = "audio-player";
  player.innerHTML = `
    <button class="play-pause-button" type="button" aria-label="Play ${track.title}">Play</button>
    <div>
      <h3 class="audio-title">${track.title}</h3>
      <p class="audio-meta">${track.meta} <a class="download-link" href="${track.src}" download>Download MP3</a></p>
      <div class="progress-bar" role="slider" aria-label="Seek ${track.title}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0">
        <div class="progress"></div>
      </div>
    </div>
    <span class="audio-duration">--:--</span>
    <audio class="audio-element" preload="metadata" src="${track.src}"></audio>
  `;

  container.append(player);
};

tracks.forEach((track) => renderAudioPlayer(track, audioList));
renderAudioPlayer(interviewTrack, interviewAudio);

const photo = document.querySelector("[data-photo]");

photo.addEventListener("error", () => {
  photo.classList.add("is-missing");
});

const audioPlayers = [...document.querySelectorAll(".audio-player")];
const playAllButton = document.querySelector(".play-all-button");

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return "--:--";
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remaining}`;
};

const pauseOthers = (currentAudio) => {
  document.querySelectorAll(".audio-element").forEach((audio) => {
    if (audio !== currentAudio) {
      audio.pause();
      audio.closest(".audio-player").querySelector(".play-pause-button").textContent = "Play";
    }
  });
};

const playAudioByIndex = (index) => {
  if (index >= audioPlayers.length) return;

  const player = audioPlayers[index];
  const audio = player.querySelector(".audio-element");
  const button = player.querySelector(".play-pause-button");

  pauseOthers(audio);
  audio.play();
  button.textContent = "Pause";
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
      button.textContent = "Pause";
    } else {
      audio.pause();
      button.textContent = "Play";
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
    button.textContent = "Play";
    progress.style.width = "0";
    playAudioByIndex(index + 1);
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
