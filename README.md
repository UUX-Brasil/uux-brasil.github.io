# Agile Audio Player

Supports mp3, mp4, ogg and m3u playlists

## How to use the player

The `dist` folder contains the player library and its minified version.
In order to use it, you just need to reference one of those files in a `<script>` tag.
There is a sample implementation in the `sample` folder.

### Reference

This library exposes a class named `AgileAudioPlayer`.

### AgileAudioPlayer

**Syntax**

    new AgileAudioPlayer();
    new AgileAudioPlayer(*audioTagElement*);
        
**Example**

    var player = new AgileAudioPlayer(document.getElementById('audioPlayer'));
    var m3u = 'http://net1.cope.stream.flumotion.com/cope/net1.mp3.m3u';
    player.init(m3u);

### Methods

#### AgileAudioPlayer.init

Initializes the player with a media src url, it returns a promise that can 

**Syntax

    AgileAudioPlayer.init(*srcUrlString*);

**Returns**

A `Promise` object

**Example**

    var player = new AgileAudioPlayer();
    var m3u = 'http://net1.cope.stream.flumotion.com/cope/net1.mp3.m3u';
    player.init(m3u).then(function() {
      console.info('Player inialized successfully');
    })
    .catch(function(error){
      console.error(error);
    });

### Properties

#### audioElement

The audio tag element passed as the constructor argument or, if not specified, one is created automatically.
It is possible to add events and control all this object programatically usining the HTML5 `<audio>` tag interface.
  
**Example**

    var player = new AgileAudioPlayer();
    player.audioElement.addEventListener('progress', function(){
      console.log(this.currentTime);
    });
    
## How to build the player

1. Install Node.js
2. Install the dependences:

    $ npm install gulp -g
    $ npm install

3. Run the gulp command:

    $ gulp
        
The build build output will be available in the `dist` folder.