function ItunesController(){
  var itunesService = new ItunesService()
  //Do Not Modify the getMusic function
  this.getMusic = function getMusic(e){
    e.preventDefault();
    var artist = e.target.artist.value;
    itunesService.getMusicByArtist(artist).then(draw); //after get music by artist returns what are you doing with the objects?
  }

  //Start coding here

  var lastPlayed; // keep track of the last song played (if any)

  function draw(results){

    var songsDiv = document.querySelector("#songs") // the container element
    songsDiv.innerHTML = "" // clear its current contents to make way for new results

    var mediaList = document.createElement("ul") // another element for a Bootstrap "media-group" to hold the song results as Bootstrap "media elements"
    mediaList.className = "list-unstyled container py-5"
    songsDiv.appendChild(mediaList) // put the media-group element inside the containing div element
    var innerHtml = "" // placeholder for the results html

    // create a html for each song in the results array
    results.forEach( song => {
      if (song.preview && !song.preview.includes("http://video")) { // reject any results that are movies, not music files
        var songTemplate = `
          <li class="media py-3 bg-light">
            <img class="album-art ml-3 mr-3" src="${song.albumArt}" alt="album art" onclick="app.controllers.itunesCtrl.playSample(this, '${song.preview}')">
            <span class="play-pause" onclick="app.controllers.itunesCtrl.triggerPlaySample(this)"><i class="fas fa-play"></i></span>
            <div class="media-body">
              <h5 class="mt-0 mb-3">${song.title}</h5>
              <p><span><small>${song.collection}</small></span><span class="ml-4"><small class="font-weight-bold">${song.artist}</small></span></p>
              <p><span class="ml-4"><small class="font-italic">$${song.price}</small></span></p>
            </div>
          </li>
        `;
        innerHtml += songTemplate
      }
    })

    mediaList.innerHTML = innerHtml
  }

  // handle a click on the album-art image for any song: play or pause the sample (and toggle the icon from play to pause or vice versa)
  this.playSample = function(imgElt, audioSrc) {
    var audioSample = new Audio(audioSrc) // create a new media element
    var playOrPauseIcon = imgElt.nextElementSibling // get a reference to the play/pause icon

    if (lastPlayed) { // no matter what, if anything is playing, pause it
      lastPlayed.sample.pause()
      if (lastPlayed.sample.getAttribute("src") === audioSample.getAttribute("src")) { // if clicking on the same song a 2nd time...
        lastPlayed = null; // unset the lastPlayed variable
        playOrPauseIcon.innerHTML = `<i class="fas fa-play"></i>` // change the icon to "play"
      } else { // if clicking on a different song while another is currently playing...
        audioSample.play() // start playing
        lastPlayed.button.innerHTML = `<i class="fas fa-play"></i>` // change the icon of the previously-playing song to "play"
        lastPlayed = { sample: audioSample, button: playOrPauseIcon } // store the now-playing song in the lastPlayed variable
        playOrPauseIcon.innerHTML = `<i class="fas fa-pause"></i>` // change the icon of the currently-playing song to "pause"
      }
    } else { // if clicking on a song with no other song currently playing...
      audioSample.play() // start playing
      lastPlayed = { sample: audioSample, button: playOrPauseIcon } // store the now-playing song in the lastPlayed variable
      playOrPauseIcon.innerHTML = `<i class="fas fa-pause"></i>` // change the icon of the currently-playing song to "pause"
    }    
  }

  // handle a click on the play/pause icon as if it was a click on the album-art image
  this.triggerPlaySample = function(spanElt) {
    spanElt.previousElementSibling.click();
  }




  
}
