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


/////////////////////////
// M3U Parser
/////////////////////////

var COMMENT_RE, EXTENDED, comments, empty, extended, parse, simple;

EXTENDED = '#EXTM3U';

COMMENT_RE = /:(?:(-?\d+),(.+)\s*-\s*(.+)|(.+))\n(.+)/;

extended = function(line) {
  var match;
  match = line.match(COMMENT_RE);
  if (match && match.length === 6) {
    return {
      length: match[1] || 0,
      artist: match[2] || '',
      title: match[4] || match[3],
      file: match[5].trim()
    };
  }
};

simple = function(string) {
  return {
    file: string.trim()
  };
};

empty = function(line) {
  return !!line.trim().length;
};

comments = function(line) {
  return line[0] !== '#';
};

parse = function(playlist) {
  var firstNewline;
  playlist = playlist.replace(/\r/g, '');
  firstNewline = playlist.search('\n');
  if (playlist.substr(0, firstNewline) === EXTENDED) {
    return playlist.substr(firstNewline).split('\n#').filter(empty).map(extended);
  } else {
    return playlist.split('\n').filter(empty).filter(comments).map(simple);
  }
};

(typeof module !== "undefined" && module !== null ? module.exports : window).M3U = {
  name: 'm3u',
  parse: parse
};