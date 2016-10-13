/////////////////////////////////////////////
// AgileAudioPlayer Class
/////////////////////////////////////////////

(function(){
  // Contructor
  var AgileAudioPlayer = function(audioElement) {
    this.audioElement = audioElement || document.createElement('audio');
  };
  
  AgileAudioPlayer.prototype.init = function(srcUrl) {
    return this.loadUrl(srcUrl).then(function(url) {
      this.audioElement.src = url;
      this.audioElement.play();
    }.bind(this));
  };

  AgileAudioPlayer.prototype.loadUrl = function(url) {
    if (url.indexOf(".m3u") < 0) {
      return Promise.resolve(url);
    }
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.overrideMimeType("audio/x-mpegurl");
      xhr.onload = function () {
        var playlist = M3U.parse(this.response);
        if (playlist.length > 0) {
          var file = playlist[0].file;
          resolve(file);
        } else {
          reject(new Error("Unable to load m3u at: " + url));
        }
      };
      xhr.onerror = function() {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    });
  };

  window.AgileAudioPlayer = AgileAudioPlayer;
})();