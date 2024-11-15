let progress = document.getElementById("progress");
let cancion = document.getElementById("cancion");
let ctrl = document.getElementById("play-pause");
let volumenControl = document.getElementById("volumen")
let progressTime = document.getElementById("progressTime")
let prevBtn = document.getElementById("volver");
let nextBtn = document.getElementById("siguiente");
let flechaPrev = document.getElementById("anterior");
let flechaNext = document.getElementById("proximo");
let buscarBtn = document.getElementById("buscarBtn");
let busquedaInput = document.getElementById("busqueda")
let cancionActualIndice = 0;
 
let canciones = [
    { src: "audio/colors-video.mp3", titulo: "Coloros", artista: "Crossfade", portada: "img/colors.png" },
    { src: "audio/covet-official-visualizer.mp3", titulo: "Covet", artista: "Basement", portada: "img/Covet.png" },
    { src: "audio/diamond-eyes-official-lyric-video.mp3", titulo: "Diamond Eyes", artista: "Deftones", portada: "img/Diamond Eyes.png" },
    { src: "audio/hit-em-up-dirty-music-video-hd.mp3", titulo: "Hit 'Em Up", artista: "2Pac", portada: "img/Biblioteca/image.png" },
    { src: "audio/money-trees.mp3", titulo: "Money Trees", artista: "Kendrick Lamar", portada: "img/Biblioteca/image-1.png" },
    { src: "audio/not-like-us.mp3", titulo: "Not Like Us", artista: "Kendrick Lamar", portada: "img/Biblioteca/image-2.png" },
    { src: "audio/No Role Modelz.mp3", titulo: "No Role Modelz", artista: "J. Cole", portada: "img/Biblioteca/image-3.png" },
    { src: "audio/50 Cent - Many Men (Wish Death) (Dirty Version).mp3", titulo: "Many Men", artista: "50 Cent", portada: "img/Biblioteca/image-4.png" }
];
 
function playPause(){
    if(ctrl.classList.contains("pause")){
        cancion.pause();
        ctrl.classList.remove("pause");
        ctrl.classList.add("play");
    }else{
        cancion.play();
        ctrl.classList.remove("play");
        ctrl.classList.add("pause");
    }
}
 
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
}
 
function loadSong(cancionIndice) {
    cancion.src = canciones[cancionIndice].src;
    cancion.play();
    ctrl.classList.remove("play");
    ctrl.classList.add("pause");
   
    document.getElementById("portada").src = canciones[cancionIndice].portada;
    document.getElementById("nombreMusica").textContent = canciones[cancionIndice].titulo;
    document.getElementById("nombreCantante").textContent = canciones[cancionIndice].artista;
}
 
function previousSong() {
    cancionActualIndice = (cancionActualIndice === 0) ? canciones.length - 1 : cancionActualIndice - 1;
    loadSong(cancionActualIndice);
}
 
function nextSong() {
    cancionActualIndice = (cancionActualIndice === canciones.length - 1) ? 0 : cancionActualIndice + 1;
    loadSong(cancionActualIndice);
}
 
cancion.onloadedmetadata = function(){
    progress.max = cancion.duration;
    progress.value = cancion.currentTime;
    }
 
volumenControl.addEventListener("input", () => {
    const volumen = volumenControl.value;
    cancion.volume = volumen / 100;
})
 
progress.addEventListener("input", () => {
    const tiempo = progress.value;
    cancion.currentTime = tiempo;
})
 
cancion.addEventListener("timeupdate", () => {
    const currentTime = cancion.currentTime;
    const duration = cancion.duration;
    progress.value = (currentTime / duration) * 100;
    progressTime.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
});
 
cancion.ontimeupdate = function(){
    progress.value = cancion.currentTime;
}

buscarBtn.addEventListener("click", () => {
    const busqueda = busquedaInput.value.toLowerCase().trim();
    const indice = canciones.findIndex(cancion => cancion.titulo.toLowerCase() === busqueda.toLowerCase());
    loadSong(indice);
    cancionActualIndice = indice;
    console.log("asd");
})
 
prevBtn.addEventListener("click", previousSong);
nextBtn.addEventListener("click", nextSong);

$(document).ready(function() {
    $(".tarjeta").hover(
        function() {
            $(this).addClass("tarjeta-hover");
        },
        function() {
            $(this).removeClass("tarjeta-hover");
        }
    );
});
