let play = document.getElementById('play');
let progressBar = document.getElementById('progressBar');
let audio = new Audio('Audio/1.mp3');

let currentSong = 1;

play.addEventListener('click', () => {
    if (audio.paused || audio.currentTime == 0) {
        audio.play();
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
    } else {
        audio.pause();
        play.classList.remove('fa-circle-pause');
        play.classList.add('fa-circle-play');
    }
});

audio.addEventListener('timeupdate', () => {
    let progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    progressBar.style.background = `linear-gradient(to right, #21a600ff ${progress}%, #333 ${progress}%)`;
})

progressBar.addEventListener('input', function () {
    let value = this.value;
    this.style.background = `linear-gradient(to right, #21a600ff ${value}%, #333 ${value}%)`;
    audio.currentTime = (progressBar.value * audio.duration) / 100;
});

let playMusic = Array.from(document.getElementsByClassName('playMusic'));

makeAllPlay = () => {
    playMusic.forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

playMusic.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');

        index = parseInt(e.target.id);
        currentSong = index;
        audio.src = `Audio/${index}.mp3`;
        audio.currentTime = 0;
        audio.play();
        updateNowBar();
    })
});

let allMusic = Array.from(document.getElementsByClassName('music-card'));

songs = [
     { songName: 'Midnight Strings', songDes: 'A warm guitar melody for a calm evening.', songImage: 'Images/1.jpg', songPath: 'Audio/1.mp3' },
    { songName: 'Echoes in Blue', songDes: 'Smooth ambient tones with a dreamy atmosphere.', songImage: 'Images/2.jpg', songPath: 'Audio/2.mp3' },
    { songName: 'Keys of Tomorrow', songDes: 'Gentle piano notes with an uplifting feeling.', songImage: 'Images/3.jpg', songPath: 'Audio/3.mp3' },
    { songName: 'Golden Brass', songDes: 'A bright instrumental filled with rich brass sounds.', songImage: 'Images/4.jpg', songPath: 'Audio/4.mp3' },
    { songName: 'Electric Horizon', songDes: 'A modern guitar track with an energetic vibe.', songImage: 'Images/5.jpg', songPath: 'Audio/5.mp3' },
    { songName: 'Neon Chords', songDes: 'Powerful electric guitar sounds for a late-night mood.', songImage: 'Images/6.jpg', songPath: 'Audio/6.mp3' },
    { songName: 'Afterglow', songDes: 'A chilled-out beat perfect for relaxing.', songImage: 'Images/7.jpg', songPath: 'Audio/7.mp3' },
    { songName: 'Falling Notes', songDes: 'Soft piano melodies with a peaceful mood.', songImage: 'Images/8.jpg', songPath: 'Audio/8.mp3' },
    { songName: 'Keys & Coffee', songDes: 'A cozy instrumental for slow mornings.', songImage: 'Images/9.jpg', songPath: 'Audio/9.mp3' },
    { songName: 'Velvet Strings', songDes: 'Emotional violin melodies blended with warm harmonies.', songImage: 'Images/10.jpg', songPath: 'Audio/10.mp3' },
    { songName: 'Golden Rhythm', songDes: 'A playful instrumental built around catchy rhythms.', songImage: 'Images/11.jpg', songPath: 'Audio/11.mp3' },
    { songName: 'Acoustic Roads', songDes: 'A soothing guitar journey inspired by open roads.', songImage: 'Images/12.jpg', songPath: 'Audio/12.mp3' },
    { songName: 'Late Night Voice', songDes: 'A mellow vocal track for quiet nights.', songImage: 'Images/13.jpg', songPath: 'Audio/13.mp3' },
    { songName: 'Wooden Dreams', songDes: 'A gentle acoustic melody with a natural feel.', songImage: 'Images/14.jpg', songPath: 'Audio/14.mp3' },
    { songName: 'Colors of Sound', songDes: 'A vibrant fusion of traditional and modern sounds.', songImage: 'Images/15.jpg', songPath: 'Audio/15.mp3' },
    { songName: 'Strings at Sunset', songDes: 'A warm instrumental inspired by an evening sunset.', songImage: 'Images/16.jpg', songPath: 'Audio/16.mp3' },
    { songName: 'Golden Fields', songDes: 'A peaceful melody inspired by nature and open spaces.', songImage: 'Images/17.jpg', songPath: 'Audio/17.mp3' },
    { songName: 'Mountain Air', songDes: 'A refreshing instrumental with a calm, spacious feel.', songImage: 'Images/18.jpg', songPath: 'Audio/18.mp3' }
]

order = [...songs];

allMusic.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].songImage;
    element.getElementsByClassName('img-title')[0].innerText = songs[i].songName;
    element.getElementsByClassName('img-description')[0].innerText = songs[i].songDes;
});

// Search functionality

let searchInput = document.getElementById('searchInput');

let notFoundMessage = document.createElement('div');
notFoundMessage.innerText = 'Song not found';
notFoundMessage.classList.add('not-found-message');
notFoundMessage.style.display = 'none';

// Add message to the music section
allMusic[0].parentElement.appendChild(notFoundMessage);

searchInput.addEventListener('input', () => {

    let searchText = searchInput.value.toLowerCase().trim();

    let foundSong = false;

    allMusic.forEach((card, i) => {

        let songName = songs[i].songName.toLowerCase();
        let songDescription = songs[i].songDes.toLowerCase();

        if (songName.includes(searchText) || songDescription.includes(searchText)) {

            card.style.display = '';
            foundSong = true;

        } else {

            card.style.display = 'none';

        }

    });

    // Show message inside website
    if (!foundSong && searchText !== '') {

        notFoundMessage.style.display = 'block';

    } else {

        notFoundMessage.style.display = 'none';

    }

});

let shuffle = document.getElementById('shuffle');
let repeat = document.getElementById('repeat');
let nowBar = document.querySelector('.now-bar');

let songOnRepeat = false;
let songOnShuffle = false;

function shuffleSongs (originalOrder) {
    order = [...originalOrder];
    for(i = order.length - 1; i > 0; i--){
        let j = Math.floor((Math.random) * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
}

shuffle.addEventListener('click', () => {
    if(!songOnShuffle) {
        songOnShuffle = true;
        songOnRepeat = false;
        shuffle.classList.add('active');
        repeat.classList.remove('active');

        order = shuffleSongs(songs);
    } else {
        songOnShuffle = false;
        shuffle.classList.remove('active');

        order = songs;
    }
});

repeat.addEventListener('click', () => {
    if(!songOnRepeat) {
        songOnRepeat = true;
        songOnShuffle = false;
        repeat.classList.add('active');
        shuffle.classList.remove('active');
    } else {
        songOnRepeat = false;
        repeat.classList.remove('active');
    }
})

playNextSong = () => {
    if(!songOnRepeat){
        let nextSong = (currentSong + 1) % playMusic.length;
        currentSong = nextSong == 0 ? 18 : nextSong;
    
        audio.src = order[currentSong-1].songPath;
        audio.currentTime = 0;
        audio.play();
        updateNowBar();
    } else {
        audio.src = order[currentSong-1].songPath;
        audio.currentTime = 0;
        audio.play();
        updateNowBar();
    }
}

playPrevSong = () => {
    let prevSong = (currentSong - 1);
    currentSong = prevSong == 0 ? 18 : prevSong;
    audio.src = `Audio/${currentSong}.mp3`;
    audio.currentTime = 0;
    audio.play();
    updateNowBar();
}

function updateNowBar () {
    nowBar.getElementsByTagName('img')[0].src = order[currentSong-1].songImage;
    nowBar.getElementsByClassName('img-title-info')[0].innerText = order[currentSong-1].songName;
    nowBar.getElementsByClassName('img-des-info')[0].innerText = order[currentSong-1].songDes;
}

forward = document.getElementById('forward');
backward = document.getElementById('backward');

forward.addEventListener('click', () => {
    playNextSong();
})

audio.addEventListener('ended', () => {
    playNextSong();
})

backward.addEventListener('click', () => {
    playPrevSong();
});