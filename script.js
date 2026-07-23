/* =====================================
        SPOTIFY CLONE
        JAVASCRIPT PART 1
======================================*/

/* ---------- PLAYLIST ---------- */

const songs = [

    {
        title: "Beautiful Dream",
        artist: "Mixkit",
        image: "./Assets/beautiful-dream.png",
        audio: "./Songs/mixkit-beautiful-dream-493.mp3"
    },

    {
        title: "Deep Urban",
        artist: "Mixkit",
        image: "./Assets/deep-urban.png",
        audio: "./Songs/mixkit-deep-urban-623.mp3"
    },

    {
        title: "Driving Ambition",
        artist: "Mixkit",
        image: "./Assets/driving-ambition.png",
        audio: "./Songs/mixkit-driving-ambition-32.mp3"
    },

    {
        title: "Hazy After Hours",
        artist: "Mixkit",
        image: "./Assets/hazy-after-hours.png",
        audio: "./Songs/mixkit-hazy-after-hours-132.mp3"
    },

    {
        title: "Hip Hop 02",
        artist: "Mixkit",
        image: "./Assets/hiphop02.png",
        audio: "./Songs/mixkit-hip-hop-02-738.mp3"
    },

    {
        title: "Serene View",
        artist: "Mixkit",
        image: "./Assets/serene-view.png",
        audio: "./Songs/mixkit-serene-view-443.mp3"
    },

    {
        title: "Silent Descent",
        artist: "Mixkit",
        image: "./Assets/silent-descent.png",
        audio: "./Songs/mixkit-silent-descent-614.mp3"
    },

    {
        title: "Sun And His Daughter",
        artist: "Mixkit",
        image: "./Assets/sun-and-his-daughter.png",
        audio: "./Songs/mixkit-sun-and-his-daughter-580.mp3"
    },

    {
        title: "Tech House Vibes",
        artist: "Mixkit",
        image: "./Assets/tech-house-vibes.png",
        audio: "./Songs/mixkit-tech-house-vibes-130.mp3"
    }

];

/* ---------- AUDIO ---------- */

const audio = new Audio();

let currentSong = 0;

let isPlaying = false;

/* ---------- HTML ELEMENTS ---------- */

const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const progressBar = document.getElementById("progressBar");
const volumeBar = document.getElementById("volumeBar");

const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");
const albumImage = document.getElementById("albumImage");

const cards = document.querySelectorAll(".card");

/* ---------- LOAD SONG ---------- */

function loadSong(index){

    currentSong = index;

    audio.src = songs[index].audio;

    songTitle.textContent = songs[index].title;

    artistName.textContent = songs[index].artist;

    albumImage.src = songs[index].image;

}

/* ---------- PLAY ---------- */

function playSong(){

    audio.play();

    isPlaying = true;

    playBtn.src = "./Assets/player_pause.png";

    albumImage.classList.add("rotate");

}

/* ---------- PAUSE ---------- */

function pauseSong(){

    audio.pause();

    isPlaying = false;

    playBtn.src = "./Assets/player_icon3 (1).png";

    albumImage.classList.remove("rotate");

}

/* ---------- PLAY BUTTON ---------- */

playBtn.addEventListener("click",()=>{

    if(isPlaying){

        pauseSong();

    }else{

        playSong();

    }

});

/* ---------- DEFAULT ---------- */

loadSong(currentSong);

audio.volume = 0.8;

volumeBar.value = 80;
/* =====================================
        JAVASCRIPT PART 2
        NEXT • PREVIOUS • PROGRESS
======================================*/

/* ---------- FORMAT TIME ---------- */

function formatTime(seconds){

    if(isNaN(seconds)) return "0:00";

    let mins = Math.floor(seconds / 60);

    let secs = Math.floor(seconds % 60);

    if(secs < 10){

        secs = "0" + secs;

    }

    return mins + ":" + secs;

}

/* ---------- SONG DURATION ---------- */

audio.addEventListener("loadedmetadata",()=>{

    totalTime.textContent = formatTime(audio.duration);

});

/* ---------- PROGRESS ---------- */

audio.addEventListener("timeupdate",()=>{

    if(!audio.duration) return;

    progressBar.value =

    (audio.currentTime/audio.duration)*100;

    currentTime.textContent =

    formatTime(audio.currentTime);

});

/* ---------- SEEK ---------- */

progressBar.addEventListener("input",()=>{

    if(!audio.duration) return;

    audio.currentTime =

    (progressBar.value/100)*audio.duration;

});

/* ---------- VOLUME ---------- */

volumeBar.addEventListener("input",()=>{

    audio.volume = volumeBar.value/100;

});

/* ---------- ACTIVE CARD ---------- */

function highlightCard(index){

    cards.forEach(card=>{

        card.classList.remove("active-card");

    });

    if(cards[index]){

        cards[index].classList.add("active-card");

    }

}

/* ---------- CARD CLICK ---------- */

cards.forEach((card,index)=>{

    if(index < songs.length){

        card.addEventListener("click",()=>{

            loadSong(index);

            playSong();

            highlightCard(index);

        });

    }

});

/* ---------- NEXT ---------- */

function nextSong(){

    currentSong++;

    if(currentSong >= songs.length){

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

    highlightCard(currentSong);

}

/* ---------- PREVIOUS ---------- */

function previousSong(){

    currentSong--;

    if(currentSong < 0){

        currentSong = songs.length - 1;

    }

    loadSong(currentSong);

    playSong();

    highlightCard(currentSong);

}

/* ---------- BUTTON EVENTS ---------- */

nextBtn.addEventListener("click",nextSong);

prevBtn.addEventListener("click",previousSong);

/* ---------- SONG ENDED ---------- */

audio.addEventListener("ended",()=>{

    nextSong();

});

/* ---------- START ---------- */

highlightCard(currentSong);
/* =====================================
        JAVASCRIPT PART 3
     SEARCH • LIBRARY • SHUFFLE
======================================*/

/* ---------- BUTTONS ---------- */

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const noSongFound = document.getElementById("noSongFound");

const homeBtn = document.getElementById("homeBtn");
const libraryBtn = document.getElementById("libraryBtn");

const premiumBtn = document.getElementById("premiumBtn");
const installBtn = document.getElementById("installBtn");

const profileBtn = document.getElementById("profileBtn");

const createPlaylistBtn =
document.getElementById("createPlaylistBtn");

const browsePodcastBtn =
document.getElementById("browsePodcastBtn");

const backBtn =
document.getElementById("backBtn");

const forwardBtn =
document.getElementById("forwardBtn");

const shuffleBtn =
document.getElementById("shuffleBtn");

const repeatBtn =
document.getElementById("repeatBtn");

const heartBtn =
document.getElementById("heartBtn");

const queueBtn =
document.getElementById("queueBtn");

const lyricsBtn =
document.getElementById("lyricsBtn");

const playlistBtn =
document.getElementById("playlistBtn");

const laptopBtn =
document.getElementById("laptopBtn");

/* ---------- SEARCH ---------- */

searchInput.style.display="none";

searchBtn.onclick=()=>{

    if(searchInput.style.display==="none"){

        searchInput.style.display="block";

        searchInput.focus();

    }

    else{

        searchInput.style.display="none";

        searchInput.value="";

        cards.forEach(card=>{

            card.style.display="block";

        });

        noSongFound.style.display="none";

    }

};

searchInput.addEventListener("keyup",()=>{

    let value=searchInput.value.toLowerCase();

    let found=false;

    cards.forEach((card,index)=>{

        if(index>=songs.length) return;

        let song=songs[index];

        if(song.title.toLowerCase().includes(value) ||

        song.artist.toLowerCase().includes(value)){

            card.style.display="block";

            found=true;

        }

        else{

            card.style.display="none";

        }

    });

    noSongFound.style.display=

    found ? "none":"block";

});

/* ---------- HOME ---------- */

homeBtn.onclick=()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};

/* ---------- LIBRARY ---------- */

libraryBtn.onclick=()=>{

    alert("Your Library contains "
    +songs.length+
    " songs.");

};

/* ---------- CREATE PLAYLIST ---------- */

createPlaylistBtn.onclick=()=>{

    let name=prompt("Playlist Name");

    if(name){

        alert(name+
        " playlist created.");

    }

};

/* ---------- PODCAST ---------- */

browsePodcastBtn.onclick=()=>{

    alert("Podcasts Coming Soon!");

};

/* ---------- PREMIUM ---------- */

premiumBtn.onclick=()=>{

    alert("Premium Plans\n\nIndividual\nStudent\nFamily");

};

/* ---------- INSTALL ---------- */

installBtn.onclick=()=>{

    alert("Spotify Desktop App");

};

/* ---------- PROFILE ---------- */

profileBtn.onclick=()=>{

    alert("Welcome to Spotify Clone");

};

/* ---------- BACK ---------- */

backBtn.onclick=()=>{

    history.back();

};

/* ---------- FORWARD ---------- */

forwardBtn.onclick=()=>{

    history.forward();

};

/* ---------- HEART ---------- */

let liked=false;

heartBtn.onclick=()=>{

    liked=!liked;

    if(liked){

        heartBtn.style.color="#1DB954";

    }

    else{

        heartBtn.style.color="white";

    }

};

/* ---------- QUEUE ---------- */

queueBtn.onclick=()=>{

    alert("Queue Empty");

};

/* ---------- LYRICS ---------- */

lyricsBtn.onclick=()=>{

    alert("Lyrics not available.");

};

/* ---------- PLAYLIST ---------- */

playlistBtn.onclick=()=>{

    alert("Playlist Panel");

};

/* ---------- DEVICE ---------- */

laptopBtn.onclick=()=>{

    alert("Select Playback Device");

};

/* ---------- SHUFFLE ---------- */

let shuffle=false;

shuffleBtn.onclick=()=>{

    shuffle=!shuffle;

    shuffleBtn.style.opacity=

    shuffle ? "1":"0.6";

};

/* ---------- REPEAT ---------- */

let repeat=false;

repeatBtn.onclick=()=>{

    repeat=!repeat;

    repeatBtn.style.opacity=

    repeat ? "1":"0.6";

    audio.loop=repeat;

};

/* ---------- SHUFFLE SUPPORT ---------- */

function randomSong(){

    let random;

    do{

        random=Math.floor(

        Math.random()*songs.length);

    }

    while(random===currentSong);

    currentSong=random;

    loadSong(currentSong);

    playSong();

    highlightCard(currentSong);

}

/* ---------- UPDATE NEXT ---------- */

nextBtn.onclick=()=>{

    if(shuffle){

        randomSong();

    }

    else{

        nextSong();

    }

};

prevBtn.onclick=()=>{

    if(shuffle){

        randomSong();

    }

    else{

        previousSong();

    }

};
/* =====================================
        JAVASCRIPT PART 4
   LOCAL STORAGE • RECENT • SHORTCUTS
======================================*/

/* ---------- LOCAL STORAGE ---------- */

let playlists = JSON.parse(localStorage.getItem("playlists")) || [];

let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

let recentlyPlayed =
JSON.parse(localStorage.getItem("recentSongs")) || [];

/* ---------- SAVE ---------- */

function saveData(){

    localStorage.setItem("playlists",
    JSON.stringify(playlists));

    localStorage.setItem("favourites",
    JSON.stringify(favourites));

    localStorage.setItem("recentSongs",
    JSON.stringify(recentlyPlayed));

}

/* ---------- PLAYLIST ---------- */

createPlaylistBtn.onclick=()=>{

    let name=prompt("Enter Playlist Name");

    if(!name) return;

    playlists.push({

        name:name,

        songs:[]

    });

    saveData();

    showToast("Playlist Created");

};

/* ---------- FAVOURITES ---------- */

heartBtn.onclick=()=>{

    let song=songs[currentSong].title;

    if(favourites.includes(song)){

        favourites=favourites.filter(

        s=>s!==song

        );

        heartBtn.style.color="white";

        showToast("Removed from Favourites");

    }

    else{

        favourites.push(song);

        heartBtn.style.color="#1DB954";

        showToast("Added to Favourites");

    }

    saveData();

};

/* ---------- RECENT ---------- */

function updateRecent(){

    let title=songs[currentSong].title;

    recentlyPlayed=

    recentlyPlayed.filter(

    s=>s!==title

    );

    recentlyPlayed.unshift(title);

    if(recentlyPlayed.length>10){

        recentlyPlayed.pop();

    }

    saveData();

}

audio.addEventListener("play",updateRecent);

/* ---------- TOAST ---------- */

const toast=document.createElement("div");

toast.style.position="fixed";
toast.style.bottom="110px";
toast.style.right="20px";
toast.style.background="#1DB954";
toast.style.color="white";
toast.style.padding="12px 18px";
toast.style.borderRadius="8px";
toast.style.fontWeight="600";
toast.style.opacity="0";
toast.style.transition=".3s";
toast.style.zIndex="9999";

document.body.appendChild(toast);

function showToast(text){

    toast.innerHTML=text;

    toast.style.opacity="1";

    setTimeout(()=>{

        toast.style.opacity="0";

    },2000);

}

/* ---------- KEYBOARD ---------- */

document.addEventListener("keydown",(e)=>{

    if(e.target.tagName==="INPUT") return;

    switch(e.code){

        case "Space":

            e.preventDefault();

            if(isPlaying){

                pauseSong();

            }

            else{

                playSong();

            }

        break;

        case "ArrowRight":

            nextSong();

        break;

        case "ArrowLeft":

            previousSong();

        break;

        case "KeyM":

            audio.muted=!audio.muted;

            showToast(audio.muted ?

            "Muted":"Unmuted");

        break;

    }

});

/* ---------- DOUBLE CLICK CARD ---------- */

cards.forEach((card,index)=>{

    if(index<songs.length){

        card.addEventListener("dblclick",()=>{

            currentSong=index;

            loadSong(index);

            playSong();

            highlightCard(index);

            showToast(

            songs[index].title

            );

        });

    }

});

/* ---------- AUTO HEART ---------- */

function updateHeart(){

    if(favourites.includes(

        songs[currentSong].title

    )){

        heartBtn.style.color="#1DB954";

    }

    else{

        heartBtn.style.color="white";

    }

}

audio.addEventListener("play",updateHeart);

/* ---------- START ---------- */

updateHeart();

// showToast("Spotify Clone Ready");