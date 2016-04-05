var iframeElement    = document.querySelector('iframe');
var boombox          = SC.Widget(iframeElement);
var currentTrackName = "creeper";
var currentSongName  = "creeper";



function Track(url, artwork, songs) {
  this.url = url;
  this.artwork = artwork;
  this.songs = songs;
}

function Song(title, artist, startTime) {
  this.title = title;
  this.artist = artist;
  this.startTime = startTime;
  this.isLast = function(){
    return currentTrack().songs.indexOf(this) === currentTrack().songs.length - 1;
  };
}

function currentTrack() {
  return tracks[currentTrackName];
}

function currentSong() {
  var songs = currentTrack().songs;
  for (var i = 0; i < songs.length; i++) {
    if (songs[i].title === currentSongName) {
      return songs[i];
    }
  }
}

function next() {
  if (currentSong().isLast()){
    changeTape(nextTrack());
  } else {
    skipTo(nextSong());
    currentSongName = nextSong().title;
  }

}

function nextSong() {
  var songs = currentTrack().songs;
  for (var i = 0; i < songs.length; i++) {
    if (songs[i] === currentSong()) {
      if (i === songs.length - 1 ) {
        return songs[0];
      } else {
        return songs[i + 1];
      }
    }
  }
}

function nextTrack() {
  return tracks[nextTrackName()];
}

function nextTrackName() {
  var keys = Object.keys(tracks);
  for (var i = 0; i < keys.length; i++) {
    if (keys[i] === currentTrackName) {
      if (i === keys.length -1 ) {
        return keys[0];
      } else {
        return keys[i + 1];
      }
    }
  }
};

function play() {
  boombox.play();
}

function pause() {
  boombox.pause();
}

function toggle() {
  boombox.toggle();
}

function skipTo(song) {
  boombox.seekTo(song.startTime * 1000);
}
function changeTape(track) {
  boombox.load(track.url, {});
  currentTrackName = nextTrackName();
  currentSongName  = currentTrack().songs[0].title;
}

function updateView(){

}

function getTape(name) {
  return tracks[name];
}

var creeperSong = new Song("creeper", "byrdipop", 0);
var creeper = new Track(
  "https://soundcloud.com/byrdipop/creeper",
  "images/creeperArt.png",
  [
    creeperSong
  ]
);

var breaks = new Track(
  "https://soundcloud.com/byrdipop/breaks",
  "images/breaksArt.png",
  [
    new Song("breaks", "byrdipop", 0)
  ]
);

var spaceTapesMix = new Track(
  "https://soundcloud.com/internationalspacetapes/space-tapes-mix-byrdipop",
  "images/spaceTapesMixArt.png",
  [
    new Song("A Little Second Of You", "Knotted Sheets", 0),
    new Song("Foreign Heart", "DJAO", 300),
    new Song("Shifting", "James Rhodes", 600)
  ]);


var tracks = {
  "creeper"         : creeper,
  "breaks"          : breaks,
  "space tapes mix" : spaceTapesMix
};
