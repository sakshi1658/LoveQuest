const songs = [
    {
        title: "♪ Guzarish ♪",
        url: "assets/guzarish.mp3"
    },
    {
        title: "♪ Apna Bana Le ♪",
        url: "https://docs.google.com/uc?export=download&id=YOUR_FILE_ID"
    },
    {
        title: "♪ Rasiya ♪",
        url: "https://docs.google.com/uc?export=download&id=YOUR_FILE_ID"
    },
    {
        title: "♪ Soniyo ♪",
        url: "https://docs.google.com/uc?export=download&id=YOUR_FILE_ID"
    },
    {
        title: "♪ Cigarette After Sex - Heavenly ♪",
        url: "https://docs.google.com/uc?export=download&id=YOUR_FILE_ID"
    }
];

// Create floating hearts
const heartsContainer = document.querySelector('.hearts-container');
for (let i = 0; i < 20; i++) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.className = 'floating-heart';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDelay = `${Math.random() * 5}s`;
    heart.style.fontSize = `${Math.random() * 20 + 10}px`;
    heartsContainer.appendChild(heart);
}

// Music player functionality
let currentSong = 0;
let isPlaying = false;
const audio = new Audio();
const playButton = document.getElementById('playButton');
const currentSongElement = document.getElementById('currentSong');
const playIcon = playButton.querySelector('.play-icon');
const pauseIcon = playButton.querySelector('.pause-icon');

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
    } else {
        audio.play();
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
    }
    isPlaying = !isPlaying;
}

function updateSong() {
    audio.src = songs[currentSong].url;
    currentSongElement.textContent = songs[currentSong].title;
    if (isPlaying) {
        audio.play();
    }
}

playButton.addEventListener('click', togglePlay);

audio.addEventListener('ended', () => {
    currentSong = (currentSong + 1) % songs.length;
    updateSong();
});

// Initial setup
updateSong();