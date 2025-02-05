const songs = [
    {
        title: "♪ Guzarish ♪",
        url: "assets/guzarish.mp3"
    },
    {
        title: "♪ Apna Bana Le ♪",
        url: "assets/Apna-Bana-Le.mp3"
    },
    {
        title: "♪ Rasiya ♪",
        url: "assets/Rasiya.mp3"
    },
    {
        title: "♪ Soniyo ♪",
        url: "assets/Soniyo.mp3"
    },
    {
        title: "♪ Cigarette After Sex - Heavenly ♪",
        url: "assets/heavenly.mp3"
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
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const currentSongElement = document.getElementById('currentSong');
const playIcon = playButton.querySelector('.play-icon');
const pauseIcon = playButton.querySelector('.pause-icon');
const progressBar = document.getElementById('progress');

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

function playPreviousSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    updateSong();
}

function playNextSong() {
    currentSong = (currentSong + 1) % songs.length;
    updateSong();
}

function updateSong() {
    audio.src = songs[currentSong].url;
    currentSongElement.textContent = songs[currentSong].title;
    if (isPlaying) {
        audio.play();
    }
}

function updateProgress() {
    if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progress}%`;
    }
}

// Event Listeners
playButton.addEventListener('click', togglePlay);
prevButton.addEventListener('click', playPreviousSong);
nextButton.addEventListener('click', playNextSong);

audio.addEventListener('ended', playNextSong);
audio.addEventListener('timeupdate', updateProgress);

// Keyboard controls
document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'Space':
            e.preventDefault();
            togglePlay();
            break;
        case 'ArrowLeft':
            playPreviousSong();
            break;
        case 'ArrowRight':
            playNextSong();
            break;
    }
});

// Initial setup
updateSong();