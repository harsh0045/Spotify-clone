
//Initialise the variable
let songIndex = -1;
let audioElement = new Audio();
let songs = document.querySelectorAll(".song-item");

// Function to play the selected song
function playSong(index) {
    const song = songs[index];
    const songURL = song.getAttribute("data-src");

    if (index === songIndex) {
        // If it's the same song that is already playing, toggle play/pause
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
            gif.style.opacity = 1;
            audioElement.addEventListener("timeupdate", updateProgress);
        } else {
            pauseSong();
        }
    } else {
        // If it's a different song, play the new song
        songIndex = index;
        audioElement.src = songURL;
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
        audioElement.addEventListener("timeupdate", updateProgress);
        updatePlayIcon(true); // Update play icon in the song item
    }
    updatePlayIconInSongItem() ;
}

// Function to pause the currently playing song
function pauseSong() {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
    audioElement.removeEventListener("timeupdate", updateProgress);
    updatePlayIcon(false); // Update pause icon in the song item
}

// Function to update the play icon in the song item
function updatePlayIcon(isPlaying) {
    const playIcons = document.querySelectorAll(".fa-play-circle");
    playIcons.forEach((playIcon, index) => {
        if (index === songIndex) {
            playIcon.classList.remove(isPlaying ? "far" : "fas");
            playIcon.classList.add(isPlaying ? "fas" : "far");
        } else {
            playIcon.classList.remove("fas");
            playIcon.classList.add("far");
        }
    });
}

// Function to update the progress bar
function updateProgress() {
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    myprogressBar.value = progress;
}

// Add event listeners to all the song items
songs.forEach((song, index) => {
    song.addEventListener("click", () => {
        playSong(index);
    });
});

// Event listener for "masterPlay" click
function updatePlayIconInSongItem() {
    const playIcons = document.querySelectorAll(".fa-play-circle");
    playIcons.forEach((playIcon, index) => {
        if (index === songIndex) {
            playIcon.classList.remove(audioElement.paused ? "fas" : "far");
            playIcon.classList.add(audioElement.paused ? "far" : "fas");
        } else {
            playIcon.classList.remove("fas");
            playIcon.classList.add("far");
        }
    });
}

// ... Your existing event listeners ...

// Event listener for "masterPlay" click
masterPlay.addEventListener("click", function() {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong(songIndex);
    } else {
        pauseSong();
    }
    updatePlayIconInSongItem(); // Update play/pause icon in the song items
});


// Event listener to seek the audio when the progress bar changes
myprogressBar.addEventListener("input", function() {
    const seekTime = (myprogressBar.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
});
